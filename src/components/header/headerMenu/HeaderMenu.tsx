import { useEffect } from "react";
import { Button, Drawer, styled } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { AppLogo } from "components/appLogo";
import { LogoContainer, CloseMenuButton, DrawerContent, HeaderTypography } from "./styled";
import { useTonAddress, useTonConnectModal, useTonWallet } from "@tonconnect/ui-react";
import { UserAvatar } from "components/UserAvatar";
import useUserStore from "store/user-store/useUserStore";
import walletIcon from "assets/icons/wallet.svg";

interface MenuProps {
  closeMenu?: () => void;
  showMenu?: boolean;
}

const MobileMenu: React.FC<MenuProps> = ({ closeMenu, showMenu }) => {
  return (
    <Drawer
      anchor="left"
      open={showMenu}
      onClose={closeMenu}
      sx={{
        ".MuiDrawer-paper": {
          background: "#000",
          width: "70vw",
        },
      }}>
      <LogoContainer>
        <AppLogo />
      </LogoContainer>

      <CloseMenuButton onClick={closeMenu}>
        <CloseRoundedIcon style={{ width: 38, height: 38 }} />
      </CloseMenuButton>

      <DrawerContent>
        <HeaderTypography>EDIT TELEGRAM</HeaderTypography>
        <HeaderTypography>DISCONNECT</HeaderTypography>
      </DrawerContent>
    </Drawer>
  );
};

const HeaderMenu: React.FC<MenuProps> = (props) => {
  const { open } = useTonConnectModal();
  const wallet = useTonWallet();
  const { getUser, tgUserId } = useUserStore();
  const walletAddress = useTonAddress();

  useEffect(() => {
    if (tgUserId && walletAddress) {
      getUser(tgUserId, walletAddress, walletAddress);
    }
  }, [getUser, tgUserId, walletAddress]);

  return wallet ? (
    <UserAvatar />
  ) : (
    <CustomTonConnectButton onClick={open}>
      <img src={walletIcon} alt="wallet" />
    </CustomTonConnectButton>
  );
};

const CustomTonConnectButton = styled(Button)(({ theme }) => ({
  width: 40,
  height: 40,
  minWidth: 40,
  background: theme.palette.primary.main,
  borderRadius: 0,
  padding: 0,
  margin: 0,
  color: "#000",
  "&:hover": {
    background: theme.palette.primary.main,
  },
  "& img": {
    width: 20,
    height: 20,
  },
}));

export { HeaderMenu, MobileMenu };
