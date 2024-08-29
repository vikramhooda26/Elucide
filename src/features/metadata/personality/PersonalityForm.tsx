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
    persoanlityFormSchema,
    TPersonalityFormSchema
} from "./constants/metadata";
import { FormSkeleton } from "../../../components/core/form/form-skeleton";

function PersonalityForm() {
    const { logout } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { id } = useParams();

    const user = useRecoilValue(userAtom);

    const navigate = useNavigate();

    const form = useForm<TPersonalityFormSchema>({
        resolver: zodResolver(persoanlityFormSchema),
        defaultValues: {
            userId: user?.id
        }
    });

    useEffect(() => {
        const fetchMainPersonalityDetails = async (id: string) => {
            try {
                setIsLoading(true);
                const response = await MetadataService.getOnePersonality(id);
                if (response.status === HTTP_STATUS_CODES.OK) {
                    form.reset({
                        personalityName: response.data.personalityName
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
                    toast.error("This main personality does not exists");
                    navigate(-1);
                } else {
                    toast.error("An unknown error occurred");
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchMainPersonalityDetails(id);
        }
    }, [id]);

    const onSubmit = async (personalityFormValues: TPersonalityFormSchema) => {
        try {
            setIsSubmitting(true);
            const requestBody = {
                ...personalityFormValues,
                userId: user?.id
            };
            if (id) {
                const response = await MetadataService.editMainPersonality(
                    id,
                    requestBody
                );
                if (response.status === HTTP_STATUS_CODES.OK) {
                    toast.success("Main Personality updated successfully");
                }
                return;
            }
            const response =
                await MetadataService.createMainPersonality(requestBody);
            if (response.status === HTTP_STATUS_CODES.OK) {
                toast.success("Main Personality created successfully");
                form.reset({
                    personalityName: ""
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
            title="Main Personality"
            isSubmitting={isSubmitting || isLoading}
            isEdit={Boolean(id)}
        >
            {isLoading ? (
                <FormSkeleton />
            ) : (
                <FormField
                    control={form.control}
                    name="personalityName"
                    render={({ field }) => (
                        <FormItemWrapper label="Main Personality">
                            <Input {...field} placeholder="Main Personality" />
                        </FormItemWrapper>
                    )}
                />
            )}
        </SingleInputForm>
    );
}

export default PersonalityForm;
