import { ReactNode, useCallback } from "react";
import { VariantType, useSnackbar } from "notistack";
import { IconButton, styled } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
const StyledMessage = styled(Box)({
  "& &": {
    color: "white",
  },
  "& a": {
    color: "white",
  },
});

function useNotification() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showNotification = useCallback(
    (message: ReactNode | string, variant: VariantType, autoHideDuration?: number | null) => {
      const key = enqueueSnackbar(<StyledMessage>{message}</StyledMessage>, {
        variant,
        anchorOrigin: { horizontal: "left", vertical: "top" },
        autoHideDuration: autoHideDuration,
        onClick: () => closeSnackbar(key),
        action: () => (
          <IconButton>
            <CloseIcon style={{ width: 20, height: 20 }} />
          </IconButton>
        ),
      });

      return key;
    },
    [closeSnackbar, enqueueSnackbar],
  );

  return { showNotification };
}

export default useNotification;
