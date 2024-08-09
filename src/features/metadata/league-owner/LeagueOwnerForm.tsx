import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
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
import {
    leagueOwnerFormSchema,
    TLeagueOwnerFormSchema,
} from "./constants/metadata";

function LeagueOwnerForm() {
    const { logout } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const user = useRecoilValue(userAtom);

    const navigate = useNavigate();

    const form = useForm<TLeagueOwnerFormSchema>({
        resolver: zodResolver(leagueOwnerFormSchema),
        defaultValues: {
            userId: user?.id,
        },
    });

    const onSubmit = async (leagueOwnerFormValues: TLeagueOwnerFormSchema) => {
        try {
            setIsSubmitting(true);
            const response = await MetadataService.createLeagueOwner(
                leagueOwnerFormValues
            );
            if (response.status === HTTP_STATUS_CODES.OK) {
                toast.success("League owner created successfully");
                form.reset({
                    leagueOwnerName: "",
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
            title="League owner"
            isSubmitting={isSubmitting}
        >
            <FormField
                control={form.control}
                name="leagueOwnerName"
                render={({ field }) => (
                    <FormItemWrapper label="League owner name">
                        <Input
                            {...field}
                            placeholder="League owner name"
                        />
                    </FormItemWrapper>
                )}
            />
        </SingleInputForm>
    );
}

export default LeagueOwnerForm;
