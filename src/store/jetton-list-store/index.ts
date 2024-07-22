import { atom } from "recoil";

export interface IJetton {
  masterAddress: string;
  ownerAddress: string;
  imageUri: string;
  name: string;
  holders: any[];
  players: any[];
  txns: any[];
  minStartedAmt: number;
  lastSurvivors: number;
  numOfRounds?: number;
  nextPurgeAt?: Date;
}

export interface JettonListStoreState {
  jettonList: IJetton[];
  selectedJetton?: IJetton;
  jettonLoading: boolean;
}

const jettonListStateAtom = atom<JettonListStoreState>({
  key: "jettonListStateAtom",
  default: {
    jettonList: [],
    jettonLoading: false,
    selectedJetton: undefined,
  },
});

export { jettonListStateAtom };
