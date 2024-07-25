import { useEffect, useRef } from "react";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";
import { useRecoilValue } from "recoil";
import { loadingBarSelector } from "../store/selectors/global";

const LoadingBarWrapper = () => {
    const ref = useRef<LoadingBarRef | null>(null);
    const isLoading = useRecoilValue(loadingBarSelector);

    useEffect(() => {
        if (ref.current) {
            if (isLoading) {
                ref.current.continuousStart();
            } else {
                ref.current.complete();
            }
        }
    }, [isLoading]);

    return (
        <LoadingBar
            color="#f11946"
            ref={ref}
        />
    );
};

export default LoadingBarWrapper;
