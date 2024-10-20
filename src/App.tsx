import { AppProvider } from "./provider/app-providers";
import MainRouter from "./routes/MainRouter";

const App: React.FC = (): React.JSX.Element => {
    //
    return (
        <AppProvider>
            <MainRouter />
        </AppProvider>
    );
};

export default App;
