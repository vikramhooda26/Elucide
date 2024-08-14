import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO } from "date-fns";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useRecoilState, useRecoilValue } from "recoil";
import { toast } from "sonner";
import { CardWrapper } from "../../components/card/card-wrapper";
import AssociationCard from "../../components/core/form/association-card";
import ContactPersonCard from "../../components/core/form/contact-person-card";
import { VerticalFieldsCard } from "../../components/core/form/vertical-fields-card";
import { DatePicker } from "../../components/date/DatePicker";
import { FormItemWrapper } from "../../components/form/item-wrapper";
import { getPhoneData } from "../../components/phone-input";
import { TableHeaderWrapper } from "../../components/table/table-header-wrapper";
import { Button } from "../../components/ui/button";
import { Form, FormField } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import SelectBox from "../../components/ui/multi-select";
import { TableCell, TableRow } from "../../components/ui/table";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../../lib/constants";
import { printLogs } from "../../lib/logs";
import ErrorService from "../../services/error/ErrorService";
import AthleteService from "../../services/features/AthleteService";
import { metadataStoreAtom } from "../../store/atoms/metadata";
import { userAtom } from "../../store/atoms/user";
import { useAuth } from "../auth/auth-provider/AuthProvider";
import { convertCroreToRupees, convertRupeesToCrore } from "../utils/helpers";
import { getMetadata } from "../utils/metadataUtils";
import {
    ATHLETE_METADATA,
    athleteFormSchema,
    TAthleteFormSchema,
    TEditAthleteFormSchema,
} from "./constants/metadata";
import { FormSkeleton } from "../../components/core/form/form-skeleton";

function AthleteForm() {
    const [isFetchingDetails, setIsFetchingDetails] = useState<boolean>(false);
    const [isFetchingMetadata, setIsFetchingMetadata] =
        useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [metadataStore, setMetadataStore] = useRecoilState(metadataStoreAtom);
    let associationId: string | undefined;
    const user = useRecoilValue(userAtom);

    const { id } = useParams();

    const { logout } = useAuth();
    const navigate = useNavigate();

    const form = useForm<TAthleteFormSchema>({
        resolver: zodResolver(athleteFormSchema),
        defaultValues: {
            userId: user?.id,
        },
    });

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                setIsFetchingMetadata(true);
                await getMetadata(
                    metadataStore,
                    setMetadataStore,
                    ATHLETE_METADATA
                );
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
                    navigate(NAVIGATION_ROUTES.DASHBOARD);
                }
            } finally {
                setIsFetchingMetadata(false);
            }
        };

        fetchMetadata();
    }, []);

    useEffect(() => {
        const fetchAthleteDetails = async (id: string) => {
            try {
                setIsFetchingDetails(true);

                const response = await AthleteService.getOne(id);
                if (response.status === HTTP_STATUS_CODES.OK) {
                    printLogs(
                        "Get athletes by id response for edit page:",
                        response.data
                    );
                    const athleteData: TEditAthleteFormSchema = response.data;

                    form.reset({
                        name: athleteData?.name || undefined,
                        nationalityId: athleteData.nationality?.id || undefined,
                        sportId: athleteData.sport?.id || undefined,
                        agencyId: athleteData.agency?.id || undefined,
                        instagram: athleteData?.instagram || undefined,
                        facebook: athleteData?.facebook || undefined,
                        twitter: athleteData?.twitter || undefined,
                        linkedin: athleteData?.linkedin || undefined,
                        website: athleteData?.website || undefined,
                        youtube: athleteData?.youtube || undefined,
                        primaryMarketIds: athleteData.primaryKeyMarket?.map(
                            (keyMarket) => keyMarket.id
                        ),
                        secondaryMarketIds: athleteData.secondaryKeyMarket?.map(
                            (keyMarket) => keyMarket.id
                        ),
                        tertiaryIds: athleteData.tertiary?.map(
                            (tertiary) => tertiary.id
                        ),
                        primarySocialMediaPlatformIds:
                            athleteData.primarySocialMedia?.map(
                                (socialMedia) => socialMedia.id
                            ),
                        secondarySocialMediaPlatformIds:
                            athleteData.secondarySocialMedia?.map(
                                (socialMedia) => socialMedia.id
                            ),
                        tierIds: athleteData.tier?.map((tiers) => tiers.id),
                        subPersonalityTraitIds:
                            athleteData.subPersonalityTraits?.map(
                                (trait) => trait.id
                            ),
                        age: athleteData?.age
                            ? parseISO(athleteData?.age)
                            : undefined,
                        genderIds: athleteData.gender?.map(
                            (gender) => gender.id
                        ),
                        nccsIds: athleteData.nccs?.map((nccs) => nccs.id),
                        statusId: athleteData.status?.id,
                        stateId: athleteData.state?.id,
                        association: athleteData.association?.map((asso) => ({
                            associationId: asso.associationId,
                            associationLevelId: asso.associationLevel?.id,
                            costOfAssociation:
                                convertRupeesToCrore(asso?.costOfAssociation) ||
                                undefined,
                        })),
                        userId: user?.id,
                        contactPerson: athleteData.contactPersons?.map(
                            (details) => ({
                                contactId: details.contactId || undefined,
                                contactName: details.contactName || undefined,
                                contactDesignation:
                                    details.contactDesignation || undefined,
                                contactEmail: details.contactEmail || undefined,
                                contactLinkedin:
                                    details.contactLinkedin || undefined,
                                contactNumber:
                                    details.contactNumber || undefined,
                            })
                        ),
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
            fetchAthleteDetails(id);
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

    const athleteAttributes: {
        title: string;
        register: Extract<
            keyof TAthleteFormSchema,
            | "sportId"
            | "stateId"
            | "subPersonalityTraitIds"
            | "nccsIds"
            | "nationalityId"
            | "statusId"
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
            title: "Nationality",
            register: "nationalityId",
            options: metadataStore.nationality,
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
            title: "NCCS class",
            register: "nccsIds",
            options: metadataStore.nccs,
            multiple: true,
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
            title: "Status",
            register: "statusId",
            options: metadataStore.athleteStatus,
            multiple: false,
            type: "DROPDOWN",
        },
        {
            title: "Tier",
            register: "tierIds",
            options: metadataStore.tier,
            multiple: true,
            type: "DROPDOWN",
        },
    ];

    const socials: {
        name: Extract<
            keyof TAthleteFormSchema,
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

    const onSubmit = async (athleteFormValues: TAthleteFormSchema) => {
        let hasErrors = false;
        const convertedCostOfAssociations: number[] = [];

        athleteFormValues?.association?.forEach((association, i) => {
            const convertedCostOfAssociation = convertCroreToRupees(
                association?.costOfAssociation
            );

            if (convertedCostOfAssociation === false) {
                hasErrors = true;
                form.setError(
                    `association.${i}.costOfAssociation`,
                    {
                        message: "Cost of association must be a number",
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

        if (athleteFormValues?.contactPerson) {
            const isNotValid = athleteFormValues?.contactPerson?.find(
                (d, i) => {
                    if (d?.contactNumber) {
                        const phoneData = getPhoneData(d?.contactNumber);
                        if (!phoneData.isValid) {
                            form.setError(
                                `contactPerson.${i}.contactNumber`,
                                {
                                    message: "Invalid phone number",
                                },
                                { shouldFocus: true }
                            );
                            toast.error("Invalid phone number");
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            );

            if (isNotValid) {
                return;
            }
        }

        if (athleteFormValues.contactPerson?.length) {
            athleteFormValues.contactPerson.forEach((details, i) => {
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

        const formatedDOB = athleteFormValues.age
            ? format(athleteFormValues.age, "yyyy-MM-dd")
            : undefined;

        console.log("\n\n\n\nRequest Body:", athleteFormValues);

        try {
            setIsSubmitting(true);
            if (id) {
                const response = await AthleteService.editAthlete(id, {
                    ...athleteFormValues,
                    associationId: associationId,
                    age: formatedDOB,
                    association: athleteFormValues.association?.map(
                        (asso, index) => ({
                            ...asso,
                            costOfAssociation:
                                convertedCostOfAssociations[index],
                        })
                    ),
                });

                if (response.status === HTTP_STATUS_CODES.OK) {
                    toast.success("Athlete updated successfully");
                }
                return;
            }
            const response = await AthleteService.createAthlete({
                ...athleteFormValues,
                age: formatedDOB,
                association: athleteFormValues.association?.map(
                    (asso, index) => ({
                        ...asso,
                        costOfAssociation: convertedCostOfAssociations[index],
                    })
                ),
            });
            if (response.status === HTTP_STATUS_CODES.OK) {
                toast.success("Athlete created successfully");
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
                                navigate(NAVIGATION_ROUTES.ATHLETE_LIST, {
                                    replace: true,
                                })
                            }
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Button>
                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                            {id ? "Edit" : "Create"} Athlete
                        </h1>

                        <div className="hidden items-center gap-2 md:ml-auto md:flex">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={
                                    isSubmitting ||
                                    isFetchingMetadata ||
                                    isFetchingDetails
                                }
                                onClick={() =>
                                    navigate(NAVIGATION_ROUTES.ATHLETE_LIST, {
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
                                disabled={
                                    isSubmitting ||
                                    isFetchingMetadata ||
                                    isFetchingDetails
                                }
                            >
                                <span>Save Athlete</span>
                                {isSubmitting && (
                                    <ClipLoader
                                        size={15}
                                        color="#020817"
                                    />
                                )}
                            </Button>
                        </div>
                    </div>
                    {isFetchingDetails || isFetchingMetadata ? (
                        <FormSkeleton />
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 lg:gap-8">
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 ">
                                <CardWrapper title="Athlete Details">
                                    <div className="grid gap-6">
                                        <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field }) => (
                                                        <FormItemWrapper label="Athlete Name">
                                                            <Input
                                                                {...field}
                                                                placeholder="Athlete name"
                                                            />
                                                        </FormItemWrapper>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="age"
                                                    render={({ field }) => (
                                                        <FormItemWrapper label="Athlete Age">
                                                            <div className="grid">
                                                                <DatePicker
                                                                    placeholder="Date of birth"
                                                                    {...field}
                                                                />
                                                            </div>
                                                        </FormItemWrapper>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="agencyId"
                                                    render={({ field }) => (
                                                        <FormItemWrapper label="Agency">
                                                            <SelectBox
                                                                options={
                                                                    metadataStore?.agency
                                                                }
                                                                value={
                                                                    field.value
                                                                }
                                                                onChange={
                                                                    field.onChange
                                                                }
                                                                placeholder="Select a agency"
                                                                inputPlaceholder="Search for a agency..."
                                                                emptyPlaceholder="No agency found"
                                                            />
                                                        </FormItemWrapper>
                                                    )}
                                                />
                                            </div>
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="genderIds"
                                                    render={({ field }) => (
                                                        <FormItemWrapper label="Gender">
                                                            <SelectBox
                                                                options={
                                                                    metadataStore?.gender
                                                                }
                                                                value={
                                                                    field.value
                                                                }
                                                                onChange={
                                                                    field.onChange
                                                                }
                                                                placeholder="Select a gender"
                                                                inputPlaceholder="Search for a gender..."
                                                                emptyPlaceholder="No gender found"
                                                                multiple
                                                            />
                                                        </FormItemWrapper>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </CardWrapper>

                                <CardWrapper title="Marketing">
                                    <div className="grid gap-6  ">
                                        <div className="grid gap-3 grid-cols-3">
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="primaryMarketIds"
                                                    render={({ field }) => (
                                                        <FormItemWrapper label="Primary Market">
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
                                                        <FormItemWrapper label="Secondary Market">
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
                                        <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                                            <div className="grid gap-3">
                                                <FormField
                                                    control={form.control}
                                                    name="primarySocialMediaPlatformIds"
                                                    render={({ field }) => (
                                                        <FormItemWrapper label="Primary Marketing Platform">
                                                            <SelectBox
                                                                options={
                                                                    metadataStore?.socialMedia
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
                                                    name="secondarySocialMediaPlatformIds"
                                                    render={({ field }) => (
                                                        <FormItemWrapper label="Secondary Marketing Platform">
                                                            <SelectBox
                                                                options={
                                                                    metadataStore?.socialMedia
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
                                                <TableCell>
                                                    <FormField
                                                        control={form.control}
                                                        name={social.name}
                                                        render={({ field }) => (
                                                            <FormItemWrapper>
                                                                <Input
                                                                    {...field}
                                                                />
                                                            </FormItemWrapper>
                                                        )}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableHeaderWrapper>
                                </CardWrapper>
                            </div>

                            <div className="grid auto-rows-max items-start gap-4 ">
                                <VerticalFieldsCard
                                    control={form.control}
                                    title="Athlete Attributes"
                                    displayFields={athleteAttributes}
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

                    <div className="flex items-center justify-center flex-col gap-3 md:hidden mt-3">
                        <Button
                            type="submit"
                            size="sm"
                            className="w-full py-5 gap-1"
                            disabled={
                                isSubmitting ||
                                isFetchingMetadata ||
                                isFetchingDetails
                            }
                        >
                            <span>Save Athlete</span>
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
                            disabled={
                                isSubmitting ||
                                isFetchingMetadata ||
                                isFetchingDetails
                            }
                            onClick={() =>
                                navigate(NAVIGATION_ROUTES.ATHLETE_LIST, {
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

export default AthleteForm;
