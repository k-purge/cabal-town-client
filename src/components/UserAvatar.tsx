import { Avatar, Menu, MenuItem, styled } from "@mui/material";
import { useInitData } from "@telegram-apps/sdk-react";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { useState } from "react";

export const UserAvatar = () => {
  const initData = useInitData();
  const [tonConnectUI] = useTonConnectUI();

  const user = initData?.user;
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
      <Avatar
        onClick={handleLogoClick}
        src={user?.photoUrl}
        sx={{ width: 40, height: 40 }}></Avatar>
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
