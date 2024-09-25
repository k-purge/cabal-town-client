import React, { useEffect, useState } from "react";
import { IntroPage } from "./Intro";
import { SuccessPage } from "./SuccessPage";
import { CreateCabalPage } from "./CreateCabalPage";

export type OnboardingStep = "intro" | "create_cabal" | "success";

export function OnboardingPage() {
  const [step, setStep] = useState<OnboardingStep>("create_cabal");
  switch (step) {
    case "intro":
      return <IntroPage setStep={setStep} />;
    case "create_cabal":
      return <CreateCabalPage setStep={setStep} />;
    case "success":
      return <SuccessPage setStep={setStep} />;
  }
}
