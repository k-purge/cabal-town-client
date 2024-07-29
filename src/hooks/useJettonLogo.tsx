import { useCallback, useEffect } from "react";
import coinLogo from "assets/icons/coin-logo.svg";
import { atom, useRecoilState } from "recoil";
import useJettonStore from "store/jetton-store/useJettonStore";
import brokenImage from "assets/icons/question.png";
import { useJettonAddress } from "hooks/useJettonAddress";

const defaultState = {
  iconHover: false,
  logoUrl: "",
  image: coinLogo,
  isLoading: false,
  hasError: false,
};

const jettonLogoState = atom({
  key: "jettonLogo",
  default: defaultState,
});

export const useJettonLogo = () => {
  const [jettonLogo, setJettonLogo] = useRecoilState(jettonLogoState);
  const { jettonImage } = useJettonStore();
  const { jettonAddress } = useJettonAddress();

  const resetJetton = useCallback(() => setJettonLogo(defaultState), [setJettonLogo]);

  const setLogoUrl = useCallback(
    (val: string) => {
      setJettonLogo((prev) => {
        return {
          ...prev,
          logoUrl: val,
        };
      });
    },
    [setJettonLogo],
  );

  const setImage = useCallback(
    (val: string) => {
      setJettonLogo((prev) => {
        return {
          ...prev,
          image: val,
        };
      });
    },
    [setJettonLogo],
  );

  const setIconHover = (val: boolean) =>
    setJettonLogo((prev) => {
      return {
        ...prev,
        iconHover: val,
      };
    });

  const setIsLoading = useCallback(
    (val: boolean) => {
      setJettonLogo((prev) => {
        return {
          ...prev,
          isLoading: val,
        };
      });
    },
    [setJettonLogo],
  );

  const setHasError = useCallback(
    (val: boolean) => {
      setJettonLogo((prev) => {
        return {
          ...prev,
          hasError: val,
        };
      });
    },
    [setJettonLogo],
  );

  const fetchImage = useCallback(
    (url: string) => {
      const image = new Image();
      image.src = url;
      image.onload = () => {
        setIsLoading(false);
        setImage(url);
      };
      image.onerror = () => {
        setHasError(true);
        setIsLoading(false);
        setImage(brokenImage);
      };
    },
    [setHasError, setImage, setIsLoading],
  );

  useEffect(() => {
    setHasError(false);
    setIsLoading(true);
    jettonLogo.logoUrl && fetchImage(jettonLogo.logoUrl);
  }, [fetchImage, jettonLogo.logoUrl, setHasError, setIsLoading]);

  useEffect(() => {
    jettonAddress ? jettonImage && setLogoUrl(jettonImage) : resetJetton();
    return () => resetJetton();
  }, [jettonAddress, jettonImage, resetJetton, setLogoUrl]);

  return { jettonLogo, setLogoUrl, setIconHover, resetJetton };
};
