import { useEffect } from "react";
import { AppProvider } from "./provider/app-providers";
import MainRouter from "./routes/MainRouter";

const App: React.FC = (): React.JSX.Element => {
    useEffect(() => {
        const currentHost = window.location.hostname;
        console.log("currentHost", currentHost);
    }, []);

    return (
        <AppProvider>
            <MainRouter />
        </AppProvider>
    );
};

export default App;
