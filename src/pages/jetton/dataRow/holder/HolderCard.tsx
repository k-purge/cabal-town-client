import { useCallback } from "react";
import { TextConainer, HolderBox, HeaderText } from "./styled";
import { Box, Typography } from "@mui/material";
import { DECIMAL_SCALER } from "consts";

interface IProps {
  place: number;
  address: string;
  balance: number;
  bgcolor: string;
  isUser?: boolean;
  circulatingSupply: number;
}

export default function HolderCard({
  place,
  address,
  balance,
  bgcolor,
  isUser,
  circulatingSupply,
}: IProps) {
  const calJettonAmt = useCallback((balance: number) => {
    return (balance / DECIMAL_SCALER).toFixed(2);
  }, []);

  const calJettonDistribution = useCallback(
    (balance: number) => {
      return ((balance / circulatingSupply) * 100).toFixed(2);
    },
    [circulatingSupply],
  );

  if (!address || !balance) {
    return <></>;
  }

  return (
    <HolderBox bgcolor={bgcolor}>
      <HeaderText>
        {place}. {address.slice(0, 4)}...
        {address.slice(-4)} {isUser ? " (You)" : ""}
      </HeaderText>

      <TextConainer>
        <Box>
          <Typography sx={{ fontSize: "16px" }}>Total Amount</Typography>
          <Typography sx={{ float: "left" }}>{calJettonAmt(balance)}</Typography>
        </Box>
        <Box>
          <Typography sx={{ fontSize: "16px" }}>Distribution %</Typography>
          <Typography>{calJettonDistribution(balance)}</Typography>
        </Box>
      </TextConainer>
    </HolderBox>
  );
}
