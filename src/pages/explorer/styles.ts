import { Box, styled, Typography } from "@mui/material";

const ScreenHeading = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontSize: 32,
  fontWeight: 800,
  fontFamily: "Bungee, sans-serif",
  textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 3px 3px 1px #000",
  "&:hover": {
    cursor: "pointer",
  },
}));

const ListContainer = styled(Box)(({ theme }) => ({
  marginTop: "24px",
  background: "#1E1E1E",
  border: "2px solid #000000",
  gap: "12px",
  display: "grid",
  justifyItems: "center",
  paddingBlock: "24px",
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)", // 2 columns on small screens
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(4, 1fr)", // 4 columns on medium screens and up
  },
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(6, 1fr)", // 4 columns on medium screens and up
  },
}));

const CardContainer = styled(Box)(({ theme }) => ({
  marginBottom: "24px",
  width: "152.5px",
  height: "197.5px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
  textAlign: "left", // Ensure text alignment is left within the card
  "& > *": {
    alignSelf: "stretch", // Ensure child elements take the full width
  },
}));

const CardImage = styled(Box)(() => ({
  border: "4px solid #FFFFFF",
  width: "152.5px",
  height: "152.5px",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "8px",

  "& img": {
    maxWidth: "100%",
    maxHeight: "100%",
  },

  "& p": {
    textAlign: "start",
  },
}));

const CardHeader = styled(Typography)(() => ({
  fontSize: "16px",
  textAlign: "left",
  color: "#fff",
}));

const CardBody = styled(Typography)(() => ({
  fontSize: "12px",
  textAlign: "left",
  color: "#24FF00",
  marginTop: "3px",
}));

export { CardBody, CardHeader, ListContainer, CardContainer, ScreenHeading, CardImage };
