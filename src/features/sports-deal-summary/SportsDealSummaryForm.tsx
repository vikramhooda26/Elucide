import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useRecoilState, useRecoilValue } from "recoil";
import { toast } from "sonner";
import { CardWrapper } from "../../components/card/card-wrapper";
import { VerticalFieldsCard } from "../../components/core/form/vertical-fields-card";
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
import {
    convertCroreToRupees,
    convertRupeesToCrore,
    getListOfYears,
    onNumInputChange
} from "../utils/helpers";
import { getMetadata } from "../utils/metadataUtils";
import {
    SPORTS_DEAL_SUMMARY_KEYS,
    sportsDealSummaryFormSchema,
    TEditSportsDealSummaryFormSchema,
    TSportsDealSummaryFormSchema
} from "./constants/metadata";
import { FormSkeleton } from "../../components/core/form/form-skeleton";
import { TPartnerType } from "../activations/constants/metadata";
import { printLogs } from "../../lib/logs";

function SportsDealSummaryForm() {
    const [isFetchingDetails, setIsFetchingDetails] = useState<boolean>(false);
    const [isFetchingMetadata, setIsFetchingMetadata] =
        useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [metadataStore, setMetadataStore] = useRecoilState(metadataStoreAtom);
    const user = useRecoilValue(userAtom);
    const { id } = useParams();

    const { logout } = useAuth();
    const navigate = useNavigate();

    const form = useForm<TSportsDealSummaryFormSchema>({
        resolver: zodResolver(sportsDealSummaryFormSchema),
        defaultValues: {
            userId: user?.id
        }
    });

    const status = [
        { value: "active", label: "Active" },
        { value: "expired", label: "Expired" }
    ];

    const type = [
        { value: "sponsorship", label: "Sponsorship" },
        { value: "endorsement", label: "Endorsement" },
        { value: "media buy", label: "Media Buy" },
        { value: "other", label: "Other" }
    ];

    const partnerTypeValue = useWatch({
        control: form.control,
        name: "partnerType"
    });

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                setIsFetchingMetadata(true);
                await getMetadata(
                    metadataStore,
                    setMetadataStore,
                    SPORTS_DEAL_SUMMARY_KEYS
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

    const getStakeholderType = (
        activationData: TEditSportsDealSummaryFormSchema
    ) => {
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
        const fetchSportsDealSummaryDetails = async (id: string) => {
            try {
                setIsFetchingDetails(true);
                const response =
                    await MetadataService.getOneSportsDealSummary(id);

                if (response.status === HTTP_STATUS_CODES.OK) {
                    const sportsDealSummaryDetails: TEditSportsDealSummaryFormSchema =
                        response.data;

                    printLogs(
                        "sportsDealSummaryDetails:",
                        sportsDealSummaryDetails
                    );

                    const partner = getStakeholderType(
                        sportsDealSummaryDetails
                    );

                    form.reset({
                        brandId:
                            sportsDealSummaryDetails.brand?.id || undefined,
                        partnerType: partner?.type || undefined,
                        ...(partner?.type === "Athlete"
                            ? { athleteId: partner.data }
                            : partner?.type === "Team"
                              ? { teamId: partner.data }
                              : { leagueId: partner?.data }),
                        userId: user?.id || undefined,
                        assetIds:
                            sportsDealSummaryDetails.assets?.map(
                                (asset) => asset.id
                            ) || undefined,
                        commencementYear:
                            sportsDealSummaryDetails.commencementDate,
                        expirationDate: sportsDealSummaryDetails.expirationDate,
                        annualValue:
                            convertRupeesToCrore(
                                sportsDealSummaryDetails.annualValue
                            ) || undefined,
                        totalValue:
                            convertRupeesToCrore(
                                sportsDealSummaryDetails.totalValue
                            ) || undefined,
                        mediaLink: sportsDealSummaryDetails.mediaLink,
                        duration: sportsDealSummaryDetails.duration,
                        type: sportsDealSummaryDetails?.type,
                        levelId: sportsDealSummaryDetails.level?.id,
                        status: sportsDealSummaryDetails.status,
                        territoryId: sportsDealSummaryDetails.territory?.id
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
            fetchSportsDealSummaryDetails(id);
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

    const sportsDealSummaryAttributes: {
        title: string;
        register: Extract<
            keyof TSportsDealSummaryFormSchema,
            "assetIds" | "territoryId" | "levelId" | "status" | "type"
        >;
        options: any;
        multiple: boolean;
        type: "DROPDOWN";
    }[] = [
        {
            title: "Type",
            register: "type",
            options: type,
            multiple: false,
            type: "DROPDOWN"
        },
        {
            title: "Level",
            register: "levelId",
            options: metadataStore.sportsDealSummaryLevel,
            multiple: false,
            type: "DROPDOWN"
        },
        {
            title: "Status",
            register: "status",
            options: status,
            multiple: false,
            type: "DROPDOWN"
        },
        {
            title: "Asset",
            register: "assetIds",
            options: metadataStore.asset,
            multiple: true,
            type: "DROPDOWN"
        },
        {
            title: "Territory",
            register: "territoryId",
            options: metadataStore.sportsDealSummaryTerritory,
            multiple: false,
            type: "DROPDOWN"
        }
    ];

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

    const onSubmit = async (
        sportsDealSummaryFormValues: TSportsDealSummaryFormSchema
    ) => {
        const convertedAnnualValue = convertCroreToRupees(
            sportsDealSummaryFormValues.annualValue
        );
        const convertedTotalValue = convertCroreToRupees(
            sportsDealSummaryFormValues.totalValue
        );

        if (convertedAnnualValue === false) {
            form.setError(
                "annualValue",
                { message: "Annual value must be a number" },
                { shouldFocus: true }
            );
        }

        if (convertedTotalValue === false) {
            form.setError(
                "totalValue",
                { message: "Total value must be a number" },
                { shouldFocus: true }
            );
        }

        console.log("\n\n\n\nRequest Body:", sportsDealSummaryFormValues);

        try {
            setIsSubmitting(true);

            const requestBody = {
                ...sportsDealSummaryFormValues,
                totalValue: convertedTotalValue,
                annualValue: convertedAnnualValue
            };

            if (id) {
                const response = await MetadataService.editSportsDealSummary(
                    id,
                    requestBody
                );

                if (response.status === HTTP_STATUS_CODES.OK) {
                    toast.success("Sports deal summary updated successfully");
                }
                return;
            }

            const response =
                await MetadataService.createSportsDealSummary(requestBody);

            if (response.status === HTTP_STATUS_CODES.OK) {
                toast.success("Sports deal summary created successfully");
                form.reset();
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
                                navigate(
                                    NAVIGATION_ROUTES.SPORTS_DEAL_SUMMARY_LIST,
                                    {
                                        replace: true
                                    }
                                )
                            }
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Button>
                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                            {id ? "Edit" : "Create"} Deal
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
                                        NAVIGATION_ROUTES.SPORTS_DEAL_SUMMARY_LIST,
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
                                <span>Save Deal</span>
                                {isSubmitting && (
                                    <ClipLoader size={15} color="#020817" />
                                )}
                            </Button>
                        </div>
                    </div>
                    {isFetchingDetails || isFetchingMetadata ? (
                        <FormSkeleton />
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 lg:gap-8">
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2">
                                <CardWrapper title="Sports Deal Summary">
                                    <div className="grid gap-6">
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
                                                        render={({ field }) => {
                                                            const stakeholder =
                                                                getStakeholderTitle();
                                                            return (
                                                                <FormItemWrapper
                                                                    label={
                                                                        stakeholder
                                                                    }
                                                                >
                                                                    <SelectBox
                                                                        options={getStakeholderOptions()}
                                                                        value={
                                                                            field.value
                                                                        }
                                                                        onChange={
                                                                            field.onChange
                                                                        }
                                                                        placeholder={`Select a ${stakeholder.toLowerCase()}`}
                                                                        inputPlaceholder={`Search for a ${stakeholder.toLowerCase()}...`}
                                                                        emptyPlaceholder={`No ${stakeholder.toLowerCase()} found`}
                                                                    />
                                                                </FormItemWrapper>
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardWrapper>

                                <CardWrapper title="Other details">
                                    <div className="grid gap-6">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="commencementYear"
                                                    render={({ field }) => (
                                                        <FormItemWrapper label="Commencement Year">
                                                            <SelectBox
                                                                options={getListOfYears(
                                                                    true
                                                                )}
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
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="expirationDate"
                                                    render={({ field }) => (
                                                        <FormItemWrapper label="Expiration Year">
                                                            <SelectBox
                                                                options={getListOfYears(
                                                                    true
                                                                )}
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
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="annualValue"
                                                    render={({ field }) => (
                                                        <FormItemWrapper label="Annual Value (in cr)">
                                                            <Input
                                                                {...field}
                                                                type="text"
                                                                onChange={(e) =>
                                                                    onNumInputChange(
                                                                        form,
                                                                        e,
                                                                        "annualValue"
                                                                    )
                                                                }
                                                            />
                                                        </FormItemWrapper>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="totalValue"
                                                    render={({ field }) => (
                                                        <FormItemWrapper label="Total value (in cr)">
                                                            <Input
                                                                {...field}
                                                                type="text"
                                                                onChange={(e) =>
                                                                    onNumInputChange(
                                                                        form,
                                                                        e,
                                                                        "totalValue"
                                                                    )
                                                                }
                                                            />
                                                        </FormItemWrapper>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="mediaLink"
                                                    render={({ field }) => (
                                                        <FormItemWrapper label="Media Link">
                                                            <Input {...field} />
                                                        </FormItemWrapper>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="duration"
                                                    render={({ field }) => (
                                                        <FormItemWrapper label="Duration (in yrs)">
                                                            <Input
                                                                {...field}
                                                                type="text"
                                                                onChange={(e) =>
                                                                    onNumInputChange(
                                                                        form,
                                                                        e,
                                                                        "duration"
                                                                    )
                                                                }
                                                            />
                                                        </FormItemWrapper>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardWrapper>
                            </div>
                            <div className="grid auto-rows-max items-start gap-4">
                                <VerticalFieldsCard
                                    control={form.control}
                                    title="Deal attributes"
                                    displayFields={sportsDealSummaryAttributes}
                                />
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
                            <span>Save Deal</span>
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
                                navigate(
                                    NAVIGATION_ROUTES.SPORTS_DEAL_SUMMARY_LIST,
                                    {
                                        replace: true
                                    }
                                )
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

export default SportsDealSummaryForm;
