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
import { parentOrgFormSchema, TParentOrgFormSchema } from "./constants/metadata";
import { FormSkeleton } from "../../../components/core/form/form-skeleton";

function ParentOrgForm() {
    const { logout } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { id } = useParams();

    const user = useRecoilValue(userAtom);

    const navigate = useNavigate();

    const form = useForm<TParentOrgFormSchema>({
        resolver: zodResolver(parentOrgFormSchema),
        defaultValues: {
            userId: user?.id
        }
    });

    useEffect(() => {
        const fetchParentOrgDetails = async (id: string) => {
            try {
                setIsLoading(true);
                const response = await MetadataService.getOneParentOrg(id);
                if (response.status === HTTP_STATUS_CODES.OK) {
                    form.reset({
                        parentOrgName: response.data.parentOrgName
                    });
                }
            } catch (error) {
                const unknownError = ErrorService.handleCommonErrors(error, logout, navigate);
                if (unknownError.response.status === HTTP_STATUS_CODES.NOT_FOUND) {
                    toast.error("This parent organization does not exists");
                    navigate(-1);
                } else {
                    toast.error("An unknown error occurred");
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchParentOrgDetails(id);
        }
    }, [id]);

    const onSubmit = async (parentOrgFormValues: TParentOrgFormSchema) => {
        try {
            setIsSubmitting(true);
            const requestBody = {
                ...parentOrgFormValues,
                userId: user?.id
            };
            if (id) {
                const response = await MetadataService.editParentOrg(id, requestBody);
                if (response.status === HTTP_STATUS_CODES.OK) {
                    toast.success("Parent Organization updated successfully");
                }
                return;
            }
            const response = await MetadataService.createParentOrg(requestBody);
            if (response.status === HTTP_STATUS_CODES.OK) {
                toast.success("Parent Organization created successfully");
                form.reset({
                    parentOrgName: ""
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
            title="Parent org"
            isSubmitting={isSubmitting || isLoading}
            isEdit={Boolean(id)}
        >
            {isLoading ? (
                <FormSkeleton />
            ) : (
                <FormField
                    control={form.control}
                    name="parentOrgName"
                    render={({ field }) => (
                        <FormItemWrapper label="Parent org name">
                            <Input {...field} placeholder="Parent org name" />
                        </FormItemWrapper>
                    )}
                />
            )}
        </SingleInputForm>
    );
}

export default ParentOrgForm;
