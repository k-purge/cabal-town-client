import { getNetwork } from "./lib/hooks/useNetwork";
const ROUTES = {
  gated: "/",
  explorer: "/explorer",
  deployer: "/deployer",
  jetton: "/jetton",
  jettonId: "/jetton/:id",
  profile: "/profile",
  faq: "/faq",
  onboarding: "/onboarding",
  quest: "/quest",
};

const APP_GRID = 1156;

const LOCAL_STORAGE_PROVIDER = "wallet_provider";

const APP_DISPLAY_NAME = "Cabal.town";

const JETTON_DEPLOYER_CONTRACTS_GITHUB = "https://github.com/";

const EXAMPLE_ADDRESS =
  getNetwork(new URLSearchParams(window.location.search)) === "testnet"
    ? "EQBP4L9h4272Z0j_w9PE2tjHhi8OwkrRbTmatKszMyseis05"
    : "EQD-LkpmPTHhPW68cNfc7B83NcfE9JyGegXzAT8LetpQSRSm";

const SEARCH_HISTORY = "searchHistory";

const DECIMAL_SCALER = 1000000000;

const SCALING_FACTOR = 100000;

export {
  ROUTES,
  LOCAL_STORAGE_PROVIDER,
  APP_GRID,
  JETTON_DEPLOYER_CONTRACTS_GITHUB,
  APP_DISPLAY_NAME,
  EXAMPLE_ADDRESS,
  SEARCH_HISTORY,
  DECIMAL_SCALER,
  SCALING_FACTOR,
};
