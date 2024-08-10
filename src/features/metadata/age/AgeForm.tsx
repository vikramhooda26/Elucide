import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { toast } from "sonner";
import { FormItemWrapper } from "../../../components/form/item-wrapper";
import { FormField } from "../../../components/ui/form";
import { RangeSlider } from "../../../components/ui/RangeSlider";
import { HTTP_STATUS_CODES } from "../../../lib/constants";
import ErrorService from "../../../services/error/ErrorService";
import MetadataService from "../../../services/features/MetadataService";
import { userAtom } from "../../../store/atoms/user";
import { useAuth } from "../../auth/auth-provider/AuthProvider";
import { SingleInputForm } from "../SingleInputForm";
import { ageRangeFormSchema, TAgeRangeFormSchema } from "./constants/metadata";
import { cn } from "../../../lib/utils";
import { getConvertedAgeRange } from "./constants/helpers";
import SelectBox from "../../../components/ui/multi-select";
import { SingleSlider } from "../../../components/ui/SingleSlider";

function AgeForm() {
    const { logout } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const user = useRecoilValue(userAtom);

    const navigate = useNavigate();

    const form = useForm<TAgeRangeFormSchema>({
        resolver: zodResolver(ageRangeFormSchema),
        defaultValues: {
            userId: user?.id,
            ageType: "Range",
        },
    });

    const ageType = [
        { value: "Range", label: "Range" },
        { value: "Max", label: "Max" },
    ];

    const ageTypeValue = useWatch({ control: form.control, name: "ageType" });

    const onSubmit = async (ageRangeFormValues: TAgeRangeFormSchema) => {
        try {
            setIsSubmitting(true);

            console.log(ageRangeFormValues.ageRange);
            return;

            const convertedAgeRange = getConvertedAgeRange(
                ageRangeFormValues.ageRange
            );

            if (convertedAgeRange === null) {
                toast.error("Invalid range. Contact developer");
                form.setError(
                    "ageRange",
                    { message: "Invalid age range" },
                    { shouldFocus: true }
                );
                return;
            }

            const response = await MetadataService.createAgeRange({
                ...ageRangeFormValues,
                ageRange: convertedAgeRange,
            });

            if (response.status === HTTP_STATUS_CODES.OK) {
                toast.success("Age range created successfully");
                form.reset({
                    ageRange: [18, 25],
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
            isSubmitting={isSubmitting}
        >
            <div className="grid gap-6">
                <FormField
                    control={form.control}
                    name="ageRange"
                    render={({ field }) => (
                        <FormItemWrapper label="Age Range">
                            <div>
                                {ageTypeValue === "Range" ? (
                                    <RangeSlider
                                        minStepsBetweenThumbs={1}
                                        max={100}
                                        min={1}
                                        step={1}
                                        onValueChange={field.onChange}
                                        className={cn("w-full")}
                                    />
                                ) : (
                                    <SingleSlider
                                        onValueChange={field.onChange}
                                    />
                                )}
                            </div>
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
                                onChange={field.onChange}
                                placeholder="Select a type"
                                inputPlaceholder="Search for a type..."
                                emptyPlaceholder="No type found"
                            />
                        </FormItemWrapper>
                    )}
                />
            </div>
        </SingleInputForm>
    );
}

export default AgeForm;
