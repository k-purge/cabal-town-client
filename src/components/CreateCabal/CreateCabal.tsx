import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import { Box, Button } from "@mui/material";
import { Label, SpaceBetween, VisuallyHiddenInput } from "./styles";
import { useInitData } from "@telegram-apps/sdk-react";
import { CardPreview } from "components/card";
import { DetailWrapper } from "components/form/styled";
import MinusIcon from "assets/icons/minus.svg";
import PlusIcon from "assets/icons/plus.svg";
import { Link as ReactRouterLink } from "react-router-dom";
import { StyledInput, StyledInputWrapper } from "components/form/input/styled";
import { OutlinedButton } from "components/Buttons";
import useNotification from "hooks/useNotification";
import { useNetwork } from "lib/hooks/useNetwork";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useNavigatePreserveQuery } from "lib/hooks/useNavigatePreserveQuery";
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
  const tgUserId = user?.id;
  const userName = user?.username;
  const fullName = user?.firstName + " " + user?.lastName;
  const nameToUse = userName || fullName;
  const userPhoto = user?.photoUrl;
  const [cabalName, setCabalName] = useState(nameToUse + "'s cabal");
  const [cabalSize, setCabalSize] = useState(1); // Add this state
  const [cabalImageUrl, setCabalImageUrl] = useState(userPhoto ?? "");
  const [imageFile, setImageFile] = useState<File | undefined>();

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
  const fileInput = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("event: ", event);
    const file = event.target.files?.[0];
    console.log("file: ", file);
    if (file) {
      setImageFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          setCabalImageUrl(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  async function deployContract() {
    console.log("deployContract");

    if (!imageFile) {
      showNotification(<>Please replace cabal image</>, "warning");
      return;
    }

    let imageUrl: string = "";

    try {
      const url = await axiosService.uploadFile(imageFile);
      if (url) imageUrl = url;
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
        showNotification(`Server Timeout, Please try again.`, "error");
        throw err;
      }
    }

    const data = {
      cabalName: cabalName,
      cabalSize: cabalSize,
      cabalImageUrl: imageUrl,
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
        imageUri: data.cabalImageUrl,
        lastSurvivors: cabalSize,
        masterAddress: Address.normalize(result),
        ownerAddress: process.env.REACT_APP_JETTON_OWNER!,
        creatorAddress: rawAddress,
        chain: network,
        walletAddress,
        tgUserId,
      };
      const res = await axiosService.insertJetton(jettonData);
      console.debug("res: ", res);

      if (res.status === 208) {
        // indicate duplicate record
        showNotification(`The cabal name has been used already.`, "warning");
        return;
      }

      analytics.sendEvent(
        AnalyticsCategory.DEPLOYER_PAGE,
        AnalyticsAction.DEPLOY,
        contractAddress.toFriendly(),
      );

      navigate(`${ROUTES.jetton}/${Address.normalize(result)}`);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
        showNotification(`Ton Testnet Timeout, Please try again.`, "error");
        throw err;
      }
    }
  }

  // Expose the getValue method through the ref
  useImperativeHandle(ref, () => ({
    getValue: () => ({ cabalName, cabalSize, cabalImageUrl }),
    deployContract,
  }));

  const onClickReplace = useCallback(() => {
    console.debug("onClickReplace");
    if (fileInput.current) {
      fileInput.current.click();
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        flex: "1 1 auto",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
      }}>
      <CardPreview imageUri={cabalImageUrl} name={cabalName} />
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
          <OutlinedButton sx={{ width: "50vw", maxWidth: "200px" }} onClick={onClickReplace}>
            <label>
              REPLACE
              <VisuallyHiddenInput
                ref={fileInput}
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
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
