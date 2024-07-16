import React, { useState } from "react";
import {
  StyledBlock,
  StyledCategoryFields,
  StyledTop,
  StyledTopImg,
  StyledTopText,
  StyledCardBody,
  StyledBottomText,
  BorderLinearProgress,
} from "pages/jetton/styled";
import LoadingImage from "components/LoadingImage";
import LoadingContainer from "components/LoadingContainer";
import { Box, Tooltip, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import {
  adminActions,
  getAdminMessage,
  getFaultyMetadataWarning,
  getMetadataWarning,
  getTotalSupplyWarning,
  totalSupplyActions,
} from "pages/jetton/util";
import { DataRow } from "pages/jetton/dataRow/DataRow";
import BigNumberDisplay from "components/BigNumberDisplay";
import UpdateMetadata from "pages/jetton/actions/UpdateMetadata";
import useJettonStore from "store/jetton-store/useJettonStore";
import { AppHeading } from "components/appHeading";
import brokenImage from "assets/icons/question.png";
import { AppButton } from "components/appButton";
import pen from "assets/icons/pen.svg";
import { CenteringWrapper } from "components/footer/styled";
import UserImg from "assets/icons/user.svg";
import SelectType from "./SelectType";

export const BuySell = () => {
  const {
    jettonImage,
    adminAddress,
    isAdmin,
    adminRevokedOwnership,
    symbol,
    name,
    description,
    jettonMaster,
    persistenceType,
    totalSupply,
    jettonWalletAddress,
    isJettonDeployerFaultyOnChainData,
    jettonLoading,
    decimals,
    isImageBroken,
  } = useJettonStore();
  const [openEdit, setOpenEdit] = useState(false);

  return (
    <StyledBlock>
      <>
        <SelectType />
        <StyledTopText onClick={() => setOpenEdit(true)}>{name}</StyledTopText>
        <LoadingImage
          src={!isImageBroken ? jettonImage : brokenImage}
          alt="jetton image"
          loading={jettonLoading}
        />
        <Box display="flex" flexDirection={"row"} gap={1}>
          <img src={UserImg} alt="user" width={"16px"} />
          <StyledCardBody>{100} Players in game</StyledCardBody>
        </Box>

        <StyledBottomText>
          <Typography>Game Initiation Progress</Typography>
          <Typography>50%</Typography>
        </StyledBottomText>

        <BorderLinearProgress variant="determinate" value={50} />
      </>
    </StyledBlock>
  );
};
