import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { toast } from "sonner";
import { FormItemWrapper } from "../../../components/form/item-wrapper";
import { FormField } from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../../lib/constants";
import ErrorService from "../../../services/error/ErrorService";
import MetadataService from "../../../services/features/MetadataService";
import { userAtom } from "../../../store/atoms/user";
import { useAuth } from "../../auth/auth-provider/AuthProvider";
import { SingleInputForm } from "../SingleInputForm";
import {
    subpersonalityFormSchema,
    TSubpersonalityFormSchema,
} from "./constants/metadata";
import { metadataStoreAtom } from "../../../store/atoms/metadata";
import { getMetadata } from "../../utils/metadataUtils";
import SelectBox from "../../../components/ui/multi-select";

function SubPersonalityForm() {
    const { logout } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [_isLoading, setIsLoading] = useState<boolean>(false);
    const [metadataStore, setMetadataStore] = useRecoilState(metadataStoreAtom);

    const user = useRecoilValue(userAtom);

    const navigate = useNavigate();

    const form = useForm<TSubpersonalityFormSchema>({
        resolver: zodResolver(subpersonalityFormSchema),
        defaultValues: {
            userId: user?.id,
        },
    });

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                setIsLoading(true);
                await getMetadata(metadataStore, setMetadataStore, {
                    MAIN_PERSONALITY: "mainpersonality",
                });
            } catch (error) {
                console.error(error);
                const unknownError = ErrorService.handleCommonErrors(
                    error,
                    logout,
                    navigate
                );
                if (unknownError) {
                    toast.error("An unknown error occurred");
                    navigate(NAVIGATION_ROUTES.DASHBOARD);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchMetadata();
    }, []);

    const onSubmit = async (
        subpersonalityFormValues: TSubpersonalityFormSchema
    ) => {
        try {
            setIsSubmitting(true);
            const response = await MetadataService.createSubpersonality(
                subpersonalityFormValues
            );
            if (response.status === HTTP_STATUS_CODES.OK) {
                toast.success("Sub Personality created successfully");
                form.reset({
                    subpersonalityName: "",
                    mainPersonalityId: "",
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

    if (!metadataStore?.mainpersonality) {
        return <div>loading....</div>;
    }

    return (
        <SingleInputForm
            onSubmit={onSubmit}
            form={form}
            title="Sub Personality"
            isSubmitting={isSubmitting}
        >
            <div className="grid gap-6">
                <FormField
                    control={form.control}
                    name="mainPersonalityId"
                    render={({ field }) => (
                        <FormItemWrapper label="Main Personality">
                            <SelectBox
                                options={metadataStore?.mainpersonality}
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Select a personality"
                                inputPlaceholder="Search for a personalities..."
                                emptyPlaceholder="No personality found"
                            />
                        </FormItemWrapper>
                    )}
                />
                <FormField
                    control={form.control}
                    name="subpersonalityName"
                    render={({ field }) => (
                        <FormItemWrapper label="Sub personality name">
                            <Input
                                {...field}
                                placeholder="Sub personality name"
                            />
                        </FormItemWrapper>
                    )}
                />
            </div>
        </SingleInputForm>
    );
}

export default SubPersonalityForm;
