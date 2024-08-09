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
import { assetFormSchema, TAssetFormSchema } from "./constants/metadata";

function AssetForm() {
    const { logout } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const user = useRecoilValue(userAtom);

    const navigate = useNavigate();

    const form = useForm<TAssetFormSchema>({
        resolver: zodResolver(assetFormSchema),
        defaultValues: {
            userId: user?.id,
        },
    });

    const onSubmit = async (assetFormValues: TAssetFormSchema) => {
        try {
            setIsSubmitting(true);
            const response = await MetadataService.createAsset(assetFormValues);
            if (response.status === HTTP_STATUS_CODES.OK) {
                toast.success("Asset created successfully");
                form.reset({
                    assetName: "",
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
            title="Asset"
            isSubmitting={isSubmitting}
        >
            <FormField
                control={form.control}
                name="assetName"
                render={({ field }) => (
                    <FormItemWrapper label="Asset name">
                        <Input
                            {...field}
                            placeholder="Asset name"
                        />
                    </FormItemWrapper>
                )}
            />
        </SingleInputForm>
    );
}

export default AssetForm;
