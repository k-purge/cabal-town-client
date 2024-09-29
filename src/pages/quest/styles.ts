import { Box, styled, Typography } from "@mui/material";

const StyledWrapper = styled(Box)(({ theme }) => ({
  flex: 5,
  background: "#1E1E1E",
  border: "2px solid #000000",
  boxShadow: "2px 2px 0px 0px #000000",
  padding: "16px",
  marginBlock: 12,
}));

const StyledHeading = styled(Typography)(({ theme }) => ({
  color: "#ffff",
  fontSize: 32,
  fontFamily: "Bungee, sans-serif",
  textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 3px 3px 1px #000",
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  color: "#ffff",
  fontSize: 16,
  fontFamily: "Bungee, sans-serif",
  textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 3px 3px 1px #000",
  marginBlock: 12,
}));

const StyledParagraph = styled(Typography)(({ theme }) => ({
  color: "#939393",
  fontSize: 14,
  marginBottom: 24,
}));

export { StyledWrapper, StyledHeading, StyledTitle, StyledParagraph };
