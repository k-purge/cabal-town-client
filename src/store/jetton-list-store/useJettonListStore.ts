import axiosService from "services/axios";
import useNotification from "hooks/useNotification";
import { useCallback } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { IJetton, jettonListStateAtom } from "./index";

function useJettonListStore() {
  const [state, setState] = useRecoilState(jettonListStateAtom);
  const reset = useResetRecoilState(jettonListStateAtom);
  const { showNotification } = useNotification();

  const getJettonList = useCallback(async () => {
    try {
      setState((prevState) => ({
        ...prevState,
        jettonLoading: true,
      }));

      const { res } = await axiosService.getJettonList();
      console.log("res: ", res);

      if (!res?.results) {
        console.log("empty");

        return;
      }

      setState((prevState) => {
        return {
          ...prevState,
          jettonList: res.results,
        };
      });
    } catch (error) {
      if (error instanceof Error) {
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
  }, [setState, showNotification]);

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
