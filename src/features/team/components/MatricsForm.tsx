import { Trash2 } from "lucide-react";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import { DatePicker } from "../../../components/date/DatePicker";
import ReactSelect from "../../../components/selector/ReactSelect";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { TableCell, TableRow } from "../../../components/ui/table";
import { MetricType } from "../../../types/team/TeamFormTypes";
import { TTeamFormSchema } from "../constants/metadata";
import SelectBox from "../../../components/ui/multi-select";
import { FormField } from "../../../components/ui/form";
import { FormItemWrapper } from "../../../components/form/item-wrapper";
import { getListOfYears } from "../../utils/helpers";
import { Options } from "react-select";

type TViewershipMetric =
    | {
          viewership: string;
          year: string;
          viewershipType: "OTT" | "BROADCAST";
      }
    | { viewership: string; year: string; viewershipType: string };

type reachMetrics = {
    reach: string;
    year: string;
};

interface MetricFormProps {
    metric: MetricType;
    onChange: (metric: TViewershipMetric[] | reachMetrics[]) => void;
    onRemove?: () => void;
    register: UseFormRegister<any>;
    index: number;
    control: Control<TTeamFormSchema, any>;
}

const MatricsForm: React.FC<MetricFormProps> = ({
    metric,
    onChange,
    onRemove,
    register,
    index,
    control,
}) => {
    return (
        <TableRow>
            <TableCell className="font-semibold">
                <FormField
                    control={control}
                    name="viewershipMetrics"
                    render={({ field }) => (
                        <FormItemWrapper>
                            <SelectBox
                                options={getListOfYears()}
                                value={field.value?.map((v) => v.year)}
                                onChange={field.onChange}
                                placeholder="Select a year"
                                inputPlaceholder="Search for a year..."
                                emptyPlaceholder="No year found"
                            />
                        </FormItemWrapper>
                    )}
                />
            </TableCell>
            <TableCell className="font-semibold">
                <FormField
                    control={control}
                    name="viewershipMetrics"
                    render={({ field }) => (
                        <FormItemWrapper>
                            <Input
                                value={field.value?.map((v) => v.viewership)}
                                onChange={field.onChange}
                            />
                        </FormItemWrapper>
                    )}
                />
            </TableCell>
            <TableCell className="font-semibold">
                <div className="grid gap-3">
                    <FormField
                        control={control}
                        name="viewershipMetrics"
                        render={({ field }) => (
                            <FormItemWrapper>
                                <SelectBox
                                    //@ts-ignore
                                    options={field.value!.map(
                                        (v) => v.viewershipType
                                    )}
                                    value={field.value?.map(
                                        (v) => v.viewershipType
                                    )}
                                    onChange={field.onChange}
                                    placeholder="Select a type"
                                    inputPlaceholder="Search for a type..."
                                    emptyPlaceholder="No type found"
                                />
                            </FormItemWrapper>
                        )}
                    />
                </div>
            </TableCell>
            <TableCell className="font-semibold">
                {onRemove && (
                    <Button
                        onClick={onRemove}
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
    );
};

export default MatricsForm;
