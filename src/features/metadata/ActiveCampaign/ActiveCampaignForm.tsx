import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { FormItemWrapper } from "../../../components/form/item-wrapper";
import { FormField } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { userAtom } from "../../../store/atoms/user";
import { TActivationFormSchema } from "../../activations/constants/metadata";
import { SingleInputForm } from "../SingleInputForm";
import {
    activeCampaignFormSchema,
    TActiveCampaignFormSchema,
} from "./constants/metadata";
import MetadataService from "../../../services/features/MetadataService";
import { HTTP_STATUS_CODES } from "../../../lib/constants";
import { toast } from "sonner";
import ErrorService from "../../../services/error/ErrorService";
import { useAuth } from "../../auth/auth-provider/AuthProvider";

function ActiveCampaignForm() {
    const { logout } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const user = useRecoilValue(userAtom);

    const navigate = useNavigate();

    const form = useForm<TActiveCampaignFormSchema>({
        resolver: zodResolver(activeCampaignFormSchema),
        defaultValues: {
            userId: user?.id,
        },
    });

    const onSubmit = async (
        activeCampaignFormValues: TActivationFormSchema
    ) => {
        try {
            setIsSubmitting(true);
            const response = await MetadataService.createActiveCampaign(
                activeCampaignFormValues
            );
            if (response.status === HTTP_STATUS_CODES.OK) {
                toast.success("Active campaign created successfully");
                form.reset({
                    activeCampaignName: "",
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
            title="Active Campaign"
            isSubmitting={isSubmitting}
        >
            <FormField
                control={form.control}
                name="activeCampaignName"
                render={({ field }) => (
                    <FormItemWrapper label="Campaign Name">
                        <Input
                            {...field}
                            placeholder="Campaign name"
                        />
                    </FormItemWrapper>
                )}
            />
        </SingleInputForm>
    );
}

export default ActiveCampaignForm;
