import { MouseEvent, useCallback, useMemo, useState } from "react";
import { Address, toNano } from "ton";
import { useRecoilState } from "recoil";
import { CircularProgress } from "@mui/material";
import { useJettonAddress } from "hooks/useJettonAddress";
import { StyledBodyBlock } from "pages/jetton/styled";
import { Box, Typography } from "@mui/material";
import useJettonStore from "store/jetton-store/useJettonStore";
import brokenImage from "assets/icons/question.png";
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
} from "./styled";
import { jettonDeployController } from "lib/deploy-controller";
import { DECIMAL_SCALER } from "consts";
import { validateTradeParams } from "../../util";
import { jettonActionsState } from "pages/jetton/actions/jettonActions";

export const BuySell = () => {
  const senderAddress = useTonAddress();
  const {
    jettonImage,
    symbol,
    isImageBroken,
    getJettonDetails,
    jettonWalletAddress,
    jettonMaster,
    jettonPrice,
    decimals,
  } = useJettonStore();
  const { jettonAddress } = useJettonAddress();
  const { showNotification } = useNotification();
  const [tonconnect] = useTonConnectUI();
  const [actionInProgress, setActionInProgress] = useRecoilState(jettonActionsState);
  const [tradeType, setTradeType] = useState("buy");
  const [price, setPrice] = useState(jettonPrice);
  const [amt, setAmt] = useState(1);
  const [blinked, setBlinked] = useState(false);

  console.log("blinked:", blinked);

  const handleChangeType = (event: MouseEvent<HTMLElement, MouseEvent>, newTradeType: string) => {
    setTradeType(newTradeType);
  };

  const onChangeAmt = (e: any) => {
    const val = e.target.value;
    if (val > 0) {
      setAmt(val);
      setBlinked(true);
    }
  };

  const buyTrade = async (jettonPrice: number) => {
    console.log("buyTrade");
    const fee = (jettonPrice * 5) / 100;
    const msgValue = toNano(0.02).toNumber() + jettonPrice + fee;

    await jettonDeployController.buyJettons(
      tonconnect,
      amt,
      senderAddress!,
      jettonMaster!,
      msgValue,
    );
  };

  const sellTrade = async (jettonPrice: number) => {
    console.log("sellTrade");
    const fee = (jettonPrice * 5) / 100;
    console.log("fee", fee);
    const msgValue = toNano(0.02).toNumber() + fee;
    console.log("msgValue", msgValue);
    console.log("amt", amt);

    await jettonDeployController.sellJettons(
      tonconnect,
      amt,
      senderAddress!,
      jettonMaster!,
      msgValue,
    );
  };

  const onClickTrade = useCallback(async () => {
    console.log("onClickTrade: ", tradeType);

    const error = validateTradeParams(senderAddress, amt);
    if (error) {
      showNotification(error, "warning", undefined, 3000);
      return;
    }

    setActionInProgress(true);

    try {
      if (tradeType === "buy") await buyTrade(price);
      else await sellTrade(price);
    } catch (error) {
      if (error instanceof Error) {
        showNotification(error.message, "error");
      }
    } finally {
      setAmt(0);
      getJettonDetails();
      setActionInProgress(false);
    }
  }, [tradeType, price]);

  const getPrice = useCallback(async () => {
    if (!jettonAddress || !isValidAddress(jettonAddress)) {
      showNotification("Invalid jetton address", "error");
      return;
    }

    const parsedJettonMaster = Address.parse(jettonAddress);
    const price = await jettonDeployController.getJettonPrice(parsedJettonMaster, amt);
    const jettonPrice = parseInt(price ?? "0");
    setBlinked(false);
    setPrice(jettonPrice);
  }, [amt, jettonAddress, showNotification, isValidAddress]);

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
          type="number"
        />
        <SymbolField
          disabled
          value={symbol}
          InputProps={{
            startAdornment: (
              <img
                src={!isImageBroken ? jettonImage : brokenImage}
                alt="jetton image"
                style={{ objectFit: "contain", width: "32px", marginRight: "6px" }}
              />
            ),
          }}
        />
      </AmtContainer>

      <BlinkingText blinked={blinked}>
        {blinked ? "Previewing..." : price / DECIMAL_SCALER + " TON = " + amt + " " + symbol}
      </BlinkingText>

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
