import { atom } from "recoil";
import { TRoles } from "../../lib/constants";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

type TUser = {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    role: TRoles;
} | null;

export const userAtom = atom<TUser>({
    key: "userAtom",
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const isAuthenticatedAtom = atom<boolean>({
    key: "isAuthenticatedAtom",
    default: false,
    effects_UNSTABLE: [persistAtom],
});
