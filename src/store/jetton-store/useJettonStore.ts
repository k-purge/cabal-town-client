import { useTonAddress } from "@tonconnect/ui-react";
import { useJettonAddress } from "hooks/useJettonAddress";
import QuestiomMarkImg from "assets/icons/question.png";
import useNotification from "hooks/useNotification";
import axiosService from "services/axios";
import { jettonDeployController } from "lib/jetton-controller";
import { zeroAddress } from "lib/utils";
import { useCallback } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { Address } from "ton";
import { getUrlParam, isValidAddress } from "utils";
import { jettonStateAtom, IJettonStoreUpdateState } from ".";
import { IHolder } from "../jetton-list-store";
import { useNetwork } from "lib/hooks/useNetwork";
import { RATE_SCALER } from "lib/jetton-minter";

let i = 0;

function useJettonStore() {
  const [state, setState] = useRecoilState(jettonStateAtom);
  const reset = useResetRecoilState(jettonStateAtom);
  const connectedWalletAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  const walletAddress = useTonAddress();
  const { network } = useNetwork();
  const { showNotification } = useNotification();
  const { jettonAddress, jettonFriendlyAddress } = useJettonAddress();

  const _filterUserBalance = useCallback(
    (holders: IHolder[]) => {
      const balance = holders
        ?.filter((holder: IHolder) => holder.owner.address === rawAddress)
        ?.map((holding: IHolder) => parseInt(holding.balance));
      return balance[0];
    },
    [rawAddress],
  );

  const getJettonFromDb = useCallback(async () => {
    if (jettonAddress) {
      // get jetton detail from db
      const { res: selectedJetton } = await axiosService.getJetton(jettonAddress);
      setState((prevState) => {
        return {
          ...prevState,
          selectedJetton,
        };
      });
    }
  }, [jettonAddress, setState]);

  const updateJettonPurge = useCallback(async () => {
    if (jettonAddress) {
      // get jetton detail from db
      await axiosService.updateJettonPurge({ masterAddress: jettonAddress });
    }
  }, [jettonAddress]);

  const updateState = useCallback(
    (newState: IJettonStoreUpdateState) => {
      setState((prevState) => {
        return {
          ...prevState,
          ...newState,
        };
      });
    },
    [setState],
  );

  const getJettonHoldersTxns = useCallback(async () => {
    if (jettonAddress) {
      // get jetton detail from db
      const { res: holders } = await axiosService.getJettonHolders(jettonAddress, network);
      const { res: txns } = await axiosService.getJettonTxns(jettonAddress, network);
      const userBalance = _filterUserBalance(holders);

      setState((prevState) => {
        return {
          ...prevState,
          userBalance,
          holders,
          txns,
        };
      });

      return userBalance;
    }
  }, [_filterUserBalance, jettonAddress, network, setState]);

  const getJettonWallet = useCallback(async () => {
    const parsedJettonMaster = Address.parse(jettonFriendlyAddress!);
    const jettonWallet = await jettonDeployController.getJettonWallet(
      parsedJettonMaster,
      walletAddress,
    );
    setState((prevState) => {
      return {
        ...prevState,
        jettonWalletAddress: jettonWallet?.jWalletAddress?.toFriendly(),
      };
    });
  }, [jettonFriendlyAddress, setState, walletAddress]);

  const getJettonDetails = useCallback(async () => {
    i++;
    const myIndex = i;

    let queryAddress = getUrlParam("address");

    if (queryAddress && !isValidAddress(queryAddress)) {
      window.history.replaceState(null, "", window.location.pathname);
      queryAddress = null;
      showNotification("Invalid jetton address in query param", "error", 5000);
    }

    const address = queryAddress || connectedWalletAddress;
    const isMyWallet = address ? address === connectedWalletAddress : false;

    reset();

    if (!jettonAddress || !isValidAddress(jettonAddress)) {
      showNotification("Invalid jetton address", "error");
      return;
    }

    // const jettonMaster = Address.parse(jettonAddress);
    const parsedJettonMaster = Address.parse(jettonFriendlyAddress!);

    try {
      setState((prevState) => ({
        ...prevState,
        jettonLoading: true,
      }));

      let result: { minter: any; jettonWallet: any } | undefined = undefined;

      while (!result) {
        result = await jettonDeployController.getJettonDetails(parsedJettonMaster, walletAddress);
      }

      // get jetton price
      const jettonPrice =
        result.minter.reserveBalance.toNumber() /
          ((result.minter.circulatingSupply.toNumber() * result.minter.reserveRate.toNumber()) /
            RATE_SCALER) ?? 0;

      // get ton price
      const {
        rates: { TON },
      } = await axiosService.getTonPrice();
      const tonPrice = TON.prices.USD;

      if (!result) {
        console.log("empty");
        return;
      }
      const _adminAddress = result.minter.admin?.toFriendly() ?? zeroAddress().toFriendly();
      const admin = isMyWallet && _adminAddress === connectedWalletAddress;

      let image: string | undefined;

      if (result.minter.metadata.image) {
        const img = new Image();
        img.src = result.minter.metadata.image;
        img.onerror = () => {
          setState((prev) => ({ ...prev, isImageBroken: true }));
        };

        image = result.minter.metadata.image;
      } else if (result.minter.metadata.image_data) {
        try {
          const imgData = Buffer.from(result.minter.metadata.image_data, "base64").toString();
          let type: string;

          if (/<svg xmlns/.test(imgData)) {
            type = "svg+xml";
          } else if (/png/i.test(imgData)) {
            type = "png";
          } else {
            console.warn("Defaulting to jpeg");
            type = "jpeg"; // Fallback
          }

          image = `data:image/${type};base64,${result.minter.metadata.image_data}`;
        } catch (e) {
          console.error("Error parsing img metadata");
        }
      }

      if (myIndex !== i) {
        return;
      }

      setState((prevState) => {
        return {
          ...prevState,
          isJettonDeployerFaultyOnChainData: result?.minter.isJettonDeployerFaultyOnChainData,
          persistenceType: result?.minter.persistenceType,
          description: result?.minter.metadata.description,
          jettonImage: image ?? QuestiomMarkImg,
          totalSupply: result?.minter.totalSupply,
          name: result?.minter.metadata.name,
          symbol: result?.minter.metadata.symbol,
          adminRevokedOwnership: _adminAddress === zeroAddress().toFriendly(),
          isAdmin: admin,
          decimals: result?.minter.metadata.decimals || "9",
          adminAddress: _adminAddress,
          balance: result?.jettonWallet ? result?.jettonWallet.balance : undefined,
          jettonWalletAddress: result?.jettonWallet?.jWalletAddress?.toFriendly(),
          jettonMaster: jettonAddress,
          isMyWallet,
          selectedWalletAddress: address,
          jettonPrice,
          tonPrice,
        };
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        showNotification(
          !!error.message.match(/exit_code: (11|32)/g)
            ? `Unable to query. This is probably not a Jetton Contract (${error.message})`
            : error.message,
          "error",
        );
      }
    } finally {
      setState((prevState) => ({
        ...prevState,
        jettonLoading: false,
      }));
    }
  }, [
    connectedWalletAddress,
    reset,
    jettonAddress,
    jettonFriendlyAddress,
    showNotification,
    setState,
    walletAddress,
  ]);

  const getJettonPrice = useCallback(
    async (limit: number) => {
      try {
        if (jettonAddress) {
          const { res } = await axiosService.getJettonPrice(jettonAddress, limit);
          setState((prevState) => {
            return {
              ...prevState,
              jettonPriceList: res.results,
            };
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
          showNotification(
            !!error.message.match(/exit_code: (11|32)/g)
              ? `Unable to query. This is probably not a Jetton Contract (${error.message})`
              : error.message,
            "error",
          );
        }
      }
    },
    [setState, showNotification, jettonAddress],
  );

  const getJettonStaking = useCallback(
    async (address: string) => {
      try {
        if (address) {
          const stakingAddress = Address.parse(address);
          const result = await jettonDeployController.getStakingDetails(
            stakingAddress,
            connectedWalletAddress,
          );

          setState((prevState: any) => {
            return {
              ...prevState,
              selectedJetton: {
                ...prevState.selectedJetton,
                totalDepositAmt: result.stakingData.totalDepositAmt,
                totalRewardBalance: result.stakingData.totalRewardBalance,
                lockedDepositAmt: result.userDeposit?.userDeposit,
                unclaimedReward: result.userDeposit?.unclaimedReward,
              },
            };
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
        }
      }
    },
    [connectedWalletAddress, setState],
  );

  const getUserReward = useCallback(
    async (address: string) => {
      try {
        if (jettonAddress) {
          const stakingAddress = Address.parse(address);
          const userAddress = Address.parse(connectedWalletAddress);
          const userReward = await jettonDeployController.getUserReward(
            stakingAddress,
            userAddress,
          );

          setState((prevState) => {
            return {
              ...prevState,
              userReward,
            };
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
        }
      }
    },
    [jettonAddress, connectedWalletAddress, setState],
  );

  const getUserProfileList = useCallback(async () => {
    if (rawAddress) {
      const { res: userProfileList } = await axiosService.getJettonsByOwner(rawAddress, network);

      setState((prevState) => {
        return {
          ...prevState,
          userProfileList,
        };
      });
    }
  }, [network, rawAddress, setState]);

  return {
    ...state,
    getJettonDetails,
    getUserReward,
    getJettonPrice,
    getUserProfileList,
    getJettonFromDb,
    reset,
    getJettonHoldersTxns,
    getJettonStaking,
    getJettonWallet,
    updateState,
    updateJettonPurge,
  };
}

export default useJettonStore;
