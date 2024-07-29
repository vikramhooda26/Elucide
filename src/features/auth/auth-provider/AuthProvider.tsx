import { ReactElement, createContext, useContext, useMemo } from "react";
import {
    AuthContextType,
    AuthProviderProps,
} from "../../../types/auth/AuthProviderTypes";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isAuthenticatedAtom, userAtom } from "../../../store/atoms/user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps): ReactElement => {
    const [isAuthenticated, setAuthenticated] =
        useRecoilState(isAuthenticatedAtom);
    const setUser = useSetRecoilState(userAtom);

    const login = () => {
        setAuthenticated(true);
    };

    const logout = () => {
        setAuthenticated(false);
        setUser(null);
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
