import { Box, styled, TextField, Typography, Divider, Button } from "@mui/material";

const StyledBlock = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
}));

const BoxConainer = styled(Box)({
  width: "100%",
  padding: 12,
  paddingLeft: 18,
  background: "#CBCDCE",
  textAlign: "start",
  border: "1px solid #000000",
  borderBottom: "none",
});

const TextConainer = styled(Box)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  textAlign: "start",
});

const HeaderText = styled(Typography)({
  fontSize: 20,
  fontWeight: 500,
  textAlign: "start",
  marginBottom: 12,
});

const BoxText = styled(Typography)({
  fontFamily: "Bungee",
  fontSize: 14,
  lineHeight: "17px",
  fontWeight: 400,
});

const HolderContainer = styled(Box)({
  width: "100%",
  background: "#fff",
});

const HolderBox = styled(Box)({
  width: "100%",
  padding: "12px 24px",
  border: "1px solid #000000",
  borderBottom: "none",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const DotBox = styled(Box)({
  width: "100%",
  padding: 12,
  paddingLeft: 18,
  background: "#fff",
  border: "1px solid #000000",
  borderBottom: "none",
  fontFamily: "Bungee, sans-serif",
});

export {
  StyledBlock,
  HolderContainer,
  BoxConainer,
  TextConainer,
  HolderBox,
  HeaderText,
  BoxText,
  DotBox,
};
