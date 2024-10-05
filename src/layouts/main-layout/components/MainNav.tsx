import { Link } from "react-router-dom";
import { useUser } from "../../../hooks/useUser.tsx";
import { NAVIGATION_ROUTES } from "../../../lib/constants.ts";
import { cn } from "../../../lib/utils";

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
    const user = useUser();
    const hasPermission = user?.role === "SUPER_ADMIN";
    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
            {hasPermission && (
                <Link
                    to={NAVIGATION_ROUTES.CREATE_USER}
                    className="text-sm font-medium transition-colors hover:text-primary"
                >
                    Create user
                </Link>
            )}
            {hasPermission && (
                <Link
                    to={NAVIGATION_ROUTES.USERS_LIST}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                    Manage users
                </Link>
            )}
        </nav>
    );
}
