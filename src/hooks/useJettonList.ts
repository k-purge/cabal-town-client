import { useState, useEffect } from "react";
import axiosService from "services/axios";

export interface IJetton {
  masterAddress: string;
  ownerAddress: string;
  imageUri: string;
  name: string;
  holders: number;
  players: number;
}

export const useJettonList = () => {
  const [list, setList] = useState<(IJetton | undefined)[]>([]);

  async function getJettonList() {
    const { res } = await axiosService.getJettonList();
    console.log("res: ", res);
    if (res?.results) {
      setList(res.results);
    }
  }

  useEffect(() => {
    if (!list.length) {
      console.log("useEffect", list);
      getJettonList();
    }
  }, [list]);

  return {
    list,
  };
};
