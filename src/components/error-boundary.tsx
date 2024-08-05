import { FallbackProps } from "react-error-boundary";
import styles from "./ErrorFallBack.module.css";
import { Button } from "./ui/button";

function ErrorFallBack({ error, resetErrorBoundary }: FallbackProps) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>Something went wrong 🤔</h1>
                <pre className="text-default">{error.message}</pre>
                <Button
                    variant="default"
                    onClick={resetErrorBoundary}
                >
                    Back
                </Button>
            </div>
        </div>
    );
}

export default ErrorFallBack;
