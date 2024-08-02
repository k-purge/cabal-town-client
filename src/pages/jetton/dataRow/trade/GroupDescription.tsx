import { StyledBlock } from "pages/jetton/styled";
import { Box, Typography } from "@mui/material";
import { BoxConainer } from "./styled";
import useJettonStore from "store/jetton-store/useJettonStore";

export const GroupDescription = () => {
  const { description } = useJettonStore();

  return (
    <StyledBlock height="100%" marginBottom={3}>
      <>
        <Box width="341px" textAlign="start" mb={1}>
          <Typography sx={{ color: "#fff", fontSize: "16px", fontFamily: "Bungee, sans-serif" }}>
            GROUP DESCRIPTION
          </Typography>
        </Box>

        <BoxConainer>
          <Typography sx={{ color: "#fff", fontSize: "16px", fontWeight: 500 }}>
            {description}
          </Typography>
        </BoxConainer>
      </>
    </StyledBlock>
  );
};
