import { Avatar, Menu, MenuItem, styled, Typography } from "@mui/material";
import { useInitData } from "@telegram-apps/sdk-react";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useEffect, useState } from "react";

const fontStyle = {
  color: "#ffffff",
  fontFamily: "Bungee, sans-serif",
  fontSize: "14px",
  fontWeight: "400",
};

export const UserAvatar = () => {
  const initData = useInitData();
  const walletAddress = useTonAddress();
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
  useEffect(() => {
    console.log("user: ", user);
  }, [user]);

  return (
    <>
      {user ? (
        user.photoUrl ? (
          <Avatar onClick={handleLogoClick} src={user?.photoUrl} sx={{ width: 40, height: 40 }} />
        ) : (
          <Typography sx={fontStyle}>{user.username}</Typography>
        )
      ) : (
        <Typography sx={fontStyle}>
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
