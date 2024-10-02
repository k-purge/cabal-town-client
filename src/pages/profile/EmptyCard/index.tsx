import { Box } from "@mui/material";
import { CardText, CardContainer, CardContent, SubmitButton } from "./styles";
import walletIcon from "assets/icons/wallet.svg";
import { useTonConnectModal } from "@tonconnect/ui-react";

interface EmptyCardProps {
  isLoading?: boolean;
}

export const EmptyCard = () => {
  const { open } = useTonConnectModal();

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
          <Box>
            <CardText>Your Portfolio is Empty.</CardText>
            <CardText>You should connect your wallet.</CardText>
            <SubmitButton onClick={open}>
              <img src={walletIcon} alt="wallet" />
              Connect
            </SubmitButton>
          </Box>
        </CardContent>
      </CardContainer>
    </Box>
  );
};
