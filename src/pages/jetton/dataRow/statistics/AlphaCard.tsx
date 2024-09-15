import { NorthWestSharp, SouthWestSharp } from "@mui/icons-material";
import { HolderBox } from "./styled";
import { Box, Typography } from "@mui/material";

type AlphaCardProps = {
  name: string;
  timesMentioned: number;
  performance: number;
  iconUrl?: string;
};

export const AlphaCard = ({ name, timesMentioned, performance, iconUrl }: AlphaCardProps) => {
  return (
    <HolderBox>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 2 }}>
        <img src={iconUrl} alt={name} style={{ width: 24, height: 24 }} />
        <Typography
          sx={{ fontSize: 20, fontWeight: 400, fontFamily: "Bungee", letterSpacing: "0.04em" }}>
          {name}
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
            {timesMentioned}
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
            36H Performance %
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: performance > 0 ? "#04AA23" : "#FF0000",
            }}>
            {performance > 0 ? (
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
              {performance}%
            </Typography>
          </Box>
        </Box>
      </Box>
    </HolderBox>
  );
};
