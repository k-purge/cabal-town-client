import { Box, styled, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const CardContainer = styled(Box)(({ theme }) => ({
  background: "#1E1E1E",
  border: "2px solid #000000",
  boxShadow: "2px 2px 0px 0px #000000",
  padding: "24px 16px 24px 16px",
  marginBottom: 18,
  width: "353px",
  height: "163px",
  display: "flex",
  justifyContent: "space-between",
  gap: "24px",
  alignItems: "center",
  cursor: "pointer",
  "& > *": {
    alignSelf: "stretch", // Ensure child elements take the full width
  },
}));

const CardContent = styled(Box)(({ theme }) => ({
  width: "100%",
  alignItems: "center",
  textAlign: "center", // Ensure text alignment is left within the card
  "& > *": {
    alignSelf: "stretch", // Ensure child elements take the full width
  },
}));

const CardText = styled(Typography)(() => ({
  fontFamily: "Cabin Condensed",
  fontSize: "16px",
  color: "#ffff",
  marginTop: "3px",
  fontWeight: 600,
}));

const SubmitButton = styled(LoadingButton)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  fontSize: 16,
  color: "#000000",
  background: "#FFB800",
  fontFamily: "Bungee, Sans-Serif",
  border: "2px solid #FFB800",
  marginBlock: 12,
  borderRadius: 0,
  width: "100%",
  padding: "12px",
  "&:disabled, &:hover": {
    background: "#494846",
    color: "#727272",
    border: "2px solid #494846",
  },
}));

export { CardText, CardContainer, CardContent, SubmitButton };
