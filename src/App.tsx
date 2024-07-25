import MainRouter from "./routes/MainRouter";
import { AppProvider } from "./provider/app-providers";

const App: React.FC = (): React.JSX.Element => {
    return (
        <AppProvider>
            <MainRouter />
        </AppProvider>
    );
};

export default App;
