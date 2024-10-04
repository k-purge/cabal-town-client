import useNotification from "hooks/useNotification";
import { useForm } from "react-hook-form";
import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { CenteringWrapper } from "components/header/headerSearchBar/styled";
import { EditLogoPopup } from "components/editLogoPopup";
import {
  FormButton,
  StyledActionBtn,
  StyledFormInputs,
  StyledForm,
  FormTitle,
  FormWrapper,
  JettonFormTitle,
  SubmitButton,
} from "components/form/styled";
import { Input } from "components/form/input";
import { LogoAlertPopup } from "components/logoAlertPopup";
import { useJettonLogo } from "hooks/useJettonLogo";
import { StyledTopImg } from "pages/jetton/styled";
import { useJettonAddress } from "hooks/useJettonAddress";
import { useTonAddress } from "@tonconnect/ui-react";
import { onConnect } from "utils";
import LoadingImage from "components/LoadingImage";

interface FormProps {
  onSubmit: (values: any) => Promise<void>;
  inputs: any[];
  disableExample?: boolean;
  submitText: string;
  defaultValues?: {};
  onCancel?: () => void;
  isLoading?: boolean;
  gameDetailInputs: any[];
}

export function Form({
  onSubmit,
  inputs,
  disableExample,
  submitText,
  defaultValues,
  onCancel,
  isLoading,
  gameDetailInputs,
}: FormProps) {
  const { showNotification } = useNotification();
  const address = useTonAddress();
  const { jettonLogo } = useJettonLogo();
  const [logoAlertPopup, setLogoAlertPopup] = useState(false);
  const [editLogoPopup, setEditLogoPopup] = useState(false);
  const { jettonAddress } = useJettonAddress();
  const tokenImage = inputs.filter((i) => i.name === "tokenImage")?.[0];
  const { control, handleSubmit, formState, setValue, clearErrors, getValues } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues,
  });
  const errors = formState.errors as any;
  const onFormError = (value: any) => {
    const firstError = value[Object.keys(value)[0]];
    if (!firstError) {
      return;
    }
    showNotification(<>{firstError.message}</>, "warning", 3000);
  };

  const onExampleClick = useCallback(
    (name: never, value: never) => {
      setValue(name, value);
    },
    [setValue],
  );

  const closeEditLogoPopup = useCallback(() => setEditLogoPopup(false), []);

  const closeAlertLogoPopup = useCallback(() => setLogoAlertPopup(false), []);

  useEffect(() => {
    //@ts-ignore
    setValue("tokenImage", jettonLogo.logoUrl);
  }, [jettonLogo.logoUrl, setValue]);

  return (
    <StyledForm
      onSubmit={handleSubmit(() => {
        if (!jettonLogo.logoUrl || jettonLogo.hasError) {
          setLogoAlertPopup(true);
          return;
        }
        onSubmit(getValues());
      }, onFormError)}>
      <EditLogoPopup
        showExample={!jettonAddress}
        showPopup={editLogoPopup}
        tokenImage={tokenImage}
        close={closeEditLogoPopup}
      />
      <LogoAlertPopup
        isUpdateText={!!jettonAddress}
        showPopup={logoAlertPopup}
        close={closeAlertLogoPopup}
        onValidate={handleSubmit(onSubmit, onFormError)}
      />
      <FormWrapper>
        <JettonFormTitle>TOKEN DETAILS</JettonFormTitle>

        <Box sx={{ display: "flex" }}>
          <CenteringWrapper>
            <StyledTopImg sx={{ position: "relative" }}>
              <LoadingImage
                src={jettonLogo.image}
                loading={jettonLogo.isLoading}
                alt="jetton image"
              />
            </StyledTopImg>
            <FormButton onClick={() => setEditLogoPopup(true)}>UPLOAD</FormButton>
          </CenteringWrapper>
        </Box>
        <StyledFormInputs>
          {inputs
            .filter((i) => i.name !== "tokenImage")
            .filter((i) => !i.disabled)
            .map((spec: any, index: number) => {
              return (
                <div key={"form-" + index}>
                  <FormTitle>{spec.label}</FormTitle>
                  <Input
                    disableExample={disableExample}
                    required={spec.required}
                    description={spec.description}
                    clearErrors={clearErrors}
                    key={index}
                    error={errors[spec.name]}
                    name={spec.name}
                    type={spec.type}
                    control={control}
                    label={spec.label}
                    defaultValue={spec.default || ""}
                    onExampleClick={() => onExampleClick(spec.name as never, spec.default as never)}
                    disabled={spec.disabled}
                    errorMessage={spec.errorMessage}
                    validate={spec.validate}
                    showDefault={spec.showDefault}
                  />
                </div>
              );
            })}
        </StyledFormInputs>
      </FormWrapper>

      <FormWrapper>
        <JettonFormTitle>CABAL DETAILS</JettonFormTitle>

        {gameDetailInputs
          .filter((i) => !i.disabled)
          .map((spec: any, index: number) => {
            return (
              <>
                <FormTitle>{spec.label}</FormTitle>
                <Input
                  disableExample={disableExample}
                  required={spec.required}
                  description={spec.description}
                  clearErrors={clearErrors}
                  key={index}
                  error={errors[spec.name]}
                  name={spec.name}
                  type={spec.type}
                  control={control}
                  label={spec.label}
                  defaultValue={spec.default || ""}
                  onExampleClick={() => onExampleClick(spec.name as never, spec.default as never)}
                  disabled={spec.disabled}
                  errorMessage={spec.errorMessage}
                  validate={spec.validate}
                  showDefault={spec.showDefault}
                />
              </>
            );
          })}
      </FormWrapper>

      <StyledActionBtn>
        {!address ? (
          <SubmitButton type="button" onClick={onConnect} loading={isLoading}>
            Connect
          </SubmitButton>
        ) : (
          <CenteringWrapper sx={{ justifyContent: "center" }}>
            <SubmitButton disabled={jettonLogo.isLoading} type="submit" loading={isLoading}>
              {submitText}
            </SubmitButton>
          </CenteringWrapper>
        )}
      </StyledActionBtn>
    </StyledForm>
  );
}
