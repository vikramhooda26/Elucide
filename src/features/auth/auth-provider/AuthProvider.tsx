import {
    ReactElement,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { AuthContextType, AuthProviderProps, } from "../../../types/auth/AuthProviderTypes";
import AuthService from "../../../services/auth/AuthService";
import { roles } from "../../../constant";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps): ReactElement => {

    const [isAuthenticated, setAuthenticated] = useState<boolean>(true);
    const user = AuthService.getUser();
    const loginRole = user?.role
    const isUserExists = Object.keys(user)?.length > 0;

    // useEffect(() => {
    //     if (isUserExists && roles?.some((role) => role === loginRole)) {
    //         setAuthenticated(true);
    //     } else {
    //         setAuthenticated(false);
    //     }
    // }, [user]);

    const login = () => {
        setAuthenticated(true);
    };

    const logout = () => {
        setAuthenticated(false);
        AuthService?.clearUser();
        window.location.href = '/elucide/home';
    };

    const contextValue = useMemo(
        () => ({ isAuthenticated, login, logout }),
        [isAuthenticated]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
