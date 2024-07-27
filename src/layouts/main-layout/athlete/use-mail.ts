import { atom } from "recoil";
import { mails, TMail } from "../../../features/templates/examples/mail/data";

type Config = {
    selected: TMail["id"] | null;
};

export const configAtom = atom<Config>({
    key: "configAtom",
    default: { selected: mails[0].id },
});
