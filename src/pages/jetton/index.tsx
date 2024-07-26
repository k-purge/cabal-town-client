import { useState, useEffect } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { useTonAddress } from "@tonconnect/ui-react";
import { Screen, ScreenContent } from "components/Screen";
import { useJettonAddress } from "hooks/useJettonAddress";
import { Token } from "pages/jetton/dataRow/token";
import { Holder } from "pages/jetton/dataRow/holder";
import { BuySell } from "pages/jetton/dataRow/trade";
import { Txn } from "pages/jetton/dataRow/txn";
import { StyledContainer, StyledBody } from "pages/jetton/styled";
import { GroupDetail } from "./dataRow/trade/GroupDetail";
import { GroupDescription } from "./dataRow/trade/GroupDescription";
import useNotification from "hooks/useNotification";
import useJettonStore from "store/jetton-store/useJettonStore";
import FaultyDeploy from "./FaultyDeploy";
import SelectType from "./SelectType";
import { Chart } from "./dataRow/chart";

export const Jetton = () => {
  const { getJettonDetails } = useJettonStore();
  const { isAddressEmpty, jettonAddress } = useJettonAddress();
  const { showNotification } = useNotification();
  const address = useTonAddress();
  const [type, setType] = useState("1");

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  useEffect(() => {
    if (jettonAddress) {
      getJettonDetails();
    }
  }, [jettonAddress, address]);

  useEffect(() => {
    !isAddressEmpty && !jettonAddress && showNotification("Invalid jetton address", "error");
  }, []);

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
