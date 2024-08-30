import { useCallback, useState, useEffect, useMemo } from "react";
import {
  StyledBlock,
  StyledTopText,
  StyledCardBody,
  StyledBottomText,
  BorderLinearProgress,
} from "pages/jetton/styled";
import { parseISO, differenceInSeconds } from "date-fns";
import LoadingImage from "components/LoadingImage";
import { Box, Typography } from "@mui/material";
import { DECIMAL_SCALER } from "consts";
import useJettonStore from "store/jetton-store/useJettonStore";
import brokenImage from "assets/icons/question.png";
import UserImg from "assets/icons/userGrey.svg";
import { DividerLine, TradeButton } from "../trade/styled";
import axiosService from "services/axios";
import { useTonAddress } from "@tonconnect/ui-react";
import useUserStore from "store/user-store/useUserStore";
import useNotification from "hooks/useNotification";

export const Token = () => {
  const {
    userBalance,
    jettonImage,
    name,
    jettonLoading,
    isImageBroken,
    jettonPrice,
    selectedJetton,
    holders,
    tonPrice,
    jettonMaster,
  } = useJettonStore();
  const { showNotification } = useNotification();
  const { tgUserId, tgUserName } = useUserStore();
  const walletAddress = useTonAddress();
  const [timeString, setTimeString] = useState("--");

  useEffect(() => {
    if (selectedJetton?.nextPurgeAt) {
      const targetDate = parseISO(selectedJetton.nextPurgeAt.toString());
      const interval = setInterval(() => {
        const now = new Date();
        const diffInSeconds = differenceInSeconds(targetDate, now);

        if (diffInSeconds <= 0) {
          setTimeString("Time is up!");
          clearInterval(interval);
          return;
        }

        const days = Math.floor(diffInSeconds / (60 * 60 * 24));
        const hours = Math.floor((diffInSeconds % (60 * 60 * 24)) / (60 * 60));
        const minutes = Math.floor((diffInSeconds % (60 * 60)) / 60);
        const seconds = diffInSeconds % 60;

        setTimeString(`${days} Days : ${hours} Hrs : ${minutes} Mins : ${seconds} Secs`);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [selectedJetton?.nextPurgeAt]);

  const progress = useMemo(() => {
    if (selectedJetton && holders) {
      const balance =
        holders.reduce((balance, holder) => balance + parseInt(holder.balance), 0) ?? 0;

      return (
        ((balance * (jettonPrice / DECIMAL_SCALER) * tonPrice) /
          DECIMAL_SCALER /
          (selectedJetton.minStartedAmt ?? 1)) *
        100
      );
    }

    return 0;
  }, [selectedJetton, holders, jettonPrice, tonPrice]);

  const onClickJoinGame = useCallback(async () => {
    if (jettonMaster && tgUserId) {
      const { res } = await axiosService.joinGroup({
        masterAddress: jettonMaster,
        walletAddress,
        tgUserId,
      });

      if (tgUserName && res.status === "success") {
        return window.open(`https://t.me/${tgUserName}`, "_blank");
      }

      showNotification(res.message, "error");
    }
  }, [jettonMaster, showNotification, tgUserId, tgUserName, walletAddress]);

  const renderJoinGame = () => {
    if (userBalance > 0) {
      return (
        <>
          <DividerLine />
          <Box gap={1} mt={1} textAlign="start" width="100%">
            <Typography color="#fff">Round</Typography>
            <Typography fontSize={14} color="#939393">
              Round {selectedJetton?.numOfRounds ?? 0} of 10
            </Typography>
          </Box>
          <Box gap={1} mt={1} textAlign="start" width="100%">
            <Typography color="#fff">Next Purge</Typography>
            <Typography fontSize={14} color="#939393">
              {timeString}
            </Typography>
          </Box>
          <TradeButton
            disabled={!selectedJetton?.nextPurgeAt}
            background="#FFB800"
            onClick={onClickJoinGame}>
            JOIN CABAL
          </TradeButton>
        </>
      );
    }
  };

  return (
    <StyledBlock height="100%">
      <StyledTopText>{name}</StyledTopText>
      <LoadingImage
        src={!isImageBroken ? jettonImage : brokenImage}
        alt="jetton image"
        loading={jettonLoading}
      />
      <Box display="flex" flexDirection={"row"} gap={1}>
        <img src={UserImg} alt="user" width={"13px"} />
        <StyledCardBody>{selectedJetton?.players?.length} Players in lobby</StyledCardBody>
      </Box>
      {userBalance > 0 && (
        <Typography fontSize={20} color="#FFB800" mt={1}>
          Your Amount: {userBalance / DECIMAL_SCALER}
        </Typography>
      )}

      <StyledBottomText>
        <Typography>Cabal Initiation Progress</Typography>
        <Typography>{progress > 0.0001 ? progress.toFixed(4) : 0}%</Typography>
      </StyledBottomText>

      <BorderLinearProgress variant="determinate" value={progress} />

      {renderJoinGame()}
    </StyledBlock>
  );
};
