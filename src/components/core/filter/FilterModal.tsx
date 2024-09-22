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

interface FilterOption {
    label: string;
    value: string;
}

interface FilterContent {
    displayName: string;
    key: string;
    type: 'select' | 'range' | 'dateRange' | 'text' | 'check' | 'multicheck' | 'toggle';
    value?: string | number | [number, number];
    options: FilterOption[];
    range?: { min: number; max: number } | { start: string; end: string };
    isMultiple?: boolean;
}
interface FilterModalProps {
    isOpen: boolean;
    filters: FilterContent[];
    onClose: () => void;
    onApplyFilters: () => void;
    pageKey: string;
}

export function FilterModal({ isOpen, filters, onClose, onApplyFilters, pageKey }: FilterModalProps) {
    const [isDateRangeModalOpen, setIsDateRangeModalOpen] = useState(false);
    const [open, setOpen] = useState(false)

    const [filterValues, setFilterValues] = useRecoilState(filterState);

    const getCurrentFilters = () => filterValues[pageKey] || {};

    const handleInputChange = (key: string, value: any) => {
        setFilterValues((prev) => ({
            ...prev,
            [pageKey]: {
                ...getCurrentFilters(),
                [key]: { type: filters.find((f) => f.key === key)?.type, value },
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
    };

    const renderFilter = (filter: FilterContent) => {
        const currentValues = getCurrentFilters();

        return (
            <div key={filter.key} className="mb-4">
                <label className="block text-sm font-medium mb-2">{filter.displayName}</label>
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
                                        value={currentValues[filter.key]?.value || [0, 100]}
                                    />
                                </div>
                            );
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
            <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px] w-[75vw] h-[75vh] max-h-[75vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>Add Filters</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
                <div className="flex-grow overflow-y-auto py-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filters.map((filter) => renderFilter(filter))}
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
