import { atom } from 'recoil';

export const filterState = atom<Record<string, Record<string, { type: string; value: any, isMandatory: boolean; }>>>({
  key: 'filterState',
  default: {},
});
