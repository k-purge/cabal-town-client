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
  "Explore the cabals, connect with top thought leaders, and unlock exclusive alpha.";
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
          <TitleText sx={{ fontSize: "32px", marginBottom: "0px" }}>YOU'RE ALL SET!</TitleText>
          <Box
            component="img"
            sx={{
              height: "280px",
              width: "280px",
              overflow: "hidden",
              objectFit: "contain",
              margin: "56px 0px",
            }}
            src="/success.png"
          />
          <DescriptionText>{description || defaultDescription}</DescriptionText>
        </Box>
        <ContainedButton onClick={handleContinue} sx={{ marginTop: "60px", width: "100%" }}>
          {buttonText || defaultButtonText}
        </ContainedButton>
      </OnboardingScreenContainer>
    </Screen>
  );
}
