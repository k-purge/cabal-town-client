import { atom } from "recoil";

export interface ILoginUser {
  tgUserId: number;
}

export interface IInsertUser {
  walletAddress: string;
  tgUserId: number;
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
}

const userStateAtom = atom<UserStoreState>({
  key: "userStateAtom",
  default: {
    userId: undefined,
    walletAddress: undefined,
    tgUserId: 981419972,
    tokens: undefined,
  },
});

export { userStateAtom };
