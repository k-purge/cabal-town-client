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

const StyledCategory = styled(Box)(({ theme }) => ({
  width: "calc(50% - 15px)",
  padding: "20px 30px 30px 30px",
  [theme.breakpoints.down("lg")]: {
    width: "100%",
    padding: "20px 25px 20px 25px",
  },
}));

const StyledCategoryFields = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 20,
});

const StyledBlock = styled(StyledCategory)({
  boxShadow: "2px 2px 0px 0px #000000",
  border: "2px solid #000",
  background: "#1E1E1E",
  width: "353px",
  height: "394px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
});

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
  width: 101,
  height: 101,
  borderRadius: "50%",
  overflow: "hidden",
  background: "rgba(0,0,0, 0.1)",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  [theme.breakpoints.down("sm")]: {
    width: 60,
    height: 60,
    border: "2px solid #D9D9D9",
  },
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

export {
  StyledBlock,
  StyledTop,
  StyledTopImg,
  StyledTopText,
  StyledCategory,
  StyledCategoryFields,
  StyledContainer,
  StyledCardBody,
  StyledBottomText,
  BorderLinearProgress,
};
