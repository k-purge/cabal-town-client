import { Box, styled, Typography } from "@mui/material";

const StyledTxLoaderContent = styled(Box)({
  textAlign: "center",
  "& p": {
    fontSize: 18,
    fontWeight: 500,
  },
});

const StyledContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "stretch",
  gap: 30,
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: 30,
  },
}));

const StyledDescription = styled(Box)(({ theme }) => ({
  position: "relative",
  background: "#fff",
  borderRadius: 16,
  border: "0.5px solid rgba(114, 138, 150, 0.24)",
  boxShadow: "0px 2px 16px rgb(114 138 150 / 8%)",

  "& p": {
    fontSize: 16,
    lineHeight: "24px",
  },
  [theme.breakpoints.down("md")]: {
    "& p": {
      fontSize: 14,
      lineHeight: "20px",
    },
  },
}));

const ScreenHeading = styled(Typography)(({ theme }) => ({
  color: "#ffff",
  fontSize: 32,
  fontFamily: "Bungee, sans-serif",
  textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 3px 3px 1px #000",
}));

const FormWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "stretch",
  gap: theme.spacing(5),
  marginTop: 9,
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
  },
}));

const SubHeadingWrapper = styled(Box)(({ theme }) => ({
  flex: 5,
  background: "#1E1E1E",
  border: "2px solid #000000",
  boxShadow: "2px 2px 0px 0px #000000",
  padding: "16px",
}));

const FormHeading = styled(Typography)(({ theme }) => ({
  color: "#ffff",
  fontSize: 16,
  fontFamily: "Bungee, sans-serif",
  textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 3px 3px 1px #000",
  marginBottom: theme.spacing(2),
}));

export {
  StyledDescription,
  StyledContainer,
  StyledTxLoaderContent,
  ScreenHeading,
  FormWrapper,
  SubHeadingWrapper,
  FormHeading,
};
