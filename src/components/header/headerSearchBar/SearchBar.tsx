import React, { useEffect } from "react";
import { SearchBarInput, SearchBarWrapper } from "./styled";
import close from "assets/icons/close.svg";
import search from "assets/icons/search.svg"; // Add this import
import { Backdrop, ClickAwayListener, IconButton } from "@mui/material";
// Remove AppButton import
import { HeaderSearchResults } from "components/header/headerSearchResults";
import { useAddressHistory } from "hooks/useAddressHistory";

interface SearchBarProps {
  closeMenu?: () => void;
  resetExample?: () => void;
  example?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ example, resetExample, closeMenu }) => {
  const {
    addresses,
    onAddressClick,
    resetAddresses,
    removeAddress,
    onSubmit,
    setActive,
    setValue,
    addressInput,
  } = useAddressHistory();

  const onAddressRemove = (e: any, address: string) => {
    e.stopPropagation();
    removeAddress(address);
  };

  useEffect(() => {
    resetExample?.();
    const listener = (event: any) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        event.target.blur();
        onSubmit(addressInput.value);
        closeMenu?.();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [addressInput.value, closeMenu, onSubmit, resetExample]);

  useEffect(() => {
    example && setValue(example);
  }, [example, setValue]);

  return (
    <ClickAwayListener onClickAway={() => setActive(false)}>
      <>
        <Backdrop
          sx={{ color: "#fff", zIndex: 2, overflow: "hidden" }}
          open={addressInput.active}
          onClick={() => setActive(false)}></Backdrop>
        <SearchBarWrapper>
          <SearchBarInput
            placeholder="Search cabal jetton address"
            onPaste={(e: any) => setValue(e.target.value)}
            onChange={(e) => setValue(e.target.value)}
            value={addressInput.value}
            onFocus={() => addresses?.length && setActive(true)}
            spellCheck={false}
          />
          {!!addressInput.value.length && (
            <>
              <IconButton onClick={() => setValue("")}>
                <img src={close} alt="Close Icon" width={18} height={18} />
              </IconButton>
              <IconButton
                onClick={() => {
                  onSubmit(addressInput.value);
                  closeMenu?.();
                }}>
                <img
                  src={search}
                  alt="Search Icon"
                  style={{ width: 18, height: 18, color: "#000" }}
                />
              </IconButton>
            </>
          )}
          {addressInput.active && !!addresses?.length && (
            <HeaderSearchResults
              searchResults={addresses}
              onHistoryClear={resetAddresses}
              onItemClick={onAddressClick}
              onItemDelete={onAddressRemove}
            />
          )}
        </SearchBarWrapper>
      </>
    </ClickAwayListener>
  );
};
