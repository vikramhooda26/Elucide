import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { toast } from "sonner";
import { FormItemWrapper } from "../../../components/form/item-wrapper";
import { FormField } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../../lib/constants";
import ErrorService from "../../../services/error/ErrorService";
import MetadataService from "../../../services/features/MetadataService";
import { userAtom } from "../../../store/atoms/user";
import { useAuth } from "../../auth/auth-provider/AuthProvider";
import { SingleInputForm } from "../SingleInputForm";
import {
    subCategoryFormSchema,
    TSubCategoryFormSchema
} from "./constants/metadata";
import { getMetadata } from "../../utils/metadataUtils";
import { metadataStoreAtom } from "../../../store/atoms/metadata";
import SelectBox from "../../../components/ui/multi-select";
import { FormSkeleton } from "../../../components/core/form/form-skeleton";

function SubCategoryForm() {
    const { logout } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isFetchingMetadata, setIsFetchingMetadata] =
        useState<boolean>(false);
    const [isFetchingDetails, setIsFetchingDetails] = useState<boolean>(false);
    const [metadataStore, setMetadataStore] = useRecoilState(metadataStoreAtom);

    const { id } = useParams();

    const user = useRecoilValue(userAtom);

    const navigate = useNavigate();

    const form = useForm<TSubCategoryFormSchema>({
        resolver: zodResolver(subCategoryFormSchema),
        defaultValues: {
            userId: user?.id
        }
    });

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                setIsFetchingMetadata(true);
                await getMetadata(metadataStore, setMetadataStore, {
                    MAIN_CATEGORY: "maincategory"
                });
            } catch (error) {
                console.error(error);
                const unknownError = ErrorService.handleCommonErrors(
                    error,
                    logout,
                    navigate
                );
                if (unknownError) {
                    toast.error("An unknown error occurred");
                    navigate(NAVIGATION_ROUTES.DASHBOARD);
                }
            } finally {
                setIsFetchingMetadata(false);
            }
        };

        fetchMetadata();
    }, []);

    useEffect(() => {
        const fetchSubcategoryDetails = async (id: string) => {
            try {
                setIsFetchingDetails(true);
                const response = await MetadataService.getOneSubcategory(id);
                if (response.status === HTTP_STATUS_CODES.OK) {
                    form.reset({
                        subcategoryName: response.data.subcategoryName,
                        categoryId: response.data.category.id
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
                    toast.error("This sub category does not exists");
                    navigate(-1);
                } else {
                    toast.error("An unknown error occurred");
                }
            } finally {
                setIsFetchingDetails(false);
            }
        };

        if (id) {
            fetchSubcategoryDetails(id);
        }
    }, [id]);

    const onSubmit = async (subcategoryFormValues: TSubCategoryFormSchema) => {
        try {
            setIsSubmitting(true);
            const requestBody = {
                ...subcategoryFormValues,
                userId: user?.id
            };
            if (id) {
                const response = await MetadataService.editSubcategory(
                    id,
                    requestBody
                );
                if (response.status === HTTP_STATUS_CODES.OK) {
                    toast.success("Sub Category updated successfully");
                }
                return;
            }
            const response =
                await MetadataService.createSubcategory(requestBody);
            if (response.status === HTTP_STATUS_CODES.OK) {
                toast.success("Sub Category created successfully");
                form.reset({
                    subcategoryName: ""
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

    if (!metadataStore?.maincategory) {
        return <div>loading....</div>;
    }

    return (
        <SingleInputForm
            onSubmit={onSubmit}
            form={form}
            title="Sub Category"
            isSubmitting={
                isSubmitting || isFetchingMetadata || isFetchingDetails
            }
            isEdit={Boolean(id)}
        >
            {isFetchingMetadata || isFetchingDetails ? (
                <FormSkeleton />
            ) : (
                <div className="grid gap-6">
                    <FormField
                        control={form.control}
                        name="categoryId"
                        render={({ field }) => (
                            <FormItemWrapper label="Main Category">
                                <SelectBox
                                    options={metadataStore?.maincategory}
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="Select a category"
                                    inputPlaceholder="Search for a category..."
                                    emptyPlaceholder="No category found"
                                />
                            </FormItemWrapper>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="subcategoryName"
                        render={({ field }) => (
                            <FormItemWrapper label="Sub Category name">
                                <Input
                                    {...field}
                                    placeholder="Sub Category name"
                                />
                            </FormItemWrapper>
                        )}
                    />
                </div>
            )}
        </SingleInputForm>
    );
}

export default SubCategoryForm;
