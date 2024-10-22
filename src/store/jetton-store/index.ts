import BN from "bn.js";
import { PersistenceType } from "lib/jetton-minter";
import { atom } from "recoil";
import { IHolder, IJetton } from "../jetton-list-store";

export interface IJettonPrice {
  timestamp: number;
  circulatingSupply: number;
  price: number;
}

export interface IJettonProfile {
  masterAddress: string;
  imageUri: string;
  name: string;
  balance?: string;
  players?: any[];
  ownerAddress: string;
  id: string;
}

export interface IJettonStoreUpdateState {
  symbol?: string;
  decimals?: string;
  name?: string;
  jettonImage?: string;
  isImageBroken?: boolean;
  description?: string;
  adminAddress?: string;
  balance?: BN;
  jettonMaster?: string;
  persistenceType?: PersistenceType;
  totalSupply?: BN;
  jettonWalletAddress?: string;
  selectedJetton?: IJetton;
  jettonPriceList?: IJettonPrice[];
  userProfileList?: IJettonProfile[];
  holders?: IHolder[];
  txns?: any[];
  isUpdated: boolean;
}
export interface JettonStoreState {
  isAdmin: boolean;
  adminRevokedOwnership: boolean;
  symbol?: string;
  decimals?: string;
  name?: string;
  jettonImage?: string;
  isImageBroken?: boolean;
  description?: string;
  adminAddress?: string;
  balance?: BN;
  jettonMaster?: string;
  persistenceType?: PersistenceType;
  totalSupply?: BN;
  jettonWalletAddress?: string;
  isJettonDeployerFaultyOnChainData?: boolean;
  jettonLoading: boolean;
  isMyWallet: boolean;
  selectedWalletAddress?: string | null;
  jettonPrice: number;
  tonPrice: number;
  selectedJetton?: IJetton;
  jettonPriceList?: IJettonPrice[];
  userBalance: number;
  userProfileList?: IJettonProfile[];
  holders?: IHolder[];
  txns?: any[];
  fetch: number;
  userReward?: number;
}

const jettonStateAtom = atom<JettonStoreState>({
  key: "jettonStateAtom",
  default: {
    jettonLoading: false,
    persistenceType: undefined,
    isAdmin: false,
    adminRevokedOwnership: true,
    symbol: undefined,
    decimals: "9",
    name: undefined,
    jettonImage: undefined,
    isImageBroken: false,
    description: undefined,
    adminAddress: undefined,
    balance: undefined,
    jettonMaster: undefined,
    totalSupply: undefined,
    jettonWalletAddress: undefined,
    isJettonDeployerFaultyOnChainData: false,
    isMyWallet: false,
    selectedWalletAddress: undefined,
    jettonPrice: 0,
    tonPrice: 0,
    selectedJetton: undefined,
    jettonPriceList: undefined,
    userBalance: 0,
    userProfileList: undefined,
    holders: undefined,
    txns: undefined,
    fetch: 0,
    userReward: undefined,
  },
});

export { jettonStateAtom };
