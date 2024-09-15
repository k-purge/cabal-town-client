import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Address, toNano } from "ton";
import { object, number } from "yup";
import { CircularProgress } from "@mui/material";
import { useJettonAddress } from "hooks/useJettonAddress";
import { StyledBodyBlock } from "pages/jetton/styled";
import { Box, Typography } from "@mui/material";
import useJettonStore from "store/jetton-store/useJettonStore";
import tonLogo from "assets/icons/ton-logo.png";
import ToggleButton from "./ToggleButton";
import useNotification from "hooks/useNotification";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { isValidAddress } from "utils";
import {
  BlinkingText,
  AmtContainer,
  AmtTextField,
  SymbolField,
  DividerLine,
  TradeButton,
  TextContainer,
} from "./styled";
import { jettonDeployController } from "lib/jetton-controller";
import { validateTradeParams } from "../../util";
import { jettonActionsState } from "pages/jetton/actions/jettonActions";
import { sleep } from "lib/utils";

const schema = object().shape({
  amount: number().required().min(0),
});

export const BuySell = () => {
  const senderAddress = useTonAddress();
  const {
    userBalance,
    jettonImage,
    symbol,
    jettonMaster,
    jettonPrice,
    decimals,
    getJettonHoldersTxns,
    getJettonWallet,
    getJettonFromDb,
    updateJettonPurge,
  } = useJettonStore();
  const { jettonAddress } = useJettonAddress();
  const { showNotification } = useNotification();
  const [tonconnect] = useTonConnectUI();
  const [actionInProgress, setActionInProgress] = useRecoilState(jettonActionsState);
  const [tradeType, setTradeType] = useState("0");
  const [price, setPrice] = useState(jettonPrice);
  const [amt, setAmt] = useState<number>(1);
  const [blinked, setBlinked] = useState(false);

  const handleChangeType = (event: any, newTradeType: string) => {
    setTradeType(newTradeType);
    setPrice(0);
    setAmt(0);
  };

  const onChangeAmt = async (e: any) => {
    const val = e.target.value;
    try {
      const result = await schema.validate({ amount: val });
      const amt = val.split(".").length === 2 ? val : result.amount;
      return setAmt(amt);
    } catch (error) {
      console.error(error);
      if (!val) {
        return setAmt(0);
      }
    }
  };

  const getPrice = useCallback(async () => {
    if (!jettonAddress || !isValidAddress(jettonAddress)) {
      showNotification("Invalid jetton address", "error");
      return 0;
    }

    if (amt > 0) {
      let jettonPrice = 0;
      const parsedJettonMaster = Address.parse(jettonAddress);

      if (tradeType === "0") {
        jettonPrice = await jettonDeployController.getPurchaseReturn(parsedJettonMaster, amt);
      } else {
        jettonPrice = await jettonDeployController.getSaleReturn(parsedJettonMaster, amt);
      }

      setBlinked(false);
      setPrice(jettonPrice);
      return jettonPrice;
    }

    return 0;
  }, [amt, jettonAddress, showNotification, tradeType]);

  const finallyHandler = useCallback(async () => {
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

  const buyTrade = useCallback(
    async (jettonPrice: number) => {
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
    },
    [amt, decimals, jettonMaster, senderAddress, tonconnect],
  );

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
      if (tradeType === "0") await buyTrade(price);
      else await sellTrade(price);
    } catch (error) {
      if (error instanceof Error) {
        showNotification(error.message, "error");
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

  useEffect(() => {
    return () => setActionInProgress(false);
  }, [setActionInProgress]);

  return (
    <StyledBodyBlock height="313px">
      <ToggleButton tradeType={tradeType} handleChangeType={handleChangeType} />
      <Box width="341px" textAlign="start" mb={1}>
        <Typography sx={{ color: "#fff", fontSize: "16px" }}>Amount</Typography>
      </Box>
      <AmtContainer>
        <AmtTextField
          id="outlined-basic"
          variant="outlined"
          value={amt}
          onChange={onChangeAmt}
          onBlur={getPrice}
        />
        <SymbolField src={tradeType === "0" ? tonLogo : jettonImage} alt="ton symbol" />
      </AmtContainer>

      <TextContainer>
        <BlinkingText blinked={blinked}>
          {blinked
            ? "Previewing..."
            : tradeType === "0" && symbol
            ? `${Math.floor(price)} ${symbol}`
            : `${price.toFixed(2)} TON`}
        </BlinkingText>
      </TextContainer>

      <DividerLine />

      <TradeButton
        background="#00B2FF"
        loading={actionInProgress}
        onClick={onClickTrade}
        loadingIndicator={<CircularProgress style={{ color: "white", width: 20, height: 20 }} />}>
        TRADE
      </TradeButton>
    </StyledBodyBlock>
  );
};
