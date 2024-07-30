import BN from "bn.js";
import { Address, beginCell, Cell, toNano } from "ton";
import { ContractDeployer } from "./contract-deployer";

import { createDeployParams, waitForContractDeploy, waitForSeqno } from "./utils";
import { zeroAddress } from "./utils";
import {
  buildJettonOnchainMetadata,
  burn,
  buyJetton,
  mintBody,
  sellJetton,
  transfer,
  updateMetadataBody,
} from "./jetton-minter";
import { readJettonMetadata, changeAdminBody, JettonMetaDataKeys } from "./jetton-minter";
import { getClient } from "./get-ton-client";
import { cellToAddress, makeGetCall } from "./make-get-call";
import { SendTransactionRequest, TonConnectUI } from "@tonconnect/ui-react";
import { DECIMAL_SCALER } from "consts";

export const JETTON_DEPLOY_GAS = toNano(0.01);

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

    const ownerJWalletAddr = await makeGetCall(
      contractAddr,
      "get_wallet_address",
      [beginCell().storeAddress(params.owner).endCell()],
      ([addr]) => (addr as Cell).beginParse().readAddress()!,
      tc,
    );
    console.log("ownerJWalletAddr", ownerJWalletAddr.toFriendly());

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
          amount: toNano(0.04).toString(),
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
          amount: toNano(0.05).toString(),
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
    amount: BN,
    fromAddress: string,
    jettonMaster: string,
    jettonPrice: number,
  ) {
    const tc = await getClient();

    const waiter = await waitForSeqno(
      tc.openWalletFromAddress({
        source: Address.parse(fromAddress),
      }),
    );

    const fee = (jettonPrice * 5) / 100;
    const msgValue = toNano(0.02).toNumber() + jettonPrice + fee;

    const tx: SendTransactionRequest = {
      validUntil: Date.now() + 5 * 60 * 1000,
      messages: [
        {
          address: jettonMaster,
          amount: msgValue.toFixed(0),
          stateInit: undefined,
          payload: buyJetton(amount).toBoc().toString("base64"),
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

  async getJettonDetails(contractAddr: Address, walletAddress: Address) {
    const tc = await getClient();
    const minter = await makeGetCall(
      contractAddr,
      "get_jetton_data",
      [],
      async ([totalSupply, _, adminCell, contentCell]) => ({
        ...(await readJettonMetadata(contentCell as unknown as Cell)),
        admin: cellToAddress(adminCell),
        totalSupply: totalSupply as BN,
      }),
      tc,
    );

    const jWalletAddress = await makeGetCall(
      contractAddr,
      "get_wallet_address",
      [beginCell().storeAddress(walletAddress).endCell()],
      ([addressCell]) => cellToAddress(addressCell),
      tc,
    );

    const isDeployed = await tc.isContractDeployed(jWalletAddress);

    let jettonWallet;
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
        tc,
      );
    } else {
      jettonWallet = null;
    }

    return {
      minter,
      jettonWallet,
    };
  }

  async getJettonPrice(contractAddr: Address, amt: number) {
    const tc = await getClient();
    const jettonPrice = await makeGetCall(
      contractAddr,
      "get_token_price",
      [new BN(amt * DECIMAL_SCALER)],
      async ([price]) => price,
      tc,
    );
    return jettonPrice?.toString();
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
