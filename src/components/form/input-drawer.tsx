import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import z, { ZodObject } from "zod";
import { useAuth } from "../../features/auth/auth-provider/AuthProvider";
import { useUser } from "../../hooks/useUser";
import { HTTP_STATUS_CODES } from "../../lib/constants";
import { Resp } from "../../services/AjaxService";
import ErrorService from "../../services/error/ErrorService";
import Loader from "../Loader";
import { Button } from "../ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "../ui/drawer";
import { Form, FormField } from "../ui/form";
import { Input } from "../ui/input";
import { FormItemWrapper } from "./item-wrapper";

type TInputDrawerProps = {
    title: string;
    description?: string;
    inputType?: string;
    schema: ZodObject<any>;
    register: string;
    createFn: (params: any) => Promise<Resp>;
    children?: React.ReactNode;
    fetchMetadataFn: () => Promise<void>;
};

export const InputDrawer: React.FC<TInputDrawerProps> = ({
    title,
    description,
    inputType = "text",
    schema,
    register,
    createFn,
    children,
    fetchMetadataFn
}) => {
    type TSchema = z.infer<typeof schema>;
    const user = useUser();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const form = useForm<TSchema>({
        resolver: zodResolver(schema),
        defaultValues: {
            userId: user?.id
        }
    });

    const onSubmit = async (data: TSchema) => {
        if (!data) {
            form.setError(register, { message: "This field is required" }, { shouldFocus: true });
            return;
        }
        try {
            setIsLoading(true);
            const response = await createFn(data);
            if (response.status === HTTP_STATUS_CODES.OK) {
                await fetchMetadataFn();
                toast.success(`${title} added successfully!`);
                setIsDrawerOpen(false);
            }
        } catch (error) {
            console.error(error);
            const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);
            if (unknownError) {
                toast.error("An unknown error occurred");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent onPointerDownOutside={(e) => (isLoading ? e.preventDefault() : null)}>
                <Form {...form}>
                    <form
                        className="mx-auto w-full max-w-sm"
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit(onSubmit)();
                        }}
                    >
                        <DrawerHeader>
                            <DrawerTitle>{title}</DrawerTitle>
                            {description && <DrawerDescription>{description}</DrawerDescription>}
                        </DrawerHeader>
                        <div className="p-4">
                            <FormField
                                control={form.control}
                                name={register}
                                render={({ field }) => (
                                    <FormItemWrapper>
                                        <Input
                                            {...field}
                                            type={inputType || "text"}
                                            placeholder={title}
                                            required
                                            disabled={isLoading}
                                        />
                                    </FormItemWrapper>
                                )}
                            />
                        </div>
                        <DrawerFooter>
                            <Button className="gap-2 active:brightness-75" disabled={isLoading} type="submit">
                                <span>Submit</span>
                                <Loader visible={isLoading} />
                            </Button>
                            <DrawerClose asChild>
                                <Button variant="outline" type="button" disabled={isLoading}>
                                    Discard
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </form>
                </Form>
            </DrawerContent>
        </Drawer>
    );
};
