import { Box, Button, styled, Typography } from "@mui/material";

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
  // marginTop: "24px",
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

const ButtonContainer = styled(Box)({
  display: "flex",
  overflowX: "auto",
  overflowY: "auto",
  height: "50px",

  marginBottom: "16px",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  scrollbarWidth: "none",
});

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
  border: `2px solid ${theme.palette.primary.main}`,
  "&:last-child": {
    marginRight: 0,
  },
}));

const SelectedButton = styled(BaseButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const UnselectedButton = styled(BaseButton)(({ theme }) => ({
  backgroundColor: "#000",
  color: theme.palette.primary.main,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));
export { ListContainer, ScreenHeading, SelectedButton, UnselectedButton, ButtonContainer };
