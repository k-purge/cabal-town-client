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
  creatorAddress: string;
  masterAddress: string;
  ownerAddress?: string;
  lastSurvivors?: number;
  chain: string;
  tgUserId?: number;
  walletAddress?: string;
  tgUserName?: string;
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
  stakingAddress?: string;
  totalDepositAmt?: number;
  totalRewardBalance?: number;
  lockedDepositAmt?: number;
  unclaimedReward?: number;
  percent?: number;
  price?: number;
  trending48Hour?: {
    numOfPlayers?: number;
    percent?: number;
    timestamp?: number;
  };
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
