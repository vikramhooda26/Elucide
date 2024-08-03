import { Trash2 } from "lucide-react";
import { Control, Controller, FieldValues, UseFormRegister } from "react-hook-form";
import { DatePicker } from "../../../components/date/DatePicker";
import ReactSelect from "../../../components/selector/ReactSelect";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { TableCell, TableRow } from "../../../components/ui/table";
import { MetricType } from "../../../types/team/TeamFormTypes";

interface MetricFormProps {
    metric: MetricType;
    onChange: (metric: MetricType) => void;
    onRemove?: () => void;
    register: UseFormRegister<any>
    index: number;
    control: Control<FieldValues, any>;
}

const MatricsForm: React.FC<MetricFormProps> = ({
    metric,
    onChange,
    onRemove,
    register,
    index,
    control,
}) => {
    const viewshipType = [
        { label: 'OTT', value: "OTT", },
        { label: 'BROADCAST', value: "BROADCAST", }
    ];
    return (
        <TableRow>
            <TableCell className="font-semibold">
                {/* <Input
                     value={metric.viewership || ''}
                     onChange={(e) => onChange({ ...metric, viewership: e.target.value })}
                /> */}
                <DatePicker placeholder={"Year"} {...register(`metrics.${index}.year`)} />
            </TableCell>
            <TableCell className="font-semibold">
                <Input
                    {...register(`metrics.${index}.viewership`)}
                />
            </TableCell>
            <TableCell className="font-semibold">
                <Input
                    {...register(`metrics.${index}.reach`)}
                />
            </TableCell>
            <TableCell className="font-semibold">
                <div className="grid gap-3">
                    <Controller
                        name={'tertiaryIds'}
                        control={control}
                        render={({ field }) => (
                            <ReactSelect
                                field={field}
                                selectArr={viewshipType}
                            />
                        )}
                    />
                </div>
            </TableCell>
            <TableCell className="font-semibold">
                {onRemove && (
                    <Button
                        onClick={onRemove}
                        size="sm"
                        className="h-7 gap-1 bg-red-500 text-white "
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                )}
            </TableCell>
        </TableRow>
    );
};

export default MatricsForm;
