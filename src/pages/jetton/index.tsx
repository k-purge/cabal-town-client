import { useState, useEffect } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { Screen, ScreenContent } from "components/Screen";
import { useJettonAddress } from "hooks/useJettonAddress";
import { Token } from "pages/jetton/dataRow/token";
import { Holder } from "pages/jetton/dataRow/holder";
import { BuySell } from "pages/jetton/dataRow/trade";
import { LockClaim } from "./dataRow/trade/LockClaim";
import { Txn } from "pages/jetton/dataRow/txn";
import { StyledContainer, StyledBody } from "pages/jetton/styled";
import { GroupDetail } from "./dataRow/trade/GroupDetail";
import { GroupDescription } from "./dataRow/trade/GroupDescription";
import { Chart } from "./dataRow/chart";
import useNotification from "hooks/useNotification";
import useJettonStore from "store/jetton-store/useJettonStore";
import FaultyDeploy from "./FaultyDeploy";
import SelectType from "./SelectType";

export const Jetton = () => {
  const { getJettonDetails, getJettonFromDb, getJettonHoldersTxns } = useJettonStore();
  const { isAddressEmpty, jettonAddress } = useJettonAddress();
  const { showNotification } = useNotification();
  const [type, setType] = useState("1");

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  useEffect(() => {
    if (jettonAddress) {
      getJettonFromDb();
      getJettonDetails();
      getJettonHoldersTxns();
    }
  }, [jettonAddress, getJettonDetails, getJettonFromDb, getJettonHoldersTxns]);

  useEffect(() => {
    !isAddressEmpty && !jettonAddress && showNotification("Invalid jetton address", "error");
  }, [isAddressEmpty, jettonAddress, showNotification]);

  const renderSwitch = () => {
    switch (type) {
      case "1":
        return (
          <>
            <BuySell />
            <GroupDescription />
            <GroupDetail />
          </>
        );
      case "2":
        return (
          <>
            <LockClaim />
            <GroupDescription />
            <GroupDetail />
          </>
        );
      case "3":
        return <Holder />;
      default:
        return <Txn />;
    }
  };

  return (
    <Screen>
      <FaultyDeploy />
      <ScreenContent>
        <StyledContainer>
          <Token />
          <Chart />
          <StyledBody>
            <SelectType type={type} handleChange={handleChange} />
            {renderSwitch()}
          </StyledBody>
        </StyledContainer>
      </ScreenContent>
    </Screen>
  );
};
