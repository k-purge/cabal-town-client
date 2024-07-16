import { Chip, Typography } from "@mui/material";
import { ROUTES } from "consts";
import { LogoWrapper, ImageWrapper } from "./styled";
import { useNetwork } from "lib/hooks/useNetwork";
import { useNavigatePreserveQuery } from "lib/hooks/useNavigatePreserveQuery";

export const FooterLogo = ({ title, logo }: { title: string; logo: string }) => {
  const navigate = useNavigatePreserveQuery();
  const { network } = useNetwork();
  return (
    <LogoWrapper onClick={() => navigate(ROUTES.explorer)}>
      <ImageWrapper>
        <img src={logo} alt="Logo" />
      </ImageWrapper>
      <Typography variant="h4">{title}</Typography>
    </LogoWrapper>
  );
};
