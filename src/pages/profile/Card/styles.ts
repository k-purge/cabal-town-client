import { Box, styled, Typography } from "@mui/material";

const CardContainer = styled(Box)(({ theme }) => ({
  background: "#1E1E1E",
  border: "2px solid #000000",
  boxShadow: "2px 2px 0px 0px #000000",
  padding: "12px",
  marginBottom: 18,

  width: "353px",
  height: "104px",
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

export { CardText, CardBody, CardHeader, CardContainer, CardImage, CardContent };
