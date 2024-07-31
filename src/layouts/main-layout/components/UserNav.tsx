import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { toast } from "sonner";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { useAuth } from "../../../features/auth/auth-provider/AuthProvider";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../../lib/constants";
import AuthService from "../../../services/auth/AuthService";
import ErrorService from "../../../services/error/ErrorService";
import { loadingAtom } from "../../../store/atoms/global";
import { userAtom } from "../../../store/atoms/user";

export function UserNav() {
    const user = useRecoilValue(userAtom);
    const { logout } = useAuth();
    const setIsLoading = useSetRecoilState(loadingAtom);
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            setIsLoading(true);
            const response = await AuthService.logout();

            if (response.status === HTTP_STATUS_CODES.OK) {
                toast.info("Logged out successfully");
                logout();
                navigate(NAVIGATION_ROUTES.HOME, { replace: true });
            }
        } catch (error) {
            console.error(error);
            const unknownError = ErrorService.handleCommonErrors(
                error,
                logout,
                navigate
            );
            if (unknownError) {
                toast.error("An unknown error occured");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                >
                    <Avatar className="h-8 w-8">
                        <AvatarImage
                            src="/avatars/01.png"
                            alt="@shadcn"
                        />
                        <AvatarFallback>
                            {user
                                ? user.firstName?.[0] + user.lastName?.[0]
                                : ""}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-56"
                align="end"
                forceMount
            >
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {user?.firstName || ""}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user?.email || ""}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>
                        Billing
                        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem> */}
                    <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>New Team</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogOut}>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
