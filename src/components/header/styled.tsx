import { AppBar, styled } from "@mui/material";
import { Box } from "@mui/system";

const HeaderWrapper = styled(AppBar)(({ theme }) => ({
  gap: "0px",
  width: "393px",
  minWidth: "100%",
  height: "80px",
  border: "0px 0px 1px 0px",
  justify: "space-between",
  justifyContent: "center",
  borderBottom: "1px solid #FFB800",
  background: "#000000",
  position: "sticky",
  top: 0,
  zIndex: 9,
}));

const HeaderContent = styled(Box)(({ theme }) => ({
  width: "100%",
  margin: "0 auto",
  paddingLeft: "20px",
  display: "flex",
  alignItems: "center",
}));

const HeaderOptionalContent = styled(Box)(({ theme }) => ({
  flex: 0,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "100%",
}));

const HeaderRight = styled(Box)(({ theme }) => ({
  flex: 0,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  maxWidth: "50%",
}));

export { HeaderRight, HeaderWrapper, HeaderContent, HeaderOptionalContent };
