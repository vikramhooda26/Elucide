import { ClipLoader } from "react-spinners";
import { useRecoilValue } from "recoil";
import { loadingAtom } from "../store/atoms/global";

export const LoadingOverlay = () => {
    const isLoading = useRecoilValue(loadingAtom);

    if (isLoading) {
        return (
            <div className="fixed z-50 bg-black/80 w-full h-dvh flex items-center justify-center">
                <ClipLoader
                    size={40}
                    color="#FFFF"
                />
            </div>
        );
    }
};
