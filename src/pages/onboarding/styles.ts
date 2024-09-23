import { Box, styled, Typography } from "@mui/material";

export const OnboardingScreenContainer = styled(Box)(({ theme }) => ({
  height: "calc(100vh - 80px)",
  alignItems: "center",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "rgba(0, 0, 0, 0.9)",
  padding: "32px 20px",
}));

export const SpaceBetween = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));
export const Label = styled(Typography)(({ theme }) => ({
  fontFamily: "Cabin Condensed",
  fontWeight: 500,
  fontSize: "16px",
  lineHeight: "20px",
  letterSpacing: "0.08em",
  color: "#FFB800",
}));
