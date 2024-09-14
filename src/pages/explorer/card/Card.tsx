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
  const basePrice = 0.0016;
  const variation = 0.22; // 22% variation
  const randomFactor = Math.random() * 2 - 1; // Random number between -1 and 1
  const buyInPrice = basePrice * (1 + variation * randomFactor);
  const isIncreasing = randomFactor > 0;
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
            <CardBodyNumber>
              ${buyInPrice.toFixed(5)}
              <span
                style={{
                  marginLeft: "4px",
                  color: isIncreasing ? "#3FF400" : "#FF0000",
                }}>
                ({isIncreasing ? "+" : "-"}20%)
              </span>
            </CardBodyNumber>
          </Box>
        </Box>
      </CardContainer>
    </CardOverlay>
  );
};
