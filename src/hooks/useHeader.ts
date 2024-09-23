import { useCallback } from "react";
import { atom, useRecoilState } from "recoil";

interface HeaderOptions {
  showBackButton: boolean;
  showAvatar: boolean;
  // Add more options here in the future
}

export const headerTitleState = atom({
  key: "headerTitleState",
  default: "",
});

export const headerOptionsState = atom<HeaderOptions>({
  key: "headerOptionsState",
  default: {
    showBackButton: false,
    showAvatar: true,
    // Initialize future options here
  },
});
export const useHeader = () => {
  const [title, setTitle] = useRecoilState(headerTitleState);
  const [options, setOptions] = useRecoilState(headerOptionsState);

  const setHeader = useCallback(
    (newTitle: string, newOptions: Partial<HeaderOptions> = {}) => {
      setTitle(newTitle);
      setOptions((currentOptions) => ({
        ...currentOptions,
        ...newOptions,
      }));
    },
    [setTitle, setOptions],
  );

  return {
    title,
    options,
    setHeader,
  };
};
