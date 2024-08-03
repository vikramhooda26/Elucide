import { atom } from "recoil";
import { mails, TMail } from "./data";

type Config = {
    selected: TMail["id"] | null;
};

export const configAtom = atom<Config>({
    key: "configAtom",
    default: { selected: mails[0].id },
});

