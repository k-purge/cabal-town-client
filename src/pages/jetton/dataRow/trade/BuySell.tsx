import { useCallback, useState } from "react";
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
import { toDecimalsBN } from "utils";
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
    userBalance,
    jettonImage,
    symbol,
    isImageBroken,
    jettonMaster,
    jettonPrice,
    decimals,
    getJettonUpdates,
    selectedJetton,
  } = useJettonStore();
  const { jettonAddress } = useJettonAddress();
  const { showNotification } = useNotification();
  const [tonconnect] = useTonConnectUI();
  const [actionInProgress, setActionInProgress] = useRecoilState(jettonActionsState);
  const [tradeType, setTradeType] = useState("buy");
  const [price, setPrice] = useState(jettonPrice);
  const [amt, setAmt] = useState<number>(1);
  const [blinked, setBlinked] = useState(false);

  const handleChangeType = (event: any, newTradeType: string) => {
    setTradeType(newTradeType);
    setAmt(0);
  };

  const onChangeAmt = (e: any) => {
    const val = e.target.value;
    if (val.slice(-1) === ".") {
      return setAmt(val);
    } else if (!val) {
      setBlinked(false);
      return setAmt(0);
    }

    try {
      const float = parseFloat(val);
      if (float >= 0) {
        setBlinked(true);
        return setAmt(float);
      }
    } catch (e) {
      return;
    }
  };

  const buyTrade = useCallback(
    async (jettonPrice: number) => {
      // const nanoAmt = toNano(amt).toNumber();
      const valueDecimals = toDecimalsBN(amt, decimals!);

      if (amt > 0) {
        await jettonDeployController.buyJettons(
          tonconnect,
          valueDecimals,
          senderAddress!,
          jettonMaster!,
          jettonPrice,
        );
      }
    },
    [amt, decimals, jettonMaster, senderAddress, tonconnect],
  );

  const sellTrade = useCallback(
    async (jettonPrice: number) => {
      const fee = (jettonPrice * 5) / 100;
      const msgValue = toNano(0.02).toNumber() + fee;
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
      setActionInProgress(false);
      if (selectedJetton) {
        const lt = selectedJetton.txns?.length ? selectedJetton.txns[0].lt : 1;
        getJettonUpdates(selectedJetton.id, lt);
      }
    }
  }, [
    amt,
    tradeType,
    senderAddress,
    userBalance,
    setActionInProgress,
    showNotification,
    buyTrade,
    price,
    sellTrade,
    selectedJetton,
    getJettonUpdates,
  ]);

  const getPrice = useCallback(async () => {
    if (!jettonAddress || !isValidAddress(jettonAddress)) {
      showNotification("Invalid jetton address", "error");
      return;
    }

    if (amt > 0) {
      const parsedJettonMaster = Address.parse(jettonAddress);
      const price = await jettonDeployController.getJettonPrice(parsedJettonMaster, amt);
      const jettonPrice = parseInt(price ?? "0");
      setBlinked(false);
      setPrice(jettonPrice);
    }
  }, [amt, jettonAddress, showNotification]);

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
        <SymbolField
          disabled
          value={symbol}
          InputProps={{
            startAdornment: (
              <img
                src={!isImageBroken ? jettonImage : brokenImage}
                alt="jetton symbol"
                style={{ objectFit: "contain", width: "32px", marginRight: "6px" }}
              />
            ),
          }}
        />
      </AmtContainer>

      <BlinkingText blinked={blinked}>
        {blinked ? "Previewing..." : price / DECIMAL_SCALER + " TON = " + (amt ?? 0) + " " + symbol}
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
