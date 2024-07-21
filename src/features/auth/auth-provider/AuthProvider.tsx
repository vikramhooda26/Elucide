import {
    ReactElement,
    createContext,
    useContext,
    useMemo,
    useState,
} from "react";
import {
    AuthContextType,
    AuthProviderProps,
} from "../../../types/auth/AuthProviderTypes";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps): ReactElement => {
    // Temporarily settings this to true after login page we should set 'false'.
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

    // Need to un-comment it later.
    // useEffect(() => {
    //   if (token) {
    //     setAuthenticated(true);
    //   } else {
    //     setAuthenticated(false);
    //   }
    // }, [token]);

    const login = () => {
        setAuthenticated(true);
    };

    const logout = () => {
        setAuthenticated(false);
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
