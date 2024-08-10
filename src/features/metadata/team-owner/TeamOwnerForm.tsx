import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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

function TeamOwnerForm() {
    const { logout } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const user = useRecoilValue(userAtom);

    const navigate = useNavigate();

    const form = useForm<TTeamOwnerFormSchema>({
        resolver: zodResolver(teamOwnerFormSchema),
        defaultValues: {
            userId: user?.id,
        },
    });

    const onSubmit = async (teamOwnerFormValues: TTeamOwnerFormSchema) => {
        try {
            setIsSubmitting(true);
            const response = await MetadataService.createTeamOwner(
                teamOwnerFormValues
            );
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
            isSubmitting={isSubmitting}
        >
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
        </SingleInputForm>
    );
}

export default TeamOwnerForm;
