import { Box, styled, Typography } from "@mui/material";

const CardContainer = styled(Box)(({ theme }) => ({
  background: "#1E1E1E",
  border: "2px solid #000000",
  boxShadow: "2px 2px 0px 0px #000000",
  // padding: "12px",
  width: "100%",
  height: "104px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
}));

const CardContentContainer = styled(Box)(({ theme }) => ({
  padding: "12px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
  "& > *": {
    alignSelf: "stretch", // Ensure child elements take the full width
  },
}));

const CardContent = styled(Box)(({ theme }) => ({
  width: "100%",
  alignItems: "center",
  marginLeft: "18px",
  textAlign: "left", // Ensure text alignment is left within the card
  "& > *": {
    alignSelf: "stretch", // Ensure child elements take the full width
  },
}));

const CardImage = styled(Box)(() => ({
  border: "2px solid #FFFFFF",
  width: "100px",
  height: "72px",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  "& img": {
    maxWidth: "100%",
    maxHeight: "100%",
  },

  "& p": {
    textAlign: "start",
  },
}));

const CardHeader = styled(Typography)(() => ({
  fontSize: "20px",
  fontFamily: "Bungee, sans-serif",
  color: "#fff",
}));

const CardBody = styled(Typography)(() => ({
  fontSize: "12px",
  color: "#767676",
  marginTop: "3px",
}));

const CardText = styled(Typography)(() => ({
  fontSize: "14px",
  color: "#ffff",
  marginTop: "3px",
}));

const CardOwnerText = styled(Typography)(() => ({
  fontFamily: "Bungee, sans-serif",
  fontWeight: 400,
  fontSize: "12px",
  lineHeight: "14.4px",
  backgroundColor: "#FFB800",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  writingMode: "vertical-rl" /* Makes the text run vertically */,
  textAlign: "center",
  width: "14px" /* Width of the yellow strip */,
  transform: "rotate(180deg)",
}));

export {
  CardText,
  CardBody,
  CardHeader,
  CardContentContainer,
  CardContainer,
  CardImage,
  CardContent,
  CardOwnerText,
};
