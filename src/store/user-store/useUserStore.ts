import { Address } from "ton";
import { useCallback } from "react";
import { useTonAddress } from "@tonconnect/ui-react";
import { useRecoilState } from "recoil";
import { userStateAtom } from ".";
import { jettonDeployController } from "lib/jetton-controller";
import axiosService from "services/axios";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "consts";

function useUserStore() {
  const [state, setState] = useRecoilState(userStateAtom);
  const walletAddress = useTonAddress();
  const navigate = useNavigate();

  const createUser = useCallback(
    async (tgUserId: number, jettonWalletAddress: string) => {
      if (walletAddress) {
        const body = {
          tgUserId,
          walletAddress,
          jettonWalletAddress,
        };
        const {
          res: { user, tokens },
        } = await axiosService.createUser(body);

        if (user && tokens) {
          setState((prevState) => {
            return {
              ...prevState,
              ...user,
              tokens,
            };
          });
        }
      }
    },
    [setState, walletAddress],
  );

  const getUser = useCallback(
    async (tgUserId: number, walletAddress: string, jettonWalletAddress: string) => {
      let tokens: string;
      console.log("tgUserId", tgUserId);

      try {
        const { res } = await axiosService.loginUser({ tgUserId });
        tokens = res.tokens;
      } catch (error) {
        console.log("error", error);
        const { res } = await axiosService.createUser({
          tgUserId,
          walletAddress,
          jettonWalletAddress,
        });
        tokens = res.tokens;
        navigate(ROUTES.onboarding);
      }
      if (tokens) {
        setState((prevState) => {
          return {
            ...prevState,
            tokens,
          };
        });
      }
    },
    [navigate, setState],
  );

  const getTgUserId = useCallback(async () => {
    if (window.Telegram.WebApp) {
      // Initialize the Web App
      window.Telegram.WebApp.ready();
      // console.debug(
      //   "window.Telegram.WebApp.initDataUnsafe: ",
      //   window.Telegram.WebApp.initDataUnsafe,
      // );

      // Get user information
      const user = window.Telegram.WebApp.initDataUnsafe.user;
      const tgUserId = user?.id;
      const tgUserName = user?.username;
      // Use the tgUserId in your app

      if (tgUserId) {
        setState((prevState) => {
          return {
            ...prevState,
            tgUserId,
            tgUserName,
          };
        });
      }
    }
  }, [setState]);

  const getUserBalance = useCallback(async () => {
    if (walletAddress) {
      const address = Address.parse(walletAddress);
      const balance = await jettonDeployController.getAccBalance(address);
      const tonBalance = balance.toNumber();

      if (tonBalance) {
        setState((prevState) => {
          return {
            ...prevState,
            tonBalance,
          };
        });
      }
    }
  }, [setState, walletAddress]);

  return {
    ...state,
    createUser,
    getTgUserId,
    getUser,
    getUserBalance,
  };
}

export default useUserStore;
