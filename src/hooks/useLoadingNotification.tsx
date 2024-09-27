import { useState } from "react";
import { styled, Typography } from "@mui/material";
import { useSnackbar, SnackbarKey } from "notistack";
import { LoadingIcon } from "components/loadingSpinner";
import { Box } from "@mui/system";

const StyledText = styled(Typography)(() => ({
  fontFamily: "Cabin Condensed",
  color: "#ffff",
  fontWeight: 600,
}));

const useLoadingNotification = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [loadingSnackbarKey, setLoadingSnackbarKey] = useState<SnackbarKey | undefined>(undefined);

  const toggleSnackbars = (loading: boolean) => {
    if (loading) {
      // Show loading snackbar
      if (!loadingSnackbarKey) {
        const key = enqueueSnackbar(<StyledText>Loading...</StyledText>, {
          variant: "info",
          autoHideDuration: null,
          action: <LoadingIcon />,
        });
        setLoadingSnackbarKey(key);
      }
    } else {
      // Hide loading snackbar if open and show success snackbar
      if (loadingSnackbarKey) {
        closeSnackbar(loadingSnackbarKey);
        setLoadingSnackbarKey(undefined);
      }
      enqueueSnackbar("Operation Successful!", {
        variant: "success",
        autoHideDuration: 5000,
      });
    }
  };

  return {
    toggleSnackbars,
  };
};

export default useLoadingNotification;
