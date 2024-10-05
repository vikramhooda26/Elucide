import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../lib/constants";
import { NavigateFunction } from "react-router-dom";
import { toast } from "sonner";

class ErrorService {
    static handleCommonErrors(error: any, logout: () => void, navigate?: NavigateFunction) {
        switch (error?.response?.status) {
            case HTTP_STATUS_CODES.FORBIDDEN:
                logout();
                if (window.location.pathname.startsWith(NAVIGATION_ROUTES.LOGIN)) {
                    toast.error("Login failed!");
                } else {
                    toast.error("Session expired!");
                    if (navigate) {
                        navigate(NAVIGATION_ROUTES.HOME, { replace: true });
                    } else {
                        window.location.href = NAVIGATION_ROUTES.HOME;
                    }
                }
                break;
            case HTTP_STATUS_CODES.BAD_REQUEST:
                toast.error("Invalid Request. Contact the developer for support");
                break;
            default:
                return error;
        }
    }
}

export default ErrorService;
