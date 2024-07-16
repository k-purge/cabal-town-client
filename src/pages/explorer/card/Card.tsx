import { Box } from "@mui/material";
import { CardBody, CardHeader, CardContainer, CardImage } from "../styles";
import { IJetton } from "hooks/useJettonList";
import UserImg from "assets/icons/user.svg";

export const Card = ({ item }: { item: IJetton | undefined }) => {
  return (
    <CardContainer>
      <CardImage>
        <img src={item?.imageUri} alt="Logo" />
      </CardImage>
      <CardHeader>{item?.name}</CardHeader>
      <Box display="flex" flexDirection={"row"} gap={1}>
        <img src={UserImg} alt="user" />
        <CardBody>{item?.players} Players in game</CardBody>
      </Box>
    </CardContainer>
  );
};
