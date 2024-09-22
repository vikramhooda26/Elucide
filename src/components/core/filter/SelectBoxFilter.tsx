import React from 'react'
import SelectBox from '../../ui/multi-select'

export interface Option {
    value: string;
    label: string;
}

interface SelectBoxProps {
    options: Option[];
    value?: string[] | string | undefined;
    onChange?: (values: string[] | string) => void;
    placeholder?: string;
    inputPlaceholder?: string;
    emptyPlaceholder?: string;
    className?: string;
    multiple?: boolean;
}

function SelectBoxFilter({
    inputPlaceholder,
    emptyPlaceholder,
    placeholder,
    className = "w-full",
    options,
    value,
    onChange,
    multiple
}: SelectBoxProps) {
    return (
        <SelectBox
            options={options}
            value={value}
            onChange={onChange}
            placeholder={`select ${placeholder}`}
            className={className}
            inputPlaceholder={`Search for ${(inputPlaceholder || '')?.toLowerCase()}...`}
            emptyPlaceholder={`No ${(emptyPlaceholder || '')?.toLowerCase()} data found`}
            multiple={multiple}
        />
    )
}

export default SelectBoxFilter