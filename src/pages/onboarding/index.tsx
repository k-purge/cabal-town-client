import React, { useState } from "react";
import { Box, Typography, Button, MobileStepper, useTheme, Fade } from "@mui/material";
import SwipeableViews from "react-swipeable-views";
import { Screen } from "../../components/Screen";
import { ContainedButton } from "components/Buttons";

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

export function OnboardingPage() {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = carouselItems.length;

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Screen>
      <Box
        sx={{
          height: "calc(100vh - 80px)",
          alignItems: "center",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          padding: "32px 20px",
        }}>
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
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                  {item.subtitle}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2, textAlign: "center" }}>
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
            },
            "& .MuiMobileStepper-dotActive": {
              bgcolor: "orange",
            },
          }}
          nextButton={<Box />}
          backButton={<Box />}
        />
        <ContainedButton sx={{ marginTop: "60px" }}>YOUR ADVENTURE BEGINS HERE!</ContainedButton>
      </Box>
    </Screen>
  );
}
