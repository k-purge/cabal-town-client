import { Skeleton, styled } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface Props {
  src?: string;
  loading: boolean;
  alt?: string;
}

const StyledContainer = styled(Box)({
  position: "relative",
  width: "200px",
  height: "200px",
  borderRadius: "inherit",
});

function LoadingImage({ loading, src, alt = "Image" }: Props) {
  return (
    <StyledContainer>
      {loading ? (
        <Skeleton variant="circular" width="100%" height="100%" />
      ) : src ? (
        <img alt={alt} src={src} style={{ objectFit: "contain", width: "100%" }} />
      ) : null}
    </StyledContainer>
  );
}

export default LoadingImage;
