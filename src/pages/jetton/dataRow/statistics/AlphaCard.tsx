import { NorthWestSharp, SouthWestSharp } from "@mui/icons-material";
import { HolderBox } from "./styled";
import { Box, Typography } from "@mui/material";
import { AlphaCardProps } from "store/tg-store";

export const AlphaCard = ({ token, token_image, count, h24 }: AlphaCardProps) => {
  return (
    <HolderBox>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 2 }}>
        <img src={token_image} alt={token} style={{ width: 24, height: 24 }} />
        <Typography
          sx={{ fontSize: 20, fontWeight: 400, fontFamily: "Bungee", letterSpacing: "0.04em" }}>
          {token}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 400,
              lineHeight: "20px",
              fontFamily: "Cabin Condensed",
              letterSpacing: "0.08em",
            }}>
            Times Mentioned On Chat
          </Typography>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 700,
              lineHeight: "20px",
              fontFamily: "Cabin Condensed",
              letterSpacing: "0.04em",
            }}>
            {count}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}>
          <Typography
            sx={{
              fontSize: 16,
              fontWeight: 400,
              lineHeight: "20px",
              fontFamily: "Cabin Condensed",
              letterSpacing: "0.08em",
            }}>
            24H Performance %
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: h24 > 0 ? "#04AA23" : "#FF0000",
            }}>
            {h24 > 0 ? (
              <NorthWestSharp sx={{ width: "16px", height: "16px" }} />
            ) : (
              <SouthWestSharp sx={{ width: "16px", height: "16px" }} />
            )}
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 700,
                lineHeight: "20px",
                fontFamily: "Cabin Condensed",
                letterSpacing: "0.04em",
              }}>
              {h24}%
            </Typography>
          </Box>
        </Box>
      </Box>
    </HolderBox>
  );
};
