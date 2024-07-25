import { RecoilRoot } from "recoil";
import { ThemeProvider } from "./theme/theme-provider";
import { AuthProvider } from "../features/auth/auth-provider/AuthProvider";
import { Toaster } from "sonner";
import LoadingBarWrapper from "./loading-wrapper";

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <RecoilRoot>
            <ThemeProvider
                defaultTheme="dark"
                storageKey="vite-ui-theme"
            >
                <AuthProvider>
                    <Toaster richColors />
                    <LoadingBarWrapper />
                    {children}
                </AuthProvider>
            </ThemeProvider>
        </RecoilRoot>
    );
};
