import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import ErrorMsg from "../../../components/error/ErrorMsg";
import { cn } from "../../../lib/utils";
import AuthService from "../../../services/auth/AuthService";
import { useAuth } from "../auth-provider/AuthProvider";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { CustomLabel } from "../../../components/ui/custom-label";
import { AnimatedInput } from "../../../components/ui/animated-input";
import { useState } from "react";
import { roles } from "../../../constant";
import { toast } from "sonner";

const loginSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Please enter your password"),
});

function LoginPage() {
    const TAG = LoginPage.name;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(loginSchema) });

    const { login } = useAuth();
    const navigate = useNavigate();

    const [isPasswordVisible, setisPasswordVisible] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleLoginSubmit = async (data: {
        username: string;
        password: string;
    }) => {
        try {
            setIsLoading(true);

            const requestBody = {
                username: data.username,
                password: data.password,
            };

            const response = await AuthService?.doLogin(requestBody);

            if (Object.keys(response?.data)?.length <= 0) {
                console.log("Login Failed");
                toast("Login Failed");
                return;
            }

            const resp = response?.data;

            if (!roles?.some((role) => role === resp?.role)) {
                console.log("Login Failed");
                toast("Login Failed");
                return;
            }

            login();
            AuthService.setUser(resp);
            toast.success("Logged in successfully");
            navigate("/");
        } catch (error) {
            console.error(TAG, "Authentication API ERROR:", error);
            toast.error("An unknown error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-screen w-full flex items-center justify-center bg-black">
            <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 py-8 md:px-8 md:py-16 shadow-input shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]">
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center">
                    Welcome to Elucide Sports
                </h2>
                <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
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
                            disabled={isLoading}
                        />
                        {errors?.username?.message ? (
                            <ErrorMsg msg="Username is required" />
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
                                disabled={isLoading}
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
                            <ErrorMsg msg="Please enter your password" />
                        ) : null}
                    </LabelInputContainer>

                    <button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] !mt-10 active:brightness-50 transition-all duration-300 ease-in-out"
                        type="submit"
                        disabled={isLoading}
                    >
                        <div className="flex items-center justify-center gap-3">
                            <span>{isLoading ? "Checking..." : "Login"}</span>
                            {isLoading ? (
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

// <Card className="w-full max-w-sm">
//   <CardHeader>
//     <CardTitle className="text-2xl">Login</CardTitle>
//     <CardDescription>
//       Enter your email below to login to your account.
//     </CardDescription>
//   </CardHeader>

//   <CardContent className="grid gap-4">
//     <form className="my-8" onSubmit={handleSubmit(handleLoginSubmit)}>
//       <div className="grid gap-2">
//         <Label htmlFor="email">Email</Label>
//         <Input {...register('email')} id="email" type="email" placeholder="m@example.com" required />
//         {errors?.email?.message ? <ErrorMsg msg="Please enter valid email." /> : null}
//       </div>
//       <div className="grid gap-2">
//         <Label htmlFor="password">Password</Label>
//         <Input {...register('password')} id="password" type="password" required />
//         {errors?.password?.message ? <ErrorMsg msg="Please enter correct password." /> : null}
//       </div>
//     </form>
//   </CardContent>

//   <CardFooter>
//     <Button type="submit" className="w-full ">Log in</Button>
//   </CardFooter>
// </Card>
