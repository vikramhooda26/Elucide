import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { CalendarDateRangePicker } from "../../../features/dashboard/components/date-range-picker";
import { filterState } from "../../../store/atoms/filterAtom";
import { Button } from "../../ui/button";
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
import CheckBoxFilter from './CheckBoxFilter';
import MultiCheckBoxFilter from './MultiCheckBoxFilter';
import SearchFilter from './SearchFilter';
import SelectBoxFilter from './SelectBoxFilter';
import ToggleButton from '../../button/ToggleButton';
import { Checkbox } from '../../ui/checkbox';
import DoubleRangeFilter from './DoubleRangeFilter';
import SingleRangeFilter from './SingleRangeFilter';

export interface FilterOption {
    label: string;
    value: string;
}

export interface FilterContent {
    displayName: string;
    key: string;
    type: 'select' | 'range' | 'doubleRange' | 'singleRange' | 'dateRange' | 'text' | 'check' | 'multicheck' | 'toggle';

    value?: string | number | [number, number] | [[number, number], [number, number]];
    options?: FilterOption[];

    range?: { min: number; max: number } | { start: string; end: string };
    doubleRange?: { min: { min1: number; min2: number; }, max: { max1: number; max2: number; } };
    singleRange?: { min: number; max: number; };
    steps?: { step1: number; step2: number; }
    step?: number;
    operationType?: string;
    subTitle?: { title1: string; title2?: string; }

    isMultiple?: boolean;
    isMandatory: boolean;
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
    const [open, setOpen] = useState(false)

    const [filterValues, setFilterValues] = useRecoilState(filterState);

    const getCurrentFilters = () => filterValues[pageKey] || {};

    const currentValues = getCurrentFilters();

    const handleInputChange = (key: string, value: any) => {
        const foundFilter = filters.find((f) => f.key === key);

        setFilterValues((prev) => ({
            ...prev,
            [pageKey]: {
                ...currentValues,
                [key]: {
                    type: foundFilter?.type || "text",
                    value,
                    isMandatory: currentValues[key]?.isMandatory || false,
                },
            },
        }));
    };

    const handleClearFilters = () => {
        setFilterValues((prev) => ({
            ...prev,
            [pageKey]: {},
        }));
        onClose();
        setOpen(false);
        onDiscardFilters();
    };

    const renderFilter = (filter: FilterContent) => {

        const handleMandatoryChange = (key: string, value: any) => {

            setFilterValues((prev) => ({ ...prev, [pageKey]: { ...currentValues, [key]: { ...currentValues[filter.key], isMandatory: value }, }, }));
        };

        return (
            <div key={filter.key} className="mb-4">
                <div className='flex gap-2 items-center'>
                    <Checkbox className="block text-sm font-medium mb-2 peer h-4 w-4 rounded-sm bg-green-100 ring-offset-2 focus:ring-green-500 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-600" checked={currentValues[filter.key]?.isMandatory} onCheckedChange={(value) => handleMandatoryChange(filter.key, value)} />
                    <label className="block text-sm font-medium mb-2">{filter.displayName} </label>
                </div>
                {(() => {
                    switch (filter.type) {
                        case 'text':
                            return (
                                <SearchFilter
                                    key={filter.key}
                                    value={currentValues[filter.key]?.value || ''}
                                    onChange={(value) => handleInputChange(filter.key, value)}
                                />
                            );
                        case 'select':
                            return (
                                <SelectBoxFilter
                                    key={filter.key}
                                    value={currentValues[filter.key]?.value || ''}
                                    options={filter.options || []}
                                    onChange={(value) => handleInputChange(filter.key, value)}
                                    multiple={filter?.isMultiple}
                                    placeholder={(filter?.displayName || '').toLowerCase() || ''}
                                />
                            );
                        case 'range':
                            if (filter.range && 'min' in filter.range && 'max' in filter.range) {
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
                        case 'singleRange':
                            if (filter?.singleRange && 'min' in filter.singleRange && 'max' in filter?.singleRange) {
                                return (
                                    <div key={filter.key} className="mb-4">
                                        <SingleRangeFilter
                                            subTitle={{ title1: filter.subTitle?.title1 || '' }}
                                            minStepsBetweenThumbs={1}
                                            min={filter.singleRange?.min}
                                            max={filter.singleRange?.max}
                                            step={filter?.step || 1}
                                            onValueChange={(value) => handleInputChange(filter.key, value)}
                                            className="w-full"
                                            isSingle={false}
                                            values={Object.keys(currentValues[filter.key]?.value || {})?.length > 0 ? currentValues[filter.key]?.value : { value: [0, 0], operationType: 'in' }}
                                        />
                                    </div>
                                );
                            }
                            return null
                        case 'doubleRange':
                            if (filter?.doubleRange && 'min' in filter.doubleRange && 'max' in filter?.doubleRange) {
                                return (
                                    <div key={filter.key} className="mb-4">
                                        <DoubleRangeFilter
                                            subTitle={filter.subTitle}
                                            minStepsBetweenThumbs={1}
                                            min={filter.doubleRange?.min}
                                            max={filter.doubleRange?.max}
                                            steps={filter?.steps || { step1: 1, step2: 0 }}
                                            onValueChange={(value) => handleInputChange(filter.key, value)}
                                            className="w-full"
                                            isSingle={false}
                                            values={Object.keys(currentValues[filter.key]?.value || {})?.length > 0 ? currentValues[filter.key]?.value : { value1: [0, 0], value2: [0, 0], operationType: 'in' }}
                                        />
                                    </div>
                                );
                            }
                            return null
                        case 'dateRange':
                            return (
                                <CalendarDateRangePicker
                                    value={currentValues[filter.key]?.value || { from: undefined, to: undefined }}
                                    onChange={(range) => handleInputChange(filter.key, range)}
                                />
                            );
                        case 'check':
                            return (
                                <CheckBoxFilter
                                    value={currentValues[filter.key]?.value || ''}
                                    options={filter.options || []}
                                    onChange={(value) => handleInputChange(filter.key, value)}
                                />
                            );

                        case 'multicheck':
                            return (
                                <MultiCheckBoxFilter
                                    key={filter.key}
                                    value={currentValues[filter.key]?.value || []}
                                    options={filter.options || []}
                                    onChange={(value) => handleInputChange(filter.key, value)}
                                />
                            );
                        case 'toggle':
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
            <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[1100px] xl:max-w-[1100px] w-[75vw] h-[75vh] max-h-[75vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Add Filters</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <div className="flex-grow overflow-y-auto py-4 scrollbar ">
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
                    <Button type="submit" onClick={() => { setOpen(false); onApplyFilters() }}>
                        Apply Filters
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default FilterModal;
