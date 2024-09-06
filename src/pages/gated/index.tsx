import { useState } from "react";
import { Box, Button, Fade } from "@mui/material";
import { CodeInput, Instructions, OutlinedButton, ScreenHeading } from "./styles";
import { Screen } from "components/Screen";
import { useNavigatePreserveQuery } from "lib/hooks/useNavigatePreserveQuery";
import logo from "assets/icons/logo.svg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export function GatedPage() {
  const navigate = useNavigatePreserveQuery();
  const [inputValue, setInputValue] = useState("");

  const handleFollowUs = () => {
    window.open("https://x.com/purgedotfun", "_blank", "noopener,noreferrer");
  };
  const handleMessageUs = () => {
    window.open(
      "https://twitter.com/messages/compose?recipient_id=1806637161170837504",
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <Screen>
      <Fade in>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            paddingLeft: "17.5px",
            paddingRight: "17.5px",
          }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <img src={logo} alt="Logo" style={{ width: "80px", height: "auto" }} />
            <ScreenHeading sx={{ mt: 7, mb: 7 }}>
              UNLOCK THE <br /> PURGE
            </ScreenHeading>
          </Box>
          <Box sx={{ display: "flex", width: "100%", mb: 4, gap: "8px", maxWidth: "400px" }}>
            <CodeInput
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Secret Code"
            />
            <Button
              variant="contained"
              color="primary"
              disabled={inputValue === ""}
              sx={{
                minWidth: "unset",
                borderRadius: 0,
                width: "48px",
                height: "48px",
                backgroundColor: (theme) => theme.palette.primary.main,
                color: (theme) => theme.palette.primary.contrastText,
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.primary.dark,
                },
                "&.Mui-disabled": {
                  backgroundColor: "#494846",
                  color: "grey",
                },
              }}>
              <ArrowForwardIcon />
            </Button>
          </Box>
          <Instructions>
            Enter the City of Cabals with the secret code.
            <br />
            Want a code? Follow the 2-step guide below!
          </Instructions>

          <Box
            sx={{
              mt: 7,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              maxWidth: "400px",
            }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}>
              <Instructions>Step 1 - Follow us on X.</Instructions>
              <OutlinedButton onClick={handleFollowUs}>Follow Us</OutlinedButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}>
              <Instructions>Step 2 - DM us on X.</Instructions>
              <OutlinedButton onClick={handleMessageUs}>Message Us</OutlinedButton>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Screen>
  );
}
