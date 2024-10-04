import { useMemo } from "react";
import { StyledBlock } from "pages/jetton/styled";
import { Box, IconButton, Typography } from "@mui/material";
import useNotification from "hooks/useNotification";
import CopyToClipboard from "react-copy-to-clipboard";
import CopyImg from "assets/icons/copy.svg";
import useJettonStore from "store/jetton-store/useJettonStore";
import { BoxConainer, EllipsisText, StyledImg, StyledDetailRow } from "./styled";
import { DECIMAL_SCALER } from "consts";

export const GroupDetail = () => {
  const { holders, jettonMaster, jettonWalletAddress, jettonPrice, tonPrice } = useJettonStore();
  const { showNotification } = useNotification();

  const onCopy = () => {
    showNotification("Address Copied!", "success", 3000);
  };

  const marketCap = useMemo(() => {
    if (holders) {
      const balance =
        holders?.reduce((balance, holder) => balance + parseInt(holder.balance), 0) ?? 0;
      // assume the game start  balance is 1000 * DECIMAL_SCALER
      const cap = (balance * jettonPrice * tonPrice) / DECIMAL_SCALER;
      return cap.toLocaleString();
    }

    return 0;
  }, [holders, jettonPrice, tonPrice]);

  return (
    <StyledBlock height="100%" sx={{ padding: "24px 16px" }}>
      <Box width="100%" textAlign="start" mb={1}>
        <Typography sx={{ color: "#fff", fontSize: "16px", fontFamily: "Bungee, sans-serif" }}>
          Details
        </Typography>
      </Box>

      <BoxConainer>
        <StyledDetailRow>
          <Typography
            sx={{ color: "#fff", fontSize: "16px", fontWeight: 500, letterSpacing: "0.08em" }}>
            Buy-in Price
          </Typography>
          <EllipsisText>${jettonPrice.toExponential(4)}</EllipsisText>
        </StyledDetailRow>
        <StyledDetailRow>
          <Typography
            sx={{ color: "#fff", fontSize: "16px", fontWeight: 500, letterSpacing: "0.08em" }}>
            Market Cap
          </Typography>
          <EllipsisText>${marketCap}</EllipsisText>
        </StyledDetailRow>
        <StyledDetailRow>
          <Typography
            sx={{ color: "#fff", fontSize: "16px", fontWeight: 500, letterSpacing: "0.08em" }}>
            Token Address
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <EllipsisText>
              {jettonWalletAddress?.slice(0, 4)}...{jettonWalletAddress?.slice(-4)}
            </EllipsisText>
            <CopyToClipboard text={jettonWalletAddress ?? ""} onCopy={onCopy}>
              <IconButton sx={{ padding: 0 }}>
                <StyledImg src={CopyImg} />
              </IconButton>
            </CopyToClipboard>
          </Box>
        </StyledDetailRow>
        <StyledDetailRow>
          <Typography
            sx={{ color: "#fff", fontSize: "16px", fontWeight: 500, letterSpacing: "0.08em" }}>
            Contract Address
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <EllipsisText>
              {jettonMaster?.slice(0, 4)}...{jettonMaster?.slice(-4)}
            </EllipsisText>
            <CopyToClipboard text={jettonMaster ?? ""} onCopy={onCopy}>
              <IconButton sx={{ padding: 0 }}>
                <StyledImg src={CopyImg} />
              </IconButton>
            </CopyToClipboard>
          </Box>
        </StyledDetailRow>
      </BoxConainer>
    </StyledBlock>
  );
};
