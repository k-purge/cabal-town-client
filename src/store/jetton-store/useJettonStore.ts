import { useTonAddress } from "@tonconnect/ui-react";
import QuestiomMarkImg from "assets/icons/question.png";
import { useJettonAddress } from "hooks/useJettonAddress";
import useNotification from "hooks/useNotification";
import axiosService from "services/axios";
import { jettonDeployController } from "lib/deploy-controller";
import { zeroAddress } from "lib/utils";
import { useCallback } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { Address } from "ton";
import { getUrlParam, isValidAddress } from "utils";
import { jettonStateAtom } from ".";
import { IHolder } from "../jetton-list-store";

let i = 0;

function useJettonStore() {
  const [state, setState] = useRecoilState(jettonStateAtom);
  const reset = useResetRecoilState(jettonStateAtom);
  const connectedWalletAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  const { showNotification } = useNotification();
  const { jettonAddress, jettonFriendlyAddress } = useJettonAddress();

  const getJettonDetails = useCallback(async () => {
    i++;
    const myIndex = i;

    let queryAddress = getUrlParam("address");

    if (queryAddress && !isValidAddress(queryAddress)) {
      window.history.replaceState(null, "", window.location.pathname);
      queryAddress = null;
      showNotification("Invalid jetton address in query param", "error", undefined, 5000);
    }

    const address = queryAddress || connectedWalletAddress;
    console.log("address", address);

    const isMyWallet = address ? address === connectedWalletAddress : false;
    console.log("isMyWallet", isMyWallet);

    reset();

    if (!jettonAddress || !isValidAddress(jettonAddress)) {
      showNotification("Invalid jetton address", "error");
      return;
    }

    const jettonMaster = Address.parse(jettonAddress);
    const parsedJettonMaster = Address.parse(jettonFriendlyAddress!);

    try {
      setState((prevState) => ({
        ...prevState,
        jettonLoading: true,
      }));

      const result = await jettonDeployController.getJettonDetails(parsedJettonMaster);

      // get jetton detail from db
      const { res: selectedJetton } = await axiosService.getJetton(jettonAddress);

      console.log("rawAddress", rawAddress);
      let userBalance: number;
      if (selectedJetton.holders) {
        const balance = selectedJetton.holders
          .filter((holder: IHolder) => holder.owner.address === rawAddress)
          .map((holding: IHolder) => parseInt(holding.balance));
        userBalance = balance[0];
      }

      // get jetton price
      const price = await jettonDeployController.getJettonPrice(jettonMaster, 1);
      const jettonPrice = parseInt(price ?? "0");

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
          isJettonDeployerFaultyOnChainData: result.minter.isJettonDeployerFaultyOnChainData,
          persistenceType: result.minter.persistenceType,
          description: result.minter.metadata.description,
          jettonImage: image ?? QuestiomMarkImg,
          totalSupply: result.minter.totalSupply,
          name: result.minter.metadata.name,
          symbol: result.minter.metadata.symbol,
          adminRevokedOwnership: _adminAddress === zeroAddress().toFriendly(),
          isAdmin: admin,
          decimals: result.minter.metadata.decimals || "9",
          adminAddress: _adminAddress,
          balance: result.jettonWallet ? result.jettonWallet.balance : undefined,
          jettonWalletAddress: result.jettonWallet?.jWalletAddress?.toFriendly(),
          jettonMaster: jettonAddress,
          isMyWallet,
          selectedWalletAddress: address,
          jettonPrice,
          tonPrice,
          selectedJetton,
          userBalance,
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
    rawAddress,
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

  return {
    ...state,
    getJettonDetails,
    getJettonPrice,
    reset,
  };
}

export default useJettonStore;
