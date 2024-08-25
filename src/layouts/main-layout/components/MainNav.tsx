import { Link } from "react-router-dom";
import { cn } from "../../../lib/utils";
import { useUser } from "../../../hooks/useUser.tsx";
import { NAVIGATION_ROUTES } from "../../../lib/constants.ts";

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const user = useUser();
    return (
        <nav
            className={cn(
                "flex items-center space-x-4 lg:space-x-6",
                className
            )}
            {...props}
        >
            {user?.role === "SUPER_ADMIN" && (
                <Link
                    to={NAVIGATION_ROUTES.CREATE_USER}
                    className="text-sm font-medium transition-colors hover:text-primary"
                >
                    Create user
                </Link>
            )}
            <Link
                to={NAVIGATION_ROUTES.USERS_LIST}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
                Manage users
            </Link>
        </nav>
    );
}
