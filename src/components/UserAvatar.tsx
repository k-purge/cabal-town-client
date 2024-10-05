import { Avatar, Menu, MenuItem, styled, Typography } from "@mui/material";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useState } from "react";
import useUserStore from "store/user-store/useUserStore";

const fontStyle = {
  color: "#ffffff",
  fontFamily: "Bungee, sans-serif",
  fontSize: "14px",
  fontWeight: "400",
  cursor: "pointer",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  width: "80%",
};

export const UserAvatar = () => {
  const { tgUserId, tgUserName } = useUserStore();
  const walletAddress = useTonAddress();
  const [tonConnectUI] = useTonConnectUI();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleLogoClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDisconnect = () => {
    tonConnectUI.disconnect();
    handleClose();
  };

  return (
    <>
      {tgUserId ? (
        !tgUserName ? (
          <Avatar onClick={handleLogoClick} src={""} sx={{ width: 40, height: 40 }} />
        ) : (
          <Typography onClick={handleLogoClick} sx={fontStyle}>
            {tgUserName}
          </Typography>
        )
      ) : (
        <Typography onClick={handleLogoClick} sx={fontStyle}>
          {walletAddress.slice(0, 3) + "..." + walletAddress.slice(-3)}
        </Typography>
      )}

      <Menu
        sx={{
          "& .MuiMenu-list": {
            padding: 0,
          },
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        <StyledMenuItem onClick={handleDisconnect}>Disconnect</StyledMenuItem>
      </Menu>
    </>
  );
};

const StyledMenuItem = styled(MenuItem)(() => ({
  background: "#000",
  fontFamily: "'Bungee', sans-serif",
  fontSize: "14px",
  fontWeight: "400",
  lineHeight: "16.8px",
  letterSpacing: "0.04em",
  color: "#FFF",
  borderRadius: "0px",
  "&.MuiMenuItem-root": {
    background: "#FFF",
    color: "#000",
  },
}));
