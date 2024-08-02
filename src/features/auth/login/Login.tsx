import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useSetRecoilState } from "recoil";
import { toast } from "sonner";
import { z } from "zod";
import ErrorMsg from "../../../components/error/ErrorMsg";
import { AnimatedInput } from "../../../components/ui/animated-input";
import { CustomLabel } from "../../../components/ui/custom-label";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../../lib/constants";
import { cn } from "../../../lib/utils";
import AuthService from "../../../services/auth/AuthService";
import ErrorService from "../../../services/error/ErrorService";
import { userAtom } from "../../../store/atoms/user";
import { useAuth } from "../auth-provider/AuthProvider";

const loginSchema = z.object({
    username: z.string().min(3,'Username is required'),
    password: z.string().min(3,'Please enter your password'),
});

function LoginPage() {
    const { login, isAuthenticated, logout } = useAuth();

    if (isAuthenticated) {
        return (
            <Navigate
                to={NAVIGATION_ROUTES.DASHBOARD}
                replace
            />
        );
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(loginSchema) });

    const navigate = useNavigate();

    const [isPasswordVisible, setisPasswordVisible] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const setUser = useSetRecoilState(userAtom);

    const handleLoginSubmit = async (data: FieldValues) => {
        try {
            setIsSubmitting(true);
            const requestBody = {
                username: data?.username,
                password: data?.password,
            };

            const response = await AuthService.login(requestBody);

            if (response.status === HTTP_STATUS_CODES.OK) {
                setUser({
                    id: response.data.userId,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    username: response.data.username,
                    email: response.data.email,
                    role: response.data.role,
                });
                login();
                toast.success("Logged in successfully");
                navigate(NAVIGATION_ROUTES.DASHBOARD);
            }
        } catch (error: any) {
            const unknownError = ErrorService.handleCommonErrors(
                error,
                logout,
                navigate
            );
            if (unknownError) {
                toast.error("An unknown error occured");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-[calc(100dvh-82px)] w-full flex items-center justify-center bg-black py-16">
            <div className="max-w-md w-[90%] rounded-2xl px-8 py-16 shadow-input shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center">
                    Welcome to Elucide Sports
                </h2>
                <p className="text-neutral-600 text-sm text-center max-w-sm mt-2 dark:text-neutral-300">
                    Login to elucide sports to start taking data backed
                    decisions
                </p>
                <form
                    className="my-8"
                    onSubmit={handleSubmit(handleLoginSubmit)}
                >
                    <LabelInputContainer className="mb-4">
                        <CustomLabel htmlFor="username">Username</CustomLabel>
                        <AnimatedInput
                            {...register("username")}
                            id="username"
                            placeholder="example_user"
                            type="text"
                            disabled={isSubmitting}
                        />
                        {errors?.username?.message ? (
                            <ErrorMsg msg="Username is required" show={typeof errors?.username?.message === 'string' && errors?.username?.message?.length > 0} />
                        ) : null}
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <CustomLabel htmlFor="password">Password</CustomLabel>
                        <div className="relative">
                            <AnimatedInput
                                {...register("password")}
                                id="password"
                                placeholder="••••••••"
                                type={isPasswordVisible ? "text" : "password"}
                                disabled={isSubmitting}
                            />
                            {isPasswordVisible ? (
                                <EyeOff
                                    className="absolute right-2 top-1/2 -translate-y-1/2 size-5 cursor-pointer select-none"
                                    onClick={() =>
                                        setisPasswordVisible((p) => !p)
                                    }
                                />
                            ) : (
                                <Eye
                                    className="absolute right-2 top-1/2 -translate-y-1/2 size-5 cursor-pointer select-none"
                                    onClick={() =>
                                        setisPasswordVisible((p) => !p)
                                    }
                                />
                            )}
                        </div>
                        {errors?.password?.message ? (
                            <ErrorMsg msg="Please enter your password"  show={typeof errors?.password?.message  === 'string' && errors?.password?.message?.length > 0} />
                        ) : null}
                    </LabelInputContainer>

                    <button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] !mt-10 active:brightness-50 transition-all duration-300 ease-in-out"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        <div
                            className={cn(
                                "flex items-center justify-center gap-3",
                                isSubmitting && "brightness-50"
                            )}
                        >
                            <span>Login</span>
                            {isSubmitting ? (
                                <ClipLoader
                                    size={15}
                                    color="#FFFF"
                                />
                            ) : (
                                <ArrowRight className="size-4" />
                            )}
                        </div>
                        <BottomGradient />
                    </button>
                </form>
                {/* <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" /> */}
            </div>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};

export default LoginPage;
