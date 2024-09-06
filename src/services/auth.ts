import axios from "axios";

let accessToken: string | null = null;
let refreshToken: string | null = null;
let refreshSubscribers: ((token: string) => void)[] = [];

const setTokens = (access: string, refresh: string) => {
  accessToken = access;
  refreshToken = refresh;
  localStorage.setItem("refreshToken", refresh);
  localStorage.setItem("accessToken", access);
};

const getAccessToken = () => accessToken || localStorage.getItem("accessToken");

const refreshAccessToken = async () => {
  try {
    if (!refreshToken) {
      refreshToken = localStorage.getItem("refreshToken");
    }
    const response = await axios.post(process.env.REACT_APP_API_URL + "/v1/auth/refresh-tokens", {
      refreshToken,
    });
    setTokens(response.data.access.token, response.data.refresh.token);
    return response.data.access.token;
  } catch (error) {
    // Handle refresh error (e.g., logout user)
    throw error;
  }
};

const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
};

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

export { setTokens, getAccessToken, refreshAccessToken, onRefreshed, addRefreshSubscriber };
