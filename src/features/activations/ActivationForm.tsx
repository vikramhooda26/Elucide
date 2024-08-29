import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useRecoilState, useRecoilValue } from "recoil";
import { toast } from "sonner";
import { CardWrapper } from "../../components/card/card-wrapper";
import { FormItemWrapper } from "../../components/form/item-wrapper";
import { Button } from "../../components/ui/button";
import { Form, FormField } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import SelectBox from "../../components/ui/multi-select";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../lib/constants";
import ErrorService from "../../services/error/ErrorService";
import MetadataService from "../../services/features/MetadataService";
import { metadataStoreAtom } from "../../store/atoms/metadata";
import { userAtom } from "../../store/atoms/user";
import { useAuth } from "../auth/auth-provider/AuthProvider";
import { getListOfYears } from "../utils/helpers";
import { getMetadata } from "../utils/metadataUtils";
import {
    ACTIVATION_KEYS,
    activationFormSchema,
    TActivationFormSchema,
    TEditActivationFormSchema,
    TPartnerType
} from "./constants/metadata";
import { FormSkeleton } from "../../components/core/form/form-skeleton";

function ActivationForm() {
    const [isFetchingDetails, setIsFetchingDetails] = useState<boolean>(false);
    const [isFetchingMetadata, setIsFetchingMetadata] =
        useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [metadataStore, setMetadataStore] = useRecoilState(metadataStoreAtom);
    const user = useRecoilValue(userAtom);
    const { id } = useParams();

    const { logout } = useAuth();
    const navigate = useNavigate();

    const form = useForm<TActivationFormSchema>({
        resolver: zodResolver(activationFormSchema),
        defaultValues: {
            userId: user?.id
        }
    });

    const getStakeholderType = (activationData: TEditActivationFormSchema) => {
        const partner: { type: TPartnerType; data: any } | undefined =
            (activationData.athlete?.id && {
                type: "Athlete",
                data: activationData.athlete.id
            }) ||
            (activationData.team?.id && {
                type: "Team",
                data: activationData.team.id
            }) ||
            (activationData.league?.id && {
                type: "League",
                data: activationData.league.id
            }) ||
            undefined;

        return partner;
    };

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                setIsFetchingMetadata(true);
                await getMetadata(
                    metadataStore,
                    setMetadataStore,
                    ACTIVATION_KEYS
                );
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
        const fetchActivationDetails = async (id: string) => {
            try {
                setIsFetchingDetails(true);
                const response = await MetadataService.getOneActivation(id);

                if (response.status === HTTP_STATUS_CODES.OK) {
                    const activationData: TEditActivationFormSchema =
                        response.data;

                    const partner = getStakeholderType(activationData);

                    console.log(partner);

                    form.reset({
                        name: activationData.name || undefined,
                        brandId: activationData.brand?.id || undefined,
                        partnerType: partner?.type || undefined,
                        assetIds:
                            activationData.asset?.map((asset) => asset.id) ||
                            undefined,
                        typeIds:
                            activationData.type?.map((type) => type.id) ||
                            undefined,
                        year: activationData.year,
                        marketIds: activationData.marketIds?.map(
                            (market) => market.id
                        ),
                        ...(partner?.type === "Athlete"
                            ? { athleteId: partner.data }
                            : partner?.type === "Team"
                              ? { teamId: partner.data }
                              : { leagueId: partner?.data }),
                        userId: user?.id
                    });
                }
            } catch (error) {
                console.error(error);
                const unknownError = ErrorService.handleCommonErrors(
                    error,
                    logout,
                    navigate
                );
                if (
                    unknownError.response.status !== HTTP_STATUS_CODES.NOT_FOUND
                ) {
                    toast.error("An unknown error occurred");
                }
            } finally {
                setIsFetchingDetails(false);
            }
        };
        if (id) {
            fetchActivationDetails(id);
        }
    }, [id]);

    useEffect(() => {
        if (isSubmitting) {
            form.control._disableForm(true);
        } else {
            form.control._disableForm(false);
        }
    }, [isSubmitting]);

    if (!metadataStore) {
        return <div>Loading...</div>;
    }

    const partnerTypeValue = useWatch({
        control: form.control,
        name: "partnerType"
    });

    const partnerType = [
        { value: "Team", label: "Team" },
        { value: "Athlete", label: "Athlete" },
        { value: "League", label: "League" }
    ];

    const getStakeholderTitle = () => {
        return partnerTypeValue === "Team"
            ? "Team"
            : partnerTypeValue === "League"
              ? "League"
              : "Athlete";
    };

    const getStakeholderName = () => {
        if (partnerTypeValue === "Team") {
            return "teamId";
        } else if (partnerTypeValue === "League") {
            return "leagueId";
        } else {
            return "athleteId";
        }
    };

    const getStakeholderOptions = () => {
        if (partnerTypeValue === "Team") {
            return metadataStore.team;
        } else if (partnerTypeValue === "League") {
            return metadataStore.league;
        } else {
            return metadataStore.athlete;
        }
    };

    const onSubmit = async (activationFormValues: TActivationFormSchema) => {
        console.log("\n\n\n\nRequest Body:", activationFormValues);

        try {
            setIsSubmitting(true);
            if (id) {
                const response = await MetadataService.editActivationSummary(
                    id,
                    activationFormValues
                );
                if (response.status === HTTP_STATUS_CODES.OK) {
                    toast.success("Activation summary updated successfully");
                }
                return;
            }
            const response =
                await MetadataService.createActivation(activationFormValues);
            if (response.status === HTTP_STATUS_CODES.OK) {
                toast.success("Activation summary created successfully");
                form.reset({
                    name: "",
                    assetIds: undefined,
                    athleteId: undefined,
                    brandId: undefined,
                    leagueId: undefined,
                    marketIds: undefined,
                    partnerType: "Team",
                    teamId: undefined,
                    typeIds: undefined,
                    userId: undefined,
                    year: undefined
                });
            }
        } catch (error) {
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

    return (
        <div className="flex-1 gap-4 sm:px-6 sm:py-0 md:gap-8">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mx-auto grid flex-1 auto-rows-max gap-4"
                >
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() =>
                                navigate(NAVIGATION_ROUTES.ACTIVATION_LIST, {
                                    replace: true
                                })
                            }
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Button>
                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                            {id ? "Edit" : "Create"} Activation
                        </h1>

                        <div className="hidden items-center gap-2 md:ml-auto md:flex">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={
                                    isSubmitting ||
                                    isFetchingDetails ||
                                    isFetchingMetadata
                                }
                                onClick={() =>
                                    navigate(
                                        NAVIGATION_ROUTES.ACTIVATION_LIST,
                                        {
                                            replace: true
                                        }
                                    )
                                }
                                type="button"
                            >
                                Discard
                            </Button>
                            <Button
                                type="submit"
                                size="sm"
                                className="gap-1"
                                disabled={
                                    isSubmitting ||
                                    isFetchingDetails ||
                                    isFetchingMetadata
                                }
                            >
                                <span>Save Activation</span>
                                {isSubmitting && (
                                    <ClipLoader size={15} color="#020817" />
                                )}
                            </Button>
                        </div>
                    </div>
                    {isFetchingDetails || isFetchingMetadata ? (
                        <FormSkeleton />
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:gap-8">
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2">
                                <CardWrapper title="Activation Details">
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="Activation Name">
                                                        <Input
                                                            {...field}
                                                            placeholder="Activation name"
                                                        />
                                                    </FormItemWrapper>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="brandId"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="Brand">
                                                        <SelectBox
                                                            options={
                                                                metadataStore?.brand
                                                            }
                                                            value={field.value}
                                                            onChange={
                                                                field.onChange
                                                            }
                                                            placeholder="Select a brand"
                                                            inputPlaceholder="Search for a brand..."
                                                            emptyPlaceholder="No brand found"
                                                        />
                                                    </FormItemWrapper>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="grid gap-3">
                                                    <FormField
                                                        control={form.control}
                                                        name="partnerType"
                                                        render={({ field }) => (
                                                            <FormItemWrapper label="Stakeholder">
                                                                <SelectBox
                                                                    options={
                                                                        partnerType
                                                                    }
                                                                    value={
                                                                        field.value
                                                                    }
                                                                    onChange={(
                                                                        selected
                                                                    ) => {
                                                                        form.setValue(
                                                                            "teamId",
                                                                            ""
                                                                        );
                                                                        form.setValue(
                                                                            "leagueId",
                                                                            ""
                                                                        );
                                                                        form.setValue(
                                                                            "athleteId",
                                                                            ""
                                                                        );
                                                                        field.onChange(
                                                                            selected
                                                                        );
                                                                    }}
                                                                    placeholder="Select a stakeholder"
                                                                    inputPlaceholder="Search for a stakeholder..."
                                                                    emptyPlaceholder="No stakeholder found"
                                                                />
                                                            </FormItemWrapper>
                                                        )}
                                                    />
                                                </div>
                                                <div className="grid gap-3">
                                                    <FormField
                                                        control={form.control}
                                                        name={getStakeholderName()}
                                                        render={({ field }) => (
                                                            <FormItemWrapper
                                                                label={getStakeholderTitle()}
                                                            >
                                                                <SelectBox
                                                                    options={getStakeholderOptions()}
                                                                    value={
                                                                        field.value
                                                                    }
                                                                    onChange={
                                                                        field.onChange
                                                                    }
                                                                    placeholder={`Select a ${getStakeholderTitle().toLowerCase()}`}
                                                                    inputPlaceholder={`Search for a ${getStakeholderTitle().toLowerCase()}...`}
                                                                    emptyPlaceholder={`No ${getStakeholderTitle().toLowerCase()} found`}
                                                                />
                                                            </FormItemWrapper>
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardWrapper>

                                <CardWrapper title="Other details">
                                    <div className="grid gap-6">
                                        <div className="grid grid-cols-3 gap-3">
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="typeIds"
                                                    render={({ field }) => (
                                                        <FormItemWrapper label="Type">
                                                            <SelectBox
                                                                options={
                                                                    metadataStore?.marketingPlatform
                                                                }
                                                                value={
                                                                    field.value
                                                                }
                                                                onChange={
                                                                    field.onChange
                                                                }
                                                                placeholder="Select a type"
                                                                inputPlaceholder="Search for a type..."
                                                                emptyPlaceholder="No type found"
                                                                multiple
                                                            />
                                                        </FormItemWrapper>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="marketIds"
                                                    render={({ field }) => (
                                                        <FormItemWrapper label="Market">
                                                            <SelectBox
                                                                options={
                                                                    metadataStore?.state
                                                                }
                                                                value={
                                                                    field.value
                                                                }
                                                                onChange={
                                                                    field.onChange
                                                                }
                                                                placeholder="Select a market"
                                                                inputPlaceholder="Search for a market..."
                                                                emptyPlaceholder="No market found"
                                                                multiple
                                                            />
                                                        </FormItemWrapper>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="year"
                                                    render={({ field }) => (
                                                        <FormItemWrapper label="Year">
                                                            <SelectBox
                                                                options={getListOfYears()}
                                                                value={
                                                                    field.value
                                                                }
                                                                onChange={
                                                                    field.onChange
                                                                }
                                                                placeholder="Select a year"
                                                                inputPlaceholder="Search for a year..."
                                                                emptyPlaceholder="No year found"
                                                            />
                                                        </FormItemWrapper>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="assetIds"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="Asset">
                                                        <SelectBox
                                                            options={
                                                                metadataStore.asset
                                                            }
                                                            value={field.value}
                                                            onChange={
                                                                field.onChange
                                                            }
                                                            placeholder="Select an asset"
                                                            inputPlaceholder="Search for a asset..."
                                                            emptyPlaceholder="No asset found"
                                                            multiple
                                                        />
                                                    </FormItemWrapper>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </CardWrapper>
                            </div>
                        </div>
                    )}

                    <div className="mt-3 flex flex-col items-center justify-center gap-3 md:hidden">
                        <Button
                            type="submit"
                            size="sm"
                            className="w-full gap-1 py-5"
                            disabled={
                                isSubmitting ||
                                isFetchingDetails ||
                                isFetchingMetadata
                            }
                        >
                            <span>Save Activation</span>
                            {isSubmitting && (
                                <ClipLoader size={15} color="#020817" />
                            )}
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full py-5"
                            disabled={
                                isSubmitting ||
                                isFetchingDetails ||
                                isFetchingMetadata
                            }
                            onClick={() =>
                                navigate(NAVIGATION_ROUTES.ACTIVATION_LIST, {
                                    replace: true
                                })
                            }
                            type="button"
                        >
                            Discard
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default ActivationForm;
