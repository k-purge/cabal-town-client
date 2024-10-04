import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

export const SpaceBetween = styled(Box)(({ theme }) => ({
  height: "48px",
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
export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 0,
});
