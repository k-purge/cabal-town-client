import { Box, styled, Typography } from "@mui/material";
import { CardTitle, CardText, CardContainer, CardContent, ExploreButton } from "./styles";

export const NoCabalsCard = (): JSX.Element => {
  const open = () => {
    console.log("Go to homepage");
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
