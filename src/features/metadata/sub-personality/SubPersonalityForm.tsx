import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
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
    TSubpersonalityFormSchema
} from "./constants/metadata";
import { metadataStoreAtom } from "../../../store/atoms/metadata";
import { getMetadata } from "../../utils/metadataUtils";
import SelectBox from "../../../components/ui/multi-select";
import { FormSkeleton } from "../../../components/core/form/form-skeleton";

function SubPersonalityForm() {
    const { logout } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isFetchingMetadata, setIsFetchingMetadata] =
        useState<boolean>(false);
    const [isFetchingDetails, setIsFetchingDetails] = useState<boolean>(false);
    const [metadataStore, setMetadataStore] = useRecoilState(metadataStoreAtom);

    const { id } = useParams();

    const user = useRecoilValue(userAtom);

    const navigate = useNavigate();

    const form = useForm<TSubpersonalityFormSchema>({
        resolver: zodResolver(subpersonalityFormSchema),
        defaultValues: {
            userId: user?.id
        }
    });

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                setIsFetchingMetadata(true);
                await getMetadata(metadataStore, setMetadataStore, {
                    MAIN_PERSONALITY: "mainpersonality"
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
                setIsFetchingMetadata(false);
            }
        };

        fetchMetadata();
    }, []);

    useEffect(() => {
        const fetchSubpersonalityDetails = async (id: string) => {
            try {
                setIsFetchingDetails(true);
                const response = await MetadataService.getOneSubPersonality(id);
                if (response.status === HTTP_STATUS_CODES.OK) {
                    form.reset({
                        subpersonalityName: response.data.subpersonalityName,
                        mainPersonalityId: response.data.personality.id
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
                    toast.error("This sub personality does not exists");
                    navigate(-1);
                } else {
                    toast.error("An unknown error occurred");
                }
            } finally {
                setIsFetchingDetails(false);
            }
        };

        if (id) {
            fetchSubpersonalityDetails(id);
        }
    }, [id]);

    const onSubmit = async (
        subpersonalityFormValues: TSubpersonalityFormSchema
    ) => {
        try {
            setIsSubmitting(true);
            const requestBody = {
                ...subpersonalityFormValues,
                userId: user?.id
            };
            if (id) {
                const response = await MetadataService.editSubPersonality(
                    id,
                    requestBody
                );
                if (response.status === HTTP_STATUS_CODES.OK) {
                    toast.success("Sub Personality updated successfully");
                }
                return;
            }
            const response =
                await MetadataService.createSubpersonality(requestBody);
            if (response.status === HTTP_STATUS_CODES.OK) {
                toast.success("Sub Personality created successfully");
                form.reset({
                    subpersonalityName: "",
                    mainPersonalityId: ""
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
            isSubmitting={
                isSubmitting || isFetchingDetails || isFetchingMetadata
            }
            isEdit={Boolean(id)}
        >
            {isFetchingDetails || isFetchingMetadata ? (
                <FormSkeleton />
            ) : (
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
            )}
        </SingleInputForm>
    );
}

export default SubPersonalityForm;
