import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Label, SpaceBetween, VisuallyHiddenInput } from "./styles";
import { useInitData } from "@telegram-apps/sdk-react";
import { CardPreview } from "components/card";
import { DetailWrapper, DetailNumField } from "components/form/styled";
import MinusIcon from "assets/icons/minus.svg";
import PlusIcon from "assets/icons/plus.svg";
import { Link as ReactRouterLink } from "react-router-dom";
import { StyledInput, StyledInputWrapper } from "components/form/input/styled";
import { OutlinedButton } from "components/Buttons";
import useNotification from "hooks/useNotification";
import { useNetwork } from "lib/hooks/useNetwork";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useNavigatePreserveQuery } from "lib/hooks/useNavigatePreserveQuery";
import useJettonStore from "store/jetton-store/useJettonStore";
import useUserStore from "store/user-store/useUserStore";
import { jettonDeployController, JettonDeployParams } from "lib/jetton-controller";
import { Address } from "ton";
import { createDeployParams } from "lib/utils";
import { ContractDeployer } from "lib/contract-deployer";
import WalletConnection from "services/wallet-connection";
import { ROUTES } from "consts";
import { IInsertJetton } from "store/jetton-list-store";
import axiosService from "services/axios";
import analytics, { AnalyticsAction, AnalyticsCategory } from "services/analytics";
const DEFAULT_DECIMALS = 9;

// Define the ref type
type CreateCabalData = {
  cabalName: string;
  cabalSize: number;
  cabalImageUrl: string;
};
export interface CreateCabalRef {
  getValue: () => CreateCabalData;
  deployContract: () => Promise<void>;
}
type CreateCabalProps = {};

export const CreateCabal = forwardRef<CreateCabalRef, CreateCabalProps>((props, ref) => {
  const initData = useInitData();
  const user = initData?.user;
  const userName = user?.username;
  const fullName = user?.firstName + " " + user?.lastName;
  const nameToUse = userName || fullName;
  const userPhoto = user?.photoUrl;
  const [cabalName, setCabalName] = useState(nameToUse + "'s cabal");
  const [cabalSize, setCabalSize] = useState(1); // Add this state
  // todo: handle image
  const [cabalImageUrl, setCabalImageUrl] = useState("");

  const onEditAmt = (newValue: number) => {
    setCabalSize(Math.max(1, newValue)); // Ensure cabal size is at least 1
  };

  const onChangeAmt = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      setCabalSize(Math.max(1, newValue));
    }
  };
  const { showNotification } = useNotification();
  const { network } = useNetwork();
  const walletAddress = useTonAddress();
  const rawAddress = useTonAddress(false);
  const [tonconnect] = useTonConnectUI();
  const navigate = useNavigatePreserveQuery();
  const { reset } = useJettonStore();
  const { tgUserId } = useUserStore();

  // useEffect(() => {
  //   reset();
  // }, [reset]);

  async function deployContract() {
    console.log("deployContract");
    const data = {
      cabalName: cabalName,
      cabalSize: cabalSize,
      cabalImageUrl: cabalImageUrl,
      offchainUri: "",
    };
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
        name: data.cabalName,
        // todo
        symbol: data.cabalName.slice(0, 6),
        image: data.cabalImageUrl,
        // description: data.description,
        decimals: decimals.toFixed(0),
      },
      // todo
      // offchainUri: data.offchainUri,
    };

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
      return;
    }

    try {
      const result = await jettonDeployController.createJetton(params, tonconnect, walletAddress);

      const jettonData: IInsertJetton = {
        name: cabalName,
        imageUri: cabalImageUrl,
        lastSurvivors: cabalSize,
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
    }
  }

  // Expose the getValue method through the ref
  useImperativeHandle(ref, () => ({
    getValue: () => ({ cabalName, cabalSize, cabalImageUrl }),
    deployContract,
  }));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        flex: 1,
        alignItems: "center",
        width: "100%",
      }}>
      <CardPreview imageUri={userPhoto ?? ""} name={cabalName} />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          marginTop: "24px",
        }}>
        <SpaceBetween>
          <Label>Cabal Image</Label>
          <OutlinedButton sx={{ width: "50vw", maxWidth: "200px" }}>
            <label>
              REPLACE
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => console.log(event.target.files)}
              />
            </label>
          </OutlinedButton>
        </SpaceBetween>
        <SpaceBetween>
          <Label>Cabal Name</Label>
          <StyledInputWrapper sx={{ width: "50vw", maxWidth: "200px" }}>
            <StyledInput
              value={cabalName}
              onChange={(event) => setCabalName(event.target.value)}
              placeholder={"Cabal Name"}
              type={"text"}
            />
          </StyledInputWrapper>
        </SpaceBetween>
        <SpaceBetween>
          <Label>Cabal Size</Label>
          <DetailWrapper sx={{ width: "50vw", maxWidth: "200px", gap: "12px" }}>
            <Button onClick={() => onEditAmt(cabalSize - 1)}>
              <img alt={"MinusIcon"} src={MinusIcon} />
            </Button>
            <StyledInputWrapper>
              <StyledInput sx={{ textAlign: "center" }} value={cabalSize} onChange={onChangeAmt} />
            </StyledInputWrapper>

            <Button onClick={() => onEditAmt(cabalSize + 1)}>
              <img alt={"PlusIcon"} src={PlusIcon} />
            </Button>
          </DetailWrapper>
        </SpaceBetween>
      </Box>
    </Box>
  );
});
