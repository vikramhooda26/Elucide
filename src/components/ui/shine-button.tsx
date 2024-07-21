const ButtonBackgroundShine = ({
    children,
    ...props
}: {
    children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            className="inline-flex py-2 animate-background-shine items-center justify-center rounded-md border border-gray-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-gray-400 transition-colors focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 focus:ring-offset-gray-50"
            {...props}
        >
            {children}
        </button>
    );
};

export default ButtonBackgroundShine;
