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
import { nccsFormSchema, TNccsFormSchema } from "./constants/metadata";
import { FormSkeleton } from "../../../components/core/form/form-skeleton";

function NccsForm() {
    const { logout } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { id } = useParams();

    const user = useRecoilValue(userAtom);

    const navigate = useNavigate();

    const form = useForm<TNccsFormSchema>({
        resolver: zodResolver(nccsFormSchema),
        defaultValues: {
            userId: user?.id
        }
    });

    useEffect(() => {
        if (isSubmitting) {
            form.control._disableForm(true);
        } else {
            form.control._disableForm(false);
        }
    }, [isSubmitting]);

    useEffect(() => {
        const fetchNccsClassDetails = async (id: string) => {
            try {
                setIsLoading(true);
                const response = await MetadataService.getOneNccsClass(id);
                if (response.status === HTTP_STATUS_CODES.OK) {
                    form.reset({
                        nccsClass: response.data.nccsName
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
                    toast.error("This nccs class does not exists");
                    navigate(-1);
                } else {
                    toast.error("An unknown error occurred");
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchNccsClassDetails(id);
        }
    }, [id]);

    const onSubmit = async (nccsFormValues: TNccsFormSchema) => {
        try {
            setIsSubmitting(true);
            const requestBody = {
                ...nccsFormValues,
                userId: user?.id
            };
            if (id) {
                const response = await MetadataService.editNccs(
                    id,
                    requestBody
                );
                if (response.status === HTTP_STATUS_CODES.OK) {
                    toast.success("Nccs class updated successfully");
                }
                return;
            }
            const response = await MetadataService.createNccs(requestBody);
            if (response.status === HTTP_STATUS_CODES.OK) {
                toast.success("Nccs class created successfully");
                form.reset({
                    nccsClass: ""
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

    return (
        <SingleInputForm
            onSubmit={onSubmit}
            form={form}
            title="Nccs"
            isSubmitting={isSubmitting || isLoading}
            isEdit={Boolean(id)}
        >
            {isLoading ? (
                <FormSkeleton />
            ) : (
                <FormField
                    control={form.control}
                    name="nccsClass"
                    render={({ field }) => (
                        <FormItemWrapper label="Nccs class">
                            <Input {...field} placeholder="Nccs class" />
                        </FormItemWrapper>
                    )}
                />
            )}
        </SingleInputForm>
    );
}

export default NccsForm;
