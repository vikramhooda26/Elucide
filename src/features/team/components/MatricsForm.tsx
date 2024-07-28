import { Trash2 } from "lucide-react";
import { DatePicker } from "../../../components/date/DatePicker";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { TableCell, TableRow } from "../../../components/ui/table";
import { MetricType } from "../../../types/team/TeamFormTypes";

interface MetricFormProps {
    metric: MetricType;
    onChange: (metric: MetricType) => void;
    onRemove?: () => void;
}

const MatricsForm: React.FC<MetricFormProps> = ({ metric, onChange, onRemove }) => {
    return (
        <TableRow>
            <TableCell className="font-semibold">
                {/* <Input
                     value={metric.viewership || ''}
                     onChange={(e) => onChange({ ...metric, viewership: e.target.value })}
                /> */}
                <DatePicker placeholder={'Year'} />
            </TableCell>
            <TableCell className="font-semibold">
                <Input
                    value={metric.reach || ''}
                    onChange={(e) => onChange({ ...metric, reach: e.target.value })}
                />
            </TableCell>
            <TableCell className="font-semibold">
                <Input
                    value={metric.year || ''}
                    onChange={(e) => onChange({ ...metric, year: e.target.value })}
                />
            </TableCell>
            <TableCell className="font-semibold">
                <div className="grid gap-3">
                    <Select>
                        <SelectTrigger
                            id={"Viewship Type"}
                            aria-label="Select status"
                            onChange={(e) => onChange({ ...metric, viewshipType: e.currentTarget.value as MetricType['viewshipType'] })}
                        >
                            <SelectValue
                                placeholder={`Select vi}`}
                            />
                        </SelectTrigger>
                        <SelectContent >
                            <SelectItem value={'OTT'} key={1}>
                                OTT
                            </SelectItem>
                            <SelectItem value={'BROADCAST'} key={1}>
                                BROADCAST
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </TableCell>
            <TableCell className="font-semibold">

                {onRemove && (
                    <Button onClick={onRemove} size="sm" className="h-7 gap-1 bg-red-500 text-white ">
                        <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                )}
            </TableCell>

        </TableRow >
    );
};

export default MatricsForm;