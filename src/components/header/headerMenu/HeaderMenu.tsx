import { Button, Drawer, styled, SvgIcon } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { AppLogo } from "components/appLogo";
import walletIcon from "assets/icons/wallet.svg";
import { LogoContainer, CloseMenuButton, DrawerContent, AppMenu, HeaderTypography } from "./styled";
import { TonConnectButton, useTonConnectModal, useTonWallet } from "@tonconnect/ui-react";

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
  return wallet ? (
    <AppLogo />
  ) : (
    <CustomTonConnectButton onClick={open}>
      <img src={walletIcon} alt="wallet" />
    </CustomTonConnectButton>
  );

  // <AppMenu>
  //   {/* <div onClick={props.closeMenu}>
  //     <StyledTonConnectButton />
  //   </div> */}
  //   {/* <IconButton
  //     sx={{ padding: 0, ml: 1.5 }}
  //     href="https://github.com/ton-blockchain/minter"
  //     target="_blank">
  //     <StyledGithubIcon width={20} height={20} src={githubIcon} />
  //     <HeaderTypography variant="h5">GitHub</HeaderTypography>
  //   </IconButton> */}
  // </AppMenu>
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
