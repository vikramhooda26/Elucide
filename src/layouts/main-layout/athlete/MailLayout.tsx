import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Mail } from "./Mail";
import {
    accounts,
    mails,
} from "../../../features/templates/examples/mail/data";

export default function MailLayout() {
    const [defaultLayout, setDefaultLayout] = useState(undefined);
    const [defaultCollapsed, setDefaultCollapsed] = useState(undefined);

    useEffect(() => {
        const layout = Cookies.get("react-resizable-panels:layout:mail");
        const collapsed = Cookies.get("react-resizable-panels:collapsed");

        if (layout) {
            setDefaultLayout(JSON.parse(layout));
        }
        if (collapsed) {
            setDefaultCollapsed(JSON.parse(collapsed));
        }
    }, []);

    return (
        <>
            <div className="md:hidden">
                <img
                    src="/examples/mail-dark.png"
                    width={1280}
                    height={727}
                    alt="Mail"
                    className="hidden dark:block"
                />
                <img
                    src="/examples/mail-light.png"
                    width={1280}
                    height={727}
                    alt="Mail"
                    className="block dark:hidden"
                />
            </div>
            <div className="hidden flex-col md:flex">
                <Mail
                    accounts={accounts}
                    mails={mails}
                    defaultLayout={defaultLayout}
                    defaultCollapsed={defaultCollapsed}
                    navCollapsedSize={4}
                />
            </div>
        </>
    );
}
