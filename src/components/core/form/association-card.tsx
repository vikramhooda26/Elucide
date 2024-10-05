import { MinusCircle, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { ArrayPath, FieldValues, Path, useFieldArray, UseFormReturn, useWatch } from "react-hook-form";
import { associationSchema } from "../../../features/metadata/association-level/constants/metadata";
import { onNumInputChange } from "../../../features/utils/helpers";
import { useUser } from "../../../hooks/useUser";
import { cn } from "../../../lib/utils";
import MetadataService from "../../../services/features/MetadataService";
import { TMetadataStore } from "../../../store/atoms/metadata";
import { CardWrapper } from "../../card/card-wrapper";
import { InputDrawer } from "../../form/input-drawer";
import { FormItemWrapper } from "../../form/item-wrapper";
import { Button } from "../../ui/button";
import { CardFooter } from "../../ui/card";
import { FormField } from "../../ui/form";
import { Input } from "../../ui/input";
import SelectBox, { Option } from "../../ui/multi-select";

const initialValue = {
    associationLevelId: "",
    costOfAssociation: "",
    brands: []
};

type TDisplayFields<T> = {
    register: Path<T>;
    type: "INPUT" | "SELECT";
    input?: {
        type: string;
    };
    placeholder?: string;
    title?: string;
    data?: Option[];
    isMultiple?: boolean;
    showAddButton?: boolean;
};

type TVerticalFieldsCardProps<T extends FieldValues> = {
    form: UseFormReturn<T>;
    metadataStore: TMetadataStore;
    showBrand?: boolean;
    fetchMetadata: () => Promise<void>;
};

const AssociationCard = <T extends FieldValues>({
    metadataStore,
    form,
    showBrand = false,
    fetchMetadata
}: TVerticalFieldsCardProps<T>): JSX.Element => {
    const fieldArray = useFieldArray<T>({
        control: form.control,
        name: "association" as ArrayPath<T>
    });

    const [filteredOptions, setFilteredOptions] = useState<Array<Option[]>>([]);

    const userRole = useUser()?.role;

    const canAccessAddButton = userRole === "SUPER_ADMIN" || userRole === "ADMIN" || userRole === "STAFF";

    const selectedAssociationLevels = useWatch({
        control: form.control,
        name: fieldArray.fields.map((_, index) => `association.${index}.associationLevelId` as Path<T>) as Path<T>[]
    });

    useEffect(() => {
        const selectedValues = selectedAssociationLevels.filter((value) => value) as string[];

        const newFilteredOptions = fieldArray.fields.map((_, index) => {
            return (
                metadataStore?.associationLevel.filter((option) => {
                    return option.value === selectedAssociationLevels[index] || !selectedValues.includes(option.value);
                }) || []
            );
        });

        setFilteredOptions(newFilteredOptions);
    }, [selectedAssociationLevels, metadataStore?.associationLevel, fieldArray.fields]);

    const associationDetails = (index: number): Array<TDisplayFields<T>> => {
        const fields: Array<TDisplayFields<T>> = [
            {
                title: "Association Level",
                register: `association.${index}.associationLevelId` as Path<T>,
                type: "SELECT",
                placeholder: "Select an association level",
                data: filteredOptions[index] || [],
                isMultiple: false,
                showAddButton: true
            },
            {
                title: "Cost of Association",
                register: `association.${index}.costOfAssociation` as Path<T>,
                type: "INPUT",
                input: { type: "text" },
                placeholder: "Cost of association"
            }
        ];

        if (showBrand) {
            fields.push({
                title: "Brand",
                register: `association.${index}.brandIds` as Path<T>,
                type: "SELECT",
                placeholder: "Select a brand",
                data: metadataStore?.brand,
                isMultiple: true
            });
        }

        return fields;
    };

    if (!metadataStore) {
        return <></>;
    }

    return (
        <CardWrapper title="Association Details">
            <div className="grid gap-6">
                {fieldArray.fields.map((field, index) => (
                    <CardWrapper title={`Association - ${index + 1}`} key={field.id}>
                        <div className={cn("grid auto-rows-max items-start gap-3 lg:grid-cols-2")}>
                            {associationDetails(index).map((fieldDetails) => (
                                <FormField
                                    key={fieldDetails.register}
                                    control={form.control}
                                    name={fieldDetails.register}
                                    render={({ field }) => (
                                        <FormItemWrapper label={fieldDetails.title}>
                                            {fieldDetails.type === "INPUT" ? (
                                                <Input
                                                    {...field}
                                                    value={field.value || ""}
                                                    onChange={(e) => {
                                                        onNumInputChange(form, e, fieldDetails.register);
                                                    }}
                                                    type={fieldDetails.input?.type}
                                                    placeholder={fieldDetails.placeholder}
                                                />
                                            ) : (
                                                <div className="flex w-full items-center gap-3">
                                                    <SelectBox
                                                        options={fieldDetails.data!}
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        placeholder={fieldDetails.placeholder}
                                                        className="w-full"
                                                        inputPlaceholder={`Search for a ${fieldDetails.title?.toLowerCase()}...`}
                                                        emptyPlaceholder={`No ${fieldDetails.title?.toLowerCase()} found`}
                                                        multiple={fieldDetails.isMultiple}
                                                    />
                                                    {/* Not working */}
                                                    {canAccessAddButton && fieldDetails.showAddButton && (
                                                        <InputDrawer
                                                            title="Association Level"
                                                            description="Create a new association level to add to the dropdown"
                                                            register="associationLevelName"
                                                            schema={associationSchema}
                                                            createFn={MetadataService.createAssociationLevel}
                                                            fetchMetadataFn={fetchMetadata}
                                                        >
                                                            <PlusCircle className="size-5 cursor-pointer text-green-500" />
                                                        </InputDrawer>
                                                    )}
                                                </div>
                                            )}
                                        </FormItemWrapper>
                                    )}
                                />
                            ))}

                            {fieldArray.fields.length > 0 && (
                                <>
                                    {!showBrand ? <div></div> : null}
                                    <div className="mt-4 flex items-end justify-end">
                                        <Button
                                            onClick={() => fieldArray.remove(index)}
                                            size="sm"
                                            className="h-7 gap-1"
                                            variant="destructive"
                                            type="button"
                                        >
                                            <MinusCircle className="h-3.5 w-3.5" />
                                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Remove</span>
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </CardWrapper>
                ))}
            </div>

            <CardFooter>
                <div className="mt-4 flex w-full items-end justify-end">
                    <Button
                        onClick={() => fieldArray.append(initialValue as T["association"][number])}
                        size="sm"
                        className="h-7 gap-1"
                        type="button"
                    >
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add</span>
                    </Button>
                </div>
            </CardFooter>
        </CardWrapper>
    );
};

export default AssociationCard;
