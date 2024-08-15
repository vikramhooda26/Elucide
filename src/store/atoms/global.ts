import { atom } from "recoil";

export const loadingAtom = atom<boolean>({
    key: "loadingAtom",
    default: false,
});

export const listLoadingAtom = atom<boolean>({
    key: "listLoadingAtom",
    default: true,
});
