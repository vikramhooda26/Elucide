import { ClipLoader } from "react-spinners";

export const LoadingOverlay = () => {
    return (
        <div className="fixed z-50 bg-black/20 w-full h-dvh flex items-center justify-center">
            <ClipLoader
                size={30}
                color="#FFFF"
            />
        </div>
    );
};
