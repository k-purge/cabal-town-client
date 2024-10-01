import { useCallback, useState } from "react";
import { useNavigatePreserveQuery } from "lib/hooks/useNavigatePreserveQuery";
import { FooterWrapper, SocialsWrapper } from "./styled";
import { FooterLogo } from "./FooterLogo";
import { Outlet } from "react-router-dom";
import { ROUTES } from "consts";

const footerLogos = [
  {
    title: "Explorer",
    route: ROUTES.explorer,
  },
  {
    title: "Profile",
    route: ROUTES.profile,
  },
  {
    title: "Create cabal",
    route: ROUTES.deployer,
  },
  // TODO
  // {
  //   title: "Quest",
  //   route: ROUTES.quest,
  // },
  {
    title: "How it works",
    route: ROUTES.faq,
  },
];

export const Footer = () => {
  const navigate = useNavigatePreserveQuery();
  const [selectedRoute, setSelectedRoute] = useState("Explorer");

  const onClickIcon = useCallback(
    (title: string, route: string) => {
      setSelectedRoute(title);
      navigate(route);
    },
    [navigate],
  );

  return (
    <FooterWrapper>
      <SocialsWrapper>
        {footerLogos.map(({ title, route }, index) => {
          return (
            <FooterLogo
              key={index}
              title={title}
              selectedRoute={selectedRoute}
              onClickIcon={() => onClickIcon(title, route)}
            />
          );
        })}
      </SocialsWrapper>
      <Outlet />
    </FooterWrapper>
  );
};
