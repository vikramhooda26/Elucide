import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useRecoilState, useRecoilValue } from "recoil";
import { toast } from "sonner";
import { CardWrapper } from "../../components/card/card-wrapper";
import ContactPersonCard from "../../components/core/form/contact-person-card";
import { EndorsementCard } from "../../components/core/form/endorsement-card";
import { FormSkeleton } from "../../components/core/form/form-skeleton";
import {
    TDisplayFields,
    VerticalFieldsCard
} from "../../components/core/form/vertical-fields-card";
import { InputDrawer } from "../../components/form/input-drawer";
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
import BrandService from "../../services/features/BrandService";
import MetadataService from "../../services/features/MetadataService";
import { metadataStoreAtom } from "../../store/atoms/metadata";
import { userAtom } from "../../store/atoms/user";
import { useAuth } from "../auth/auth-provider/AuthProvider";
import { activeCampaignFormSchema } from "../metadata/ActiveCampaign/constants/metadata";
import { agencyFormSchema } from "../metadata/agency/constants/metadata";
import { cityFormSchema } from "../metadata/city/constants/metadata";
import { parentOrgFormSchema } from "../metadata/parent-organization/constants/metadata";
import { stateFormSchema } from "../metadata/state/constants/metadata";
import { taglineFormSchema } from "../metadata/tagline/constants/metadata";
import { validateEndorsements } from "../utils/helpers";
import { getMetadata } from "../utils/metadataUtils";
import {
    BRAND_METADATA,
    brandFormSchema,
    TBrandFormSchema,
    TEditBrandformSchema
} from "./constants/metadata";

function BrandForm() {
    const [isFetchingDetails, setIsFetchingDetails] = useState<boolean>(false);
    const [isFetchingMetadata, setIsFetchingMetadata] =
        useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [metadataStore, setMetadataStore] = useRecoilState(metadataStoreAtom);
    const user = useRecoilValue(userAtom);
    const { id } = useParams();

    const form = useForm<TBrandFormSchema>({
        resolver: zodResolver(brandFormSchema),
        defaultValues: {
            userId: user?.id
        }
    });

    const { logout } = useAuth();
    const navigate = useNavigate();

    const fetchMetadata = async () => {
        try {
            setIsFetchingMetadata(true);
            await getMetadata(metadataStore, setMetadataStore, BRAND_METADATA);
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

    useEffect(() => {
        fetchMetadata();
    }, []);

    if (!metadataStore) {
        return <div>Loading...</div>;
    }

    useEffect(() => {
        const fetchBrandDetails = async (id: string) => {
            try {
                setIsFetchingDetails(true);
                const response = await BrandService.getOne(id);

                if (response.status === HTTP_STATUS_CODES.OK) {
                    printLogs(
                        "Get brand by id response for edit page:",
                        response.data
                    );
                    const brandData: TEditBrandformSchema = response.data;

                    form.reset({
                        userId: user?.id || undefined,
                        name: brandData.name || undefined,
                        taglineIds:
                            brandData.taglines?.map((tier) => tier.id) ||
                            undefined,
                        strategyOverview:
                            brandData.strategyOverview || undefined,
                        agencyId: brandData.agency?.id || undefined,
                        parentOrgId: brandData.parentOrg?.id || undefined,
                        activeCampaignIds:
                            brandData.activeCampaigns?.map(
                                (campaign) => campaign.id
                            ) || undefined,
                        primaryMarketingPlatformIds:
                            brandData.primaryMarketingPlatform?.map(
                                (platform) => platform.id
                            ) || undefined,
                        secondaryMarketingPlatformIds:
                            brandData.secondaryMarketingPlatform?.map(
                                (platform) => platform.id
                            ) || undefined,
                        primaryMarketIds:
                            brandData.primaryKeyMarket?.map(
                                (market) => market.id
                            ) || undefined,
                        secondaryMarketIds:
                            brandData.secondaryKeyMarket?.map(
                                (market) => market.id
                            ) || undefined,
                        tertiaryIds:
                            brandData.tertiary?.map(
                                (tertiary) => tertiary.id
                            ) || undefined,
                        instagram: brandData?.instagram || undefined,
                        facebook: brandData?.facebook || undefined,
                        twitter: brandData?.twitter || undefined,
                        linkedin: brandData?.linkedin || undefined,
                        website: brandData?.website || undefined,
                        youtube: brandData?.youtube || undefined,
                        endorsements: brandData.endorsements?.map(
                            (endorse) => ({
                                name: endorse.name,
                                active: endorse.active
                            })
                        ),
                        contactPerson:
                            brandData.contactPersons?.map((details) => ({
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
                        subCategoryIds:
                            brandData.subcategory?.map(
                                (category) => category.id
                            ) || undefined,
                        cityId: brandData.city?.id || undefined,
                        stateId: brandData.state?.id || undefined,
                        subPersonalityTraitIds:
                            brandData.mainPersonalityTraits
                                ?.map((traits) =>
                                    traits.subPersonalityTraits?.map(
                                        (sub) => sub.id || []
                                    )
                                )
                                .flat(2) || undefined,
                        tierIds:
                            brandData.tier
                                ?.filter((tier) => tier.id !== undefined)
                                .map((tier) => tier.id) || undefined,
                        nccsIds:
                            brandData.nccs?.map((nccs) => nccs.id) || undefined,
                        ageIds:
                            brandData.age?.map((age) => age.id) || undefined,
                        genderIds:
                            brandData.gender?.map((gender) => gender.id) ||
                            undefined
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
            fetchBrandDetails(id);
        }
    }, [id]);

    useEffect(() => {
        if (isSubmitting) {
            form.control._disableForm(true);
        } else {
            form.control._disableForm(false);
        }
    }, [isSubmitting]);

    const brandAttributes: TDisplayFields<TBrandFormSchema>[] = [
        {
            title: "Category",
            register: "subCategoryIds",
            options: metadataStore.category,
            multiple: true,
            type: "DROPDOWN"
        },
        {
            title: "City",
            register: "cityId",
            options: metadataStore.city,
            multiple: false,
            type: "DROPDOWN",
            showAddButton: true,
            createFn: MetadataService.createCity,
            fetchMetadataFn: fetchMetadata,
            drawerRegister: "cityName",
            schema: cityFormSchema,
            accessLevel: ["ADMIN", "SUPER_ADMIN", "STAFF"]
        },
        {
            title: "State",
            register: "stateId",
            options: metadataStore.state,
            multiple: false,
            type: "DROPDOWN",
            showAddButton: true,
            createFn: MetadataService.createState,
            fetchMetadataFn: fetchMetadata,
            drawerRegister: "stateName",
            schema: stateFormSchema,
            accessLevel: ["SUPER_ADMIN"]
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
        },
        {
            title: "NCCS class",
            register: "nccsIds",
            options: metadataStore.nccs,
            multiple: true,
            type: "DROPDOWN"
        }
    ];

    const targetAudience: {
        title: string;
        register: Extract<keyof TBrandFormSchema, "ageIds" | "genderIds">;
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
            keyof TBrandFormSchema,
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

    const onSubmit = async (brandFormValues: TBrandFormSchema) => {
        if (brandFormValues?.contactPerson) {
            const isNotValid = brandFormValues?.contactPerson?.find((d, i) => {
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

        const isEndorsementsValid = validateEndorsements(
            brandFormValues.endorsements,
            form.setError
        );

        if (isEndorsementsValid === null) {
            return;
        }

        console.log("\n\n\n\nRequest Body:", brandFormValues);

        try {
            setIsSubmitting(true);
            if (id) {
                const response = await BrandService.editBrand(
                    id,
                    brandFormValues
                );
                if (response.status === HTTP_STATUS_CODES.OK) {
                    toast.success("Brand updated successfully");
                }
                return;
            }
            const response = await BrandService.createBrand(brandFormValues);
            if (response.status === HTTP_STATUS_CODES.OK) {
                toast.success("Brand created successfully");
                form.reset();
            }
        } catch (error) {
            const unknownError = ErrorService.handleCommonErrors(
                error,
                logout,
                navigate
            );
            if (unknownError.response.status === HTTP_STATUS_CODES.CONFLICT) {
                const endorsements = form.getValues("endorsements");
                endorsements?.map((endorse, index) => {
                    if (endorse.name === unknownError.response.data.key) {
                        form.setError(
                            `endorsements.${index}.name`,
                            { message: "This endorsement already exists" },
                            { shouldFocus: true }
                        );
                    }
                });
                toast.error("An endorsement already exists");
            } else {
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
                                navigate(NAVIGATION_ROUTES.BRAND_LIST, {
                                    replace: true
                                })
                            }
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Button>
                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                            {id ? "Edit" : "Create"} Brand
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
                                    navigate(NAVIGATION_ROUTES.BRAND_LIST, {
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
                                <span>Save Brand</span>
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
                                <CardWrapper title="Brand Details">
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="name"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="Brand Name">
                                                        <Input
                                                            {...field}
                                                            placeholder="Brand name"
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
                                                        <div className="flex w-full items-center gap-3">
                                                            <SelectBox
                                                                options={
                                                                    metadataStore?.tagline
                                                                }
                                                                value={
                                                                    field.value
                                                                }
                                                                onChange={
                                                                    field.onChange
                                                                }
                                                                className="w-full"
                                                                placeholder="Select a tagline"
                                                                inputPlaceholder="Search for a tagline..."
                                                                emptyPlaceholder="No tagline found"
                                                                multiple
                                                            />
                                                            <InputDrawer
                                                                title="Tagline"
                                                                description="Create a new tagline to add to the dropdown"
                                                                register="taglineName"
                                                                schema={
                                                                    taglineFormSchema
                                                                }
                                                                createFn={
                                                                    MetadataService.createTagline
                                                                }
                                                                fetchMetadataFn={
                                                                    fetchMetadata
                                                                }
                                                            >
                                                                <PlusCircle className="size-5 cursor-pointer text-green-500" />
                                                            </InputDrawer>
                                                        </div>
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
                                                name="agencyId"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="Agency">
                                                        <div className="flex w-full items-center gap-3">
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
                                                                className="w-full"
                                                                placeholder="Select a agency"
                                                                inputPlaceholder="Search for agencys..."
                                                                emptyPlaceholder="No agency found"
                                                            />
                                                            <InputDrawer
                                                                title="Agency"
                                                                description="Create a new agency to add to the dropdown"
                                                                register="agencyName"
                                                                schema={
                                                                    agencyFormSchema
                                                                }
                                                                createFn={
                                                                    MetadataService.createAgency
                                                                }
                                                                fetchMetadataFn={
                                                                    fetchMetadata
                                                                }
                                                            >
                                                                <PlusCircle className="size-5 cursor-pointer text-green-500" />
                                                            </InputDrawer>
                                                        </div>
                                                    </FormItemWrapper>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="parentOrgId"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="Parent Organization">
                                                        <div className="flex w-full items-center gap-3">
                                                            <SelectBox
                                                                options={
                                                                    metadataStore?.parentOrg
                                                                }
                                                                value={
                                                                    field.value
                                                                }
                                                                onChange={
                                                                    field.onChange
                                                                }
                                                                className="w-full"
                                                                placeholder="Select a organization"
                                                                inputPlaceholder="Search for organizations..."
                                                                emptyPlaceholder="No organization found"
                                                            />
                                                            <InputDrawer
                                                                title="Parent Organization"
                                                                description="Create a new parent organization to add to the dropdown"
                                                                register="parentOrgName"
                                                                schema={
                                                                    parentOrgFormSchema
                                                                }
                                                                createFn={
                                                                    MetadataService.createParentOrg
                                                                }
                                                                fetchMetadataFn={
                                                                    fetchMetadata
                                                                }
                                                            >
                                                                <PlusCircle className="size-5 cursor-pointer text-green-500" />
                                                            </InputDrawer>
                                                        </div>
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
                                                        <div className="flex w-full items-center gap-3">
                                                            <SelectBox
                                                                options={
                                                                    metadataStore?.activeCampaign
                                                                }
                                                                value={
                                                                    field.value
                                                                }
                                                                onChange={
                                                                    field.onChange
                                                                }
                                                                className="w-full"
                                                                placeholder="Select a campaign"
                                                                inputPlaceholder="Search for campaigns..."
                                                                emptyPlaceholder="No campaign found"
                                                                multiple
                                                            />
                                                            <InputDrawer
                                                                title="Active Campaign"
                                                                description="Create a new active campaign to add to the dropdown"
                                                                register="activeCampaignName"
                                                                schema={
                                                                    activeCampaignFormSchema
                                                                }
                                                                createFn={
                                                                    MetadataService.createActiveCampaign
                                                                }
                                                                fetchMetadataFn={
                                                                    fetchMetadata
                                                                }
                                                            >
                                                                <PlusCircle className="size-5 cursor-pointer text-green-500" />
                                                            </InputDrawer>
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
                                    title="Brand Attributes"
                                    displayFields={brandAttributes}
                                />

                                <VerticalFieldsCard
                                    control={form.control}
                                    title="Target Audience"
                                    displayFields={targetAudience}
                                />
                            </div>
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-3">
                                <ContactPersonCard control={form.control} />
                                <EndorsementCard control={form.control} />
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
                            <span>Save Brand</span>
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
                                navigate(NAVIGATION_ROUTES.BRAND_LIST, {
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

export default BrandForm;
