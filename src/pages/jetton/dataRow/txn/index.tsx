import { useCallback, useMemo } from "react";
import {
  StyledBlock,
  HolderContainer,
  BoxConainer,
  TextConainer,
  HolderBox,
  HeaderText,
  BoxText,
} from "./styled";
import { Box, Typography } from "@mui/material";
import useJettonStore from "store/jetton-store/useJettonStore";
import { DECIMAL_SCALER } from "consts";

export const Txn = () => {
  const { symbol, txns: jettonTxns } = useJettonStore();

  const txns = useMemo(() => {
    return jettonTxns
      ?.filter((txn) => txn.success && [31, 51].includes(parseInt(txn.in_msg.op_code, 16)))
      ?.sort((a, b) => b.in_msg?.created_at - a.in_msg?.created_at);
  }, [jettonTxns]);

  const dateConverter = useCallback((timestamp: number) => {
    const date = new Date(timestamp * 1000); // convert seconds to milliseconds
    const dateString = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`;
    return dateString;
  }, []);

  const valueConvertor = useCallback((out_msg: any) => {
    if (out_msg.op_code === "0x178d4519") {
      // internal_transfer
      return parseInt(out_msg?.decoded_body?.amount) / DECIMAL_SCALER;
    }

    return parseInt(out_msg?.value) / DECIMAL_SCALER;
  }, []);

  return (
    <StyledBlock height="100%">
      <BoxConainer>
        <BoxText>TRANSACTION</BoxText>
      </BoxConainer>

      <HolderContainer>
        {/* Least holders */}
        {txns?.map((txn, index) => (
          <HolderBox key={index}>
            <HeaderText>
              {txn.in_msg.source.address.slice(0, 4)}...{txn.in_msg.source.address.slice(-4)}
            </HeaderText>

            <TextConainer>
              <Box>
                <Typography sx={{ fontSize: "16px" }}>Transaction</Typography>
                <Typography sx={{ float: "left" }}>
                  {parseInt(txn.in_msg.op_code, 16) === 31 ? "BUY" : "SELL"}
                </Typography>
              </Box>
              <Box textAlign="end">
                <Typography sx={{ fontSize: "16px" }}>Txn Date</Typography>
                <Typography>{dateConverter(txn?.in_msg.created_at)}</Typography>
              </Box>
            </TextConainer>
            <TextConainer>
              <Box>
                <Typography sx={{ fontSize: "16px" }}>TON</Typography>
                <Typography sx={{ float: "left" }}>{txn?.in_msg.value / DECIMAL_SCALER}</Typography>
              </Box>
              <Box textAlign="end">
                <Typography sx={{ fontSize: "16px" }}>{symbol}</Typography>
                <Typography>{valueConvertor(txn?.out_msgs[0])}</Typography>
              </Box>
            </TextConainer>
          </HolderBox>
        ))}
      </HolderContainer>
    </StyledBlock>
  );
};
