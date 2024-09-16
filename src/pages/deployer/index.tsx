import { useEffect, useState } from "react";
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

const DEFAULT_DECIMALS = 9;

const isOffchainInternal = getUrlParam("offchainINTERNAL") !== null;

const formSpec = isOffchainInternal ? offchainFormSpec : onchainFormSpec;

function DeployerPage() {
  const { showNotification } = useNotification();
  const { network } = useNetwork();
  const walletAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  const [tonconnect] = useTonConnectUI();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigatePreserveQuery();
  const { reset } = useJettonStore();
  const { tgUserId } = useUserStore();

  useEffect(() => {
    reset();
  }, [reset]);

  async function deployContract(data: any) {
    if (!walletAddress || !tonconnect) {
      throw new Error("Wallet not connected");
    }

    // TODO
    // assume all decimals are 9
    let decimals = DEFAULT_DECIMALS;
    const owner = Address.parse(process.env.REACT_APP_JETTON_OWNER!);

    const params: JettonDeployParams = {
      owner,
      deployer: Address.parse(walletAddress),
      onchainMetaData: {
        name: data.name,
        symbol: data.symbol,
        image: data.tokenImage,
        description: data.description,
        decimals: decimals.toFixed(0),
      },
      offchainUri: data.offchainUri,
    };

    setIsLoading(true);
    const deployParams = createDeployParams(params, data.offchainUri);
    const contractAddress = new ContractDeployer().addressForContract(deployParams);

    const isDeployed = await WalletConnection.isContractDeployed(contractAddress);

    if (isDeployed) {
      showNotification(
        <>
          Contract already deployed,{" "}
          <ReactRouterLink to={`${ROUTES.jetton}/${Address.normalize(contractAddress)}/`}>
            View contract
          </ReactRouterLink>
        </>,
        "warning",
      );
      setIsLoading(false);
      return;
    }

    try {
      const result = await jettonDeployController.createJetton(params, tonconnect, walletAddress);

      const jettonData: IInsertJetton = {
        name: data.name,
        imageUri: data.tokenImage,
        lastSurvivors: data.numOfSurvivors,
        masterAddress: Address.normalize(result),
        ownerAddress: process.env.REACT_APP_JETTON_OWNER!,
        creatorAddress: rawAddress,
        chain: network,
        walletAddress,
        tgUserId,
      };
      await axiosService.insertJetton(jettonData);

      analytics.sendEvent(
        AnalyticsCategory.DEPLOYER_PAGE,
        AnalyticsAction.DEPLOY,
        contractAddress.toFriendly(),
      );

      navigate(`${ROUTES.jetton}/${Address.normalize(result)}`);
    } catch (err) {
      if (err instanceof Error) {
        showNotification(`Ton Testnet Timeout, Please try again.`, "error");
      }
    } finally {
      setIsLoading(false);
    }
  }
  const { setHeader } = useHeader();
  useEffect(() => {
    setHeader("CREATE CABAL", { showBackButton: false });
  }, [setHeader]);

  return (
    <Screen>
      <ScreenContent removeBackground>
        <Fade in>
          <Box>
            <FormWrapper>
              <Form
                isLoading={isLoading}
                submitText="Create cabal"
                onSubmit={deployContract}
                inputs={formSpec}
                gameDetailInputs={gameDetailSpec}
              />
            </FormWrapper>
          </Box>
        </Fade>
      </ScreenContent>
    </Screen>
  );
}

export { DeployerPage };
