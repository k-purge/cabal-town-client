import { LoadingButton } from "@mui/lab";
import { Box, Button, styled, Typography, TextField } from "@mui/material";

const StyledForm = styled("form")({
  overflow: "hidden",
});

const StyledFormInputs = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: 0,
  gap: 3,
});

const StyledActionBtn = styled(Box)({
  marginTop: 30,
  marginBottom: 10,
  marginLeft: "auto",
  marginRight: "auto",
  width: "100%",
  "& .base-button": {
    maxWidth: 150,
    width: "100%",
  },
});

const JettonFormTitle = styled(Typography)(({ theme }) => ({
  color: "#ffff",
  fontSize: 16,
  fontFamily: "Bungee, sans-serif",
  textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 3px 3px 1px #000",
  marginBottom: theme.spacing(2),
}));

const FormTitle = styled(Typography)(({ theme }) => ({
  color: "#ffff",
  fontSize: 16,
  marginBottom: 3,
  marginTop: 12,
}));

const FormButton = styled(Button)(({ theme }) => ({
  fontSize: 14,
  color: "#FFB800",
  fontFamily: "Bungee, Sans-Serif",
  border: "2px solid #FFB800",
  marginBlock: 12,
  borderRadius: 0,
}));

const FormWrapper = styled(Box)(({ theme }) => ({
  flex: 5,
  background: "#1E1E1E",
  border: "2px solid #000000",
  boxShadow: "2px 2px 0px 0px #000000",
  padding: "16px",
  marginBottom: 18,
}));

const DetailWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  gap: 3,

  "& button": {
    color: "#FFB800",
    border: "2px solid #FFB800",
    minWidth: 48,
    borderRadius: 0,
  },
}));

const DetailNumField = styled(TextField)({
  border: "2px solid #000000",
  background: "#fff",
  fontWeight: 500,
  width: "80%",

  "& input": {
    height: "48px",
    paddingBlock: "0",
    textAlign: "center",
  },
});

const SubmitButton = styled(LoadingButton)(({ theme }) => ({
  fontSize: 14,
  color: "#000000",
  background: "#FFB800",
  fontFamily: "Bungee, Sans-Serif",
  border: "2px solid #FFB800",
  marginBlock: 12,
  borderRadius: 0,
  width: "100%",

  "&:disabled, &:hover": {
    background: "#494846",
    color: "#727272",
    border: "none",
  },
}));

export {
  FormWrapper,
  FormButton,
  FormTitle,
  StyledForm,
  StyledFormInputs,
  StyledActionBtn,
  JettonFormTitle,
  DetailWrapper,
  DetailNumField,
  SubmitButton,
};
