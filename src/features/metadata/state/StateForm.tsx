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
import { stateFormSchema, TStateFormSchema } from "./constants/metadata";

function StateForm() {
    const { logout } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const user = useRecoilValue(userAtom);

    const navigate = useNavigate();

    const form = useForm<TStateFormSchema>({
        resolver: zodResolver(stateFormSchema),
        defaultValues: {
            userId: user?.id,
        },
    });

    const onSubmit = async (stateFormValues: TStateFormSchema) => {
        try {
            setIsSubmitting(true);
            const response = await MetadataService.createState(stateFormValues);
            if (response.status === HTTP_STATUS_CODES.OK) {
                toast.success("City created successfully");
                form.reset({
                    stateName: "",
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
            title="State"
            isSubmitting={isSubmitting}
        >
            <FormField
                control={form.control}
                name="stateName"
                render={({ field }) => (
                    <FormItemWrapper label="State name">
                        <Input
                            {...field}
                            placeholder="State name"
                        />
                    </FormItemWrapper>
                )}
            />
        </SingleInputForm>
    );
}

export default StateForm;
