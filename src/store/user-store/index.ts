import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface ILoginUser {
  tgUserId: number;
}

export interface IInsertUser {
  jettonWalletAddress: string;
  walletAddress: string;
  tgUserId: number;
}

export interface IJoinGroup {
  masterAddress: string;
  walletAddress: string;
  tgUserName: string;
}

export interface IUpdatePurge {
  masterAddress: string;
}

export interface IUserStoreUpdateState {
  userId?: string;
  walletAddress?: string;
  tgUserId?: number;
}

export interface UserStoreState {
  userId?: string;
  walletAddress?: string;
  tgUserId?: number;
  tokens?: string;
  tgUserName?: string;
  tonBalance?: number;
}

const { persistAtom } = recoilPersist({
  key: "userStateAtom",
});

// TODO
const userStateAtom = atom<UserStoreState>({
  key: "userStateAtom",
  default: {
    userId: undefined,
    walletAddress: undefined,
    tgUserId: undefined,
    tokens: undefined,
    tgUserName: undefined,
    tonBalance: undefined,
  },
  effects_UNSTABLE: [persistAtom],
});

export { userStateAtom };
