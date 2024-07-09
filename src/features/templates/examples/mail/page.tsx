import Image from "../../../../components/image/Image"
import CookieService from "../../../../services/cookies/CookieService"
import { Mail } from "./components/mail"
import { accounts, mails } from "./data"

export default function MailPage() {
  const layout = CookieService.getCookie("react-resizable-panels:layout")
  const collapsed = CookieService.getCookie("react-resizable-panels:collapsed")

  const defaultLayout = layout ? layout.value : undefined
  const defaultCollapsed = collapsed ? collapsed.value : undefined

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/mail-dark.png"
          width={1280}
          height={727}
          alt="Mail"
          className="hidden dark:block"
        />
        <Image
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
  )
}
