import { useMemo } from "react";
import {
  StyledBlock,
  StyledTopText,
  StyledCardBody,
  StyledBottomText,
  BorderLinearProgress,
} from "pages/jetton/styled";
import LoadingImage from "components/LoadingImage";
import { Box, Typography, SvgIcon } from "@mui/material";
import { useTonAddress } from "@tonconnect/ui-react";
import { DECIMAL_SCALER } from "consts";
import useJettonStore from "store/jetton-store/useJettonStore";
import brokenImage from "assets/icons/question.png";
import UserImg from "assets/icons/userGrey.svg";
import useJettonListStore from "store/jetton-list-store/useJettonListStore";
import { DividerLine, TradeButton } from "../trade/styled";

export const Token = () => {
  const rawAddress = useTonAddress(false);
  const { jettonImage, name, jettonLoading, isImageBroken, jettonPrice, tonPrice } =
    useJettonStore();
  const { selectedJetton } = useJettonListStore();

  const progress = useMemo(() => {
    if (selectedJetton) {
      const balance = selectedJetton.holders.reduce(
        (balance, holder) => balance + parseInt(holder.balance),
        0,
      );
      // assume the game start  balance is 1000 * DECIMAL_SCALER
      // console.log(balance)
      return ((balance * tonPrice) / DECIMAL_SCALER / selectedJetton.minStartedAmt) * 100;
    }

    return 0;
  }, [jettonPrice, selectedJetton]);

  const userHolding = useMemo(() => {
    if (selectedJetton) {
      const balance = selectedJetton.holders
        .filter((holder) => holder.owner.address === rawAddress)
        .map((holding) => parseInt(holding.balance));
      return balance[0];
    }

    return 0;
  }, [selectedJetton]);

  const onClickJoinGame = () => {};

  const renderJoinGame = () => {
    if (userHolding > 0) {
      return (
        <>
          <DividerLine />
          <Box gap={1} mt={1} textAlign="start" width="100%">
            <Typography color="#fff">Round</Typography>
            <Typography fontSize={14} color="#939393">
              Round {selectedJetton?.numOfRounds ?? 0} of 5
            </Typography>
          </Box>
          <Box gap={1} mt={1} textAlign="start" width="100%">
            <Typography color="#fff">Next Purge</Typography>
            <Typography fontSize={14} color="#939393">
              {selectedJetton?.nextPurgeAt?.toISOString() ?? "--"}
            </Typography>
          </Box>
          <TradeButton
            disabled={!selectedJetton?.nextPurgeAt}
            background="#FFB800"
            onClick={onClickJoinGame}>
            Join Game
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
        <StyledCardBody>{selectedJetton?.holders.length} Players in lobby</StyledCardBody>
      </Box>
      {userHolding > 0 && (
        <Typography fontSize={20} color="#FFB800" mt={1}>
          Your Amount: {userHolding / DECIMAL_SCALER}
        </Typography>
      )}

      <StyledBottomText>
        <Typography>Game Initiation Progress</Typography>
        <Typography>{progress.toFixed(2)}%</Typography>
      </StyledBottomText>

      <BorderLinearProgress variant="determinate" value={progress} />

      {renderJoinGame()}
    </StyledBlock>
  );
};
