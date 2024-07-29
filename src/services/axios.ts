import axios from "axios";
import { IInsertJetton } from "store/jetton-list-store";
const { REACT_APP_TON_API_URL, REACT_APP_TON_CLIENT_API_URL } = process.env;

async function insertJetton(data: IInsertJetton) {
  const endpoint = REACT_APP_TON_API_URL + "/v1/jettons/insert";

  return {
    res: (await axios.post(endpoint, data)).data,
  };
}

async function getJettonList() {
  const endpoint = REACT_APP_TON_API_URL + "/v1/jettons?sortBy=createdAt:desc";

  return {
    res: (await axios.get(endpoint)).data,
  };
}

async function getJetton(masterAddress: string) {
  const endpoint = REACT_APP_TON_API_URL + "/v1/jettons/" + masterAddress;

  return {
    res: (await axios.get(endpoint)).data,
  };
}

async function getJettonPrice(masterAddress: string, limit: number) {
  const endpoint = REACT_APP_TON_API_URL + `/v1/jettons/${masterAddress}/price?limit=${limit}`;

  return {
    res: (await axios.get(endpoint)).data,
  };
}

async function getJettonUpdates(masterAddress: string, jettonId: string, lt: number) {
  const endpoint = REACT_APP_TON_API_URL + `/v1/jettons/${masterAddress}/${jettonId}?lt=${lt}`;

  return {
    res: (await axios.get(endpoint)).data,
  };
}

async function getTonPrice() {
  const endpoint = REACT_APP_TON_CLIENT_API_URL + "/v2/rates?tokens=ton&currencies=usd";

  return (await axios.get(endpoint)).data;
}

const axiosService = {
  getJettonUpdates,
  getJettonPrice,
  getJettonList,
  getTonPrice,
  getJetton,
  insertJetton,
};

export default axiosService;
