import { Box, styled, Typography } from "@mui/material";

const ScreenHeading = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontSize: 32,
  fontWeight: 800,
  fontFamily: "Bungee, sans-serif",
  textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 3px 3px 1px #000",
  "&:hover": {
    cursor: "pointer",
  },
}));

const ListContainer = styled(Box)(({ theme }) => ({
  marginTop: "24px",
  // background: "#1E1E1E",
  // border: "2px solid #000000",
  gap: "12px",
  display: "grid",
  justifyItems: "center",
  paddingBlock: "24px",
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "repeat(2, 1fr)", // 2 columns on small screens
  },
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(4, 1fr)", // 4 columns on medium screens and up
  },
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(6, 1fr)", // 6 columns on medium screens and up
  },
}));

const clipPathLarge = "12px";
const clipPathSmall = "6px";

const CardOverlay = styled(Box)(({ theme }) => ({
  background: "#FFB800",
  border: `${clipPathSmall} solid #FFB800`,
  alignItems: "center",
  justifyContent: "center",
  clipPath: `polygon(0 ${clipPathLarge}, ${clipPathSmall} ${clipPathLarge}, ${clipPathSmall} ${clipPathSmall}, ${clipPathLarge} ${clipPathSmall}, ${clipPathLarge} 0, calc(100% - ${clipPathLarge}) 0, calc(100% - ${clipPathLarge}) ${clipPathSmall}, calc(100% - ${clipPathSmall}) ${clipPathSmall}, calc(100% - ${clipPathSmall}) ${clipPathLarge}, calc(100% - ${clipPathLarge}) ${clipPathLarge}, 100% ${clipPathLarge}, 100% calc(100% - ${clipPathLarge}), calc(100% - ${clipPathSmall}) calc(100% - ${clipPathLarge}), calc(100% - ${clipPathSmall}) calc(100% - ${clipPathSmall}), calc(100% - ${clipPathLarge}) calc(100% - ${clipPathSmall}), calc(100% - ${clipPathLarge}) 100%, ${clipPathLarge} 100%, ${clipPathLarge} calc(100% - ${clipPathSmall}), ${clipPathSmall} calc(100% - ${clipPathSmall}), ${clipPathSmall} calc(100% - ${clipPathLarge}), 0 calc(100% - ${clipPathLarge}))`,
  zIndex: 0,
}));

const clipPath = "10.5px";
const CardContainer = styled(Box)(({ theme }) => ({
  clipPath: `polygon(0 ${clipPath},${clipPath} ${clipPath},${clipPath} 0,calc(100% - ${clipPath}) 0,calc(100% - ${clipPath}) ${clipPath},100% ${clipPath},100% calc(100% - ${clipPath}),calc(100% - ${clipPath}) calc(100% - ${clipPath}),calc(100% - ${clipPath}) 100%,${clipPath} 100%,${clipPath} calc(100% - ${clipPath}),0 calc(100% - ${clipPath}))`,
  background: "#1E1E1E",
  overflow: "hidden",
  width: "160px",
  height: "238px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  cursor: "pointer",
  textAlign: "left",
  position: "relative",
  zIndex: 1,
  "& > *": {
    alignSelf: "stretch",
  },
}));

const CardImage = styled(Box)(() => ({
  width: "160px",
  height: "160px",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "8px",
  background: "#000",
  border: "3px solid #000",
  clipPath: `polygon(0 ${clipPath},${clipPath} ${clipPath},${clipPath} 0,calc(100% - ${clipPath}) 0,calc(100% - ${clipPath}) ${clipPath},100% ${clipPath},100% calc(100% - ${clipPath}),calc(100% - ${clipPath}) calc(100% - ${clipPath}),calc(100% - ${clipPath}) 100%,${clipPath} 100%,${clipPath} calc(100% - ${clipPath}),0 calc(100% - ${clipPath}))`,

  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover", // This ensures the image covers the entire space
    clipPath: `polygon(0 ${clipPath},${clipPath} ${clipPath},${clipPath} 0,calc(100% - ${clipPath}) 0,calc(100% - ${clipPath}) ${clipPath},100% ${clipPath},100% calc(100% - ${clipPath}),calc(100% - ${clipPath}) calc(100% - ${clipPath}),calc(100% - ${clipPath}) 100%,${clipPath} 100%,${clipPath} calc(100% - ${clipPath}),0 calc(100% - ${clipPath}))`,
  },

  "& p": {
    textAlign: "start",
  },
}));

const CardHeader = styled(Typography)(() => ({
  fontSize: "14px",
  textAlign: "left",
  color: "#fff",
  padding: "0 12px", // Added padding
  letterSpacing: "0.08em",
}));

const CardBody = styled(Typography)(() => ({
  fontSize: "10px",
  lineHeight: "12px",
  fontWeight: 600,
  textAlign: "left",
  color: "#717B93",
  letterSpacing: "0.12em",
}));
const CardBodyNumber = styled(Typography)(() => ({
  color: "#fff",
  fontSize: "12px",
  fontWeight: 700,
  textAlign: "left",
  lineHeight: "15px",
}));

export {
  CardBodyNumber,
  CardBody,
  CardHeader,
  ListContainer,
  CardContainer,
  ScreenHeading,
  CardImage,
  CardOverlay, // Add this to the exports
};
