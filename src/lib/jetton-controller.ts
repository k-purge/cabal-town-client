import BN from "bn.js";
import { Address, beginCell, Cell, toNano, TonClient } from "ton";
import { ContractDeployer } from "./contract-deployer";

import { createDeployParams, waitForContractDeploy, waitForSeqno } from "./utils";
import { zeroAddress } from "./utils";
import { toDecimalsBN } from "utils";
import {
  buildJettonOnchainMetadata,
  burn,
  buyJetton,
  mintBody,
  sellJetton,
  transfer,
  updateMetadataBody,
} from "./jetton-minter";
import { claimReward, lockJetton, unlockJetton } from "./jetton-pool";
import { readJettonMetadata, changeAdminBody, JettonMetaDataKeys } from "./jetton-minter";
import { getClient } from "./get-ton-client";
import { cellToAddress, makeGetCall } from "./make-get-call";
import { SendTransactionRequest, TonConnectUI } from "@tonconnect/ui-react";
import { DECIMAL_SCALER } from "consts";
import { readStakingDetail } from "./jetton-pool";

export const JETTON_DEPLOY_GAS = toNano(0.01);
export const JETTON_TXN_GAS = toNano(0.1);

export enum JettonDeployState {
  NOT_STARTED,
  BALANCE_CHECK,
  UPLOAD_IMAGE,
  UPLOAD_METADATA,
  AWAITING_MINTER_DEPLOY,
  AWAITING_JWALLET_DEPLOY,
  VERIFY_MINT,
  ALREADY_DEPLOYED,
  DONE,
}

export interface JettonDeployParams {
  onchainMetaData?: {
    name: string;
    symbol: string;
    description?: string;
    image?: string;
    decimals?: string;
  };
  offchainUri?: string;
  owner: Address;
  deployer: Address;
}

class JettonDeployController {
  async createJetton(
    params: JettonDeployParams,
    tonConnection: TonConnectUI,
    walletAddress: string,
  ): Promise<Address> {
    const contractDeployer = new ContractDeployer();
    const tc = await getClient();

    // params.onProgress?.(JettonDeployState.BALANCE_CHECK);
    const balance = await tc.getBalance(params.deployer);
    if (balance.lt(JETTON_DEPLOY_GAS)) throw new Error("Not enough balance in deployer wallet");

    const deployParams = createDeployParams(params, params.offchainUri);
    const contractAddr = contractDeployer.addressForContract(deployParams);

    if (await tc.isContractDeployed(contractAddr)) {
      // params.onProgress?.(JettonDeployState.ALREADY_DEPLOYED);
    } else {
      await contractDeployer.deployContract(deployParams, tonConnection);
      // params.onProgress?.(JettonDeployState.AWAITING_MINTER_DEPLOY);
      await waitForContractDeploy(contractAddr, tc);
    }

    // const ownerJWalletAddr = await makeGetCall(
    //   contractAddr,
    //   "get_wallet_address",
    //   [beginCell().storeAddress(params.owner).endCell()],
    //   ([addr]) => (addr as Cell).beginParse().readAddress()!,
    //   tc,
    // );
    // console.log("ownerJWalletAddr", ownerJWalletAddr.toFriendly());

    // params.onProgress?.(JettonDeployState.AWAITING_JWALLET_DEPLOY);
    // await waitForContractDeploy(ownerJWalletAddr, tc);

    // params.onProgress?.(
    //   JettonDeployState.VERIFY_MINT,
    //   undefined,
    //   contractAddr.toFriendly()
    // ); // TODO better way of emitting the contract?

    // params.onProgress?.(JettonDeployState.DONE);
    return contractAddr;
  }

  async burnAdmin(contractAddress: Address, tonConnection: TonConnectUI, walletAddress: string) {
    // @ts-ignore
    const tc = await getClient();
    const waiter = await waitForSeqno(
      tc.openWalletFromAddress({
        source: Address.parse(walletAddress),
      }),
    );

    const tx: SendTransactionRequest = {
      validUntil: Date.now() + 5 * 60 * 1000,
      messages: [
        {
          address: contractAddress.toString(),
          amount: toNano(0.01).toString(),
          stateInit: undefined,
          payload: changeAdminBody(zeroAddress()).toBoc().toString("base64"),
        },
      ],
    };

    await tonConnection.sendTransaction(tx);

    await waiter();
  }

  async mint(
    tonConnection: TonConnectUI,
    jettonMaster: Address,
    amount: BN,
    walletAddress: string,
  ) {
    const tc = await getClient();
    const waiter = await waitForSeqno(
      tc.openWalletFromAddress({
        source: Address.parse(walletAddress),
      }),
    );

    const tx: SendTransactionRequest = {
      validUntil: Date.now() + 5 * 60 * 1000,
      messages: [
        {
          address: jettonMaster.toString(),
          amount: JETTON_TXN_GAS.toString(),
          stateInit: undefined,
          payload: mintBody(Address.parse(walletAddress), amount, toNano(0.02), 0)
            .toBoc()
            .toString("base64"),
        },
      ],
    };

    await tonConnection.sendTransaction(tx);
    await waiter();
  }

  async transfer(
    tonConnection: TonConnectUI,
    amount: BN,
    toAddress: string,
    fromAddress: string,
    ownerJettonWallet: string,
  ) {
    const tc = await getClient();

    const waiter = await waitForSeqno(
      tc.openWalletFromAddress({
        source: Address.parse(fromAddress),
      }),
    );

    // TODO
    // TODO
    // TODO
    const tx: SendTransactionRequest = {
      validUntil: Date.now() + 5 * 60 * 1000,
      messages: [
        {
          address: ownerJettonWallet,
          amount: JETTON_TXN_GAS.toString(),
          stateInit: undefined,
          payload: transfer(Address.parse(toAddress), Address.parse(fromAddress), amount)
            .toBoc()
            .toString("base64"),
        },
      ],
    };

    await tonConnection.sendTransaction(tx);

    await waiter();
  }

  async buyJettons(
    tonConnection: TonConnectUI,
    amount: number,
    fromAddress: string,
    jettonMaster: string,
    decimals: string,
  ) {
    const tc = await getClient();

    const waiter = await waitForSeqno(
      tc.openWalletFromAddress({
        source: Address.parse(fromAddress),
      }),
    );
    const valueDecimals = toDecimalsBN(amount, decimals!);

    const fee = (valueDecimals.toNumber() * 5) / 100;
    const msgValue = JETTON_TXN_GAS.toNumber() + valueDecimals.toNumber() + fee;

    const tx: SendTransactionRequest = {
      validUntil: Date.now() + 5 * 60 * 1000,
      messages: [
        {
          address: jettonMaster,
          amount: msgValue.toFixed(0),
          stateInit: undefined,
          payload: buyJetton(valueDecimals).toBoc().toString("base64"),
        },
      ],
    };

    await tonConnection.sendTransaction(tx);

    await waiter();
  }

  async sellJettons(
    tonConnection: TonConnectUI,
    amount: number,
    fromAddress: string,
    jettonMaster: string,
    msgValue: number,
  ) {
    const tc = await getClient();

    const waiter = await waitForSeqno(
      tc.openWalletFromAddress({
        source: Address.parse(fromAddress),
      }),
    );

    const tx: SendTransactionRequest = {
      validUntil: Date.now() + 5 * 60 * 1000,
      messages: [
        {
          address: jettonMaster,
          amount: msgValue.toFixed(0),
          stateInit: undefined,
          payload: sellJetton(amount).toBoc().toString("base64"),
        },
      ],
    };

    await tonConnection.sendTransaction(tx);

    await waiter();
  }

  async burnJettons(
    tonConnection: TonConnectUI,
    amount: BN,
    jettonAddress: string,
    walletAddress: string,
  ) {
    const tc = await getClient();

    const waiter = await waitForSeqno(
      tc.openWalletFromAddress({
        source: Address.parse(walletAddress),
      }),
    );

    const tx: SendTransactionRequest = {
      validUntil: Date.now() + 5 * 60 * 1000,
      messages: [
        {
          address: jettonAddress,
          amount: toNano(0.031).toString(),
          stateInit: undefined,
          payload: burn(amount, Address.parse(walletAddress)).toBoc().toString("base64"),
        },
      ],
    };

    await tonConnection.sendTransaction(tx);

    await waiter();
  }

  async lockJettons(
    tonConnection: TonConnectUI,
    amount: BN,
    fromAddress: string,
    jettonWalletAddress: string,
    stakingAddress: string,
  ) {
    const tc = await getClient();

    const waiter = await waitForSeqno(
      tc.openWalletFromAddress({
        source: Address.parse(fromAddress),
      }),
    );

    const tx: SendTransactionRequest = {
      validUntil: Date.now() + 5 * 60 * 1000,
      messages: [
        {
          address: jettonWalletAddress,
          amount: toNano(0.1).toString(),
          stateInit: undefined,
          payload: lockJetton(amount, Address.parse(stakingAddress), Address.parse(fromAddress))
            .toBoc()
            .toString("base64"),
        },
      ],
    };

    await tonConnection.sendTransaction(tx);

    await waiter();
  }

  async unlockJettons(
    tonConnection: TonConnectUI,
    amount: BN,
    fromAddress: string,
    stakingAddress: string,
  ) {
    const tc = await getClient();

    const waiter = await waitForSeqno(
      tc.openWalletFromAddress({
        source: Address.parse(fromAddress),
      }),
    );

    const tx: SendTransactionRequest = {
      validUntil: Date.now() + 5 * 60 * 1000,
      messages: [
        {
          address: stakingAddress,
          amount: toNano(0.1).toString(),
          stateInit: undefined,
          payload: unlockJetton(amount).toBoc().toString("base64"),
        },
      ],
    };

    await tonConnection.sendTransaction(tx);

    await waiter();
  }

  async claimRewards(tonConnection: TonConnectUI, fromAddress: string, stakingAddress: string) {
    const tc = await getClient();

    const waiter = await waitForSeqno(
      tc.openWalletFromAddress({
        source: Address.parse(fromAddress),
      }),
    );

    const tx: SendTransactionRequest = {
      validUntil: Date.now() + 5 * 60 * 1000,
      messages: [
        {
          address: stakingAddress,
          amount: toNano(0.01).toString(),
          stateInit: undefined,
          payload: claimReward().toBoc().toString("base64"),
        },
      ],
    };

    await tonConnection.sendTransaction(tx);

    await waiter();
  }

  async getJettonWallet(contractAddr: Address, walletAddress: string, tc?: TonClient | undefined) {
    let jettonWallet = null;
    const tonClient = tc ?? (await getClient());

    if (walletAddress) {
      const jWalletAddress = await makeGetCall(
        contractAddr,
        "get_wallet_address",
        [beginCell().storeAddress(Address.parse(walletAddress)).endCell()],
        ([addressCell]) => cellToAddress(addressCell),
        tonClient,
      );

      const isDeployed = await tonClient.isContractDeployed(jWalletAddress);

      if (isDeployed) {
        jettonWallet = await makeGetCall(
          jWalletAddress,
          "get_wallet_data",
          [],
          ([amount, _, jettonMasterAddressCell]) => ({
            balance: amount as unknown as BN,
            jWalletAddress,
            jettonMasterAddress: cellToAddress(jettonMasterAddressCell),
          }),
          tonClient,
        );
      }
    }
    return jettonWallet;
  }

  async getJettonDetails(contractAddr: Address, walletAddress: string) {
    const tc = await getClient();
    const minter = await makeGetCall(
      contractAddr,
      "get_jetton_data",
      [],
      async ([
        totalSupply,
        circulatingSupply,
        reserveRate,
        reserveBalance,
        adminCell,
        contentCell,
      ]) => ({
        ...(await readJettonMetadata(contentCell as unknown as Cell)),
        admin: cellToAddress(adminCell),
        totalSupply: totalSupply as BN,
        circulatingSupply: circulatingSupply as BN,
        reserveRate: reserveRate as BN,
        reserveBalance: reserveBalance as BN,
      }),
      tc,
    );

    let jettonWallet = await this.getJettonWallet(contractAddr, walletAddress, tc);

    return {
      minter,
      jettonWallet,
    };
  }

  async getStakingDetails(contractAddr: Address, walletAddress: string) {
    const tc = await getClient();
    const stakingData = await makeGetCall(
      contractAddr,
      "get_staking_data",
      [],
      async ([
        addmin_addr,
        jetton_addr,
        jetton_wallet_code,
        epoch_started_at,
        total_deposited_amt,
        total_reward_balance,
        deposits,
      ]) => ({
        epochStartedAt: (epoch_started_at as BN).toNumber(),
        totalDepositAmt: (total_deposited_amt as BN).toNumber(),
        totalRewardBalance: (total_reward_balance as BN).toNumber(),
      }),
      tc,
    );

    let userDeposit = null;

    if (walletAddress) {
      try {
        userDeposit = await makeGetCall(
          contractAddr,
          "get_user_deposit",
          [beginCell().storeAddress(Address.parse(walletAddress)).endCell()], //"0QBI9aqdRQD1uvHCaYUygIls_uoTvbmla7E5b2nfdlLrs1k1"
          ([deposit_data]) => readStakingDetail(deposit_data as unknown as Cell),
          tc,
        );
      } catch (error) {
        console.error(error);
      }
    }

    return {
      stakingData,
      userDeposit,
    };
  }

  async getUserReward(contractAddr: Address, userAddress: Address): Promise<number> {
    const timestampNow = Math.floor(Date.now() / 1000);
    const tc = await getClient();
    return await makeGetCall(
      contractAddr,
      "get_user_reward",
      [beginCell().storeAddress(userAddress).endCell(), new BN(timestampNow)],
      async ([reward]) => (reward as BN).toNumber(),
      tc,
    );
  }

  async getPurchaseReturn(contractAddr: Address, tonAmt: number) {
    try {
      const tc = await getClient();
      const jettonPrice = await makeGetCall(
        contractAddr,
        "get_purchase_return",
        [new BN(tonAmt * DECIMAL_SCALER)],
        async ([price]) => price,
        tc,
      );
      if (jettonPrice) {
        return parseInt(jettonPrice?.toString()) / DECIMAL_SCALER;
      }
    } catch (error) {
      console.error(error);
    }

    return 0;
  }

  async getSaleReturn(contractAddr: Address, sellAmt: number) {
    try {
      const tc = await getClient();
      const jettonPrice = await makeGetCall(
        contractAddr,
        "get_sale_return",
        [new BN(sellAmt * DECIMAL_SCALER)],
        async ([price]) => price,
        tc,
      );
      if (jettonPrice) {
        return parseInt(jettonPrice?.toString()) / DECIMAL_SCALER;
      }
    } catch (error) {
      console.error(error);
    }

    return 0;
  }

  async fixFaultyJetton(
    contractAddress: Address,
    data: {
      [s in JettonMetaDataKeys]?: string | undefined;
    },
    connection: TonConnectUI,
    walletAddress: string,
  ) {
    const tc = await getClient();
    const waiter = await waitForSeqno(
      tc.openWalletFromAddress({
        source: Address.parse(walletAddress),
      }),
    );
    const body = updateMetadataBody(buildJettonOnchainMetadata(data));
    const tx: SendTransactionRequest = {
      validUntil: Date.now() + 5 * 60 * 1000,
      messages: [
        {
          address: contractAddress.toString(),
          amount: toNano(0.01).toString(),
          stateInit: undefined,
          payload: body.toBoc().toString("base64"),
        },
      ],
    };

    await connection.sendTransaction(tx);

    await waiter();
  }

  async updateMetadata(
    contractAddress: Address,
    data: {
      [s in JettonMetaDataKeys]?: string | undefined;
    },
    connection: TonConnectUI,
    walltAddress: string,
  ) {
    const tc = await getClient();
    const waiter = await waitForSeqno(
      tc.openWalletFromAddress({
        source: Address.parse(walltAddress),
      }),
    );

    const tx: SendTransactionRequest = {
      validUntil: Date.now() + 5 * 60 * 1000,
      messages: [
        {
          address: contractAddress.toString(),
          amount: toNano(0.01).toString(),
          stateInit: undefined,
          payload: updateMetadataBody(buildJettonOnchainMetadata(data)).toBoc().toString("base64"),
        },
      ],
    };

    await connection.sendTransaction(tx);

    await waiter();
  }
}

const jettonDeployController = new JettonDeployController();
export { jettonDeployController };
