import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { toast } from "sonner";
import { FormSkeleton } from "../../../components/core/form/form-skeleton";
import { FormItemWrapper } from "../../../components/form/item-wrapper";
import { FormField } from "../../../components/ui/form";
import SelectBox from "../../../components/ui/multi-select";
import { RangeSlider } from "../../../components/ui/RangeSlider";
import { HTTP_STATUS_CODES } from "../../../lib/constants";
import { cn } from "../../../lib/utils";
import ErrorService from "../../../services/error/ErrorService";
import MetadataService from "../../../services/features/MetadataService";
import { userAtom } from "../../../store/atoms/user";
import { useAuth } from "../../auth/auth-provider/AuthProvider";
import { SingleInputForm } from "../SingleInputForm";
import { getConvertedAgeRange } from "./constants/helpers";
import { ageRangeFormSchema, TAgeRangeFormSchema } from "./constants/metadata";
import { printLogs } from "../../../lib/logs";

function AgeForm() {
    const { logout } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { id } = useParams();

    const user = useRecoilValue(userAtom);

    const navigate = useNavigate();

    const form = useForm<TAgeRangeFormSchema>({
        resolver: zodResolver(ageRangeFormSchema),
        defaultValues: {
            userId: user?.id,
            ageType: id ? undefined : "Range"
        }
    });

    const ageType = [
        { value: "Range", label: "Range" },
        { value: "Max", label: "Max" }
    ];

    const convertRangeToArray = (ageRange: string) => {
        if (ageRange.includes("-")) {
            return ageRange.split("-").map((v) => Number(v));
        } else {
            return ageRange
                .split("+")
                .slice(0, 1)
                .map((v) => Number(v));
        }
    };

    const getAgeRangeType = (ageRange: string) => {
        if (ageRange.includes("-")) {
            return "Range";
        } else {
            return "Max";
        }
    };

    useEffect(() => {
        const fetchAgeDetails = async (id: string) => {
            try {
                setIsLoading(true);
                const response = await MetadataService.getOneAgeRange(id);
                if (response.status === HTTP_STATUS_CODES.OK) {
                    form.reset({
                        ageRange: convertRangeToArray(response.data.ageRange),
                        ageType: getAgeRangeType(response.data.ageRange)
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
                    toast.error("This age range does not exists");
                    navigate(-1);
                } else {
                    toast.error("An unknown error occurred");
                }
            } finally {
                setIsLoading(false);
            }
        };
        if (id) {
            fetchAgeDetails(id);
        }
    }, [id]);

    const ageTypeValue = useWatch({ control: form.control, name: "ageType" });

    printLogs("ageTypeValue:", ageTypeValue);

    const onSubmit = async (ageRangeFormValues: TAgeRangeFormSchema) => {
        try {
            setIsSubmitting(true);

            console.log(ageRangeFormValues.ageRange);

            const convertedAgeRange =
                ageTypeValue === "Range"
                    ? getConvertedAgeRange(ageRangeFormValues.ageRange)
                    : ageRangeFormValues.ageRange.length === 1
                      ? `${ageRangeFormValues.ageRange}+`
                      : null;

            if (convertedAgeRange === null) {
                toast.error("Invalid range. Contact developer");
                form.setError(
                    "ageRange",
                    { message: "Invalid age range" },
                    { shouldFocus: true }
                );
                return;
            }

            const requestBody = {
                ...ageRangeFormValues,
                ageRange: convertedAgeRange,
                userId: user?.id
            };

            if (id) {
                const response = await MetadataService.editAgeRange(
                    id,
                    requestBody
                );

                if (response.status === HTTP_STATUS_CODES.OK) {
                    toast.success("Age range updated successfully");
                }
                return;
            }

            const response = await MetadataService.createAgeRange(requestBody);

            if (response.status === HTTP_STATUS_CODES.OK) {
                toast.success("Age range created successfully");
                form.reset({
                    ageRange: [0, 100]
                });
            }
        } catch (error) {
            console.error(error);
            const unknownError = ErrorService.handleCommonErrors(
                error,
                logout,
                navigate
            );
            if (unknownError.response.status === HTTP_STATUS_CODES.CONFLICT) {
                toast.info("This age range already exists");
                form.setError(
                    "ageRange",
                    { message: "This age range already exists" },
                    { shouldFocus: true }
                );
                return;
            }

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

    return (
        <SingleInputForm
            onSubmit={onSubmit}
            form={form}
            title="Age"
            isSubmitting={isSubmitting || isLoading}
            isEdit={Boolean(id)}
        >
            <div className="grid gap-6">
                {isLoading ? (
                    <FormSkeleton />
                ) : (
                    <>
                        <FormField
                            control={form.control}
                            name="ageRange"
                            render={({ field }) => (
                                <FormItemWrapper label="Age Range">
                                    <RangeSlider
                                        minStepsBetweenThumbs={1}
                                        min={0}
                                        max={100}
                                        step={1}
                                        onValueChange={field.onChange}
                                        className={cn("w-full")}
                                        isSingle={ageTypeValue === "Max"}
                                        value={
                                            Boolean(id)
                                                ? field.value
                                                : undefined
                                        }
                                    />
                                </FormItemWrapper>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="ageType"
                            render={({ field }) => (
                                <FormItemWrapper label="Age Range Type">
                                    <SelectBox
                                        options={ageType}
                                        value={field.value}
                                        onChange={(selected) => {
                                            if (ageTypeValue === "Range") {
                                                form.setValue("ageRange", [0]);
                                            } else {
                                                form.setValue(
                                                    "ageRange",
                                                    [0, 100]
                                                );
                                            }
                                            field.onChange(selected);
                                        }}
                                        placeholder="Select a type"
                                        inputPlaceholder="Search for a type..."
                                        emptyPlaceholder="No type found"
                                    />
                                </FormItemWrapper>
                            )}
                        />
                    </>
                )}
            </div>
        </SingleInputForm>
    );
}

export default AgeForm;
