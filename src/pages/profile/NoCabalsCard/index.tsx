import { Box, styled, Typography } from "@mui/material";
import { CardTitle, CardText, CardContainer, CardContent, ExploreButton } from "./styles";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "consts";

export const NoCabalsCard = (): JSX.Element => {
  const navigate = useNavigate();

  const open = () => {
    navigate(ROUTES.explorer);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
        width: "100%",
        color: "white",
      }}>
      <CardContainer>
        <CardContent>
          <CardTitle>No Cabals Found</CardTitle>
          <CardText>Start exploring for cabals</CardText>
          <ExploreButton onClick={open}>Explore</ExploreButton>
        </CardContent>
      </CardContainer>
    </Box>
  );
};
