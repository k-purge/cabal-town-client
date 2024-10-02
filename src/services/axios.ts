import axios from "axios";
import { ILoginUser, IInsertUser, IJoinGroup, IUpdatePurge } from "store/user-store";
import { IInsertJetton } from "store/jetton-list-store";
import axiosInstance from "./axiosInstance";
const { REACT_APP_API_URL, REACT_APP_TON_CLIENT_API_URL } = process.env;

async function redeemCode(code: string) {
  return {
    res: (await axios.post(REACT_APP_API_URL + "/v1/utils/code_redeem", { code })).data,
  };
}

async function verifyToken(refreshToken: string) {
  return {
    res: (await axios.post(REACT_APP_API_URL + "/v1/auth/verify-tokens", { refreshToken })).data,
  };
}

async function insertJetton(data: IInsertJetton) {
  const endpoint = REACT_APP_API_URL + "/v1/jettons/insert";

  return {
    res: (await axios.post(endpoint, data)).data,
  };
}

async function getJettonList(chain: string, field?: string) {
  let endpoint = `${REACT_APP_API_URL}/v1/jettons?sortBy=createdAt:desc&chain=${chain}`;
  if (field) endpoint += `&field=${field}`;
  return {
    res: (await axiosInstance.get(endpoint)).data,
  };
}

async function getJetton(masterAddress: string) {
  const endpoint = REACT_APP_API_URL + "/v1/jettons/" + masterAddress;

  return {
    res: (await axios.get(endpoint)).data,
  };
}

async function getJettonPrice(masterAddress: string, limit: number) {
  const endpoint = REACT_APP_API_URL + `/v1/jettons/${masterAddress}/price?limit=${limit}`;

  return {
    res: (await axios.get(endpoint)).data,
  };
}

async function getJettonHolders(masterAddress: string, chain: string) {
  const endpoint = REACT_APP_API_URL + `/v1/jettons/${masterAddress}/holders?chain=${chain}`;

  return {
    res: (await axios.get(endpoint)).data,
  };
}

async function getJettonTxns(masterAddress: string, chain: string) {
  const endpoint = REACT_APP_API_URL + `/v1/jettons/${masterAddress}/txns?chain=${chain}`;

  return {
    res: (await axios.get(endpoint)).data,
  };
}

async function getJettonUpdates(
  masterAddress: string,
  jettonId: string,
  lt: number,
  chain: string,
) {
  const endpoint =
    REACT_APP_API_URL + `/v1/jettons/${masterAddress}/${jettonId}?lt=${lt}&chain=${chain}`;

  return {
    res: (await axios.get(endpoint)).data,
  };
}

async function getJettonsByOwner(ownerAddress: string, network: string) {
  const endpoint = REACT_APP_API_URL + `/v1/jettons/${ownerAddress}/profile/list?chain=${network}`;

  return {
    res: (await axios.get(endpoint)).data,
  };
}

async function getTonPrice() {
  const endpoint = REACT_APP_TON_CLIENT_API_URL + "/v2/rates?tokens=ton&currencies=usd";

  return (await axios.get(endpoint)).data;
}

async function loginUser(data: ILoginUser) {
  const endpoint = REACT_APP_API_URL + "/v1/auth/login";

  return {
    res: (await axios.post(endpoint, data)).data,
  };
}

async function createUser(data: IInsertUser) {
  const endpoint = REACT_APP_API_URL + "/v1/auth/register";

  return {
    res: (await axios.post(endpoint, data)).data,
  };
}

async function joinGroup(data: IJoinGroup) {
  const endpoint = REACT_APP_API_URL + "/v1/jettons/joinGroup";

  return {
    res: (await axios.post(endpoint, data)).data,
  };
}

async function updateJettonPurge(data: IUpdatePurge) {
  const endpoint = REACT_APP_API_URL + "/v1/jettons/updatePurge";

  return {
    res: (await axios.post(endpoint, data)).data,
  };
}

async function uploadFile(file: File): Promise<string | undefined> {
  const endpoint = REACT_APP_API_URL + "/v1/utils/upload";

  const formData = new FormData();
  formData.append("file", file);

  try {
    return (
      await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data.url;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}

const axiosService = {
  getJettonUpdates,
  getJettonPrice,
  getJettonList,
  getTonPrice,
  getJetton,
  insertJetton,
  getJettonsByOwner,
  getJettonHolders,
  getJettonTxns,
  loginUser,
  createUser,
  joinGroup,
  updateJettonPurge,
  redeemCode,
  verifyToken,
  uploadFile,
};

export default axiosService;
