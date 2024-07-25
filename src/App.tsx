import { Toaster } from "sonner";
import { AuthProvider } from "./features/auth/auth-provider/AuthProvider";
import { ThemeProvider } from "./provider/theme/theme-provider";
import MainRouter from "./routes/MainRouter";

const App: React.FC = (): React.JSX.Element => {
    return (
        <ThemeProvider
            defaultTheme="dark"
            storageKey="vite-ui-theme"
        >
            <AuthProvider>
                <Toaster richColors />
                <MainRouter />
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
