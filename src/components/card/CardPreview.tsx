import { Box } from "@mui/material";
import {
  CardBody,
  CardHeader,
  CardContainer,
  CardImage,
  CardOverlay,
  CardBodyNumber,
} from "./styles";
type CardPreviewProps = {
  imageUri: string;
  name: string;
};

export const CardPreview = ({ imageUri, name }: CardPreviewProps) => {
  return (
    <CardOverlay>
      <CardContainer>
        <CardImage>
          <img src={imageUri} alt="Logo" />
        </CardImage>
        <CardHeader>{name}</CardHeader>
        <Box
          display="flex"
          flexDirection={"row"}
          gap={"5px"}
          padding={"8px 12px"}
          justifyContent={"space-between"}>
          <Box display="flex" flexDirection={"column"}>
            <CardBody>7D Volume</CardBody>
            <CardBodyNumber>0 USD</CardBodyNumber>
          </Box>
          <Box display="flex" flexDirection={"column"}>
            <CardBody>Buy-in Price</CardBody>
            <CardBodyNumber>--</CardBodyNumber>
          </Box>
        </Box>
      </CardContainer>
    </CardOverlay>
  );
};
