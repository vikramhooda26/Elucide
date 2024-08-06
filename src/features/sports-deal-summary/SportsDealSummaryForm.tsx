import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
import { getListOfYears } from "../utils/helpers";
import { getMetadata } from "../utils/metadataUtils";
import {
    SPORTS_DEAL_SUMMARY_KEYS,
    sportsDealSummaryFormSchema,
    TSportsDealSummaryFormSchema,
} from "./constants/metadata";

function SportsDealSummaryForm() {
    const [_isLoading, setIsLoading] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [metadataStore, setMetadataStore] = useRecoilState(metadataStoreAtom);
    const user = useRecoilValue(userAtom);

    const { logout } = useAuth();
    const navigate = useNavigate();

    const form = useForm<TSportsDealSummaryFormSchema>({
        resolver: zodResolver(sportsDealSummaryFormSchema),
        defaultValues: {
            userId: user?.id,
            partnerType: "Team",
        },
    });

    const status = [
        { value: "Active", label: "Active" },
        { value: "Expired", label: "Expired" },
    ];

    const type = [
        { value: "Sponsorship", label: "Sponsorship" },
        { value: "Endorsement", label: "Endorsement" },
        { value: "Media Buy", label: "Media Buy" },
        { value: "Other", label: "Other" },
    ];

    const partnerTypeValue = useWatch({
        control: form.control,
        name: "partnerType",
    });

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                setIsLoading(true);
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

    const sportsDealSummaryAttributes: {
        title: string;
        register: Extract<
            keyof TSportsDealSummaryFormSchema,
            "assetIds" | "territoryId" | "levelId" | "statusId" | "typeId"
        >;
        options: any;
        multiple: boolean;
        type: "DROPDOWN";
    }[] = [
        {
            title: "Type",
            register: "typeId",
            options: type,
            multiple: false,
            type: "DROPDOWN",
        },
        {
            title: "Level",
            register: "levelId",
            options: metadataStore.sportsDealSummaryLevel,
            multiple: false,
            type: "DROPDOWN",
        },
        {
            title: "Status",
            register: "statusId",
            options: status,
            multiple: false,
            type: "DROPDOWN",
        },
        {
            title: "Asset",
            register: "assetIds",
            options: metadataStore.asset,
            multiple: true,
            type: "DROPDOWN",
        },
        {
            title: "Territory",
            register: "territoryId",
            options: metadataStore.sportsDealSummaryTerritory,
            multiple: false,
            type: "DROPDOWN",
        },
    ];

    const partnerType = [
        { value: "Team", label: "Team" },
        { value: "Athlete", label: "Athlete" },
        { value: "League", label: "League" },
    ];

    const getStakeholderTitle = () => {
        return partnerTypeValue === "Team"
            ? "Team"
            : partnerTypeValue === "League"
            ? "League"
            : "Athlete";
    };

    const onSubmit = async (
        sportsDealSummaryFormValues: TSportsDealSummaryFormSchema
    ) => {
        console.log("\n\n\n\nRequest Body:", sportsDealSummaryFormValues);

        try {
            setIsSubmitting(true);
            const response = await MetadataService.createSportsDealSummary(
                sportsDealSummaryFormValues
            );
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
                                        replace: true,
                                    }
                                )
                            }
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Button>
                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                            Create Deal
                        </h1>

                        <div className="hidden items-center gap-2 md:ml-auto md:flex">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={isSubmitting}
                                onClick={() =>
                                    navigate(
                                        NAVIGATION_ROUTES.SPORTS_DEAL_SUMMARY_LIST,
                                        {
                                            replace: true,
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
                                disabled={isSubmitting}
                            >
                                <span>Save Deal</span>
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
                                        <div className="grid gap-3 grid-cols-2">
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
                                                                onChange={
                                                                    field.onChange
                                                                }
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
                                                    name={
                                                        form.getValues(
                                                            "partnerType"
                                                        ) === "Team"
                                                            ? "teamId"
                                                            : form.getValues(
                                                                  "partnerType"
                                                              ) === "League"
                                                            ? "leagueId"
                                                            : "athleteId"
                                                    }
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
                                                                    options={
                                                                        form.getValues(
                                                                            "partnerType"
                                                                        ) ===
                                                                        "Team"
                                                                            ? metadataStore.team
                                                                            : form.getValues(
                                                                                  "partnerType"
                                                                              ) ===
                                                                              "League"
                                                                            ? metadataStore.league
                                                                            : metadataStore.athlete
                                                                    }
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
                                <div className="grid gap-6  ">
                                    <div className="grid gap-3 grid-cols-2">
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
                                                name="expirationDate"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="Expiration Year">
                                                        <SelectBox
                                                            options={getListOfYears(
                                                                true
                                                            )}
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
                                    </div>
                                    <div className="grid gap-3 grid-cols-2">
                                        <div className="grid gap-3">
                                            <FormField
                                                control={form.control}
                                                name="annualValue"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="Annual Value (in cr)">
                                                        <Input
                                                            {...field}
                                                            type="number"
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
                                                            type="number"
                                                        />
                                                    </FormItemWrapper>
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid gap-3 grid-cols-2">
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
                                                            type="number"
                                                        />
                                                    </FormItemWrapper>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardWrapper>
                        </div>
                        <div className="grid auto-rows-max items-start gap-4 ">
                            <VerticalFieldsCard
                                control={form.control}
                                title="Deal attributes"
                                displayFields={sportsDealSummaryAttributes}
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
                            <span>Save Deal</span>
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
                                navigate(
                                    NAVIGATION_ROUTES.SPORTS_DEAL_SUMMARY_LIST,
                                    {
                                        replace: true,
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
