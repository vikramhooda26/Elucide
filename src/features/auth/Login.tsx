import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { toast } from "sonner";
import { z } from "zod";
import ErrorMsg from "../../components/error/ErrorMsg";
import Loader from "../../components/Loader";
import { AnimatedInput } from "../../components/ui/animated-input";
import { CustomLabel } from "../../components/ui/custom-label";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../lib/constants";
import { cn } from "../../lib/utils";
import AuthService from "../../services/auth/AuthService";
import ErrorService from "../../services/error/ErrorService";
import { userAtom } from "../../store/atoms/user";
import { useAuth } from "./auth-provider/AuthProvider";
import { BottomGradient } from "./components/button-gradient";
import { LabelInputContainer } from "./components/label-input-container";

const loginSchema = z.object({
    username: z.string().min(3, "Username is required"),
    password: z.string().min(3, "Please enter your password")
});

function LoginPage() {
    const { login, isAuthenticated, logout } = useAuth();

    if (isAuthenticated) {
        return <Navigate to={NAVIGATION_ROUTES.DASHBOARD} replace />;
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
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
                password: data?.password
            };

            const response = await AuthService.login(requestBody);

            if (response.status === HTTP_STATUS_CODES.OK) {
                setUser({
                    id: response.data.userId,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    username: response.data.username,
                    email: response.data.email,
                    role: response.data.role
                });
                login();
                toast.success("Logged in successfully");
                navigate(NAVIGATION_ROUTES.DASHBOARD);
            } else {
                toast.error("Internal server error");
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
        <div className="flex min-h-[calc(100dvh-82px)] w-full items-center justify-center bg-black py-16">
            <div className="w-[90%] max-w-md rounded-2xl px-8 py-16 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] shadow-input">
                <h2 className="text-center text-xl font-bold text-neutral-800 dark:text-neutral-200">
                    Welcome to Elucide Sports
                </h2>
                <p className="mt-2 max-w-sm text-center text-sm text-neutral-600 dark:text-neutral-300">
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
                            <ErrorMsg
                                msg="Username is required"
                                show={
                                    typeof errors?.username?.message ===
                                        "string" &&
                                    errors?.username?.message?.length > 0
                                }
                            />
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
                                    className="absolute right-2 top-1/2 size-5 -translate-y-1/2 cursor-pointer select-none"
                                    onClick={() =>
                                        setisPasswordVisible((p) => !p)
                                    }
                                />
                            ) : (
                                <Eye
                                    className="absolute right-2 top-1/2 size-5 -translate-y-1/2 cursor-pointer select-none"
                                    onClick={() =>
                                        setisPasswordVisible((p) => !p)
                                    }
                                />
                            )}
                        </div>
                        {errors?.password?.message ? (
                            <ErrorMsg
                                msg="Please enter your password"
                                show={
                                    typeof errors?.password?.message ===
                                        "string" &&
                                    errors?.password?.message?.length > 0
                                }
                            />
                        ) : null}
                    </LabelInputContainer>

                    <button
                        className="group/btn relative !mt-10 block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] transition-all duration-300 ease-in-out active:brightness-50 dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
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
                                <Loader visible={isSubmitting} />
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

export default LoginPage;
