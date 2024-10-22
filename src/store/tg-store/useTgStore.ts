import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { tgStateAtom } from ".";
import axiosService from "services/axios";

function useTgStore() {
  const [state, setState] = useRecoilState(tgStateAtom);

  const getGroupMsgs = useCallback(
    async (tgGroupId: string) => {
      // console.debug("tgGroupId", tgGroupId);

      try {
        const data = await axiosService.getGroupChatMsgs(tgGroupId);
        // console.debug("data: ", data);
        setState((prevState) => {
          return {
            ...prevState,
            chatsCount: data.chats,
            tokenList: data.token_list,
          };
        });
      } catch (error) {
        console.log("error", error);
      }
    },
    [setState],
  );

  return {
    ...state,
    getGroupMsgs,
  };
}

export default useTgStore;
