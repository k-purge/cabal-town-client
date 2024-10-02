import { Box } from "@mui/material";
import { ContainedButton } from "components/Buttons";
import { CreateCabal, CreateCabalRef } from "components/CreateCabal";
import { useHeader } from "hooks/useHeader";
import { useEffect, useRef, useState } from "react";
import { getUrlParam } from "utils";
import { offchainFormSpec, onchainFormSpec } from "./data";

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
        padding: "0px 20px",
      }}>
      <Box sx={{ overflowY: "auto", flex: "1 1 auto", width: "100%", padding: "32px 0px" }}>
        <CreateCabal ref={cabalRef} />
      </Box>
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
