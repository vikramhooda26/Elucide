import { RecoilRoot } from "recoil";
import { Toaster } from "sonner";
import { AuthProvider } from "../features/auth/auth-provider/AuthProvider";
import LoadingBarWrapper from "./loading-wrapper";
import { ThemeProvider } from "./theme/theme-provider";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <RecoilRoot>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <AuthProvider>
                    <Toaster richColors duration={3000} />
                    <LoadingBarWrapper />
                    {children}
                </AuthProvider>
            </ThemeProvider>
        </RecoilRoot>
    );
};
