import React, { useState } from "react";
import { IntroPage } from "./Intro";
import { SuccessPage } from "./SuccessPage";
import { CreateCabalPage } from "./CreateCabalPage";

export type OnboardingStep = "intro" | "create_cabal" | "success";

export function OnboardingPage() {
  const [step, setStep] = useState<OnboardingStep>("intro");

  return (
    <>
      {/* preload pages to avoid flash when changing pages */}
      <div style={{ display: step === "intro" ? "block" : "none" }}>
        <IntroPage setStep={setStep} />
      </div>
      <div style={{ display: step === "create_cabal" ? "block" : "none" }}>
        <CreateCabalPage setStep={setStep} />
      </div>
      <div style={{ display: step === "success" ? "block" : "none" }}>
        <SuccessPage />
      </div>
    </>
  );
}
