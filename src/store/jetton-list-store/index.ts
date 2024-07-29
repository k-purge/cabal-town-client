import { atom } from "recoil";

export interface IHolder {
  address: string;
  balance: string;
  owner: {
    address: string;
  };
}

export interface IInsertJetton {
  name: string;
  imageUri: string;
  masterAddress: string;
  ownerAddress?: string;
  lastSurvivors?: number;
}

export interface IJetton {
  masterAddress: string;
  ownerAddress?: string;
  imageUri: string;
  name: string;
  numOfPlayers?: number;
  holders?: IHolder[];
  players?: any[];
  txns?: any[];
  minStartedAmt?: number;
  lastSurvivors?: number;
  numOfRounds?: number;
  nextPurgeAt?: Date;
  tgLink?: string;
  id: string;
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
