import { FallbackProps } from "react-error-boundary";
import { Button } from "./ui/button";

function ErrorFallBack({ error, resetErrorBoundary }: FallbackProps) {
    return (
        <div>
            <div>
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
