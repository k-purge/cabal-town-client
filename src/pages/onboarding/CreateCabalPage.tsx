import { OnboardingStep } from ".";
import { useEffect, useRef, useState } from "react";
import { useHeader } from "hooks/useHeader";
import { OnboardingScreenContainer } from "./styles";
import { Screen } from "../../components/Screen";
import { CreateCabal, CreateCabalRef } from "components/CreateCabal";
import { Box, Typography } from "@mui/material";
import { ContainedButton, OutlinedButton } from "components/Buttons";

export function CreateCabalPage({ setStep }: { setStep: (step: OnboardingStep) => void }) {
  const { setHeader } = useHeader();
  const createCabalRef = useRef<CreateCabalRef>(null);
  useEffect(() => {
    setHeader("CREATE YOUR CABAL", {
      showBackButton: true,
      showAvatar: false,
      onBackButtonClick: () => setStep("intro"),
    });
  }, [setHeader, setStep]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateCabal = async () => {
    const { cabalName, cabalSize, cabalImageUrl } = createCabalRef.current?.getValue() ?? {};
    console.log(cabalName, cabalSize, cabalImageUrl);

    try {
      setIsLoading(true);
      await createCabalRef.current?.deployContract();
      setStep("success");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Screen>
      <OnboardingScreenContainer>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flex: 1,
          }}>
          <Typography
            sx={{
              fontFamily: "Cabin Condensed",
              fontStyle: "normal",
              fontWeight: 600,
              fontSize: "14px",
              lineHeight: "24px",
              letterSpacing: "0.08em",
              color: "#FFFFFF",
              textAlign: "center",
              marginBottom: "30px",
            }}>
            Each cabal has its own cabal credit. Creating one generates your cabal credit on the
            blockchain. Let others buy in and earn fees as you grow.
          </Typography>
          <CreateCabal ref={createCabalRef} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "24px",
              width: "100%",
              alignItems: "flex-end",
              flexGrow: 1,
            }}>
            <OutlinedButton
              sx={{
                width: "40vw",
                maxWidth: "160px",
              }}
              onClick={() => setStep("success")}>
              LATER
            </OutlinedButton>
            <ContainedButton
              sx={{
                width: "40vw",
                maxWidth: "160px",
              }}
              loading={isLoading}
              onClick={handleCreateCabal}>
              CREATE CABAL
            </ContainedButton>
          </Box>
        </Box>
      </OnboardingScreenContainer>
    </Screen>
  );
}
