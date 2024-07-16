import axios from "axios";

async function getJettonList() {
  const endpoint = "https://purge-fun-sever.onrender.com/v1/jettons";

  return {
    res: (await axios.get(endpoint)).data,
  };
}

const axiosService = {
  getJettonList,
};

export default axiosService;
