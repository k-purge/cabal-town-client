import { Box, TextField, Typography } from "@mui/material";
import { OnboardingStep } from ".";
import { useEffect } from "react";
import { useHeader } from "hooks/useHeader";
import { OnboardingScreenContainer, Label, SpaceBetween } from "./styles";
import { Screen } from "../../components/Screen";
import { useInitData } from "@telegram-apps/sdk-react";
import { CardPreview } from "components/card";
import { ContainedButton, OutlinedButton } from "components/Buttons";

export function CreateCabalPage({ setStep }: { setStep: (step: OnboardingStep) => void }) {
  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader("CREATE YOUR CABAL", { showBackButton: false, showAvatar: false });
  }, [setHeader]);
  return (
    <Screen>
      <OnboardingScreenContainer>
        <CreateCabal />
      </OnboardingScreenContainer>
    </Screen>
  );
}

const CreateCabal = () => {
  const initData = useInitData();
  const user = initData?.user;
  const userName = user?.username;
  const userPhoto = user?.photoUrl;
  const cabalName = userName ? userName + "'s cabal" : "Cabal";
  return (
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
      <CardPreview imageUri={userPhoto ?? ""} name={cabalName} />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          marginTop: "24px",
        }}>
        <SpaceBetween>
          <Label>Cabal Image</Label>
          <OutlinedButton>REPLACE</OutlinedButton>
        </SpaceBetween>
        <SpaceBetween>
          <Label>Cabal Name</Label>
          <TextField value={cabalName} />
        </SpaceBetween>
        <SpaceBetween>
          <Label>Cabal Size</Label>
          <OutlinedButton>REPLACE</OutlinedButton>
        </SpaceBetween>
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginTop: "24px", width: "100%" }}>
        <OutlinedButton sx={{ width: "40vw" }}>LATER</OutlinedButton>
        <ContainedButton sx={{ width: "40vw" }}>CREATE CABAL</ContainedButton>
      </Box>
    </Box>
  );
};
