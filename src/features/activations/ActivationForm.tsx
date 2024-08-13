import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
} from "./constants/metadata";

function ActivationForm() {
    const [_isLoading, setIsLoading] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [metadataStore, setMetadataStore] = useRecoilState(metadataStoreAtom);
    const user = useRecoilValue(userAtom);
    // const { id } = useParams();

    const { logout } = useAuth();
    const navigate = useNavigate();

    const form = useForm<TActivationFormSchema>({
        resolver: zodResolver(activationFormSchema),
        defaultValues: {
            userId: user?.id,
            partnerType: "Team",
        },
    });

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                setIsLoading(true);
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
                setIsLoading(false);
            }
        };

        fetchMetadata();
    }, []);

    // useEffect(() => {
    //     const fetchActivationDetails = async (id: string) => {
    //         const response = await MetadataService.getOneActivation(id);
    //     };
    //     if (id) {
    //         fetchActivationDetails(id);
    //     }
    // }, [id]);

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
        name: "partnerType",
    });

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

    const onSubmit = async (activationFormValues: TActivationFormSchema) => {
        console.log("\n\n\n\nRequest Body:", activationFormValues);

        try {
            setIsSubmitting(true);
            const response = await MetadataService.createActivation(
                activationFormValues
            );
            if (response.status === HTTP_STATUS_CODES.OK) {
                toast.success("Activation summary created successfully");
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
                                navigate(NAVIGATION_ROUTES.ACTIVATION_LIST, {
                                    replace: true,
                                })
                            }
                        >
                            <ChevronLeft className="h-4 w-4" />
                            <span className="sr-only">Back</span>
                        </Button>
                        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                            Create Activation
                        </h1>

                        <div className="hidden items-center gap-2 md:ml-auto md:flex">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={isSubmitting}
                                onClick={() =>
                                    navigate(
                                        NAVIGATION_ROUTES.ACTIVATION_LIST,
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
                                <span>Save Activation</span>
                                {isSubmitting && (
                                    <ClipLoader
                                        size={15}
                                        color="#020817"
                                    />
                                )}
                            </Button>
                        </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:gap-8">
                        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2">
                            <CardWrapper title="Activation Details">
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name="activationName"
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
                                    <div className="grid gap-3 grid-cols-3">
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
                                                            value={field.value}
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
                                                name="year"
                                                render={({ field }) => (
                                                    <FormItemWrapper label="Year">
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
                                    </div>
                                </div>
                            </CardWrapper>
                        </div>
                    </div>

                    <div className="flex items-center justify-center flex-col gap-3 md:hidden mt-3">
                        <Button
                            type="submit"
                            size="sm"
                            className="w-full py-5 gap-1"
                            disabled={isSubmitting}
                        >
                            <span>Save Activation</span>
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
                                navigate(NAVIGATION_ROUTES.ACTIVATION_LIST, {
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

export default ActivationForm;
