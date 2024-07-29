import NumberFormat from "react-number-format";
import { useRef } from "react";
import { Control, Controller } from "react-hook-form";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import {
  StyledInputWrapper,
  StyledContainer,
  StyledInput,
  StyledInputContainer,
} from "components/form/input/styled";
import { DetailWrapper, DetailNumField } from "components/form/styled";
import MinusIcon from "assets/icons/minus.svg";
import PlusIcon from "assets/icons/plus.svg";
import FieldDescription from "components/FieldDescription";

interface InputProps {
  error: boolean;
  label?: string;
  control: Control;
  name: string;
  defaultValue: string | number;
  onExampleClick: () => void;
  type?: string;
  required?: boolean;
  clearErrors: any;
  disabled?: boolean;
  validate?: (val: string) => boolean;
  errorMessage?: string;
  description: string;
  disableExample?: boolean;
  zeroPadding?: boolean;
  showDefault?: boolean;
}

export function Input({
  description,
  defaultValue,
  control,
  error,
  label,
  name,
  onExampleClick,
  type = "string",
  clearErrors,
  disabled,
  errorMessage,
  disableExample = false,
  validate,
  zeroPadding = true,
  showDefault,
}: InputProps) {
  const ref = useRef<any>();

  const onFocus = () => {
    clearErrors(name);
  };

  const onChangeAmt = (e: any, onChange: any) => {
    const val = e.target.value;
    if (val.slice(-1) === ".") {
      onChange(val);
    } else if (!val) {
      return onChange(0);
    }

    try {
      const float = parseFloat(val);
      if (float >= 0) {
        return onChange(float);
      }
    } catch (e) {
      return;
    }
  };

  const onEditAmt = (val: number, onChange: any) => {
    if (val >= 0) {
      return onChange(val);
    }
  };

  const renderComponent = (onChange: any, value: any) => {
    switch (type) {
      case "number":
        return (
          <StyledInputWrapper>
            <NumberFormat
              value={value}
              name={name}
              placeholder={label}
              customInput={StyledInput}
              type="text"
              thousandSeparator=","
              onValueChange={({ value }) => {
                onChange(value);
              }}
              isAllowed={(values) => {
                if (validate) return validate(values.value);
                return true;
              }}
              onFocus={onFocus}
              disabled={disabled}
              style={{
                opacity: disabled ? 0.5 : 1,
              }}
            />
          </StyledInputWrapper>
        );

      case "gameDetail-number":
        return (
          <DetailWrapper>
            <Button onClick={() => onEditAmt(value - 1, onChange)}>
              <img alt={"MinusIcon"} src={MinusIcon} />
            </Button>
            <DetailNumField
              id="outlined-basic"
              variant="outlined"
              value={value}
              onChange={(e) => onChangeAmt(e, onChange)}
            />
            <Button onClick={() => onEditAmt(value + 1, onChange)}>
              <img alt={"PlusIcon"} src={PlusIcon} />
            </Button>
          </DetailWrapper>
        );

      default:
        return (
          <StyledInputWrapper>
            <StyledInput
              ref={ref}
              value={value || ""}
              onFocus={onFocus}
              onChange={onChange}
              placeholder={label}
              disabled={disabled}
              type={type}
              style={{
                opacity: disabled ? 0.5 : 1,
              }}
            />
          </StyledInputWrapper>
        );
    }
  };

  return (
    <StyledContainer>
      <Controller
        name={name}
        control={control}
        defaultValue={showDefault ? defaultValue : ""}
        rules={{
          required: errorMessage,
        }}
        render={({ field: { onChange, value } }) => (
          <StyledInputContainer error={error}>
            {renderComponent(onChange, value)}
          </StyledInputContainer>
        )}
      />
      <FieldDescription zeroPadding={zeroPadding}>
        {description}
        {!disabled && !disableExample && (
          <Typography
            sx={{
              display: "inline",
              fontWeight: 800,
              "&:hover": {
                cursor: "pointer",
              },
            }}
            variant="body2"
            onClick={() => onExampleClick()}>
            {" "}
            example
          </Typography>
        )}
      </FieldDescription>
    </StyledContainer>
  );
}
