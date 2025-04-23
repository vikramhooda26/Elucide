// selectors/loadingBarSelector.js
import { selector } from "recoil";
import { loadingAtom } from "../atoms/global";

export const loadingBarSelector = selector({
  key: "loadingBarSelector",
  get: ({ get }) => {
    const isLoading = get(loadingAtom);
    return isLoading;
  },
  set: ({ set }, newValue) => {
    set(loadingAtom, newValue);
  }
});
