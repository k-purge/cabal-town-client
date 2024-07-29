import { Popup } from "components/Popup";
import { CenteringWrapper } from "components/header/headerSearchBar/styled";
import { AppButton } from "components/appButton";
import { PopupTitle, PopupSubTitle } from "components/editLogoPopup/styled";

interface LogoAlertPopupProps {
  showPopup: boolean;
  close: () => void;
  onValidate: any;
  isUpdateText: boolean;
}

export const LogoAlertPopup = ({
  showPopup,
  close,
  onValidate,
  isUpdateText,
}: LogoAlertPopupProps) => {
  return (
    <Popup open={showPopup} onClose={close} maxWidth={592}>
      <PopupTitle>Token logo is broken</PopupTitle>
      <PopupSubTitle>
        Your token <span style={{ fontWeight: 700 }}>does not have a working logo.</span>
      </PopupSubTitle>
      <PopupSubTitle>
        You can fix this later by editing the token's metadata, as long as you're <br />
        still the token admin.
      </PopupSubTitle>
      <CenteringWrapper mb={2}>
        <AppButton
          height={44}
          width={98}
          fontWeight={700}
          type="button"
          transparent
          onClick={close}>
          Cancel
        </AppButton>
        <AppButton
          height={44}
          width={isUpdateText ? 140 : 98}
          fontWeight={700}
          type="button"
          onClick={() => {
            onValidate();
            close();
          }}
          background="#0088CC">
          {isUpdateText ? "Update Metadata" : "Deploy"}
        </AppButton>
      </CenteringWrapper>
    </Popup>
  );
};
