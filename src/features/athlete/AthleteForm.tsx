import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useRecoilState, useRecoilValue } from "recoil";
import { toast } from "sonner";
import { CardWrapper } from "../../components/card/card-wrapper";
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
import ErrorService from "../../services/error/ErrorService";
import AthleteService from "../../services/features/AthleteService";
import { metadataStoreAtom } from "../../store/atoms/metadata";
import { userAtom } from "../../store/atoms/user";
import { useAuth } from "../auth/auth-provider/AuthProvider";
import { getMetadata } from "../utils/metadataUtils";
import {
    ATHLETE_METADATA,
    athleteFormSchema,
    TAthleteFormSchema,
} from "./constants/metadata";

function AthleteForm() {
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
                    ATHLETE_METADATA
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

    const form = useForm<TAthleteFormSchema>({
        resolver: zodResolver(athleteFormSchema),
        defaultValues: {
            userId: user?.id,
        },
    });

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
            title: "Status",
            register: "statusId",
            options: metadataStore.athleteStatus,
            multiple: true,
            type: "DROPDOWN",
        },
    ];

    const contactDetails: {
        title: string;
        register: Extract<
            keyof TAthleteFormSchema,
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
        if (athleteFormValues?.contactNumber) {
            const phoneData = getPhoneData(athleteFormValues?.contactNumber);
            if (!phoneData.isValid) {
                form.setError("contactNumber", {
                    type: "manual",
                    message: "Invalid phone number",
                });
                return;
            }
        }

        console.log("\n\n\n\nRequest Body:", athleteFormValues);

        try {
            setIsSubmitting(true);
            const response = await AthleteService.createAthlete(
                athleteFormValues
            );
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
                                navigate(NAVIGATION_ROUTES.LEAGUE_LIST, {
                                    replace: true,
                                })
                            }
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Button>
                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                            Create Athlete
                        </h1>

                        <div className="hidden items-center gap-2 md:ml-auto md:flex">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={isSubmitting}
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
                                disabled={isSubmitting}
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
                                                            value={field.value}
                                                            onChange={
                                                                field.onChange
                                                            }
                                                            placeholder="Select a agency"
                                                            inputPlaceholder="Search for a agency..."
                                                            emptyPlaceholder="No agency found"
                                                            multiple
                                                        />
                                                    </FormItemWrapper>
                                                )}
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="genderId"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="Gender">
                                                        <SelectBox
                                                            options={
                                                                metadataStore?.gender
                                                            }
                                                            value={field.value}
                                                            onChange={
                                                                field.onChange
                                                            }
                                                            placeholder="Select a gender"
                                                            inputPlaceholder="Search for a gender..."
                                                            emptyPlaceholder="No gender found"
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
                                                            type="number"
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
                                                    <FormItemWrapper label="Secondary Market">
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
                                                name="secondarySocialMediaPlatformIds"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="Secondary Marketing Platform">
                                                        <SelectBox
                                                            options={
                                                                metadataStore?.socialMedia
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
                                title="Athlete Attributes"
                                displayFields={athleteAttributes}
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
                            disabled={isSubmitting}
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
