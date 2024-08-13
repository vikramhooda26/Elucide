import { MinusCircle, PlusCircle } from "lucide-react";
import {
    ArrayPath,
    Control,
    FieldValues,
    Path,
    useFieldArray,
} from "react-hook-form";
import { cn } from "../../../lib/utils";
import { CardWrapper } from "../../card/card-wrapper";
import { FormItemWrapper } from "../../form/item-wrapper";
import { Button } from "../../ui/button";
import { CardFooter } from "../../ui/card";
import { FormField } from "../../ui/form";
import { Input } from "../../ui/input";
import SelectBox, { Option } from "../../ui/multi-select";

const initialValue = {
    associationLevelId: "",
    costOfAssociation: "",
    brands: [],
};

// interface Brands extends Option {}

type TDisplayFields<T> = {
    register: Path<T>;
    type: "INPUT";
    input?: {
        type: string;
    };
    placeholder?: string;
    title?: string;
};

type TVerticalFieldsCardProps<T extends FieldValues> = {
    control: Control<T>;
    metadataStore: any;
};

const AssociationCard = <T extends FieldValues>({
    control,
    metadataStore,
}: TVerticalFieldsCardProps<T>): JSX.Element => {
    const fieldArray = useFieldArray<T>({
        control,
        name: "association" as ArrayPath<T>,
    });

    const associationDetails = (index: number): Array<TDisplayFields<T>> => [
        {
            title: "Association Level ID",
            register: `association.${index}.associationLevelId` as Path<T>,
            type: "INPUT",
            input: { type: "text" },
            placeholder: "Association level ID",
        },
        {
            title: "Cost of Association",
            register: `association.${index}.costOfAssociation` as Path<T>,
            type: "INPUT",
            input: { type: "text" },
            placeholder: "Cost of association",
        },
    ];

    return (
        <CardWrapper title="Association Details">
            <div className="grid gap-6">
                {fieldArray.fields.map((field, index) => (
                    <CardWrapper title={`Association ${index + 1}`} key={field.id}>
                        <div
                            className={cn(
                                "grid gap-3 auto-rows-max items-start lg:grid-cols-2"
                            )}
                        >
                            {associationDetails(index).map((fieldDetails) => (
                                <FormField
                                    key={fieldDetails.register}
                                    control={control}
                                    name={fieldDetails.register}
                                    render={({ field }) => (
                                        <FormItemWrapper
                                            label={fieldDetails.title}
                                        >
                                            <Input
                                                {...field}
                                                type={fieldDetails.input?.type}
                                                placeholder={fieldDetails.placeholder}
                                            />
                                        </FormItemWrapper>
                                    )}
                                />
                            ))}

                            <BrandsFieldArray
                                control={control}
                                index={index}
                                metadataStore={metadataStore}
                            />

                            {fieldArray.fields.length > 0 && (
                                <div className="flex items-end justify-end mt-4">
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
                <div className="flex items-end w-full justify-end mt-4">
                    <Button
                        onClick={() =>
                            fieldArray.append(
                                initialValue as T["association"][number]
                            )
                        }
                        size="sm"
                        className="h-7 gap-1"
                        type="button"
                    >
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Add Association
                        </span>
                    </Button>
                </div>
            </CardFooter>
        </CardWrapper>
    );
};

type TBrandsFieldArrayProps<T extends FieldValues> = {
    control: Control<T>;
    index: number;
    metadataStore: any;
};

const BrandsFieldArray = <T extends FieldValues>({
    control,
    index,
    metadataStore,
}: TBrandsFieldArrayProps<T>): JSX.Element => {
    // const brandFieldArray = useFieldArray<T>({
    //     control,
    //     name: `association.${index}.brands` as ArrayPath<T>,
    // });

    return (
        <FormField
            control={control}
            name={`association.${index}.brands` as Path<T>}
            render={({ field }) => (
                <FormItemWrapper label="Select Brands">
                    <SelectBox
                        options={metadataStore?.tagline}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Select a brand"
                        inputPlaceholder="Search for a brand..."
                        emptyPlaceholder="No brand found"
                        multiple
                    />
                </FormItemWrapper>
            )}
        />
    );
};

export default AssociationCard;
