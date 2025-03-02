import { useState } from "react";
import { useRecoilState } from "recoil";
import { CalendarDateRangePicker } from "../../../features/dashboard/components/date-range-picker";
import { filterState } from "../../../store/atoms/filterAtom";
import ToggleButton from "../../button/ToggleButton";
import { Button } from "../../ui/button";
import { Checkbox } from "../../ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "../../ui/dialog";
import { RangeSlider } from "../../ui/RangeSlider";
import CheckBoxFilter from "./CheckBoxFilter";
import ConditionalDropDownFilter, { Option } from "./ConditionalDropDownFilter";
import ConditionalTextFilter from "./ConditionalTextFilter";
import DoubleRangeFilter from "./DoubleRangeFilter";
import DoubleRangeWithCheckFilter from "./DoubleRangeWithCheckFilter";
import MultiCheckBoxFilter from "./MultiCheckBoxFilter";
import SearchFilter from "./SearchFilter";
import SelectBoxFilter from "./SelectBoxFilter";
import SingleRangeFilter from "./SingleRangeFilter";
import { RefreshCw } from "lucide-react";

export interface FilterOption {
    label: string;
    value: string;
}

export interface FilterContent {
    displayName: string;
    key: string;
    type:
    | "select"
    | "range"
    | "doubleRange"
    | "singleRange"
    | "dateRange"
    | "text"
    | "conditionalText"
    | "check"
    | "multicheck"
    | "toggle"
    | "doubleRangeWithCheck"
    | "conditionalDropDown";

    value?: string | number | [number, number] | [[number, number], [number, number]];
    options?: FilterOption[];

    range?: { min: number; max: number } | { start: string; end: string };
    doubleRange?: { min: { min1: number; min2: number }; max: { max1: number; max2: number } };
    singleRange?: { min: number; max: number };
    steps?: { step1: number; step2: number };
    step?: number;
    operationType?: string;
    subTitle?: { title1: string; title2?: string; title3?: string };

    conditionalDropDowns?: { [key: string]: Option[] | string };

    isMultiple?: boolean;
    isMandatory: boolean;
    allowReload?: boolean;
}
interface FilterModalProps {
    isOpen: boolean;
    filters: FilterContent[];
    onClose: () => void;
    onApplyFilters: () => void;
    onDiscardFilters: () => void;
    pageKey: string;
}

export function FilterModal({ isOpen, filters, onClose, onApplyFilters, pageKey, onDiscardFilters }: FilterModalProps) {
    const [isDateRangeModalOpen, setIsDateRangeModalOpen] = useState(false);
    const [open, setOpen] = useState(false);

    const [filterValues, setFilterValues] = useRecoilState(filterState);

    const getCurrentFilters = () => filterValues[pageKey] || {};

    const currentValues = getCurrentFilters();

    const handleInputChange = (key: string, value: any, reload = false) => {
        setFilterValues((prev) => {
          const currentValues = { ...(prev[pageKey] || {}) };
          const foundFilter = filters.find((f) => f.key === key);
      
          const isEmpty =
            reload || !value ||
            (typeof value === "object" &&
              ((Array.isArray(value) && value.length === 0) ||
               Object.keys(value).length === 0));
      
          if (isEmpty) {
            delete currentValues[key];
          } else {
            currentValues[key] = {
              type: foundFilter?.type || "text",
              value,
              isMandatory: currentValues[key]?.isMandatory === true
            };
          }
      
          return {
            ...prev,
            [pageKey]: currentValues
          };
        });
    };

    const handleClearFilters = () => {
        setFilterValues((prev) => ({
            ...prev,
            [pageKey]: {}
        }));
        onClose();
        setOpen(false);
        onDiscardFilters();
    };

    const renderFilter = (filter: FilterContent) => {
        const handleMandatoryChange = (key: string, value: any) => {
            setFilterValues((prev) => ({
                ...prev,
                [pageKey]: { ...currentValues, [key]: { ...currentValues[filter.key], isMandatory: value } }
            }));
        };

        return (
            <div key={filter.key} className="mb-4">
                <div className="flex items-center gap-2">
                    <Checkbox
                        className="peer mb-2 block h-4 w-4 rounded-sm bg-green-100 text-sm font-medium ring-offset-2 focus:ring-green-500 data-[state=checked]:border-green-600 data-[state=checked]:bg-green-500"
                        checked={currentValues[filter.key]?.isMandatory === true ? true : false}
                        onCheckedChange={(value) => handleMandatoryChange(filter.key, value)}
                    />
                    <div className="mb-2 flex items-center gap-3">
                        <label className="block text-sm font-medium">{filter.displayName} </label>
                        {filter?.allowReload ? (
                            <RefreshCw
                                size={18}
                                className="cursor-pointer text-gray-600 hover:text-gray-100"
                                onClick={() => handleInputChange(filter.key, false, true)}
                            />
                        ) : null}
                    </div>
                </div>
                {(() => {
                    switch (filter.type) {
                        case "text":
                            return (
                                <SearchFilter
                                    key={filter.key}
                                    value={currentValues[filter.key]?.value || ""}
                                    onChange={(value) => handleInputChange(filter.key, value)}
                                />
                            );
                        case "conditionalText":
                            return (
                                <ConditionalTextFilter
                                    key={filter?.key}
                                    onChange={(value) => handleInputChange(filter.key, value)}
                                    placeholder={filter?.displayName}
                                    values={currentValues[filter.key]?.value || { value: "", isActive: true }}
                                    subTitle={filter?.subTitle}
                                />
                            );
                        case "select":
                            return (
                                <SelectBoxFilter
                                    key={filter.key}
                                    value={currentValues[filter.key]?.value || ""}
                                    options={filter.options || []}
                                    onChange={(value) => handleInputChange(filter.key, value)}
                                    multiple={filter?.isMultiple}
                                    placeholder={(filter?.displayName || "").toLowerCase() || ""}
                                />
                            );
                        case "conditionalDropDown":
                            return (
                                <ConditionalDropDownFilter
                                    key={filter.key}
                                    values={currentValues[filter.key]?.value || { value: [], checkType: "ott" }}
                                    options={filter.options || []}
                                    onChange={(value) => handleInputChange(filter.key, value)}
                                    multiple={filter?.isMultiple}
                                    placeholder={(filter?.displayName || "").toLowerCase() || ""}
                                    conditionalDropDowns={filter?.conditionalDropDowns}
                                    subTitle={filter?.subTitle}
                                />
                            );
                        case "range":
                            if (filter.range && "min" in filter.range && "max" in filter.range) {
                                return (
                                    <div key={filter.key} className="mb-4">
                                        <RangeSlider
                                            minStepsBetweenThumbs={1}
                                            min={filter.range?.min || 0}
                                            max={filter.range?.max || 100}
                                            step={1}
                                            onValueChange={(value) => handleInputChange(filter.key, value)}
                                            className="w-full"
                                            isSingle={false}
                                            value={currentValues[filter.key]?.value}
                                        />
                                    </div>
                                );
                            }
                            return null;
                        case "singleRange":
                            if (filter?.singleRange && "min" in filter.singleRange && "max" in filter?.singleRange) {
                                return (
                                    <div key={filter.key} className="mb-4">
                                        <SingleRangeFilter
                                            subTitle={{ title1: filter.subTitle?.title1 || "" }}
                                            minStepsBetweenThumbs={1}
                                            min={filter.singleRange?.min}
                                            max={filter.singleRange?.max}
                                            step={filter?.step || 1}
                                            onValueChange={(value) => handleInputChange(filter.key, value)}
                                            className="w-full"
                                            isSingle={false}
                                            values={
                                                Object.keys(currentValues[filter.key]?.value || {})?.length > 0
                                                    ? currentValues[filter.key]?.value
                                                    : { value: [0, 0], operationType: "in" }
                                            }
                                        />
                                    </div>
                                );
                            }
                            return null;
                        case "doubleRange":
                            if (filter?.doubleRange && "min" in filter.doubleRange && "max" in filter?.doubleRange) {
                                return (
                                    <div key={filter.key} className="mb-4">
                                        <DoubleRangeFilter
                                            subTitle={filter.subTitle}
                                            minStepsBetweenThumbs={1}
                                            min={filter.doubleRange?.min}
                                            max={filter.doubleRange?.max}
                                            steps={filter?.steps || { step1: 1, step2: 1 }}
                                            onValueChange={(value) => handleInputChange(filter.key, value)}
                                            className="w-full"
                                            isSingle={false}
                                            values={
                                                Object.keys(currentValues[filter.key]?.value || {})?.length > 0
                                                    ? currentValues[filter.key]?.value
                                                    : { value1: [0, 0], value2: [0, 0], operationType: "in" }
                                            }
                                        />
                                    </div>
                                );
                            }
                            return null;
                        case "doubleRangeWithCheck":
                            if (filter?.doubleRange && "min" in filter.doubleRange && "max" in filter?.doubleRange) {
                                return (
                                    <div key={filter.key} className="mb-4">
                                        <DoubleRangeWithCheckFilter
                                            subTitle={filter.subTitle}
                                            minStepsBetweenThumbs={1}
                                            min={filter.doubleRange?.min}
                                            max={filter.doubleRange?.max}
                                            steps={filter?.steps || { step1: 1, step2: 0 }}
                                            onValueChange={(value) => handleInputChange(filter.key, value)}
                                            className="w-full"
                                            isSingle={false}
                                            values={
                                                Object.keys(currentValues[filter.key]?.value || {})?.length > 0
                                                    ? currentValues[filter.key]?.value
                                                    : {
                                                        value1: [0, 0],
                                                        value2: [0, 0],
                                                        operationType: "in",
                                                        checkType: "ott"
                                                    }
                                            }
                                        />
                                    </div>
                                );
                            }
                            return null;
                        case "dateRange":
                            return (
                                <CalendarDateRangePicker
                                    value={currentValues[filter.key]?.value || { from: undefined, to: undefined }}
                                    onChangeDate={(range) => handleInputChange(filter.key, range)}
                                />
                            );
                        case "check":
                            return (
                                <CheckBoxFilter
                                    value={currentValues[filter.key]?.value || ""}
                                    options={filter.options || []}
                                    onChange={(value) => handleInputChange(filter.key, value)}
                                />
                            );

                        case "multicheck":
                            return (
                                <MultiCheckBoxFilter
                                    key={filter.key}
                                    value={currentValues[filter.key]?.value || []}
                                    options={filter.options || []}
                                    onChange={(value) => handleInputChange(filter.key, value)}
                                />
                            );
                        case "toggle":
                            return (
                                <ToggleButton
                                    isToggled={currentValues[filter.key]?.value || false}
                                    setToggle={(value) => handleInputChange(filter.key, value)}
                                />
                            );
                        default:
                            return null;
                    }
                })()}
            </div>
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Open Filters</Button>
            </DialogTrigger>
            <DialogContent className="flex h-[75vh] max-h-[75vh] w-[75vw] flex-col sm:max-w-[425px] md:max-w-[600px] lg:max-w-[1100px] xl:max-w-[1100px]">
                <DialogHeader>
                    <DialogTitle>Add Filters</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="scrollbar flex-grow overflow-y-auto py-4">
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filters && filters?.length && filters?.map((filter) => renderFilter(filter))}
                    </div>
                </div>
                <DialogFooter className="mt-auto">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="outline" onClick={() => handleClearFilters()}>
                        Discard
                    </Button>
                    <Button
                        type="submit"
                        onClick={() => {
                            setOpen(false);
                            onApplyFilters();
                        }}
                    >
                        Apply Filters
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default FilterModal;
