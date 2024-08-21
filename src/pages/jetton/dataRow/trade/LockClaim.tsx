import { useCallback, useEffect, useMemo, useState } from "react";
import { toNano } from "ton";
import { useRecoilState } from "recoil";
import { CircularProgress, Typography } from "@mui/material";
import { StyledBodyBlock } from "pages/jetton/styled";
import { Box } from "@mui/material";
import useJettonStore from "store/jetton-store/useJettonStore";
import brokenImage from "assets/icons/question.png";
import ToggleButton from "./ToggleButton";
import useNotification from "hooks/useNotification";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { toDecimalsBN } from "utils";
import {
  BlinkingText,
  AmtContainer,
  AmtTextField,
  SymbolField,
  DividerLine,
  TradeButton,
  EllipsisText,
  BungeeText,
} from "./styled";
import { jettonDeployController } from "lib/jetton-controller";
import { DECIMAL_SCALER } from "consts";
import { validateTradeParams } from "../../util";
import { jettonActionsState } from "pages/jetton/actions/jettonActions";
import { sleep } from "lib/utils";

export const LockClaim = () => {
  const senderAddress = useTonAddress();
  const {
    userBalance,
    jettonImage,
    symbol,
    isImageBroken,
    jettonWalletAddress,
    decimals,
    selectedJetton,
    getJettonHoldersTxns,
    getJettonStaking,
    getUserReward,
    userReward,
  } = useJettonStore();
  const { showNotification } = useNotification();
  const [tonconnect] = useTonConnectUI();
  const [actionInProgress, setActionInProgress] = useRecoilState(jettonActionsState);
  const [tradeType, setTradeType] = useState("0");
  const [amt, setAmt] = useState<number>(1);

  const unClaimReward = useMemo(() => {
    return ((userReward ?? 0) + (selectedJetton?.unclaimedReward ?? 0)) / DECIMAL_SCALER;
  }, [selectedJetton?.unclaimedReward, userReward]);

  const handleChangeType = (event: any, newTradeType: string) => {
    setTradeType(newTradeType);
    setAmt(0);
  };

  const onChangeAmt = (e: any) => {
    const val = e.target.value;
    if (val.slice(-1) === ".") {
      return setAmt(val);
    } else if (!val) {
      return setAmt(0);
    }

    try {
      const float = parseFloat(val);
      if (float >= 0) {
        return setAmt(float);
      }
    } catch (e) {
      return;
    }
  };

  const finallyHandler = useCallback(
    async (type?: string) => {
      setAmt(0);
      let i = 0;
      while (i < 10) {
        i++;
        await sleep(5000);
        const newBalance = await getJettonHoldersTxns();
        if (newBalance !== userBalance || type === "claim") {
          i = 10;
          setActionInProgress(false);
          showNotification("Transaction completed", "success");
        }
        if (selectedJetton?.stakingAddress) getJettonStaking(selectedJetton?.stakingAddress);
      }
    },
    [
      getJettonHoldersTxns,
      getJettonStaking,
      selectedJetton?.stakingAddress,
      setActionInProgress,
      showNotification,
      userBalance,
    ],
  );

  const lockTokens = useCallback(async () => {
    // const nanoAmt = toNano(amt).toNumber();
    const valueDecimals = toDecimalsBN(amt, decimals!);
    if (amt > 0 && senderAddress && jettonWalletAddress && selectedJetton?.stakingAddress) {
      await jettonDeployController.lockJettons(
        tonconnect,
        valueDecimals,
        senderAddress,
        jettonWalletAddress,
        selectedJetton?.stakingAddress,
      );
    }
  }, [
    amt,
    decimals,
    jettonWalletAddress,
    selectedJetton?.stakingAddress,
    senderAddress,
    tonconnect,
  ]);

  const unlockTokens = useCallback(async () => {
    const valueDecimals = toDecimalsBN(amt, decimals!);

    if (amt > 0 && selectedJetton?.stakingAddress) {
      await jettonDeployController.unlockJettons(
        tonconnect,
        valueDecimals,
        senderAddress,
        selectedJetton?.stakingAddress,
      );
    }
  }, [amt, decimals, selectedJetton?.stakingAddress, senderAddress, tonconnect]);

  const onClickTrade = useCallback(async () => {
    const nanoAmt = toNano(amt).toNumber();

    const type = tradeType === "0" ? "lock" : "unlock";
    const balance = tradeType === "0" ? userBalance : selectedJetton?.lockedDepositAmt;
    const error = validateTradeParams(type, senderAddress, nanoAmt, balance);
    if (error) {
      showNotification(error, "warning", undefined, 3000);
      return;
    }

    setActionInProgress(true);

    try {
      if (tradeType === "0") await lockTokens();
      else await unlockTokens();
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
    userBalance,
    selectedJetton?.lockedDepositAmt,
    senderAddress,
    setActionInProgress,
    showNotification,
    lockTokens,
    unlockTokens,
    finallyHandler,
  ]);

  const onClickClaim = useCallback(async () => {
    if (!senderAddress) {
      showNotification("Invalid Sender wallet address", "warning", undefined, 3000);
      return;
    }

    if (!selectedJetton?.stakingAddress) {
      showNotification("Ton network error.", "warning", undefined, 3000);
      return;
    }

    setActionInProgress(true);

    try {
      jettonDeployController.claimRewards(
        tonconnect,
        senderAddress,
        selectedJetton?.stakingAddress,
      );
    } catch (error) {
      if (error instanceof Error) {
        showNotification(error.message, "error");
      }
    } finally {
      finallyHandler("claim");
    }
  }, [
    finallyHandler,
    selectedJetton?.stakingAddress,
    senderAddress,
    setActionInProgress,
    showNotification,
    tonconnect,
  ]);

  useEffect(() => {
    if (selectedJetton?.stakingAddress) {
      getJettonStaking(selectedJetton?.stakingAddress);
      getUserReward(selectedJetton?.stakingAddress);
    }
  }, [getJettonStaking, getUserReward, selectedJetton?.stakingAddress]);

  return (
    <StyledBodyBlock height="100%">
      <ToggleButton type="lock/claim" tradeType={tradeType} handleChangeType={handleChangeType} />
      <Box width="341px" textAlign="start" mb={1}>
        <EllipsisText>Total Locked Token</EllipsisText>
        <BungeeText>
          {(selectedJetton?.totalDepositAmt ?? 0) / DECIMAL_SCALER} {symbol}
        </BungeeText>

        <EllipsisText>Your Locked Tokens</EllipsisText>
        <BungeeText>
          {(selectedJetton?.lockedDepositAmt ?? 0) / DECIMAL_SCALER} {symbol}
        </BungeeText>

        <EllipsisText>Unclaimed Rewards</EllipsisText>
        <BungeeText>{unClaimReward} TON</BungeeText>

        <Typography sx={{ color: "#fff", fontSize: "16px", mt: 3 }}>
          Amount To {tradeType === "0" ? "Lock" : "Withdraw"}
        </Typography>
      </Box>

      <AmtContainer>
        <AmtTextField id="outlined-basic" variant="outlined" value={amt} onChange={onChangeAmt} />
        <SymbolField src={!isImageBroken ? jettonImage : brokenImage} alt="jetton symbol" />
      </AmtContainer>

      {tradeType === "0" ? (
        <>
          <BlinkingText>
            {"Available " + (userBalance ?? 0) / DECIMAL_SCALER + " " + symbol}
          </BlinkingText>
          <TradeButton
            background="#FFB800"
            loading={actionInProgress}
            onClick={onClickTrade}
            disabled={!userBalance}
            loadingIndicator={
              <CircularProgress style={{ color: "white", width: 20, height: 20 }} />
            }>
            {!!selectedJetton?.lockedDepositAmt ? "LOCK MORE" : "LOCK TOKENS"}
          </TradeButton>
        </>
      ) : (
        <>
          <BlinkingText>
            {"Locked " + (selectedJetton?.lockedDepositAmt ?? 0) / DECIMAL_SCALER + " " + symbol}
          </BlinkingText>
          <TradeButton
            background="#FFB800"
            loading={actionInProgress}
            onClick={onClickTrade}
            disabled={!selectedJetton?.lockedDepositAmt}
            loadingIndicator={
              <CircularProgress style={{ color: "white", width: 20, height: 20 }} />
            }>
            WITHDRAW
          </TradeButton>
        </>
      )}

      {selectedJetton?.lockedDepositAmt && (
        <>
          <DividerLine />
          <TradeButton
            background="#FFB800"
            loading={actionInProgress}
            onClick={onClickClaim}
            disabled={!(unClaimReward > 0)}
            loadingIndicator={
              <CircularProgress style={{ color: "white", width: 20, height: 20 }} />
            }>
            CLAIM REWARDS
          </TradeButton>
        </>
      )}
    </StyledBodyBlock>
  );
};
