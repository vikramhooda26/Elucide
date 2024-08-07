import { Link } from "react-router-dom";
import { cn } from "../../../lib/utils";

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    return (
        <nav
            className={cn(
                "flex items-center space-x-4 lg:space-x-6",
                className
            )}
            {...props}
        >
            <Link
                to="/create-user"
                className="text-sm font-medium transition-colors hover:text-primary"
            >
                Create user
            </Link>
            <Link
                to="/examples/dashboard"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
                Staff
            </Link>
            <Link
                to="/examples/dashboard"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
                Actions
            </Link>
            <Link
                to="/examples/dashboard"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
                Settings
            </Link>
        </nav>
    );
}
