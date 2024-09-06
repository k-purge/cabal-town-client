import { Box, Button, styled, Typography } from "@mui/material";
export const ScreenHeading = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontSize: 32,
  fontWeight: 400,
  fontFamily: "Bungee, sans-serif",
  textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 3px 3px 1px #000",
  textAlign: "center",
  lineHeight: "39px",
  letterSpacing: "0.08em",
  // "&:hover": {
  //   cursor: "pointer",
  // },
}));
export const Instructions = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontSize: 16,
  fontWeight: 600,
  fontFamily: "Cabin Condensed, sans-serif",
  textAlign: "center",
  lineHeight: "32px",
  letterSpacing: "0.08em",
}));
export const OutlinedButton = styled(Button)(({ theme }) => ({
  fontSize: 14,
  color: "#FFB800",
  fontFamily: "Bungee, Sans-Serif",
  border: "2px solid #FFB800",
  marginBlock: 8,
  borderRadius: 0,
  width: 120,
}));
export const CodeInput = styled("input")(({ theme }) => ({
  flexGrow: 1,
  mr: 2,
  width: "100%",
  padding: "8px 16px",
  fontSize: 16,
  fontWeight: 500,
  outline: "unset",
  fontFamily: "Cabin Condensed",
  color: "#000",
  lineHeight: "20px",
  // 2px border
  border: "2px solid #000",
  letterSpacing: "0.08em",
  background: "#fff",
  // caretColor: "#728A96",
  "&::placeholder": {
    color: "#606060",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 16,
  },
}));
