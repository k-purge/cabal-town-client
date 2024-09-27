import { styled } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const LoadingIcon = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress color="inherit" size="2rem" />
    </Box>
  );
};
