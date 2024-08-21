import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import z from "zod";
import { CardWrapper } from "../../components/card/card-wrapper";
import { FormItemWrapper } from "../../components/form/item-wrapper";
import { Button } from "../../components/ui/button";
import { Form, FormField } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import SelectBox from "../../components/ui/multi-select";
import { HTTP_STATUS_CODES } from "../../lib/constants";
import AuthService from "../../services/auth/AuthService";
import ErrorService from "../../services/error/ErrorService";
import { useAuth } from "./auth-provider/AuthProvider";

const newUserSchema = z
    .object({
        username: z.string().min(1, "username is required"),
        email: z.string().min(1, "email is required"),
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().optional(),
        password: z
            .string()
            .min(8, "Password must be minimum 8 characters long"),
        confirmPassword: z.string(),
        role: z.enum(["SUPER_ADMIN", "ADMIN", "STAFF", "USER"])
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password doesn't match",
        path: ["confirmPassword"]
    });

const roles = [
    { value: "SUPER_ADMIN", label: "SUPER_ADMIN" },
    { value: "ADMIN", label: "ADMIN" },
    { value: "STAFF", label: "STAFF" },
    { value: "USER", label: "USER" }
];

type TNewUserSchema = z.infer<typeof newUserSchema>;

function SignUpPage() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const form = useForm<TNewUserSchema>({
        resolver: zodResolver(newUserSchema),
        defaultValues: {
            role: "USER"
        }
    });

    const [isPasswordVisible, setisPasswordVisible] = useState<boolean>(false);
    const [isConfirmPasswordVisible, setisConfirmPasswordVisible] =
        useState<boolean>(false);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleLoginSubmit = async (userDetails: TNewUserSchema) => {
        try {
            setIsSubmitting(true);

            const requestBody = {
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                email: userDetails.email,
                username: userDetails.username,
                password: userDetails.password,
                role: userDetails.role
            };

            const response = await AuthService.createUser(requestBody);

            if (response.status === HTTP_STATUS_CODES.OK) {
                toast.success("User created successfully");
                form.reset({
                    username: "",
                    email: "",
                    firstName: "",
                    lastName: "",
                    password: "",
                    confirmPassword: "",
                    role: "USER"
                });
            }
        } catch (error: any) {
            const unknownError = ErrorService.handleCommonErrors(
                error,
                logout,
                navigate
            );
            if (unknownError.response.status === HTTP_STATUS_CODES.CONFLICT) {
                toast.error("Username already exists!");
            } else {
                toast.error("An unknown error occurred");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex-1 gap-4 py-8 md:gap-8">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleLoginSubmit)}
                    className="mx-auto grid flex-1 auto-rows-max gap-4"
                >
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => navigate(-1)}
                            type="button"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Button>
                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                            Create User
                        </h1>

                        <div className="hidden items-center gap-2 md:ml-auto md:flex">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={isSubmitting}
                                onClick={() => navigate(-1)}
                                type="button"
                            >
                                Discard
                            </Button>
                            <Button
                                type="submit"
                                size="sm"
                                className="gap-1"
                                disabled={isSubmitting}
                            >
                                <span>Create User</span>
                                {isSubmitting && (
                                    <ClipLoader size={15} color="#020817" />
                                )}
                            </Button>
                        </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:gap-8">
                        <div className="grid auto-rows-max items-start gap-4">
                            <CardWrapper title="User Details">
                                <div className="grid gap-6">
                                    <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="firstName"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="First Name">
                                                        <Input
                                                            {...field}
                                                            placeholder="First name"
                                                        />
                                                    </FormItemWrapper>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="lastName"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="Last Name">
                                                        <Input
                                                            {...field}
                                                            placeholder="Last name"
                                                        />
                                                    </FormItemWrapper>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="username"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="Username">
                                                        <Input
                                                            {...field}
                                                            placeholder="Username"
                                                            autoComplete="off"
                                                        />
                                                    </FormItemWrapper>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="Email">
                                                        <Input
                                                            {...field}
                                                            placeholder="Email"
                                                            type="email"
                                                        />
                                                    </FormItemWrapper>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name="role"
                                            render={({ field }) => (
                                                <FormItemWrapper label="Role">
                                                    <SelectBox
                                                        options={roles}
                                                        value={field.value}
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        placeholder="Select a role"
                                                        inputPlaceholder="Search for a role..."
                                                        emptyPlaceholder="No role found"
                                                    />
                                                </FormItemWrapper>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="Password">
                                                        <div className="relative">
                                                            <Input
                                                                {...field}
                                                                placeholder="••••••••"
                                                                type={
                                                                    isPasswordVisible
                                                                        ? "text"
                                                                        : "password"
                                                                }
                                                                autoComplete="new-password"
                                                            />
                                                            {isPasswordVisible ? (
                                                                <EyeOff
                                                                    className="absolute right-2 top-1/2 size-5 -translate-y-1/2 cursor-pointer select-none"
                                                                    onClick={() =>
                                                                        setisPasswordVisible(
                                                                            (
                                                                                p
                                                                            ) =>
                                                                                !p
                                                                        )
                                                                    }
                                                                />
                                                            ) : (
                                                                <Eye
                                                                    className="absolute right-2 top-1/2 size-5 -translate-y-1/2 cursor-pointer select-none"
                                                                    onClick={() =>
                                                                        setisPasswordVisible(
                                                                            (
                                                                                p
                                                                            ) =>
                                                                                !p
                                                                        )
                                                                    }
                                                                />
                                                            )}
                                                        </div>
                                                    </FormItemWrapper>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="confirmPassword"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="Confirm Password">
                                                        <div className="relative">
                                                            <Input
                                                                {...field}
                                                                placeholder="••••••••"
                                                                type={
                                                                    isConfirmPasswordVisible
                                                                        ? "text"
                                                                        : "password"
                                                                }
                                                            />
                                                            {isConfirmPasswordVisible ? (
                                                                <EyeOff
                                                                    className="absolute right-2 top-1/2 size-5 -translate-y-1/2 cursor-pointer select-none"
                                                                    onClick={() =>
                                                                        setisConfirmPasswordVisible(
                                                                            (
                                                                                p
                                                                            ) =>
                                                                                !p
                                                                        )
                                                                    }
                                                                />
                                                            ) : (
                                                                <Eye
                                                                    className="absolute right-2 top-1/2 size-5 -translate-y-1/2 cursor-pointer select-none"
                                                                    onClick={() =>
                                                                        setisConfirmPasswordVisible(
                                                                            (
                                                                                p
                                                                            ) =>
                                                                                !p
                                                                        )
                                                                    }
                                                                />
                                                            )}
                                                        </div>
                                                    </FormItemWrapper>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardWrapper>
                        </div>
                    </div>

                    <div className="mt-3 flex flex-col items-center justify-center gap-3 md:hidden">
                        <Button
                            type="submit"
                            size="sm"
                            className="w-full gap-1 py-5"
                            disabled={isSubmitting}
                        >
                            <span>Save User</span>
                            {isSubmitting && (
                                <ClipLoader size={15} color="#020817" />
                            )}
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full py-5"
                            disabled={isSubmitting}
                            onClick={() => navigate(-1)}
                            type="button"
                        >
                            Discard
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default SignUpPage;
