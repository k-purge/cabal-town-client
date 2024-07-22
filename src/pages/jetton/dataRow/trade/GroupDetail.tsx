import { useMemo } from "react";
import { StyledBlock } from "pages/jetton/styled";
import { Box, IconButton, Typography } from "@mui/material";
import useNotification from "hooks/useNotification";
import CopyToClipboard from "react-copy-to-clipboard";
import CopyImg from "assets/icons/copy.svg";
import useJettonStore from "store/jetton-store/useJettonStore";
import useJettonListStore from "store/jetton-list-store/useJettonListStore";
import { BoxConainer, EllipsisText, StyledImg } from "./styled";
import { DECIMAL_SCALER } from "consts";

export const GroupDetail = () => {
  const { symbol, jettonMaster, jettonWalletAddress, jettonPrice, tonPrice } = useJettonStore();
  const { selectedJetton } = useJettonListStore();
  const { showNotification } = useNotification();

  const onCopy = () => {
    showNotification("Address Copied!", "success", undefined, 3000);
  };

  const marketCap = useMemo(() => {
    if (selectedJetton) {
      const balance = selectedJetton.holders.reduce(
        (balance, holder) => balance + parseInt(holder.balance),
        0,
      );
      // assume the game start  balance is 1000 * DECIMAL_SCALER
      // console.log(balance)
      const cap = (balance * (jettonPrice / DECIMAL_SCALER) * tonPrice) / DECIMAL_SCALER;
      return cap.toLocaleString();
    }

    return 0;
  }, [jettonPrice, tonPrice, selectedJetton]);

  return (
    <StyledBlock height="100%">
      <>
        <Box width="341px" textAlign="start" mb={1}>
          <Typography sx={{ color: "#fff", fontSize: "16px", fontFamily: "Bungee, sans-serif" }}>
            Group Details
          </Typography>
        </Box>

        <BoxConainer>
          <Box>
            <Typography sx={{ color: "#fff", fontSize: "16px", fontWeight: 500 }}>
              Ticker
            </Typography>
            <EllipsisText sx={{ float: "left" }}>{symbol}</EllipsisText>
          </Box>
          <Box>
            <Typography sx={{ color: "#fff", fontSize: "16px", fontWeight: 500 }}>
              Market Cap
            </Typography>
            <EllipsisText sx={{ float: "inline-end" }}>${marketCap}</EllipsisText>
          </Box>
        </BoxConainer>

        <BoxConainer>
          <Box>
            <Typography sx={{ color: "#fff", fontSize: "16px", fontWeight: 500 }}>
              Token Address
            </Typography>
            <Box display="flex" flexDirection="row" alignItems="center">
              <EllipsisText sx={{ float: "left" }}>
                {jettonWalletAddress?.slice(0, 4)}...{jettonWalletAddress?.slice(-4)}
              </EllipsisText>
              <CopyToClipboard text={jettonWalletAddress ?? ""} onCopy={onCopy}>
                <IconButton>
                  <StyledImg src={CopyImg} />
                </IconButton>
              </CopyToClipboard>
            </Box>
          </Box>
          <Box>
            <Typography sx={{ color: "#fff", fontSize: "16px", fontWeight: 500 }}>
              Contract Address
            </Typography>
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end">
              <EllipsisText>
                {jettonMaster?.slice(0, 4)}...{jettonMaster?.slice(-4)}
              </EllipsisText>
              <CopyToClipboard text={jettonMaster ?? ""} onCopy={onCopy}>
                <IconButton>
                  <StyledImg src={CopyImg} />
                </IconButton>
              </CopyToClipboard>
            </Box>
          </Box>
        </BoxConainer>
      </>
    </StyledBlock>
  );
};
