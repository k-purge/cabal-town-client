import { Box, styled, Typography } from "@mui/material";
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";

const StyledContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: 30,
  width: "100%",
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(1),
  },
}));

const StyledCategoryFields = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 20,
});

const StyledBlock = styled(Box)(({ height }: { height: string | number }) => ({
  boxShadow: "2px 2px 0px 0px #000000",
  border: "2px solid #000",
  background: "#1E1E1E",
  width: "100%",
  height,
  display: "flex",
  textAlign: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "20px 25px 20px 25px",
}));

const StyledTop = styled(Box)({
  display: "flex",
  gap: 20,
  marginBottom: 30,
});

const StyledTopText = styled(Box)({
  fontSize: 32,
  fontWeight: 400,
  color: "#fff",
  textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 3px 3px 1px #000",
  fontFamily: "Bungee, sans-serif",
});

const StyledTopImg = styled(Box)(({ theme }) => ({
  width: 200,
  height: 200,
  overflow: "hidden",
  background: "#C5C5C5",
  border: "4px solid #FFFFFF",
}));

const StyledCardBody = styled(Typography)(() => ({
  fontSize: "20px",
  color: "#767676",
}));

const StyledBottomText = styled(Box)({
  fontSize: 16,
  fontWeight: 600,
  color: "#fff",
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  marginTop: 15,
  marginInline: 10,
});

const BorderLinearProgress = styled(LinearProgress)(({ value }) => ({
  height: 15,
  width: "100%",
  boxShadow: "-3px 0 0 0 #fff, 3px 0 0 0 #fff, 0 -3px 0 0 #fff, 0 3px 0 0 #fff",
  marginTop: 10,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: "#1E1E1E",
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: "#04AA23",
    border: "3px solid #1E1E1E",
    width: `${value}%`,
    transform: "none !important",
  },
}));

const StyledBody = styled(Box)({
  width: "100%",
});

const StyledBodyBlock = styled(Box)(({ height }: { height: string | number }) => ({
  background: "#1E1E1E",
  width: "100%",
  height,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  marginBottom: "24px",
  paddingBottom: "12px",
}));

const StyledSelectBox = styled(Box)(() => ({
  paddingInline: "30px",
  paddingBlock: "18px",
  background: "#000",
}));

export {
  StyledSelectBox,
  StyledBody,
  StyledBodyBlock,
  StyledBlock,
  StyledTop,
  StyledTopImg,
  StyledTopText,
  StyledCategoryFields,
  StyledContainer,
  StyledCardBody,
  StyledBottomText,
  BorderLinearProgress,
};
