import { TonClient } from "ton";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { getNetwork } from "./hooks/useNetwork";

// TODO
const endpoint = await getHttpEndpoint({
  // network: getNetwork(new URLSearchParams(window.location.search)),
  network: "testnet",
});

const client = new TonClient({ endpoint });

export async function getClient() {
  return client;
}

export async function getEndpoint() {
  return endpoint;
}
