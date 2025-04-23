import { PlusCircle, Trash2 } from "lucide-react";
import { ArrayPath, Control, FieldValues, Path, useFieldArray } from "react-hook-form";
import { CardWrapper } from "../../card/card-wrapper";
import { FormItemWrapper } from "../../form/item-wrapper";
import { TableHeaderWrapper } from "../../table/table-header-wrapper";
import { Button } from "../../ui/button";
import { CardFooter } from "../../ui/card";
import { Checkbox } from "../../ui/checkbox";
import { FormField } from "../../ui/form";
import { Input } from "../../ui/input";
import { TableCell, TableRow } from "../../ui/table";

const initialValue = {
  name: "",
  active: true
};

type TDisplayFields<T> = {
  register: Path<T>;
  type: "INPUT" | "CHECKBOX";
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

export const EndorsementCard = <T extends FieldValues>({ control }: TVerticalFieldsCardProps<T>): JSX.Element => {
  const fieldArray = useFieldArray<T>({
    control,
    name: "endorsements" as ArrayPath<T>
  });

  const endorsementDetails = (index: number): Array<TDisplayFields<T>> => [
    {
      title: "Name",
      register: `endorsements.${index}.name` as Path<T>,
      type: "INPUT",
      input: { type: "text" },
      placeholder: "Endorsement Name"
    },
    {
      title: "Active",
      register: `endorsements.${index}.active` as Path<T>,
      type: "CHECKBOX"
    }
  ];

  return (
    <CardWrapper title="Endorsement Details">
      <div className="grid gap-6">
        {fieldArray.fields.map((field, index) => (
          <CardWrapper title={`Endorsement - ${index + 1}`}>
            <TableHeaderWrapper
              headersArray={[{ header: "Name" }, { header: "Active" }, { header: "Actions" }]}
              key={field.id}
            >
              <TableRow>
                {endorsementDetails(index).map((fieldDetails, index) => (
                  <TableCell>
                    <FormField
                      key={fieldDetails.register}
                      control={control}
                      name={fieldDetails.register}
                      render={({ field }) => (
                        <FormItemWrapper>
                          <>
                            {fieldDetails.type === "CHECKBOX" && (
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="aria-checked:!border-green-600 aria-checked:!bg-green-600"
                              />
                            )}
                            {fieldDetails.type === "INPUT" && (
                              <Input
                                {...field}
                                type={fieldDetails.input?.type}
                                placeholder={fieldDetails.placeholder}
                              />
                            )}
                          </>
                        </FormItemWrapper>
                      )}
                    />
                  </TableCell>
                ))}
                <TableCell className="font-semibold">
                  {fieldArray.fields.length > 0 && (
                    <Button
                      onClick={() => fieldArray.remove(index)}
                      size="sm"
                      className="h-7 gap-1 text-white"
                      variant="destructive"
                      type="button"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            </TableHeaderWrapper>
          </CardWrapper>
        ))}
      </div>

      <CardFooter>
        <div className="mt-4 flex w-full items-end justify-end">
          <Button
            onClick={() => fieldArray.append(initialValue as T["endorsements"][number])}
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
