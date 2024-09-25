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
