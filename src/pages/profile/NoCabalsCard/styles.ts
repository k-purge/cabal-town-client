import { Box, styled, Typography } from "@mui/material";
import Button from "@mui/material/Button";

const CardContainer = styled(Box)(({ theme }) => ({
  background: "#1E1E1E",
  border: "2px solid #000000",
  boxShadow: "2px 2px 0px 0px #000000",
  padding: "24px 16px 24px 16px",
  width: "100%",
  // width: "353px",
  alignItems: "center",
  cursor: "pointer",
  "& > *": {
    alignSelf: "stretch", // Ensure child elements take the full width
  },
}));

const CardContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  width: "100%",
  alignItems: "center",
  textAlign: "center", // Ensure text alignment is left within the card
  "& > *": {
    alignSelf: "stretch", // Ensure child elements take the full width
  },
}));

const CardTitle = styled(Typography)(() => ({
  fontFamily: "Bungee, Sans-Serif",
  fontSize: "16px",
  fontWeight: 400,
}));

const CardText = styled(Typography)(() => ({
  fontFamily: "Cabin Condensed",
  fontSize: "14px",
  color: "#ffff",
  fontWeight: 400,
}));

const ExploreButton = styled(Button)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  fontSize: 16,
  color: "#000000",
  background: "#FFB800",
  fontFamily: "Bungee, Sans-Serif",
  borderRadius: 0,
  width: "100%",
  padding: "12px",
  "&:disabled, &:hover": {
    background: "#494846",
    color: "#727272",
    border: "2px solid #494846",
  },
}));

export { CardTitle, CardText, CardContainer, CardContent, ExploreButton };
