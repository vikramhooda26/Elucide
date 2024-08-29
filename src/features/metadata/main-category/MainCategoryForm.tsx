import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { toast } from "sonner";
import { FormItemWrapper } from "../../../components/form/item-wrapper";
import { FormField } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { HTTP_STATUS_CODES } from "../../../lib/constants";
import ErrorService from "../../../services/error/ErrorService";
import MetadataService from "../../../services/features/MetadataService";
import { userAtom } from "../../../store/atoms/user";
import { useAuth } from "../../auth/auth-provider/AuthProvider";
import { SingleInputForm } from "../SingleInputForm";
import {
    maincategoryFormSchema,
    TMaincategoryFormSchema
} from "./constants/metadata";
import { FormSkeleton } from "../../../components/core/form/form-skeleton";

function MainCategoryForm() {
    const { logout } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { id } = useParams();

    const user = useRecoilValue(userAtom);

    const navigate = useNavigate();

    const form = useForm<TMaincategoryFormSchema>({
        resolver: zodResolver(maincategoryFormSchema),
        defaultValues: {
            userId: user?.id
        }
    });

    useEffect(() => {
        const fetchCategoryDetails = async (id: string) => {
            try {
                setIsLoading(true);
                const response = await MetadataService.getOneCategory(id);
                if (response.status === HTTP_STATUS_CODES.OK) {
                    form.reset({
                        categoryName: response.data.categoryName
                    });
                }
            } catch (error) {
                const unknownError = ErrorService.handleCommonErrors(
                    error,
                    logout,
                    navigate
                );
                if (
                    unknownError.response.status === HTTP_STATUS_CODES.NOT_FOUND
                ) {
                    toast.error("This main category does not exists");
                    navigate(-1);
                } else {
                    toast.error("An unknown error occurred");
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchCategoryDetails(id);
        }
    }, [id]);

    const onSubmit = async (
        maincategoryFormValues: TMaincategoryFormSchema
    ) => {
        try {
            setIsSubmitting(true);
            const requestBody = {
                ...maincategoryFormValues,
                userId: user?.id
            };
            if (id) {
                const response = await MetadataService.editCategory(
                    id,
                    requestBody
                );
                if (response.status === HTTP_STATUS_CODES.OK) {
                    toast.success("Main Category updated successfully");
                }
                return;
            }
            const response =
                await MetadataService.createMaincategory(requestBody);
            if (response.status === HTTP_STATUS_CODES.OK) {
                toast.success("Main Category created successfully");
                form.reset({
                    categoryName: ""
                });
            }
        } catch (error) {
            console.error(error);
            const unknownError = ErrorService.handleCommonErrors(
                error,
                logout,
                navigate
            );
            if (unknownError) {
                toast.error("An unknown error occurred");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (isSubmitting) {
            form.control._disableForm(true);
        } else {
            form.control._disableForm(false);
        }
    }, [isSubmitting]);

    return (
        <SingleInputForm
            onSubmit={onSubmit}
            form={form}
            title="Main Category"
            isSubmitting={isSubmitting || isLoading}
            isEdit={Boolean(id)}
        >
            {isLoading ? (
                <FormSkeleton />
            ) : (
                <FormField
                    control={form.control}
                    name="categoryName"
                    render={({ field }) => (
                        <FormItemWrapper label="Main Category name">
                            <Input
                                {...field}
                                placeholder="Main Category name"
                            />
                        </FormItemWrapper>
                    )}
                />
            )}
        </SingleInputForm>
    );
}

export default MainCategoryForm;
