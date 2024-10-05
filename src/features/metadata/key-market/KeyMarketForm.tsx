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
import { keyMarketFormSchema, TKeyMarketFormSchema } from "./constants/metadata";
import { FormSkeleton } from "../../../components/core/form/form-skeleton";

function KeyMarketForm() {
    const { logout } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { id } = useParams();

    const user = useRecoilValue(userAtom);

    const navigate = useNavigate();

    const form = useForm<TKeyMarketFormSchema>({
        resolver: zodResolver(keyMarketFormSchema),
        defaultValues: {
            userId: user?.id
        }
    });

    useEffect(() => {
        const fetchKeyMarketDetails = async (id: string) => {
            try {
                setIsLoading(true);
                const response = await MetadataService.getOneKeyMarket(id);
                if (response.status === HTTP_STATUS_CODES.OK) {
                    form.reset({
                        keyMarketName: response.data.keyMarketName
                    });
                }
            } catch (error) {
                const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);
                if (unknownError.response.status === HTTP_STATUS_CODES.NOT_FOUND) {
                    toast.error("This market does not exists");
                    navigate(-1);
                } else {
                    toast.error("An unknown error occurred");
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchKeyMarketDetails(id);
        }
    }, [id]);

    const onSubmit = async (keyMarketFormValues: TKeyMarketFormSchema) => {
        try {
            setIsSubmitting(true);
            const requestBody = {
                ...keyMarketFormValues,
                userId: user?.id
            };
            if (id) {
                const response = await MetadataService.editKeyMarket(id, requestBody);
                if (response.status === HTTP_STATUS_CODES.OK) {
                    toast.success("Key market updated successfully");
                }
                return;
            }
            const response = await MetadataService.createKeyMarket(requestBody);
            if (response.status === HTTP_STATUS_CODES.OK) {
                toast.success("Key market created successfully");
                form.reset({
                    keyMarketName: ""
                });
            }
        } catch (error) {
            console.error(error);
            const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);
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
            title="Key market"
            isSubmitting={isSubmitting || isLoading}
            isEdit={Boolean(id)}
        >
            {isLoading ? (
                <FormSkeleton />
            ) : (
                <FormField
                    control={form.control}
                    name="keyMarketName"
                    render={({ field }) => (
                        <FormItemWrapper label="Key market zone">
                            <Input {...field} placeholder="Key market zone" />
                        </FormItemWrapper>
                    )}
                />
            )}
        </SingleInputForm>
    );
}

export default KeyMarketForm;
