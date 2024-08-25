import { useUser } from "../../hooks/useUser";
import { Button } from "../ui/button";

type TConditionalButtonProps = {
    children?: React.ReactNode;
    onClick?: () => void;
    accessLevel?: "super_admin" | "all_staff";
};

export const ConditionalButton: React.FC<TConditionalButtonProps> = ({
    children,
    onClick,
    accessLevel = "super_admin"
}) => {
    const userRole = useUser()?.role;

    const shouldRenderButton = () => {
        if (accessLevel === "super_admin") {
            return userRole === "SUPER_ADMIN";
        } else if (accessLevel === "all_staff") {
            return (
                userRole === "SUPER_ADMIN" ||
                userRole === "ADMIN" ||
                userRole === "STAFF"
            );
        }
        return false;
    };

    return shouldRenderButton() ? (
        <Button onClick={onClick}>{children}</Button>
    ) : null;
};
