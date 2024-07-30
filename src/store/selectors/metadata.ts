import { selector } from "recoil";
import { metadataStoreAtom } from "../atoms/metadata";

export const metadataStoreSelector = selector({
    key: "metadataStoreSelector",
    get: ({ get }) => {
        const metadataStore = get(metadataStoreAtom);
        return metadataStore;
    },
    set: ({ set }, newValue) => {
        set(metadataStoreAtom, newValue);
    },
});
