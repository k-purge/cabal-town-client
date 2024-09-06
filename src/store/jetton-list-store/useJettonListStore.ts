import axiosService from "services/axios";
import useNotification from "hooks/useNotification";
import { useCallback } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { IJetton, jettonListStateAtom } from "./index";
import { useNetwork } from "lib/hooks/useNetwork";
import { useNavigate } from "react-router-dom";

function useJettonListStore() {
  const { network } = useNetwork();
  const [state, setState] = useRecoilState(jettonListStateAtom);
  const reset = useResetRecoilState(jettonListStateAtom);
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const getJettonList = useCallback(async () => {
    try {
      setState((prevState) => ({
        ...prevState,
        jettonLoading: true,
      }));

      const { res: jettonList } = await axiosService.getJettonList(network);

      if (!jettonList) {
        console.log("empty");

        return;
      }

      setState((prevState) => {
        return {
          ...prevState,
          jettonList,
        };
      });
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        console.log("error.response: ", error.response);
        navigate("/");
        showNotification("Please get a secret code first", "error");
      } else if (error instanceof Error) {
        console.error(error);
        showNotification(
          !!error.message.match(/exit_code: (11|32)/g)
            ? `Unable to query. This is probably server error`
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
  }, [navigate, network, setState, showNotification]);

  const setSelectedJetton = useCallback(
    (selectedJetton: IJetton) => {
      setState((prevState) => ({
        ...prevState,
        selectedJetton,
        jettonLoading: false,
      }));
    },
    [setState],
  );

  return {
    ...state,
    getJettonList,
    setSelectedJetton,
    reset,
  };
}

export default useJettonListStore;
