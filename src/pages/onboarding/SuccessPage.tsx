import React, { useEffect, useState } from "react";
import { Box, Typography, Button, MobileStepper, useTheme, Fade } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { Screen } from "../../components/Screen";
import { ContainedButton } from "components/Buttons";
import { useHeader } from "hooks/useHeader";
import { useNavigatePreserveQuery } from "lib/hooks/useNavigatePreserveQuery";
import { ROUTES } from "consts";
import { Routes, useNavigate } from "react-router-dom";
import { OnboardingStep } from ".";
import { DescriptionText, OnboardingScreenContainer, TitleText } from "./styles";

type SuccessPageProps = {
  description?: string;
  buttonText?: string;
  buttonOnClick?: () => void | Promise<void>;
};

const defaultDescription =
  "Welcome to Cabal.town! Your onboarding is complete, and you're ready to start your journey. Dive in and explore what we have in store for you.";
const defaultButtonText = "LET'S GO!";

export function SuccessPage({ description, buttonText, buttonOnClick }: SuccessPageProps) {
  const navigate = useNavigate();
  const handleContinue = () => {
    navigate({
      pathname: ROUTES.explorer,
      search: "?testnet",
    });
  };

  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader("ARE YOU READY?", { showBackButton: false, showAvatar: false });
  }, [setHeader]);

  return (
    <Screen>
      <OnboardingScreenContainer>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            flex: "1 1 auto",
          }}>
          <TitleText sx={{ fontSize: "32px", marginBottom: "20px" }}>YOU'RE ALL SET!</TitleText>
          <Box
            component="img"
            sx={{
              height: "300px",
              overflow: "hidden",
              objectFit: "contain",
            }}
            src="/SuccessPage.png"
          />
          <DescriptionText>{description || defaultDescription}</DescriptionText>
        </Box>
        <ContainedButton onClick={handleContinue} sx={{ width: "100%" }}>
          {buttonText || defaultButtonText}
        </ContainedButton>
      </OnboardingScreenContainer>
    </Screen>
  );
}
