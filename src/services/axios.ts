import axios from "axios";

async function getJettonList() {
  const endpoint = "https://purge-fun-sever.onrender.com/v1/jettons?sortBy=lastUpdatedAt:desc";

  return {
    res: (await axios.get(endpoint)).data,
  };
}

async function getJetton(masterAddress: string) {
  const endpoint = "https://purge-fun-sever.onrender.com/v1/jettons/" + masterAddress;

  return {
    res: (await axios.get(endpoint)).data,
  };
}

async function getJettonPrice(masterAddress: string, limit: number) {
  const endpoint = `https://purge-fun-sever.onrender.com/v1/jettons/${masterAddress}/price?limit=${limit}`;

  return {
    res: (await axios.get(endpoint)).data,
  };
}

async function getTonPrice() {
  const endpoint = "https://tonapi.io/v2/rates?tokens=ton&currencies=usd";

  return (await axios.get(endpoint)).data;
}

const axiosService = {
  getJettonPrice,
  getJettonList,
  getTonPrice,
  getJetton,
};

export default axiosService;
