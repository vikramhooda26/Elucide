import { RecoilState, selector } from "recoil";
import { metadataStoreAtom } from "../atoms/metadata";

export const metadataStoreSelector: RecoilState<any> = selector({
  key: "metadataStoreSelector",
  get: ({ get }) => {
    const metadataStore = get(metadataStoreAtom);
    return metadataStore;
  },
  set: ({ set }, newValue) => {
    set(metadataStoreAtom, newValue);
  }
});
