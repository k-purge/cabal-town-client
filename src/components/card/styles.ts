import { Box, styled, Typography } from "@mui/material";

const clipPathLarge = "12px";
const clipPathSmall = "6px";

const CardOverlay = styled(Box)(({ theme }) => ({
  background: "#FFB800",
  border: `5px solid #FFB800`,
  alignItems: "center",
  justifyContent: "center",
  clipPath: `polygon(0 ${clipPathLarge}, ${clipPathSmall} ${clipPathLarge}, ${clipPathSmall} ${clipPathSmall}, ${clipPathLarge} ${clipPathSmall}, ${clipPathLarge} 0, calc(100% - ${clipPathLarge}) 0, calc(100% - ${clipPathLarge}) ${clipPathSmall}, calc(100% - ${clipPathSmall}) ${clipPathSmall}, calc(100% - ${clipPathSmall}) ${clipPathLarge}, calc(100% - ${clipPathLarge}) ${clipPathLarge}, 100% ${clipPathLarge}, 100% calc(100% - ${clipPathLarge}), calc(100% - ${clipPathSmall}) calc(100% - ${clipPathLarge}), calc(100% - ${clipPathSmall}) calc(100% - ${clipPathSmall}), calc(100% - ${clipPathLarge}) calc(100% - ${clipPathSmall}), calc(100% - ${clipPathLarge}) 100%, ${clipPathLarge} 100%, ${clipPathLarge} calc(100% - ${clipPathSmall}), ${clipPathSmall} calc(100% - ${clipPathSmall}), ${clipPathSmall} calc(100% - ${clipPathLarge}), 0 calc(100% - ${clipPathLarge}))`,
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
  border: "4px solid #000",
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
  flex: 1,
  fontSize: "14px",
  textAlign: "left",
  color: "#fff",
  padding: "0 12px", // Added padding
  letterSpacing: "0.08em",
  height: "21px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
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

export { CardOverlay, CardContainer, CardImage, CardHeader, CardBody, CardBodyNumber };
