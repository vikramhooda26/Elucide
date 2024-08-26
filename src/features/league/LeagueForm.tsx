import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useRecoilState, useRecoilValue } from "recoil";
import { toast } from "sonner";
import { CardWrapper } from "../../components/card/card-wrapper";
import AssociationCard from "../../components/core/form/association-card";
import ContactPersonCard from "../../components/core/form/contact-person-card";
import { FormSkeleton } from "../../components/core/form/form-skeleton";
import { MetricsCard } from "../../components/core/form/metrics.card";
import { VerticalFieldsCard } from "../../components/core/form/vertical-fields-card";
import { FormItemWrapper } from "../../components/form/item-wrapper";
import { getPhoneData } from "../../components/phone-input";
import { TableHeaderWrapper } from "../../components/table/table-header-wrapper";
import { Button } from "../../components/ui/button";
import { Form, FormField } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import SelectBox from "../../components/ui/multi-select";
import { TableCell, TableRow } from "../../components/ui/table";
import { Textarea } from "../../components/ui/textarea";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../lib/constants";
import { printLogs } from "../../lib/logs";
import ErrorService from "../../services/error/ErrorService";
import LeagueService from "../../services/features/LeagueService";
import { metadataStoreAtom } from "../../store/atoms/metadata";
import { userAtom } from "../../store/atoms/user";
import { useAuth } from "../auth/auth-provider/AuthProvider";
import {
    convertCroreToRupees,
    convertRupeesToCrore,
    getListOfYears,
    validateMetrics
} from "../utils/helpers";
import { getMetadata } from "../utils/metadataUtils";
import {
    LEAGUE_METADATA,
    leagueFormSchema,
    TEditLeagueFormSchema,
    TLeagueFormSchema
} from "./constants.ts/metadata";

function LeagueForm() {
    const [isFetchingDetails, setIsFetchingDetails] = useState<boolean>(false);
    const [isFetchingMetadata, setIsFetchingMetadata] =
        useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [metadataStore, setMetadataStore] = useRecoilState(metadataStoreAtom);
    const user = useRecoilValue(userAtom);
    const { id } = useParams();

    const form = useForm<TLeagueFormSchema>({
        resolver: zodResolver(leagueFormSchema),
        defaultValues: {
            userId: user?.id
        }
    });

    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                setIsFetchingMetadata(true);
                await getMetadata(
                    metadataStore,
                    setMetadataStore,
                    LEAGUE_METADATA
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
        const fetchLeagueDetails = async (id: string) => {
            try {
                setIsFetchingDetails(true);

                const response = await LeagueService.getOne(id);

                if (response.status === HTTP_STATUS_CODES.OK) {
                    printLogs(
                        "Get leagues by id response for edit page:",
                        response.data
                    );
                    const leagueData: TEditLeagueFormSchema = response.data;

                    console.log(
                        "owners",
                        leagueData.owners?.map((owner) => owner.id)
                    );

                    printLogs("league owners", metadataStore?.leagueOwner);

                    form.reset({
                        name: leagueData.name || undefined,
                        taglineIds:
                            leagueData.taglines?.map((tagline) => tagline.id) ||
                            undefined,
                        strategyOverview:
                            leagueData.strategyOverview || undefined,
                        association: leagueData.association?.map((asso) => ({
                            associationId: asso.associationId,
                            associationLevelId: asso.associationLevel?.id,
                            costOfAssociation:
                                convertRupeesToCrore(asso?.costOfAssociation) ||
                                undefined
                        })),
                        yearOfInception:
                            leagueData.yearOfInception || undefined,
                        activeCampaignIds:
                            leagueData.activeCampaigns?.map(
                                (campaign) => campaign.id
                            ) || undefined,
                        primaryMarketingPlatformIds:
                            leagueData.primaryMarketingPlatform?.map(
                                (platform) => platform.id
                            ) || undefined,
                        secondaryMarketingPlatformIds:
                            leagueData.secondaryMarketingPlatform?.map(
                                (platform) => platform.id
                            ) || undefined,
                        primaryMarketIds:
                            leagueData.primaryKeyMarket?.map(
                                (market) => market.id
                            ) || undefined,
                        secondaryMarketIds:
                            leagueData.secondaryKeyMarket?.map(
                                (market) => market.id
                            ) || undefined,
                        tertiaryIds:
                            leagueData.tertiary?.map(
                                (tertiaries) => tertiaries.id
                            ) || undefined,
                        broadcastPartnerMetrics:
                            leagueData.broadcastPartnerMetrics?.map(
                                (metric) => ({
                                    reach: metric.reach || undefined,
                                    viewership: metric.viewership || undefined,
                                    year: metric.year || undefined,
                                    broadcastPartnerId:
                                        metric.broadcastPartner.id || undefined
                                })
                            ) || undefined,
                        ottPartnerMetrics:
                            leagueData.ottPartnerMetrics?.map((metric) => ({
                                reach: metric.reach || undefined,
                                viewership: metric.viewership || undefined,
                                year: metric.year || undefined,
                                ottPartnerId: metric.ottPartner.id || undefined
                            })) || undefined,
                        instagram: leagueData?.instagram || undefined,
                        facebook: leagueData?.facebook || undefined,
                        twitter: leagueData?.twitter || undefined,
                        linkedin: leagueData?.linkedin || undefined,
                        website: leagueData?.website || undefined,
                        youtube: leagueData?.youtube || undefined,
                        contactPerson:
                            leagueData.contactPersons?.map((details) => ({
                                contactId: details.contactId || undefined,
                                contactName: details.contactName || undefined,
                                contactEmail: details.contactEmail || undefined,
                                contactLinkedin:
                                    details.contactLinkedin || undefined,
                                contactDesignation:
                                    details.contactDesignation || undefined,
                                contactNumber:
                                    details.contactNumber || undefined
                            })) || undefined,
                        sportId: leagueData.sport?.id || undefined,
                        formatId: leagueData.format?.id || undefined,
                        ownerIds:
                            leagueData.owners?.map((owner) => owner.id) ||
                            undefined,
                        nccsIds:
                            leagueData.nccs?.map((nccs) => nccs.id) ||
                            undefined,
                        subPersonalityTraitIds:
                            leagueData.subPersonalityTraits?.map(
                                (traits) => traits.id
                            ) || undefined,
                        tierIds: leagueData.tiers
                            ?.filter((tier) => tier?.id !== undefined)
                            .map((tier) => tier.id),
                        broadCastPartnerId:
                            leagueData.broadcastPartner?.id || undefined,
                        ottPartnerId: leagueData.ottPartner?.id || undefined,
                        ageIds:
                            leagueData.age?.map((ageRange) => ageRange.id) ||
                            undefined,
                        genderIds:
                            leagueData.gender?.map((gender) => gender.id) ||
                            undefined,
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
            fetchLeagueDetails(id);
        }
    }, []);

    useEffect(() => {
        if (isSubmitting) {
            form.control._disableForm(true);
        } else {
            form.control._disableForm(false);
        }
    }, [isSubmitting]);

    if (!metadataStore) {
        return <div>loading...</div>;
    }

    const ottPartnerMetricFieldArray = useFieldArray({
        name: "ottPartnerMetrics",
        control: form.control
    });

    const broadcastPartnerMetricFieldArray = useFieldArray({
        name: "broadcastPartnerMetrics",
        control: form.control
    });

    const defaultOttPartnerMetric = {
        ottPartnerId: "",
        year: "",
        viewership: "",
        reach: ""
    };

    const defaultBroadcastPartnerMetric = {
        broadcastPartnerId: "",
        year: "",
        viewership: "",
        reach: ""
    };

    const leagueAttributes: {
        title: string;
        register: Extract<
            keyof TLeagueFormSchema,
            | "sportId"
            | "ownerIds"
            | "subPersonalityTraitIds"
            | "tierIds"
            | "formatId"
            | "nccsIds"
        >;
        options: any;
        multiple: boolean;
        type: "DROPDOWN";
    }[] = [
        {
            title: "Sport",
            register: "sportId",
            options: metadataStore.sport,
            multiple: false,
            type: "DROPDOWN"
        },
        {
            title: "Format",
            register: "formatId",
            options: metadataStore.format,
            multiple: false,
            type: "DROPDOWN"
        },
        {
            title: "Owners",
            register: "ownerIds",
            options: metadataStore.leagueOwner,
            multiple: true,
            type: "DROPDOWN"
        },
        {
            title: "NCCS Class",
            register: "nccsIds",
            options: metadataStore.nccs,
            multiple: true,
            type: "DROPDOWN"
        },
        {
            title: "Personality Traits",
            register: "subPersonalityTraitIds",
            options: metadataStore.personalityTrait,
            multiple: true,
            type: "DROPDOWN"
        },
        {
            title: "Tiers",
            register: "tierIds",
            options: metadataStore.tier,
            multiple: true,
            type: "DROPDOWN"
        }
    ];

    const partnerships: {
        title: string;
        register: Extract<
            keyof TLeagueFormSchema,
            "broadCastPartnerId" | "ottPartnerId"
        >;
        options: any;
        multiple: boolean;
        type: "DROPDOWN";
    }[] = [
        {
            title: "Broadcast Partner",
            register: "broadCastPartnerId",
            options: metadataStore.broadcastPartner,
            multiple: false,
            type: "DROPDOWN"
        },
        {
            title: "OTT Partner",
            register: "ottPartnerId",
            options: metadataStore.ottPartner,
            multiple: false,
            type: "DROPDOWN"
        }
    ];

    const targetAudience: {
        title: string;
        register: Extract<keyof TLeagueFormSchema, "ageIds" | "genderIds">;
        options: any;
        multiple: boolean;
        type: "DROPDOWN";
    }[] = [
        {
            title: "Age",
            register: "ageIds",
            options: metadataStore.age,
            multiple: true,
            type: "DROPDOWN"
        },
        {
            title: "Gender",
            register: "genderIds",
            options: metadataStore.gender,
            multiple: true,
            type: "DROPDOWN"
        }
    ];

    const socials: {
        name: Extract<
            keyof TLeagueFormSchema,
            | "instagram"
            | "facebook"
            | "linkedin"
            | "youtube"
            | "website"
            | "twitter"
        >;
    }[] = [
        {
            name: "instagram"
        },
        {
            name: "facebook"
        },
        {
            name: "twitter"
        },
        {
            name: "linkedin"
        },
        {
            name: "youtube"
        },
        {
            name: "website"
        }
    ];

    const onSubmit = async (leagueFormValues: TLeagueFormSchema) => {
        let hasErrors = false;
        const convertedCostOfAssociations: number[] = [];

        leagueFormValues?.association?.forEach((association, i) => {
            const convertedCostOfAssociation = convertCroreToRupees(
                association?.costOfAssociation
            );

            if (convertedCostOfAssociation === false) {
                hasErrors = true;
                form.setError(
                    `association.${i}.costOfAssociation`,
                    {
                        message: "Cost of association must be a number"
                    },
                    { shouldFocus: true }
                );
                return;
            } else {
                if (convertedCostOfAssociation) {
                    convertedCostOfAssociations.push(
                        convertedCostOfAssociation
                    );
                }
            }
        });

        if (hasErrors) {
            return;
        }

        if (leagueFormValues?.contactPerson) {
            const isNotValid = leagueFormValues?.contactPerson?.find((d, i) => {
                if (d?.contactNumber) {
                    const phoneData = getPhoneData(d?.contactNumber);
                    if (!phoneData.isValid) {
                        form.setError(
                            `contactPerson.${i}.contactNumber`,
                            {
                                message: "Invalid phone number"
                            },
                            { shouldFocus: true }
                        );
                        toast.error("Invalid phone number");
                        return true;
                    } else {
                        return false;
                    }
                }
            });

            if (isNotValid) {
                return;
            }
        }

        if (leagueFormValues.contactPerson?.length) {
            leagueFormValues.contactPerson.forEach((details, i) => {
                const hasValue =
                    details.contactDesignation ||
                    details.contactEmail ||
                    details.contactLinkedin ||
                    details.contactNumber ||
                    details.contactName;
                if (hasValue && !details.contactName) {
                    hasErrors = true;
                    form.setError(
                        `contactPerson.${i}.contactName`,
                        { message: "Name is required" },
                        { shouldFocus: true }
                    );
                }
            });

            if (hasErrors) {
                return;
            }
        }

        const validatedOttPartnerMetrics = validateMetrics(
            "ottPartnerMetrics",
            leagueFormValues?.ottPartnerMetrics,
            form.setError
        );

        const validatedBroadcastMetrics = validateMetrics(
            "broadcastPartnerMetrics",
            leagueFormValues?.broadcastPartnerMetrics,
            form.setError
        );

        if (
            validatedOttPartnerMetrics === undefined ||
            validatedBroadcastMetrics === undefined
        ) {
            return;
        }

        const requestBody = {
            ...leagueFormValues,
            ottPartnerMetrics: validatedOttPartnerMetrics,
            broadcastPartnerMetrics: validatedBroadcastMetrics,
            association: leagueFormValues.association?.map((asso, index) => ({
                ...asso,
                costOfAssociation: convertedCostOfAssociations[index]
            }))
        };

        console.log("\n\n\n\nRequest Body: ", requestBody);

        try {
            setIsSubmitting(true);
            if (id) {
                const response = await LeagueService.editLeague(
                    id,
                    requestBody
                );
                if (response.status === HTTP_STATUS_CODES.OK) {
                    toast.success("League updated successfully");
                }
                return;
            }
            const response = await LeagueService.createLeague(requestBody);
            if (response.status === HTTP_STATUS_CODES.OK) {
                toast.success("League created successfully");
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
                                navigate(NAVIGATION_ROUTES.LEAGUE_LIST, {
                                    replace: true
                                })
                            }
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Button>
                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                            {id ? "Edit" : "Create"} League
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
                                    navigate(NAVIGATION_ROUTES.LEAGUE_LIST, {
                                        replace: true
                                    })
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
                                <span>Save League</span>
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
                                <CardWrapper title="League Details">
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="Property Name">
                                                        <Input
                                                            {...field}
                                                            placeholder="Property name"
                                                        />
                                                    </FormItemWrapper>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="taglineIds"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="Taglines">
                                                        <SelectBox
                                                            options={
                                                                metadataStore?.tagline
                                                            }
                                                            value={field.value}
                                                            onChange={
                                                                field.onChange
                                                            }
                                                            placeholder="Select a tagline"
                                                            inputPlaceholder="Search for a tagline..."
                                                            emptyPlaceholder="No tagline found"
                                                            multiple
                                                        />
                                                    </FormItemWrapper>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="strategyOverview"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="Strategy Overview">
                                                        <Textarea
                                                            id="strategyOverview"
                                                            className="scrollbar"
                                                            {...field}
                                                            rows={5}
                                                        />
                                                    </FormItemWrapper>
                                                )}
                                            />
                                        </div>

                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="yearOfInception"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="Year of Inception">
                                                        <SelectBox
                                                            options={getListOfYears()}
                                                            value={field.value}
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
                                                name="activeCampaignIds"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="Active Campaigns">
                                                        <div className="flex items-center gap-3">
                                                            <SelectBox
                                                                options={
                                                                    metadataStore?.activeCampaign
                                                                }
                                                                className="w-full"
                                                                value={
                                                                    field.value
                                                                }
                                                                onChange={
                                                                    field.onChange
                                                                }
                                                                placeholder="Select a campaign"
                                                                inputPlaceholder="Search for campaigns..."
                                                                emptyPlaceholder="No campaign found"
                                                                multiple
                                                            />
                                                        </div>
                                                    </FormItemWrapper>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </CardWrapper>

                                <CardWrapper title="Marketing">
                                    <div className="grid gap-6">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="primaryMarketingPlatformIds"
                                                    render={({ field }) => (
                                                        <FormItemWrapper label="Primary Marketing Platform">
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
                                                                placeholder="Select a platform"
                                                                inputPlaceholder="Search for a platform..."
                                                                emptyPlaceholder="No platform found"
                                                                multiple
                                                            />
                                                        </FormItemWrapper>
                                                    )}
                                                />
                                            </div>

                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="secondaryMarketingPlatformIds"
                                                    render={({ field }) => (
                                                        <FormItemWrapper label="Secondary Marketing Platform">
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
                                                                placeholder="Select a platform"
                                                                inputPlaceholder="Search for a platform..."
                                                                emptyPlaceholder="No platform found"
                                                                multiple
                                                            />
                                                        </FormItemWrapper>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-3">
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="primaryMarketIds"
                                                    render={({ field }) => (
                                                        <FormItemWrapper label="Primary key Market">
                                                            <SelectBox
                                                                options={
                                                                    metadataStore?.keyMarket
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
                                                    name="secondaryMarketIds"
                                                    render={({ field }) => (
                                                        <FormItemWrapper label="Secondary key Market">
                                                            <SelectBox
                                                                options={
                                                                    metadataStore?.keyMarket
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
                                                    name="tertiaryIds"
                                                    render={({ field }) => (
                                                        <FormItemWrapper label="Tertiary Market">
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
                                                                placeholder="Select a state"
                                                                inputPlaceholder="Search for a state..."
                                                                emptyPlaceholder="No state found"
                                                                multiple
                                                            />
                                                        </FormItemWrapper>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardWrapper>

                                {/* OTT Partner Metrics */}

                                <CardWrapper title="OTT Partner Metrics">
                                    <MetricsCard
                                        fieldArray={ottPartnerMetricFieldArray}
                                        form={form}
                                        options={metadataStore.ottPartner}
                                        defaultValue={defaultOttPartnerMetric}
                                        register="ottPartnerMetrics"
                                    />
                                </CardWrapper>

                                {/* Broadcast Partner Metrics */}

                                <CardWrapper title="Broadcast Partner Metrics">
                                    <MetricsCard
                                        fieldArray={
                                            broadcastPartnerMetricFieldArray
                                        }
                                        form={form}
                                        options={metadataStore.broadcastPartner}
                                        defaultValue={
                                            defaultBroadcastPartnerMetric
                                        }
                                        register="broadcastPartnerMetrics"
                                    />
                                </CardWrapper>

                                <CardWrapper title="Socials">
                                    <TableHeaderWrapper
                                        headersArray={[
                                            {
                                                header: "Platforms",
                                                className: "w-[120px]"
                                            },
                                            { header: "Link" }
                                        ]}
                                    >
                                        {socials.map((social, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="capitalize">
                                                    {social.name}
                                                </TableCell>
                                                <FormField
                                                    control={form.control}
                                                    name={social.name}
                                                    render={({ field }) => (
                                                        <TableCell>
                                                            <FormItemWrapper>
                                                                <Input
                                                                    type="text"
                                                                    {...field}
                                                                />
                                                            </FormItemWrapper>
                                                        </TableCell>
                                                    )}
                                                />
                                            </TableRow>
                                        ))}
                                    </TableHeaderWrapper>
                                </CardWrapper>
                            </div>

                            <div className="grid auto-rows-max items-start gap-4">
                                <VerticalFieldsCard
                                    control={form.control}
                                    title="League Attributes"
                                    displayFields={leagueAttributes}
                                />

                                <VerticalFieldsCard
                                    control={form.control}
                                    title="Partnerships"
                                    displayFields={partnerships}
                                />

                                <VerticalFieldsCard
                                    control={form.control}
                                    title="Target Audience"
                                    displayFields={targetAudience}
                                />
                            </div>
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-3">
                                <AssociationCard
                                    form={form}
                                    metadataStore={metadataStore}
                                />
                                <ContactPersonCard control={form.control} />
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
                            <span>Save League</span>
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
                                navigate(NAVIGATION_ROUTES.LEAGUE_LIST, {
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

export default LeagueForm;
