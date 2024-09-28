import { Box, styled } from "@mui/material";

const StyledContainer = styled(Box)({
  width: "100%",
  overflow: "auto",
});

const StyledInputContainer = styled(Box)(({ error }: { error: boolean }) => ({
  display: "flex",
  alignItems: "center",
  border: error ? "2.5px solid red" : "0.5px solid rgba(114, 138, 150, 0.16)",
  transition: "0.2s all",
  "& .base-button": {
    height: "calc(100% - 10px)",
    padding: "0px 15px",
    fontSize: 12,
  },
}));

const StyledInputWrapper = styled(Box)({
  backgroundColor: "#F7F9FB",
  width: "100%",
  height: "48px",
});

const StyledInput = styled("input")({
  flex: 1,
  width: "100%",
  height: "100%",
  border: "unset",
  padding: "0px 16px",
  // textIndent: 16,
  background: "transparent",
  outline: "none",
  color: "#000",
  fontFamily: "Cabin Condensed",
  fontSize: 16,
  caretColor: "#728A96",
  letterSpacing: "0.08em",
  "&::placeholder": {
    color: "#728A96",
    fontFamily: "Cabin Condensed",
    transition: "0.2s all",
  },
  "&:focus": {
    "&::placeholder": {
      opacity: 0,
    },
  },
});

export { StyledInputWrapper, StyledInput, StyledInputContainer, StyledContainer };
