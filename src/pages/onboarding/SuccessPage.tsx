import { Box, Typography } from "@mui/material";
import { OnboardingStep } from ".";

export function SuccessPage({ setStep }: { setStep: (step: OnboardingStep) => void }) {
  return (
    <Box>
      <Typography>Success!</Typography>
    </Box>
  );
}
