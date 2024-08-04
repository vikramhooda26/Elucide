import { Control, FieldValues, Path } from "react-hook-form";
import { CardWrapper } from "../../card/card-wrapper";
import { FormItemWrapper } from "../../form/item-wrapper";
import { PhoneInput } from "../../phone-input";
import { FormField } from "../../ui/form";
import { Input } from "../../ui/input";
import SelectBox from "../../ui/multi-select";

type TDisplayFields<T> = {
    register: Path<T>;
    type: "DROPDOWN" | "INPUT" | "PHONE";
    options?: any[];
    multiple?: boolean;
    input?: {
        type: string;
    };
    placeholder?: string;
    title?: string;
};

type TVerticalFieldsCardProps<T extends FieldValues> = {
    title: string;
    displayFields: TDisplayFields<T>[];
    control: Control<T>;
};

export const VerticalFieldsCard = <T extends FieldValues>({
    title,
    displayFields,
    control,
}: TVerticalFieldsCardProps<T>): JSX.Element => {
    return (
        <CardWrapper title={title}>
            <div className="grid gap-6">
                {displayFields?.map((fieldDetails, index) => (
                    <div
                        className="grid gap-3"
                        key={index}
                    >
                        <FormField
                            control={control}
                            name={fieldDetails.register}
                            render={({ field }) => (
                                <FormItemWrapper label={fieldDetails.title}>
                                    <>
                                        {fieldDetails.type === "DROPDOWN" && (
                                            <SelectBox
                                                options={
                                                    fieldDetails.options || []
                                                }
                                                value={field.value}
                                                onChange={field.onChange}
                                                placeholder={`Select ${fieldDetails.title?.toLowerCase()}`}
                                                inputPlaceholder={`Search for ${fieldDetails.title?.toLowerCase()}...`}
                                                emptyPlaceholder={`No ${fieldDetails.title?.toLowerCase()} found`}
                                                multiple={fieldDetails.multiple}
                                            />
                                        )}
                                        {fieldDetails.type === "INPUT" && (
                                            <Input
                                                {...field}
                                                type={fieldDetails.input?.type}
                                                placeholder={
                                                    fieldDetails.placeholder
                                                }
                                            />
                                        )}
                                        {fieldDetails.type === "PHONE" && (
                                            <PhoneInput
                                                {...field}
                                                defaultCountry="IN"
                                            />
                                        )}
                                    </>
                                </FormItemWrapper>
                            )}
                        />
                    </div>
                ))}
            </div>
        </CardWrapper>
    );
};
