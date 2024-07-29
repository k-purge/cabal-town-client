import { Box, Link, styled, Typography } from "@mui/material";
import { CenteringWrapper } from "components/footer/styled";

const PopupTitle = styled(Typography)(({ theme }) => ({
  color: "#ffff",
  fontSize: 20,
  fontFamily: "Bungee, sans-serif",
  marginBottom: theme.spacing(3.4),
}));

const PopupSubTitle = styled(Typography)(({ theme }) => ({
  color: "#ffff",
  fontSize: 14,
  alignSelf: "baseline",
  marginBottom: theme.spacing(1),
}));

const PopupDescription = styled(Typography)({
  fontSize: 14,
  opacity: 0.3,
  paddingLeft: "17px",
  color: "#ffff",
  margin: "8px 0 4px 0",
});

const PopupContent = styled(CenteringWrapper)({
  position: "relative",
  width: "100%",
  padding: "0 16px",
});

const PopupLink = styled(Link)({
  color: "#9CADB6",
  textDecorationColor: "#9CADB6",
  fontWeight: 800,
  fontSize: 14,
  display: "flex",
  alignItems: "center",
});

const LogoTextAreaWrapper = styled(Box)({
  width: "100%",
  display: "flex",
  alignItems: "center",
  border: "0.5px solid rgba(114, 138, 150, 0.16)",
  transition: "0.2s all",
  overflowWrap: "anywhere",
});

const LogoTextArea = styled("textarea")({
  resize: "none",
  width: "100%",
  flex: 1,
  border: "0.5px solid rgba(114, 138, 150, 0.16)",
  outline: "none",
  color: "#728A96",
  fontSize: 16,
  caretColor: "#728A96",
  padding: "10px 20px",
  maxHeight: 97,
  "::-webkit-scrollbar": {
    display: "none",
  },
});

const Header = styled(Typography)({
  fontSize: 32,
  fontWeight: "400",
  color: "#FFFFFF",
  border: "3px solid #000000",
  fontFamily: "Bungee, sans-serif",
  // margin: "8px 0 4px 0",
});

export {
  Header,
  LogoTextArea,
  LogoTextAreaWrapper,
  PopupTitle,
  PopupContent,
  PopupDescription,
  PopupLink,
  PopupSubTitle,
};
