import { Box, Typography } from "@mui/material";
import {
  CardBody,
  CardHeader,
  CardContainer,
  CardImage,
  CardOverlay,
  CardBodyNumber,
} from "../styles";
import { IJetton } from "store/jetton-list-store/";

export const Card = ({
  item,
  onClickCard,
}: {
  item: IJetton | undefined;
  onClickCard: (jetton: IJetton | undefined) => void;
}) => {
  return (
    <CardOverlay>
      <CardContainer onClick={() => onClickCard(item)}>
        <CardImage>
          <img src={item?.imageUri} alt="Logo" />
        </CardImage>
        <CardHeader>{item?.name}</CardHeader>
        <Box
          display="flex"
          flexDirection={"row"}
          gap={"5px"}
          padding={"8px 12px"}
          justifyContent={"space-between"}>
          {/* <img src={UserImg} alt="user" style={{ marginTop: "3px" }} /> */}
          {/* <CardBody>{item?.numOfPlayers} Players in game</CardBody> */}
          <Box display="flex" flexDirection={"column"}>
            <CardBody>Members</CardBody>
            <CardBodyNumber>{item?.numOfPlayers}</CardBodyNumber>
          </Box>
          <Box display="flex" flexDirection={"column"}>
            <CardBody>Buy-in Price</CardBody>
            <CardBodyNumber>${item?.numOfPlayers ?? 0}00</CardBodyNumber>
          </Box>
        </Box>
      </CardContainer>
    </CardOverlay>
  );
};
