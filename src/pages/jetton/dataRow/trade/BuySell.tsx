import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { CircularProgress, InputAdornment } from "@mui/material";
import { Address, toNano } from "ton";
import { object, number } from "yup";
import { useJettonAddress } from "hooks/useJettonAddress";
import { StyledBodyBlock } from "pages/jetton/styled";
import { Box, Typography } from "@mui/material";
import useJettonStore from "store/jetton-store/useJettonStore";
import socialCreditIcon from "assets/icons/social-credits.png";
import tonLogo from "assets/icons/ton-logo.png";
import ToggleButton from "./ToggleButton";
import useNotification from "hooks/useNotification";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { isValidAddress } from "utils";
import { BlinkingText, AmtContainer, AmtTextField, TradeButton, TextContainer } from "./styled";
import { jettonDeployController } from "lib/jetton-controller";
import { validateTradeParams } from "../../util";
import { jettonActionsState } from "pages/jetton/actions/jettonActions";
import { sleep } from "lib/utils";
import { DECIMAL_SCALER } from "consts";
import useUserStore from "store/user-store/useUserStore";
import { useSnackbar, SnackbarKey } from "notistack";

const schema = object().shape({
  amount: number().required().min(0),
});

export const BuySell = () => {
  const senderAddress = useTonAddress();
  const {
    userBalance,
    symbol,
    jettonMaster,
    jettonPrice,
    decimals,
    getJettonHoldersTxns,
    getJettonWallet,
    getJettonFromDb,
    updateJettonPurge,
  } = useJettonStore();
  const { tonBalance, getUserBalance } = useUserStore();
  const { jettonAddress } = useJettonAddress();
  const { showNotification } = useNotification();
  const [loadingNotificationKey, setLoadingNotificationKey] = useState<SnackbarKey | undefined>();
  const { closeSnackbar } = useSnackbar();
  const [tonconnect] = useTonConnectUI();
  const [actionInProgress, setActionInProgress] = useRecoilState(jettonActionsState);
  const [tradeType, setTradeType] = useState("0");
  const [price, setPrice] = useState(jettonPrice);
  const [amt, setAmt] = useState<number>(0);
  const [blinked, setBlinked] = useState(false);

  const handleChangeType = (event: any, newTradeType: string) => {
    if (!newTradeType) {
      return;
    }
    setTradeType(newTradeType);
    setPrice(0);
    setAmt(0);
  };

  const onChangeAmt = async (e: any) => {
    const val = e.target.value;
    try {
      const result = await schema.validate({ amount: val });
      const amt = val.split(".").length === 2 ? val : result.amount;
      setBlinked(true);
      return setAmt(amt);
    } catch (error) {
      console.error(error);
      if (!val) {
        return setAmt(0);
      }
    }
  };

  const getPrice = useCallback(
    async (amount: number = amt) => {
      if (!jettonAddress || !isValidAddress(jettonAddress)) {
        showNotification("Invalid jetton address", "error");
        return 0;
      }

      if (amount > 0) {
        let jettonPrice = 0;

        const parsedJettonMaster = Address.parse(jettonAddress);

        while (!jettonPrice) {
          if (tradeType === "0") {
            jettonPrice = await jettonDeployController.getPurchaseReturn(
              parsedJettonMaster,
              amount,
            );
          } else {
            jettonPrice = await jettonDeployController.getSaleReturn(parsedJettonMaster, amount);
          }
        }

        setBlinked(false);
        setPrice(jettonPrice);
        return jettonPrice;
      }

      return 0;
    },
    [amt, jettonAddress, showNotification, tradeType],
  );

  const finallyHandler = useCallback(async () => {
    setPrice(0);
    setAmt(0);
    let i = 0;
    while (i < 10) {
      i++;
      await sleep(5000);
      const newBalance = await getJettonHoldersTxns();
      if (newBalance !== userBalance) {
        i = 10;
        setActionInProgress(false);
        showNotification("Transaction completed", "success");
      }
    }
    await getJettonWallet();
    await updateJettonPurge();
    getJettonFromDb();
  }, [
    getJettonFromDb,
    getJettonHoldersTxns,
    getJettonWallet,
    setActionInProgress,
    showNotification,
    updateJettonPurge,
    userBalance,
  ]);

  const buyTrade = useCallback(async () => {
    // const nanoAmt = toNano(amt).toNumber();
    if (amt > 0) {
      await jettonDeployController.buyJettons(
        tonconnect,
        amt,
        senderAddress!,
        jettonMaster!,
        decimals!,
      );
    }
  }, [amt, decimals, jettonMaster, senderAddress, tonconnect]);

  const sellTrade = useCallback(
    async (jettonPrice: number) => {
      const fee = (jettonPrice * 5) / 100;
      const msgValue = toNano(0.3).toNumber() + fee;
      const nanoAmt = toNano(amt).toNumber();

      if (nanoAmt > 0) {
        await jettonDeployController.sellJettons(
          tonconnect,
          nanoAmt,
          senderAddress!,
          jettonMaster!,
          msgValue,
        );
      }
    },
    [amt, jettonMaster, senderAddress, tonconnect],
  );

  const onClickTrade = useCallback(async () => {
    const nanoAmt = toNano(amt).toNumber();

    const error = validateTradeParams(tradeType, senderAddress, nanoAmt, userBalance);
    const price = await getPrice();
    if (error || price === 0) {
      showNotification(error ?? "Server error, please try again.", "warning", undefined, 3000);
      return;
    }

    setActionInProgress(true);

    try {
      if (tradeType === "0") await buyTrade();
      else await sellTrade(price);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    } finally {
      finallyHandler();
    }
  }, [
    amt,
    tradeType,
    senderAddress,
    userBalance,
    getPrice,
    setActionInProgress,
    showNotification,
    buyTrade,
    sellTrade,
    finallyHandler,
  ]);

  const onClickMax = useCallback(() => {
    let amount;

    if (tradeType === "0" && tonBalance) {
      amount = tonBalance / DECIMAL_SCALER;
    } else {
      amount = userBalance / DECIMAL_SCALER;
    }

    if (amount > 0) {
      setAmt(amount);
      setBlinked(true);
      getPrice(amount);
    }
  }, [getPrice, tonBalance, tradeType, userBalance]);

  useEffect(() => {
    getUserBalance();
    return () => setActionInProgress(false);
  }, [getUserBalance, setActionInProgress]);

  useEffect(() => {
    if (actionInProgress) {
      setLoadingNotificationKey(showNotification("Loading...", "info", undefined, null));
    } else {
      if (loadingNotificationKey !== undefined) {
        closeSnackbar(loadingNotificationKey);
        setLoadingNotificationKey(undefined);
        showNotification("Operation Successful!", "success");
      }
    }
  }, [actionInProgress]);

  return (
    <StyledBodyBlock height="313px">
      <ToggleButton tradeType={tradeType} handleChangeType={handleChangeType} />
      <Box
        width="341px"
        textAlign="start"
        mb={1}
        display="flex"
        alignItems="center"
        justifyContent={"space-between"}>
        <Typography
          sx={{
            color: "#fff",
            fontSize: "16px",
            fontFamily: "Cabin Condensed",
            letterSpacing: "0.08em",
          }}>
          Amount
        </Typography>
        <Typography
          onClick={onClickMax}
          sx={{
            color: "#FFB800",
            fontSize: "16px",
            fontFamily: "Cabin Condensed",
            letterSpacing: "0.08em",
            fontWeight: 800,
            cursor: "pointer",
          }}>
          MAX
        </Typography>
      </Box>
      <AmtContainer>
        <AmtTextField
          id="outlined-basic"
          variant="outlined"
          value={amt}
          onChange={onChangeAmt}
          onBlur={() => getPrice(undefined)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <img
                  src={tradeType === "0" ? tonLogo : socialCreditIcon}
                  alt="social credit"
                  style={{ width: "24px", height: "24px" }}
                />
              </InputAdornment>
            ),
          }}
        />
      </AmtContainer>

      <TextContainer>
        <BlinkingText blinked={blinked}>
          {blinked
            ? "Previewing..."
            : tradeType === "0" && symbol
            ? `${amt} TON = ${Math.floor(price)} ${symbol}`
            : `${amt} ${symbol} = ${price.toFixed(2)} TON`}
        </BlinkingText>
      </TextContainer>

      {/* <DividerLine /> */}

      {/* <TradeButton
        background="#00B2FF"
        loading={actionInProgress}
        onClick={onClickTrade}
        loadingIndicator={<CircularProgress style={{ color: "white", width: 20, height: 20 }} />}>
        TRADE
      </TradeButton> */}
      <TradeButton
        background="#00B2FF"
        loading={actionInProgress}
        onClick={() => {
          console.log("changed loading");
        }}
        loadingIndicator={<CircularProgress style={{ color: "white", width: 20, height: 20 }} />}>
        TRADE
      </TradeButton>
      <button
        onClick={() => {
          setActionInProgress(!actionInProgress);
        }}>
        toggle actionInProgress
      </button>
    </StyledBodyBlock>
  );
};
