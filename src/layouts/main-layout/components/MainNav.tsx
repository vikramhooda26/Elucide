import { Link } from "react-router-dom";
import { cn } from "../../../lib/utils";
import { useUser } from "../../../hooks/useUser.tsx";

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
                    to="/create-user"
                    className="text-sm font-medium transition-colors hover:text-primary"
                >
                    Create user
                </Link>
            )}
            <Link
                to="#"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
                Staff
            </Link>
            <Link
                to="#"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
                Actions
            </Link>
            <Link
                to="#"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
                Settings
            </Link>
        </nav>
    );
}
