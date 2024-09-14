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
  const { tgUserId } = useUserStore();
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

      const value =
        (balance * (jettonPrice / DECIMAL_SCALER) * tonPrice) /
        DECIMAL_SCALER /
        (selectedJetton.minStartedAmt ?? 1);

      if (value > 1) return "100";
      else if (value < 0.000001) return (value * 100).toFixed(4);
      else {
        return (value * 100).toFixed(2);
      }
    }

    return "0";
  }, [selectedJetton, holders, jettonPrice, tonPrice]);

  const onClickJoinGame = useCallback(async () => {
    if (!jettonMaster || !tgUserId || !walletAddress) {
      return;
    }

    try {
      const { res } = await axiosService.joinGroup({
        masterAddress: jettonMaster,
        walletAddress,
        tgUserId,
      });

      console.log(res);

      if (res.invite_link) {
        window.open(res.invite_link, "_blank");
      } else if (res.status === "success") {
        window.open("tg://", "_blank");
      } else {
        showNotification(res.message ?? "Telegram error", "error");
      }
    } catch (error) {
      showNotification("Failed to join the group. Please try again.", "error");
      console.error("Error joining group:", error);
      return;
    }
  }, [jettonMaster, showNotification, tgUserId, walletAddress]);

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
            disabled={!(selectedJetton?.nextPurgeAt && jettonMaster && tgUserId && walletAddress)}
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}>
        <Box sx={{ border: "2px, solid, white", height: "56px", width: "56px" }}>
          <LoadingImage
            src={!isImageBroken ? jettonImage : brokenImage}
            alt="jetton image"
            loading={jettonLoading}
          />
        </Box>
        <Box display="flex" flexDirection={"column"} flexGrow={1} sx={{ paddingLeft: "16px" }}>
          <StyledTopText>{name}</StyledTopText>
          <Box display="flex" flexDirection={"row"} gap={1}>
            <img src={UserImg} alt="user" width={"13px"} />
            <StyledCardBody>{selectedJetton?.players?.length} players in lobby</StyledCardBody>
          </Box>
        </Box>
      </Box>
      {userBalance > 0 && (
        <Typography fontSize={20} color="#FFB800" mt={1}>
          Your Amount: {userBalance / DECIMAL_SCALER}
        </Typography>
      )}

      <StyledBottomText>
        <Typography>Game Initiation Progress</Typography>
        <Typography>{progress}%</Typography>
      </StyledBottomText>

      <BorderLinearProgress variant="determinate" value={parseFloat(progress)} />

      {renderJoinGame()}
    </StyledBlock>
  );
};
