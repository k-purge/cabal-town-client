import { Box } from "@mui/material";
import { CardBody, CardHeader, CardContainer, CardImage } from "../styles";
import { IJetton } from "store/jetton-list-store/";
import UserImg from "assets/icons/user.svg";

export const Card = ({
  item,
  onClickCard,
}: {
  item: IJetton | undefined;
  onClickCard: (jetton: IJetton | undefined) => void;
}) => {
  return (
    <CardContainer onClick={() => onClickCard(item)}>
      <CardImage>
        <img src={item?.imageUri} alt="Logo" />
      </CardImage>
      <CardHeader>{item?.name}</CardHeader>
      <Box display="flex" flexDirection={"row"} gap={"5px"}>
        <img src={UserImg} alt="user" style={{ marginTop: "3px" }} />
        <CardBody>{item?.numOfPlayers} Players in game</CardBody>
      </Box>
    </CardContainer>
  );
};
