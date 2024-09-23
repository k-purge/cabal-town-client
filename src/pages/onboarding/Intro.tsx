import React, { useEffect, useState } from "react";
import { Box, Typography, Button, MobileStepper, useTheme, Fade } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { Screen } from "../../components/Screen";
import { ContainedButton } from "components/Buttons";
import { useHeader } from "hooks/useHeader";
import { useNavigatePreserveQuery } from "lib/hooks/useNavigatePreserveQuery";
import { ROUTES } from "consts";
import { useNavigate } from "react-router-dom";
import { OnboardingStep } from ".";
import { OnboardingScreenContainer } from "./styles";

const carouselItems = [
  {
    subtitle: "JOIN OR CREATE CABAL",
    description:
      "Join one or start your own cabal. Share and enjoy exclusive alpha that set you apart.",
    image: "/Intro1.png",
  },
  {
    subtitle: "EARN FEES",
    description:
      "Lock up your tokens and earn a share of cabal’s trading fees—let your tokens work for you.",
    image: "/Intro2.png",
  },
  {
    subtitle: "SURVIVE THE PURGE",
    description:
      "The purge is coming. Only the most loyal members will make it through. Prove your worth, keep your cabal alive, and purge the rest.",
    image: "/logo512.png",
  },
  // Add more items as needed
];

export function IntroPage({ setStep }: { setStep: (step: OnboardingStep) => void }) {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = carouselItems.length;

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const handleContinue = () => {
    setStep("create_cabal");
  };

  const { setHeader } = useHeader();

  useEffect(() => {
    setHeader("WELCOME, PLAYER 1", { showBackButton: false, showAvatar: false });
  }, [setHeader]);

  return (
    <Screen>
      <OnboardingScreenContainer>
        <SwipeableViews
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
          containerStyle={{
            height: "100%",
          }}
          slideStyle={{
            display: "flex",
          }}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents>
          {carouselItems.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                flex: "1 1 auto",
              }}>
              <Box
                component="img"
                sx={{
                  height: "70%",
                  maxWidth: index === 2 ? "70%" : "90%",
                  overflow: "hidden",
                  objectFit: "contain",
                }}
                src={item.image}
              />
              <Box
                sx={{
                  height: "30%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <Typography
                  sx={{
                    fontFamily: "Bungee",
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "20px",
                    lineHeight: "24px",
                    textAlign: "center",
                    letterSpacing: "0.04em",
                    color: "#FFB800",
                    marginBottom: "20px",
                  }}>
                  {item.subtitle}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Cabin Condensed",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "16px",
                    lineHeight: "24px",
                    textAlign: "center",
                    letterSpacing: "0.08em",
                    color: "#FFFFFF",
                  }}>
                  {item.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </SwipeableViews>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{
            marginTop: "20px",
            bgcolor: "transparent",
            "& .MuiMobileStepper-dot": {
              bgcolor: "grey.500",
              margin: "0 12px",
              width: "12px",
              height: "12px",
            },
            "& .MuiMobileStepper-dotActive": {
              bgcolor: "#FFB800",
              width: "12px",
              height: "12px",
            },
          }}
          nextButton={<Box />}
          backButton={<Box />}
        />
        <ContainedButton onClick={handleContinue} sx={{ marginTop: "60px" }}>
          YOUR ADVENTURE BEGINS HERE!
        </ContainedButton>
      </OnboardingScreenContainer>
    </Screen>
  );
}
