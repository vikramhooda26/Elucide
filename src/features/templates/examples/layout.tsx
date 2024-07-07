import { cn } from "../../../lib/utils"
import { Announcement } from "../components/announcement"
import { ExamplesNav } from "../components/examples-nav"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "../components/page-header"
import { buttonVariants } from "../../../components/ui/button"
import { Link, Outlet } from "react-router-dom"

// interface ExamplesLayoutProps {
//   children: React.ReactNode
// }// interface ExamplesLayoutProps {
//   children: React.ReactNode
// }


function TemplateLayout() {
  return (
    <div className="container relative">
      <PageHeader>
        <Announcement />
        <PageHeaderHeading className="hidden md:block">
          Check out some examples
        </PageHeaderHeading>
        <PageHeaderHeading className="md:hidden">Examples</PageHeaderHeading>
        <PageHeaderDescription>
          Dashboard, cards, authentication. Some examples built using the
          components. Use this as a guide to build your own.
        </PageHeaderDescription>
        <PageActions>
          <Link to="/docs" className={cn(buttonVariants(), "rounded-[6px]")}>
            Get Started
          </Link>
          <Link
            to="/components"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-[6px]"
            )}
          >
            Components
          </Link>
        </PageActions>
      </PageHeader>
      <section>
        <ExamplesNav />
        <div className="overflow-hidden rounded-[0.5rem] border bg-background shadow">
          {/* {Outlet} */}
        </div>
      </section>
    </div>
  )
}

export default TemplateLayout;