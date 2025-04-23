import { PlusCircle, Trash2 } from "lucide-react";
import { getListOfYears, onNumInputChange } from "../../../features/utils/helpers";
import { FormItemWrapper } from "../../form/item-wrapper";
import { TableHeaderWrapper } from "../../table/table-header-wrapper";
import { Button } from "../../ui/button";
import { FormField } from "../../ui/form";
import { Input } from "../../ui/input";
import SelectBox from "../../ui/multi-select";
import { TableCell, TableRow } from "../../ui/table";
import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";

type TMetricsCardProps = {
  fieldArray: UseFieldArrayReturn<any>;
  form: UseFormReturn<any>;
  options: any[];
  defaultValue: {
    reach: string;
    viewership: string;
    year: string;
  } & ({ ottPartnerId: string; broadcastPartnerId?: never } | { broadcastPartnerId: string; ottPartnerId?: never });
  register: string;
};

export const MetricsCard: React.FC<TMetricsCardProps> = ({ fieldArray, form, options, defaultValue, register }) => {
  return (
    <>
      <TableHeaderWrapper
        headersArray={[
          { header: "Name" },
          { header: "Year" },
          { header: "Viewership" },
          { header: "Reach" },
          { header: "Actions" }
        ]}
      >
        {fieldArray.fields.map((field, index) => (
          <TableRow key={index}>
            <TableCell>
              <FormField
                control={form.control}
                key={field.id}
                name={`${register}.${index}.${Object.keys(defaultValue)[0]}`}
                render={({ field }) => (
                  <FormItemWrapper>
                    <SelectBox
                      options={options}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select a partner"
                      inputPlaceholder="Search for a partner..."
                      emptyPlaceholder="No partner found"
                    />
                  </FormItemWrapper>
                )}
              />
            </TableCell>
            <TableCell>
              <FormField
                control={form.control}
                key={field.id}
                name={`${register}.${index}.${Object.keys(defaultValue)[1]}`}
                render={({ field }) => (
                  <FormItemWrapper>
                    <SelectBox
                      options={getListOfYears()}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select a year"
                      inputPlaceholder="Search for a year..."
                      emptyPlaceholder="No year found"
                    />
                  </FormItemWrapper>
                )}
              />
            </TableCell>
            <TableCell>
              <FormField
                control={form.control}
                key={field.id}
                name={`${register}.${index}.${Object.keys(defaultValue)[2]}`}
                render={({ field }) => (
                  <FormItemWrapper>
                    <Input
                      value={field.value}
                      onChange={(e) => {
                        onNumInputChange(form, e, `${register}.${index}.${Object.keys(defaultValue)[2]}`);
                      }}
                    />
                  </FormItemWrapper>
                )}
              />
            </TableCell>
            <TableCell>
              <FormField
                control={form.control}
                key={field.id}
                name={`${register}.${index}.${Object.keys(defaultValue)[3]}`}
                render={({ field }) => (
                  <FormItemWrapper>
                    <Input
                      value={field.value}
                      onChange={(e) => {
                        onNumInputChange(form, e, `${register}.${index}.${Object.keys(defaultValue)[3]}`);
                      }}
                    />
                  </FormItemWrapper>
                )}
              />
            </TableCell>
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
        ))}
      </TableHeaderWrapper>

      <div className="mt-4 flex justify-end">
        <Button onClick={() => fieldArray.append(defaultValue)} size="sm" className="h-7 gap-1" type="button">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add</span>
        </Button>
      </div>
    </>
  );
};
