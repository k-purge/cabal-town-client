import { useEffect, useRef, useState } from "react";
import { Address } from "ton";
import { Box, Fade } from "@mui/material";
import { jettonDeployController, JettonDeployParams } from "lib/jetton-controller";
import { createDeployParams } from "lib/utils";
import { ContractDeployer } from "lib/contract-deployer";
import { Link as ReactRouterLink } from "react-router-dom";
import { ROUTES } from "consts";
import axiosService from "services/axios";
import WalletConnection from "services/wallet-connection";
import useNotification from "hooks/useNotification";
import analytics, { AnalyticsAction, AnalyticsCategory } from "services/analytics";
import { FormWrapper } from "./styles";
import { Screen, ScreenContent } from "components/Screen";
import { getUrlParam } from "utils";
import { offchainFormSpec, onchainFormSpec, gameDetailSpec } from "./data";
import { Form } from "components/form";
import { useNavigatePreserveQuery } from "lib/hooks/useNavigatePreserveQuery";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { IInsertJetton } from "store/jetton-list-store";
import { useNetwork } from "lib/hooks/useNetwork";
import useJettonStore from "store/jetton-store/useJettonStore";
import useUserStore from "store/user-store/useUserStore";
import { useHeader } from "hooks/useHeader";
import { CreateCabal, CreateCabalRef } from "components/CreateCabal";
import { ContainedButton } from "components/Buttons";

const DEFAULT_DECIMALS = 9;

const isOffchainInternal = getUrlParam("offchainINTERNAL") !== null;

const formSpec = isOffchainInternal ? offchainFormSpec : onchainFormSpec;

function DeployerPage() {
  const [isDeploying, setIsDeploying] = useState(false);
  const cabalRef = useRef<CreateCabalRef>(null);
  const onDeployCabal = async () => {
    try {
      setIsDeploying(true);
      await cabalRef.current?.deployContract();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeploying(false);
    }
  };

  const { setHeader } = useHeader();
  useEffect(() => {
    setHeader("CREATE CABAL", { showBackButton: false });
  }, [setHeader]);

  return (
    // <Screen>
    <Box
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.9)",

        width: "100%",
        height: "calc(100vh - 80px - 74px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 20px",
      }}>
      <CreateCabal ref={cabalRef} />
      <ContainedButton
        loading={isDeploying}
        sx={{ width: "100%", fontSize: "16px" }}
        onClick={onDeployCabal}>
        CREATE CABAL
      </ContainedButton>
    </Box>
    // </Screen>
  );
}

export { DeployerPage };
