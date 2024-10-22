import { atom } from "recoil";

export interface AlphaCardProps {
  token: string;
  token_image: string;
  count: number;
  h24: number;
}

export interface TgStoreState {
  chatsCount?: number;
  tokenList?: AlphaCardProps[];
}

const tgStateAtom = atom<TgStoreState>({
  key: "tg",
  default: {
    chatsCount: undefined,
    tokenList: undefined,
  },
});

export { tgStateAtom };
