import { Skeleton, styled } from "@mui/material";
import { Box } from "@mui/system";

interface Props {
  src?: string;
  loading: boolean;
  alt?: string;
}

const StyledContainer = styled(Box)({
  position: "relative",
  borderRadius: "inherit",
});

function LoadingImage({ loading, src, alt = "Image" }: Props) {
  const objectFit = src?.includes("coin-logo") ? "none" : "contain";
  return (
    <StyledContainer>
      {loading ? (
        <Skeleton variant="circular" width="100%" height="100%" />
      ) : src ? (
        <img alt={alt} src={src} style={{ objectFit, width: "100%" }} />
      ) : null}
    </StyledContainer>
  );
}

export default LoadingImage;
