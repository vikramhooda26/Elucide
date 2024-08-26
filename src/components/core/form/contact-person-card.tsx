import { MinusCircle, PlusCircle } from "lucide-react";
import {
    ArrayPath,
    Control,
    FieldValues,
    Path,
    useFieldArray
} from "react-hook-form";
import { cn } from "../../../lib/utils";
import { CardWrapper } from "../../card/card-wrapper";
import { FormItemWrapper } from "../../form/item-wrapper";
import { PhoneInput } from "../../phone-input";
import { Button } from "../../ui/button";
import { CardFooter } from "../../ui/card";
import { FormField } from "../../ui/form";
import { Input } from "../../ui/input";
import SelectBox from "../../ui/multi-select";

const initialValue = {
    contactName: "",
    contactDesignation: "",
    contactEmail: "",
    contactNumber: "",
    contactLinkedin: ""
};

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
    control: Control<T>;
};

const ContactPersonCard = <T extends FieldValues>({
    control
}: TVerticalFieldsCardProps<T>): JSX.Element => {
    const fieldArray = useFieldArray<T>({
        control,
        name: "contactPerson" as ArrayPath<T>
    });

    const contactDetails = (index: number): Array<TDisplayFields<T>> => [
        {
            title: "Contact Name",
            register: `contactPerson.${index}.contactName` as Path<T>,
            type: "INPUT",
            input: { type: "text" },
            placeholder: "Contact name"
        },
        {
            title: "Contact Designation",
            register: `contactPerson.${index}.contactDesignation` as Path<T>,
            type: "INPUT",
            input: { type: "text" },
            placeholder: "Contact designation"
        },
        {
            title: "Contact Number",
            register: `contactPerson.${index}.contactNumber` as Path<T>,
            type: "PHONE",
            input: { type: "number" },
            placeholder: "Contact number"
        },
        {
            title: "Contact Linkedin",
            register: `contactPerson.${index}.contactLinkedin` as Path<T>,
            type: "INPUT",
            input: { type: "text" },
            placeholder: "Contact linkedin"
        },
        {
            title: "Contact Email",
            register: `contactPerson.${index}.contactEmail` as Path<T>,
            type: "INPUT",
            input: { type: "email" },
            placeholder: "Contact email"
        }
    ];

    return (
        <CardWrapper title="Contact Person Details">
            <div className="grid gap-6">
                {fieldArray.fields.map((field, index) => (
                    <CardWrapper title={`Contact Person - ${index + 1}`}>
                        <div
                            className={cn(
                                "grid auto-rows-max items-start gap-3 lg:grid-cols-2"
                            )}
                            key={field.id}
                        >
                            {contactDetails(index).map((fieldDetails) => (
                                <FormField
                                    key={fieldDetails.register}
                                    control={control}
                                    name={fieldDetails.register}
                                    render={({ field }) => (
                                        <FormItemWrapper
                                            label={fieldDetails.title}
                                        >
                                            <>
                                                {fieldDetails.type ===
                                                    "DROPDOWN" && (
                                                    <SelectBox
                                                        options={
                                                            fieldDetails.options ||
                                                            []
                                                        }
                                                        value={field.value}
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        placeholder={`Select ${fieldDetails.title?.toLowerCase()}`}
                                                        inputPlaceholder={`Search for ${fieldDetails.title?.toLowerCase()}...`}
                                                        emptyPlaceholder={`No ${fieldDetails.title?.toLowerCase()} found`}
                                                        multiple={
                                                            fieldDetails.multiple
                                                        }
                                                    />
                                                )}
                                                {fieldDetails.type ===
                                                    "INPUT" && (
                                                    <Input
                                                        {...field}
                                                        type={
                                                            fieldDetails.input
                                                                ?.type
                                                        }
                                                        placeholder={
                                                            fieldDetails.placeholder
                                                        }
                                                    />
                                                )}
                                                {fieldDetails.type ===
                                                    "PHONE" && (
                                                    <PhoneInput
                                                        {...field}
                                                        defaultCountry="IN"
                                                    />
                                                )}
                                            </>
                                        </FormItemWrapper>
                                    )}
                                />
                            ))}
                            {fieldArray.fields.length > 0 && (
                                <div className="mt-4 flex items-end justify-end">
                                    <Button
                                        onClick={() => fieldArray.remove(index)}
                                        size="sm"
                                        className="h-7 gap-1"
                                        variant="destructive"
                                        type="button"
                                    >
                                        <MinusCircle className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                            Remove
                                        </span>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardWrapper>
                ))}
            </div>

            <CardFooter>
                <div className="mt-4 flex w-full items-end justify-end">
                    <Button
                        onClick={() =>
                            fieldArray.append(
                                initialValue as T["contactPerson"][number]
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
            </CardFooter>
        </CardWrapper>
    );
};

export default ContactPersonCard;
