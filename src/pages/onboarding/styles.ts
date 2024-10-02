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

export const DescriptionText = styled(Typography)(() => ({
  fontFamily: "Cabin Condensed",
  fontStyle: "normal",
  fontWeight: 600,
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "center",
  letterSpacing: "0.08em",
  color: "#FFFFFF",
}));

export const TitleText = styled(Typography)(() => ({
  fontFamily: "Bungee",
  fontStyle: "normal",
  fontWeight: 400,
  fontSize: "20px",
  lineHeight: "24px",
  textAlign: "center",
  letterSpacing: "0.04em",
  color: "#FFB800",
}));
