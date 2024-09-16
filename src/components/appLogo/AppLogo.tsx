import { Chip, Typography } from "@mui/material";
import { APP_DISPLAY_NAME, ROUTES } from "consts";
import logo from "assets/icons/logo.svg";
import { LogoWrapper, ImageWrapper } from "./styled";
import { useNetwork } from "lib/hooks/useNetwork";
import { useNavigatePreserveQuery } from "lib/hooks/useNavigatePreserveQuery";

export const AppLogo = ({
  onClick,
}: {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}) => {
  const _onClick = onClick ?? (() => navigate(ROUTES.explorer));
  const navigate = useNavigatePreserveQuery();
  const { network } = useNetwork();
  return (
    <LogoWrapper onClick={_onClick}>
      <ImageWrapper>
        <img src={logo} alt="Logo" />
      </ImageWrapper>
      {/* {network === "testnet" && <Chip sx={{ color: "#fff" }} label="TESTNET" />} */}
    </LogoWrapper>
  );
};
