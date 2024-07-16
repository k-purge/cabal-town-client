import { Box, IconButton, styled, Typography } from "@mui/material";

const LogoContainer = styled(Box)({
  position: "absolute",
  left: 18,
  top: 18,
});

const CloseMenuButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.primary.main,
  position: "absolute",
  right: 10,
  top: 10,
}));

const DrawerContent = styled(Box)(() => ({
  background: "#000",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 78,
  borderTop: "1px solid #FFB800",
  "& .logo": {
    flexDirection: "column",
  },
}));

const StyledGithubIcon = styled("img")({
  height: "100%",
  objectFit: "contain",
  padding: 0,
});

const AppMenu = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    width: "calc(100vw - 60px)",
    "& .connected-section": {
      order: 1,
      width: "100%",
      maxWidth: "unset",
      marginTop: 40,
      "& p": {
        maxWidth: "unset",
      },
    },
    "& .github-icon": {
      order: 4,
      marginTop: 40,
    },
    "& .custom-link": {
      order: 3,
      width: "100%",
      height: 35,
      "& .base-button": {
        width: "100%",
      },
    },
  },
}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
  color: "#fff",
  fontWeight: 400,
  fontSize: 20,
  fontFamily: "Bungee, sans-serif",
  alignSelf: "flex-start",
  cursor: "pointer",
  marginLeft: theme.spacing(2),
  marginTop: theme.spacing(3),
}));

export {
  LogoContainer,
  CloseMenuButton,
  DrawerContent,
  AppMenu,
  HeaderTypography,
  StyledGithubIcon,
};
