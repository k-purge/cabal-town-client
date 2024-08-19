import { LoadingButton } from "@mui/lab";
import { Box, styled, TextField, Typography, Divider } from "@mui/material";
import { keyframes } from "@mui/system";

const AmtContainer = styled(Box)({
  width: "341px",
  height: "48px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  boxShadow: "2px 2px 0px 0px #000000",
});

const AmtTextField = styled(TextField)({
  border: "2px solid #000000",
  background: "#fff",
  fontWeight: 500,
  width: "85%",
  "& input": {
    height: "48px",
    paddingBlock: "0",
  },
});

const SymbolField = styled("img")({
  border: "2px solid #000000",
  background: "#D8D8D8",
  objectFit: "contain",
  padding: "6px",
  width: 48,
  "& input.Mui-disabled": {
    "-webkit-text-fill-color": "#000",
    height: "48px",
    paddingBlock: "0",
  },
});

const DividerLine = styled(Divider)({
  height: "1px",
  background: "#D9D9D9",
  width: "341px",
  marginTop: "24px",
});

const TradeButton = styled(LoadingButton, {
  shouldForwardProp: (prop) => prop !== "background",
})<{ background?: string }>(({ background }) => ({
  background,
  height: "43px",
  width: "341px",
  marginTop: "24px",
  color: "#000",
  fontFamily: "Bungee, sans-serif",

  "&:hover": {
    background,
  },

  "&:disabled": {
    background: "#D8D8D8",
    color: "#606060",
  },
}));

const BoxConainer = styled(Box)({
  width: "341px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  textAlign: "start",
  marginTop: 12,
});

const EllipsisText = styled(Typography)({
  color: "#939393",
  fontSize: "14px",
});

const BungeeText = styled(Typography)({
  fontFamily: "Bungee, sans-serif",
  fontSize: "16px",
  color: "#ffffff",
  marginBottom: 6,
});

const StyledImg = styled("img")({
  width: 15,
});

// Define the blink keyframes
const blink = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const BlinkingText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "blinked",
})<{ blinked?: boolean }>(({ blinked }) => ({
  marginLeft: "12px",
  fontSize: 12,
  color: "#939393",
  alignSelf: "self-start",
  animation: blinked ? `${blink} 1s linear infinite` : "none",
}));

export {
  StyledImg,
  BoxConainer,
  EllipsisText,
  AmtContainer,
  AmtTextField,
  SymbolField,
  DividerLine,
  TradeButton,
  BlinkingText,
  BungeeText,
};
