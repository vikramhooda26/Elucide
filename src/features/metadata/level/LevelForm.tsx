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
import { levelFormSchema, TLevelFormSchema } from "./constants/metadata";

function LevelForm() {
    const { logout } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const user = useRecoilValue(userAtom);

    const navigate = useNavigate();

    const form = useForm<TLevelFormSchema>({
        resolver: zodResolver(levelFormSchema),
        defaultValues: {
            userId: user?.id,
        },
    });

    const onSubmit = async (levelFormValues: TLevelFormSchema) => {
        try {
            setIsSubmitting(true);
            const response = await MetadataService.createLevel(levelFormValues);
            if (response.status === HTTP_STATUS_CODES.OK) {
                toast.success("Level created successfully");
                form.reset({
                    levelName: "",
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
            title="Level"
            isSubmitting={isSubmitting}
        >
            <FormField
                control={form.control}
                name="levelName"
                render={({ field }) => (
                    <FormItemWrapper label="Level name">
                        <Input
                            {...field}
                            placeholder="Level name"
                        />
                    </FormItemWrapper>
                )}
            />
        </SingleInputForm>
    );
}

export default LevelForm;
