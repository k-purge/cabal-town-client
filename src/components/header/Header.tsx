import { Button, IconButton, styled, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { HeaderMenu, MobileMenu } from "components/header/headerMenu/HeaderMenu";
import {
  HeaderRight,
  HeaderContent,
  HeaderOptionalContent,
  HeaderWrapper,
  HeaderLeft,
  HeaderTitle,
} from "./styled";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useTonConnectModal, useTonWallet } from "@tonconnect/ui-react";
import { useHeader } from "hooks/useHeader";

export const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const matches = useMediaQuery("(min-width:900px)");
  const { title, options } = useHeader();
  const navigate = useNavigate();
  const location = useLocation();
  const topRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView();
  }, [location]);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <HeaderWrapper position="static" ref={topRef}>
        <HeaderContent>
          <HeaderOptionalContent>
            {/* <AppLogo /> */}
            <HeaderLeft>
              {options.showBackButton && (
                <IconButton onClick={options.onBackButtonClick || handleBackClick}>
                  <ArrowBackIcon />
                </IconButton>
              )}
              <HeaderTitle>{title}</HeaderTitle>
            </HeaderLeft>

            <HeaderRight>
              {options.showAvatar && <HeaderMenu />}
              {/* <IconButton onClick={() => setMobileMenu(true)}>
                <MenuRoundedIcon style={{ width: 38, height: 38, color: "#FFB800" }} />
              </IconButton> */}
            </HeaderRight>
          </HeaderOptionalContent>
          <MobileMenu showMenu={mobileMenu && !matches} closeMenu={() => setMobileMenu(false)} />
        </HeaderContent>
      </HeaderWrapper>
      <Outlet />
    </>
  );
};
