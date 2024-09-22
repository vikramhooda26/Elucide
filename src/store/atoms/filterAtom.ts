import { atom } from 'recoil';

export const filterState = atom<Record<string, Record<string, { type: string; value: any }>>>({
  key: 'filterState',
  default: {},
});
