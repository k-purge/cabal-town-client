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
import { useHeader } from "hooks/useHeader";
import { Stat } from "./dataRow/statistics";

type SelctionType =
  | "BUY_AND_SELL"
  | "LOCK_AND_CLAIM"
  | "HOLDER_DISTRIBUTION"
  | "TRANSACTION_HISTORY"
  | "STATISTIC";

export const Jetton = () => {
  const { getJettonDetails, getJettonFromDb, getJettonHoldersTxns } = useJettonStore();
  const { isAddressEmpty, jettonAddress } = useJettonAddress();
  const { showNotification } = useNotification();
  const [type, setType] = useState<SelctionType>("BUY_AND_SELL");

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as SelctionType);
  };

  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader("Cabal Details", { showBackButton: true });
  }, [setHeader]);

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
      case "BUY_AND_SELL":
        return (
          <>
            <BuySell />
            {/* <GroupDescription /> */}
            <GroupDetail />
          </>
        );
      case "LOCK_AND_CLAIM":
        return (
          <>
            <LockClaim />
            <GroupDescription />
            <GroupDetail />
          </>
        );
      case "HOLDER_DISTRIBUTION":
        return <Holder />;
      case "TRANSACTION_HISTORY":
        return <Txn />;
      case "STATISTIC":
        return <Stat />;
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
