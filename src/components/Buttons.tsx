import styled from "@emotion/styled";
import { Button } from "@mui/material";

const primary = "#FFB800";
const BaseButton = styled(Button)(({ theme }) => ({
  height: "40px",
  minWidth: "auto",
  whiteSpace: "nowrap",
  marginRight: "8px",
  borderRadius: "0px",
  padding: "13px 20px",
  letterSpacing: "0.04em",
  fontFamily: "Bungee, sans-serif",
  boxShadow: "3px 3px 0px  #000000",
  fontSize: "12px",
  fontWeight: 400,
  lineHeight: "14.4px",
  border: `2px solid ${primary}`,
  "&:last-child": {
    marginRight: 0,
  },
}));

export const ContainedButton = styled(BaseButton)(({ theme }) => ({
  backgroundColor: primary,
  color: "#000",
  "&:hover": {
    backgroundColor: primary,
  },
}));

export const OutlinedButton = styled(BaseButton)(({ theme }) => ({
  backgroundColor: "#000",
  color: primary,
  "&:hover": {
    backgroundColor: "#000",
  },
}));
