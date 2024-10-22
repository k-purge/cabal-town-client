import { Box, Typography } from "@mui/material";
import { BoxConainer, BoxText, HolderContainer, StyledBlock } from "./styled";
import { AlphaCard } from "./AlphaCard";
import { useEffect } from "react";
import useJettonStore from "store/jetton-store/useJettonStore";
import useTgStore from "store/tg-store/useTgStore";

const alphaData = [
  {
    token: "AAVE",
    count: 10,
    h24: 100,
    token_image: require("assets/icons/aave.jpeg"),
  },
  {
    token: "AERO",
    count: 7,
    h24: 200,
    token_image: require("assets/icons/aero.jpeg"),
  },
  {
    token: "AAVE",
    count: 10,
    h24: 100,
    token_image: require("assets/icons/aave.jpeg"),
  },
];

export const Stat = () => {
  const { selectedJetton } = useJettonStore();
  const { getGroupMsgs, chatsCount, tokenList } = useTgStore();

  useEffect(() => {
    if (selectedJetton?.tgGroupId) {
      getGroupMsgs(selectedJetton?.tgGroupId);
    }
  }, [getGroupMsgs, selectedJetton?.tgGroupId]);

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
              {chatsCount}
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
          {tokenList?.map((data, index) => (
            <AlphaCard key={index} {...data} />
          ))}
          {/* blur the cards */}

          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              border: "1px solid #000",
            }}>
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
              {alphaData?.map((data, index) => (
                <AlphaCard key={index} {...data} />
              ))}
            </Box>
          </Box>
        </HolderContainer>
      </StyledBlock>
    </>
  );
};
