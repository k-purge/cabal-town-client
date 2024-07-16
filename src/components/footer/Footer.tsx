import { FooterWrapper, SocialsWrapper } from "./styled";
import { FooterLogo } from "./FooterLogo";
import { Outlet } from "react-router-dom";
import explorer from "assets/icons/explorer.svg";
import profile from "assets/icons/profile.svg";
import createToken from "assets/icons/create-token.svg";
import howItWorks from "assets/icons/how-it-works.svg";

const footerLogos = [
  {
    title: "Explorer",
    icon: explorer,
  },
  {
    title: "Profile",
    icon: profile,
  },
  {
    title: "Create token",
    icon: createToken,
  },
  {
    title: "How it works",
    icon: howItWorks,
  },
];

export const Footer = () => {
  return (
    <FooterWrapper>
      <SocialsWrapper>
        {footerLogos.map(({ title, icon }, index) => {
          return <FooterLogo key={index} logo={icon} title={title} />;
        })}
      </SocialsWrapper>
      <Outlet />
    </FooterWrapper>
  );
};
