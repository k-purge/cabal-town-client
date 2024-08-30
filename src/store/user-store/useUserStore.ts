import { useTonAddress } from "@tonconnect/ui-react";
import axiosService from "services/axios";
import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { userStateAtom } from ".";

function useUserStore() {
  const [state, setState] = useRecoilState(userStateAtom);
  const walletAddress = useTonAddress();

  const createUser = useCallback(
    async (tgUserId: number) => {
      if (walletAddress) {
        const body = {
          tgUserId,
          walletAddress,
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
    async (tgUserId: number, walletAddress: string) => {
      let tokens: string;

      try {
        const { res } = await axiosService.loginUser({ tgUserId });
        tokens = res.tokens;
      } catch (error) {
        console.log("error", error);
        const { res } = await axiosService.createUser({ tgUserId, walletAddress });
        tokens = res.tokens;
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
    [setState],
  );

  const getTgUserId = useCallback(async () => {
    if (window.Telegram.WebApp) {
      // Initialize the Web App
      window.Telegram.WebApp.ready();
      console.log("window.Telegram.WebApp.initDataUnsafe: ", window.Telegram.WebApp.initDataUnsafe);

      // Get user information
      const user = window.Telegram.WebApp.initDataUnsafe.user;
      console.log("user: ", user);
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

  return {
    ...state,
    createUser,
    getTgUserId,
    getUser,
  };
}

export default useUserStore;
