import { Address, beginCell, TonClient, Wallet } from "ton";
import { JettonDeployParams, JETTON_DEPLOY_GAS } from "./jetton-controller";
import { initData, JETTON_MINTER_CODE } from "./jetton-minter";

export enum OPS {
  ChangeAdmin = 3,
  ReplaceMetadata = 4,
  Mint = 21,
  InternalTransfer = 0x178d4519,
  Transfer = 0xf8a7ea5,
  Burn = 0x595f07bc,
  BuyJetton = 31,
  SellJetton = 51,
  Bounced = 0xffffffff,
  LockJetton = 61,
  UnlockJetton = 71,
  ClaimTon = 103,
  PoolUnlockJetton = 102,
}

export async function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export function zeroAddress(): Address {
  return beginCell()
    .storeUint(2, 2)
    .storeUint(0, 1)
    .storeUint(0, 8)
    .storeUint(0, 256)
    .endCell()
    .beginParse()
    .readAddress() as Address;
}

export async function waitForSeqno(wallet: Wallet) {
  const seqnoBefore = await wallet.getSeqNo();

  return async () => {
    for (let attempt = 0; attempt < 25; attempt++) {
      await sleep(3000);
      const seqnoAfter = await wallet.getSeqNo();
      if (seqnoAfter > seqnoBefore) return;
    }
    throw new Error("Timeout");
  };
}

export async function waitForContractDeploy(address: Address, client: TonClient) {
  let isDeployed = false;
  let maxTries = 25;
  while (!isDeployed && maxTries > 0) {
    maxTries--;
    isDeployed = await client.isContractDeployed(address);
    if (isDeployed) return;
    await sleep(3000);
  }
  throw new Error("Timeout");
}

export const createDeployParams = (params: JettonDeployParams, offchainUri?: string) => {
  // const queryId = parseInt(process.env.REACT_APP_DEPLOY_QUERY_ID ?? "0");
  return {
    code: JETTON_MINTER_CODE,
    data: initData(params.owner, params.onchainMetaData, offchainUri),
    deployer: params.deployer,
    value: JETTON_DEPLOY_GAS,
  };
};
