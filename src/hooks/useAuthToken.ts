import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export function useAuthToken() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    // Initialize tokens from localStorage
    setAccessToken(localStorage.getItem("accessToken"));
    setRefreshToken(localStorage.getItem("refreshToken"));
    setIsInitialized(true);
  }, []);

  const setTokens = useCallback((access: string, refresh: string) => {
    setAccessToken(access);
    setRefreshToken(refresh);
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
  }, []);

  const refreshAccessToken = useCallback(async () => {
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + "/v1/auth/refresh-tokens", {
        refreshToken,
      });
      setTokens(response.data.access.token, response.data.refresh.token);
      return response.data.access.token;
    } catch (error) {
      // Handle refresh error (e.g., logout user)
      throw error;
    }
  }, [refreshToken, setTokens]);

  return {
    accessToken,
    refreshToken,
    setTokens,
    refreshAccessToken,
    isInitialized,
  };
}
