import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, PlusCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useRecoilState, useRecoilValue } from "recoil";
import { toast } from "sonner";
import { CardWrapper } from "../../components/card/card-wrapper";
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
import ErrorService from "../../services/error/ErrorService";
import TeamService from "../../services/features/TeamService";
import { metadataStoreAtom } from "../../store/atoms/metadata";
import { userAtom } from "../../store/atoms/user";
import { useAuth } from "../auth/auth-provider/AuthProvider";
import {
    convertCroreToRupees,
    getListOfYears,
    onNumInputChange,
    validateMetrics,
} from "../utils/helpers";
import { getMetadata } from "../utils/metadataUtils";
import {
    TEAM_METADATA,
    teamFormSchema,
    TTeamFormSchema,
} from "./constants/metadata";

export function TeamForm() {
    const [_isLoading, setIsLoading] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [metadataStore, setMetadataStore] = useRecoilState(metadataStoreAtom);
    const user = useRecoilValue(userAtom);

    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                setIsLoading(true);
                await getMetadata(
                    metadataStore,
                    setMetadataStore,
                    TEAM_METADATA
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
                setIsLoading(false);
            }
        };

        fetchMetadata();
    }, []);

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

    const form = useForm<TTeamFormSchema>({
        resolver: zodResolver(teamFormSchema),
        defaultValues: {
            userId: user?.id,
        },
    });

    const viewershipMetricFieldArray = useFieldArray({
        name: "viewershipMetrics",
        control: form.control,
    });

    const reachMetricFieldArray = useFieldArray({
        name: "reachMetrics",
        control: form.control,
    });

    const defaultViewershipMetric = {
        viewership: "",
        year: "",
        viewershipType: "",
    };

    const defaultReachMetric = {
        reach: "",
        year: "",
    };

    const teamAttributes: {
        title: string;
        register: Extract<
            keyof TTeamFormSchema,
            | "sportId"
            | "leagueId"
            | "ownerIds"
            | "cityId"
            | "stateId"
            | "subPersonalityTraitIds"
            | "tierIds"
        >;
        options: any;
        multiple: boolean;
        type: "DROPDOWN";
    }[] = [
        {
            title: "Sports",
            register: "sportId",
            options: metadataStore.sport,
            multiple: false,
            type: "DROPDOWN",
        },
        {
            title: "League",
            register: "leagueId",
            options: metadataStore.league,
            multiple: false,
            type: "DROPDOWN",
        },
        {
            title: "Owners",
            register: "ownerIds",
            options: metadataStore.teamOwner,
            multiple: true,
            type: "DROPDOWN",
        },
        {
            title: "City",
            register: "cityId",
            options: metadataStore.city,
            multiple: false,
            type: "DROPDOWN",
        },
        {
            title: "State",
            register: "stateId",
            options: metadataStore.state,
            multiple: false,
            type: "DROPDOWN",
        },
        {
            title: "Personality Traits",
            register: "subPersonalityTraitIds",
            options: metadataStore.personalityTrait,
            multiple: true,
            type: "DROPDOWN",
        },
        {
            title: "Tiers",
            register: "tierIds",
            options: metadataStore.tier,
            multiple: true,
            type: "DROPDOWN",
        },
    ];

    const targetAudience: {
        title: string;
        register: Extract<keyof TTeamFormSchema, "ageIds" | "genderIds">;
        options: any;
        multiple: boolean;
        type: "DROPDOWN";
    }[] = [
        {
            title: "Age",
            register: "ageIds",
            options: metadataStore.age,
            multiple: true,
            type: "DROPDOWN",
        },
        {
            title: "Gender",
            register: "genderIds",
            options: metadataStore.gender,
            multiple: true,
            type: "DROPDOWN",
        },
    ];

    const contactDetails: {
        title: string;
        register: Extract<
            keyof TTeamFormSchema,
            | "contactName"
            | "contactDesignation"
            | "contactNumber"
            | "contactLinkedin"
            | "contactEmail"
        >;
        input: { type: string };
        placeholder?: string;
        type: "INPUT" | "PHONE";
    }[] = [
        {
            title: "Contact Name",
            register: "contactName",
            type: "INPUT",
            input: {
                type: "text",
            },
            placeholder: "Contact name",
        },
        {
            title: "Contact Designation",
            register: "contactDesignation",
            type: "INPUT",
            input: {
                type: "text",
            },
            placeholder: "Contact designation",
        },
        {
            title: "Contact Number",
            register: "contactNumber",
            type: "PHONE",
            input: {
                type: "number",
            },
            placeholder: "Contact number",
        },
        {
            title: "Contact Linkedin",
            register: "contactLinkedin",
            type: "INPUT",
            input: {
                type: "text",
            },
            placeholder: "Contact linkedin",
        },
        {
            title: "Contact Email",
            register: "contactEmail",
            type: "INPUT",
            input: {
                type: "email",
            },
            placeholder: "Contact email",
        },
    ];

    const socials: {
        name: Extract<
            keyof TTeamFormSchema,
            | "instagram"
            | "facebook"
            | "linkedin"
            | "youtube"
            | "website"
            | "twitter"
        >;
    }[] = [
        {
            name: "instagram",
        },
        {
            name: "facebook",
        },
        {
            name: "twitter",
        },
        {
            name: "linkedin",
        },
        {
            name: "youtube",
        },
        {
            name: "website",
        },
    ];

    const viewershipType = [
        { label: "OTT", value: "OTT" },
        { label: "BROADCAST", value: "BROADCAST" },
    ];

    const onSubmit = async (teamFormValues: TTeamFormSchema) => {
        const convertedFranciseFee = convertCroreToRupees(
            teamFormValues?.franchiseFee
        );

        const convertedCostOfAssociation = convertCroreToRupees(
            teamFormValues?.costOfAssociation
        );

        if (convertedFranciseFee === false) {
            form.setError(
                "franchiseFee",
                {
                    message: "Franchise fee must be a number",
                },
                { shouldFocus: true }
            );
            return;
        }

        if (convertedCostOfAssociation === false) {
            form.setError(
                "costOfAssociation",
                {
                    message: "Cost of association must be a number",
                },
                { shouldFocus: true }
            );
            return;
        }

        if (teamFormValues?.contactNumber) {
            const phoneData = getPhoneData(teamFormValues?.contactNumber);
            if (!phoneData.isValid) {
                form.setError("contactNumber", {
                    type: "manual",
                    message: "Invalid phone number",
                });
                return;
            }
        }

        const validatedViewershipMetrics = validateMetrics(
            "viewershipMetrics",
            teamFormValues?.viewershipMetrics,
            form.setError
        );

        const validatedReachMetrics = validateMetrics(
            "reachMetrics",
            teamFormValues?.reachMetrics,
            form.setError
        );

        if (
            validatedViewershipMetrics === undefined ||
            validatedReachMetrics === undefined
        ) {
            return;
        }

        const requestBody = {
            ...teamFormValues,
            viewershipMetrics: validatedViewershipMetrics,
            reachMetrics: validatedReachMetrics,
            costOfAssociation: convertedCostOfAssociation,
            franchiseFee: convertedFranciseFee,
        };

        console.log("\n\n\n\nRequest Body:", requestBody);

        try {
            setIsSubmitting(true);
            const response = await TeamService.createTeam(requestBody);
            if (response.status === HTTP_STATUS_CODES.OK) {
                toast.success("Team created successfully");
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
                                navigate(NAVIGATION_ROUTES.TEAM_LIST, {
                                    replace: true,
                                })
                            }
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Button>
                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                            Create Team
                        </h1>

                        <div className="hidden items-center gap-2 md:ml-auto md:flex">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={isSubmitting}
                                onClick={() =>
                                    navigate(NAVIGATION_ROUTES.TEAM_LIST, {
                                        replace: true,
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
                                disabled={isSubmitting}
                            >
                                <span>Save Team</span>
                                {isSubmitting && (
                                    <ClipLoader
                                        size={15}
                                        color="#020817"
                                    />
                                )}
                            </Button>
                        </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 lg:gap-8">
                        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 ">
                            <CardWrapper title="Team Details">
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItemWrapper label="Team Name">
                                                    <Input
                                                        {...field}
                                                        placeholder="Team name"
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
                                    <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
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
                                                name="franchiseFee"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="Franchise Fee (in cr)">
                                                        <Input
                                                            {...field}
                                                            placeholder="Franchise fees"
                                                            type="text"
                                                            onChange={(e) =>
                                                                onNumInputChange(
                                                                    form,
                                                                    e,
                                                                    "franchiseFee"
                                                                )
                                                            }
                                                        />
                                                    </FormItemWrapper>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="associationLevelId"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="Association Level">
                                                        <SelectBox
                                                            options={
                                                                metadataStore?.associationLevel
                                                            }
                                                            value={field.value}
                                                            onChange={
                                                                field.onChange
                                                            }
                                                            placeholder="Select a level"
                                                            inputPlaceholder="Search for a level..."
                                                            emptyPlaceholder="No level found"
                                                        />
                                                    </FormItemWrapper>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="costOfAssociation"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="Association Cost (in cr)">
                                                        <Input
                                                            {...field}
                                                            placeholder="Association cost"
                                                            type="text"
                                                            onChange={(e) =>
                                                                onNumInputChange(
                                                                    form,
                                                                    e,
                                                                    "costOfAssociation"
                                                                )
                                                            }
                                                        />
                                                    </FormItemWrapper>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name="activeCampaignIds"
                                            render={({ field }) => (
                                                <FormItemWrapper label="Active Campaigns">
                                                    <SelectBox
                                                        options={
                                                            metadataStore?.activeCampaign
                                                        }
                                                        value={field.value}
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        placeholder="Select a campaign"
                                                        inputPlaceholder="Search for campaigns..."
                                                        emptyPlaceholder="No campaign found"
                                                        multiple
                                                    />
                                                </FormItemWrapper>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name="nccsIds"
                                            render={({ field }) => (
                                                <FormItemWrapper label="NCCS class">
                                                    <SelectBox
                                                        options={
                                                            metadataStore?.nccs
                                                        }
                                                        value={field.value}
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        placeholder="Select a nccs class"
                                                        inputPlaceholder="Search for a nccs class..."
                                                        emptyPlaceholder="No nccs class found"
                                                        multiple
                                                    />
                                                </FormItemWrapper>
                                            )}
                                        />
                                    </div>
                                </div>
                            </CardWrapper>

                            <CardWrapper title="Marketing">
                                <div className="grid gap-6  ">
                                    <div className="grid gap-3 grid-cols-2">
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
                                                            value={field.value}
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
                                                            value={field.value}
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
                                    <div className="grid gap-3 grid-cols-3">
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
                                                            value={field.value}
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
                                                            value={field.value}
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
                                                            value={field.value}
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

                            {/* Viewership */}

                            <CardWrapper title="Viewership">
                                <TableHeaderWrapper
                                    headersArray={[
                                        { header: "Year" },
                                        { header: "Viewership" },
                                        { header: "Viewership type" },
                                    ]}
                                >
                                    {viewershipMetricFieldArray.fields.map(
                                        (field, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <FormField
                                                        control={form.control}
                                                        key={field.id}
                                                        name={`viewershipMetrics.${index}.year`}
                                                        render={({ field }) => (
                                                            <FormItemWrapper>
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
                                                </TableCell>
                                                <TableCell>
                                                    <FormField
                                                        control={form.control}
                                                        key={field.id}
                                                        name={`viewershipMetrics.${index}.viewership`}
                                                        render={({ field }) => (
                                                            <FormItemWrapper>
                                                                <Input
                                                                    value={
                                                                        field.value
                                                                    }
                                                                    onChange={
                                                                        field.onChange
                                                                    }
                                                                />
                                                            </FormItemWrapper>
                                                        )}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <div className="grid gap-3">
                                                        <FormField
                                                            control={
                                                                form.control
                                                            }
                                                            key={field.id}
                                                            name={`viewershipMetrics.${index}.viewershipType`}
                                                            render={({
                                                                field,
                                                            }) => (
                                                                <FormItemWrapper>
                                                                    <SelectBox
                                                                        options={
                                                                            viewershipType
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
                                                                    />
                                                                </FormItemWrapper>
                                                            )}
                                                        />
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-semibold">
                                                    {viewershipMetricFieldArray
                                                        .fields.length > 0 && (
                                                        <Button
                                                            onClick={() =>
                                                                viewershipMetricFieldArray.remove(
                                                                    index
                                                                )
                                                            }
                                                            size="sm"
                                                            className="h-7 gap-1 text-white"
                                                            variant="destructive"
                                                            type="button"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </Button>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )}
                                </TableHeaderWrapper>

                                <div className="flex justify-end mt-4">
                                    <Button
                                        onClick={() =>
                                            viewershipMetricFieldArray.append(
                                                defaultViewershipMetric
                                            )
                                        }
                                        size="sm"
                                        className="h-7 gap-1"
                                        type="button"
                                    >
                                        <PlusCircle className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                            Add
                                        </span>
                                    </Button>
                                </div>
                            </CardWrapper>

                            {/* Reach */}

                            <CardWrapper title="Reach">
                                <TableHeaderWrapper
                                    headersArray={[
                                        { header: "Year" },
                                        { header: "Reach" },
                                    ]}
                                >
                                    {reachMetricFieldArray.fields.map(
                                        (field, index) => (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <FormField
                                                        control={form.control}
                                                        key={field.id}
                                                        name={`reachMetrics.${index}.year`}
                                                        render={({ field }) => (
                                                            <FormItemWrapper>
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
                                                </TableCell>
                                                <TableCell>
                                                    <FormField
                                                        control={form.control}
                                                        key={field.id}
                                                        name={`reachMetrics.${index}.reach`}
                                                        render={({ field }) => (
                                                            <FormItemWrapper>
                                                                <Input
                                                                    value={
                                                                        field.value
                                                                    }
                                                                    onChange={
                                                                        field.onChange
                                                                    }
                                                                />
                                                            </FormItemWrapper>
                                                        )}
                                                    />
                                                </TableCell>
                                                <TableCell className="font-semibold">
                                                    {reachMetricFieldArray
                                                        .fields.length > 0 && (
                                                        <Button
                                                            onClick={() =>
                                                                reachMetricFieldArray.remove(
                                                                    index
                                                                )
                                                            }
                                                            size="sm"
                                                            className="h-7 gap-1 text-white"
                                                            variant="destructive"
                                                            type="button"
                                                        >
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </Button>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    )}
                                </TableHeaderWrapper>

                                <div className="flex justify-end mt-4">
                                    <Button
                                        onClick={() =>
                                            reachMetricFieldArray.append(
                                                defaultReachMetric
                                            )
                                        }
                                        size="sm"
                                        className="h-7 gap-1"
                                        type="button"
                                    >
                                        <PlusCircle className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                            Add
                                        </span>
                                    </Button>
                                </div>
                            </CardWrapper>

                            <CardWrapper title="Socials">
                                <TableHeaderWrapper
                                    headersArray={[
                                        {
                                            header: "Platforms",
                                            className: "w-[120px]",
                                        },
                                        { header: "Link" },
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

                        <div className="grid auto-rows-max items-start gap-4 ">
                            <VerticalFieldsCard
                                control={form.control}
                                title="Team Attributes"
                                displayFields={teamAttributes}
                            />

                            <VerticalFieldsCard
                                control={form.control}
                                title="Target Audience"
                                displayFields={targetAudience}
                            />

                            <VerticalFieldsCard
                                control={form.control}
                                title="Contact Person Details"
                                displayFields={contactDetails}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-center flex-col gap-3 md:hidden mt-3">
                        <Button
                            type="submit"
                            size="sm"
                            className="w-full py-5 gap-1"
                            disabled={isSubmitting}
                        >
                            <span>Save Team</span>
                            {isSubmitting && (
                                <ClipLoader
                                    size={15}
                                    color="#020817"
                                />
                            )}
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full py-5"
                            disabled={isSubmitting}
                            onClick={() =>
                                navigate(NAVIGATION_ROUTES.TEAM_LIST, {
                                    replace: true,
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

export default TeamForm;
