import { Box } from "@mui/material";
import { CardText, CardBody, CardHeader, CardContainer, CardContent, CardImage } from "./styles";
import { IJetton } from "store/jetton-list-store/";
import { useMemo } from "react";
import { DECIMAL_SCALER } from "consts";
import UserIcon from "components/icons/User.icon";

export const Card = ({
  item,
  onClickCard,
}: {
  item: IJetton | undefined;
  onClickCard: (jetton: IJetton | undefined) => void;
}) => {
  const balance = useMemo(() => {
    if (item?.holders?.length) {
      return (parseInt(item.holders[0]?.balance) / DECIMAL_SCALER).toLocaleString();
    }
  }, [item?.holders]);

  return (
    <CardContainer onClick={() => onClickCard(item)}>
      <CardImage>
        <img src={item?.imageUri} alt="Logo" />
      </CardImage>
      <CardContent>
        <CardHeader>{item?.name}</CardHeader>
        <Box display="flex" flexDirection={"row"} gap={"5px"}>
          <UserIcon color="#767676" />
          <CardBody>{item?.holders?.length} Players in game</CardBody>
        </Box>
        <CardText>Amount: {balance}</CardText>
      </CardContent>
    </CardContainer>
  );
};
