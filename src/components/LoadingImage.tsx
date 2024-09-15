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
  const objectFit = src?.includes("coin-logo") ? "none" : "cover";
  return (
    <StyledContainer>
      {loading ? (
        <Skeleton variant="circular" width="56px" height="56px" />
      ) : src ? (
        <img alt={alt} src={src} style={{ objectFit, width: "100%", aspectRatio: "1/1" }} />
      ) : null}
    </StyledContainer>
  );
}

export default LoadingImage;
