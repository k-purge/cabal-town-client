import { IconButton, useMediaQuery } from "@mui/material";
import { useEffect, useRef, useState } from "react";
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
