import { Box, Typography } from "@mui/material";
import { BoxConainer, BoxText, HolderContainer, StyledBlock } from "./styled";
import { AlphaCard } from "./AlphaCard";

const alphaData = [
  {
    name: "AAVE",
    timesMentioned: 10,
    performance: 100,
    iconUrl: require("assets/icons/aave.jpeg"),
  },
  {
    name: "AERO",
    timesMentioned: 7,
    performance: 200,
    iconUrl: require("assets/icons/aero.jpeg"),
  },
  {
    name: "AAVE",
    timesMentioned: 10,
    performance: 100,
    iconUrl: require("assets/icons/aave.jpeg"),
  },
  {
    name: "AERO",
    timesMentioned: 7,
    performance: 200,
    iconUrl: require("assets/icons/aero.jpeg"),
  },
  {
    name: "AERO",
    timesMentioned: 7,
    performance: 200,
    iconUrl: require("assets/icons/aero.jpeg"),
  },
];
export const Stat = () => {
  return (
    <>
      <Box>
        <Box
          sx={{
            width: "100%",
            height: 110,
            background: "#1E1E1E",
            border: "2px solid #000",
            padding: "24px 16px 12px 16px",
            display: "flex",
            marginBottom: "36px",
          }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flex: 1,
            }}>
            <Typography
              sx={{
                fontSize: 16,
                lineHeight: "20px",
                fontWeight: 400,
                color: "#fff",
                fontFamily: "Bungee",
                letterSpacing: "0.08em",
              }}>
              CHATS CONDUCTED (24 HOURS)
            </Typography>
            <Typography
              sx={{
                fontSize: 32,
                lineHeight: "38.4px",
                fontWeight: 400,
                color: "#ffb800",
                fontFamily: "Bungee",
                letterSpacing: "0.04em",
              }}>
              128
            </Typography>
          </Box>
        </Box>
      </Box>
      <StyledBlock height="100%">
        <BoxConainer>
          <BoxText>ALPHA MENTIONED IN CHAT</BoxText>
        </BoxConainer>

        <HolderContainer>
          {/* Least holders */}
          {alphaData?.slice(0, 2).map((data, index) => (
            <AlphaCard key={index} {...data} />
          ))}
          {/* blur the cards */}

          <Box sx={{ position: "relative", display: "flex", flexDirection: "column" }}>
            {/* ask user to join group */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 400,
                  fontFamily: "Bungee",
                  color: "primary.main",
                  textAlign: "center",
                  textShadow: "-1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000",
                }}>
                JOIN GROUP <br /> TO VIEW MORE
              </Typography>
            </Box>
            <Box sx={{ filter: "blur(8px)" }}>
              {alphaData?.slice(2, 5).map((data, index) => (
                <AlphaCard key={index} {...data} />
              ))}
            </Box>
          </Box>
        </HolderContainer>
      </StyledBlock>
    </>
  );
};
