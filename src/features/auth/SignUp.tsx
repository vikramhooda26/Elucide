import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import z from "zod";
import { CardWrapper } from "../../components/card/card-wrapper";
import { FormSkeleton } from "../../components/core/form/form-skeleton";
import { FormItemWrapper } from "../../components/form/item-wrapper";
import Loader from "../../components/Loader";
import { Button } from "../../components/ui/button";
import { Form, FormField } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import SelectBox from "../../components/ui/multi-select";
import { HTTP_STATUS_CODES, TRoles } from "../../lib/constants";
import { printLogs } from "../../lib/logs";
import ErrorService from "../../services/error/ErrorService";
import UserService from "../../services/features/UserService";
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

const editUserSchema = z
    .object({
        username: z.string().min(1, "Username is required"),
        email: z.string().min(1, "Email is required"),
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().optional(),
        password: z.string().optional(),
        confirmPassword: z.string().optional(),
        role: z.enum(["SUPER_ADMIN", "ADMIN", "STAFF", "USER"])
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    });

type TUser = {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: TRoles;
};

const roles = [
    { value: "SUPER_ADMIN", label: "SUPER_ADMIN" },
    { value: "ADMIN", label: "ADMIN" },
    { value: "STAFF", label: "STAFF" },
    { value: "USER", label: "USER" }
];

function SignUpPage() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const { id } = useParams();

    const [isLoading, setIsLoading] = useState<boolean>();
    const [userDetails, setUserDetails] = useState<TUser>();

    const schema = id ? editUserSchema : newUserSchema;

    type TSchema = z.infer<typeof schema>;

    const form = useForm<TSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            role: "USER"
        }
    });

    const fetchUserDetails = async (id: string) => {
        try {
            setIsLoading(true);
            const response = await UserService.getUserById(id);
            if (response.status === HTTP_STATUS_CODES.OK) {
                printLogs("Get user by id response:", response.data);
                const user: TUser = response.data;
                setUserDetails(user);
                form.reset({
                    username: user.username,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    password: "",
                    confirmPassword: "",
                    role: user.role
                });
            }
        } catch (error) {
            printLogs("Error fetching user details for edit", error);
            const unknownError = ErrorService.handleCommonErrors(
                error,
                logout,
                navigate
            );
            if (unknownError) {
                if (
                    unknownError.response?.status ===
                    HTTP_STATUS_CODES.NOT_FOUND
                ) {
                    toast.error("This user does not exist");
                } else if (
                    unknownError.response?.status ===
                    HTTP_STATUS_CODES.BAD_REQUEST
                ) {
                    toast.error(
                        "Invalid request. Contact developer for support"
                    );
                } else if (
                    unknownError.response?.status === HTTP_STATUS_CODES.CONFLICT
                ) {
                    toast.error(
                        "This username already exist. Please use a different username"
                    );
                } else {
                    toast.error("Unknown error occurred. Try again later");
                }
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchUserDetails(id);
        }
    }, [id]);

    const [isPasswordVisible, setisPasswordVisible] = useState<boolean>(false);
    const [isConfirmPasswordVisible, setisConfirmPasswordVisible] =
        useState<boolean>(false);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleLoginSubmit = async (userDetails: TSchema) => {
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

            if (id) {
                const response = await UserService.editUser(id, requestBody);
                if (response.status === HTTP_STATUS_CODES.OK) {
                    toast.success("User updated successfully");
                }
                return;
            }

            const response = await UserService.createUser(requestBody);

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
                            {id ? "Edit" : "Create"} User
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
                                <span>{id ? "Update" : "Save"} User</span>
                                <Loader visible={isSubmitting} />
                            </Button>
                        </div>
                    </div>
                    {isLoading ? (
                        <FormSkeleton />
                    ) : (
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
                    )}

                    <div className="mt-3 flex flex-col items-center justify-center gap-3 md:hidden">
                        <Button
                            type="submit"
                            size="sm"
                            className="w-full gap-1 py-5"
                            disabled={isSubmitting}
                        >
                            <span>{id ? "Update" : "Save"} User</span>
                            <Loader visible={isSubmitting} />
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
