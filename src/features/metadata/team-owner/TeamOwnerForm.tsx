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
import { useEffect, useState } from "react";
import {
    teamOwnerFormSchema,
    TTeamOwnerFormSchema,
} from "./constants/metadata";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSkeleton } from "../../../components/core/form/form-skeleton";

function TeamOwnerForm() {
    const { logout } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { id } = useParams();

    const user = useRecoilValue(userAtom);

    const navigate = useNavigate();

    const form = useForm<TTeamOwnerFormSchema>({
        resolver: zodResolver(teamOwnerFormSchema),
        defaultValues: {
            userId: user?.id,
        },
    });

    useEffect(() => {
        const fetchTeamOwnerDetails = async (id: string) => {
            try {
                setIsLoading(true);
                const response = await MetadataService.getOneTeamOwner(id);
                if (response.status === HTTP_STATUS_CODES.OK) {
                    form.reset({
                        teamOwnerName: response.data.teamOwnerName,
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
                    toast.error("This team owner does not exists");
                    navigate(-1);
                } else {
                    toast.error("An unknown error occurred");
                }
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchTeamOwnerDetails(id);
        }
    }, [id]);

    const onSubmit = async (teamOwnerFormValues: TTeamOwnerFormSchema) => {
        try {
            setIsSubmitting(true);
            const requestBody = {
                ...teamOwnerFormValues,
                userId: user?.id,
            };
            if (id) {
                const response = await MetadataService.editTeamOwner(
                    id,
                    requestBody
                );
                if (response.status === HTTP_STATUS_CODES.OK) {
                    toast.success("Team owner updated successfully");
                }
                return;
            }
            const response = await MetadataService.createTeamOwner(requestBody);
            if (response.status === HTTP_STATUS_CODES.OK) {
                toast.success("Team owner created successfully");
                form.reset({
                    teamOwnerName: "",
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
            title="Team owner"
            isSubmitting={isSubmitting || isLoading}
            isEdit={Boolean(id)}
        >
            {isLoading ? (
                <FormSkeleton />
            ) : (
                <FormField
                    control={form.control}
                    name="teamOwnerName"
                    render={({ field }) => (
                        <FormItemWrapper label="Team owner name">
                            <Input
                                {...field}
                                placeholder="Team owner name"
                            />
                        </FormItemWrapper>
                    )}
                />
            )}
        </SingleInputForm>
    );
}

export default TeamOwnerForm;
