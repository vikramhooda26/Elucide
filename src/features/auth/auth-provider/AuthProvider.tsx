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
import { useSetRecoilState } from "recoil";
import { userAtom } from "../../../store/atoms/user";
import { toast } from "sonner";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps): ReactElement => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
    const setUser = useSetRecoilState(userAtom);

    const login = () => {
        setAuthenticated(true);
    };

    const logout = () => {
        setAuthenticated(false);
        setUser(null);
        toast.info("Logged out successfully!");
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
