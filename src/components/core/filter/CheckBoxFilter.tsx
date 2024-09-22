// CheckBoxFilter.tsx
import React from 'react';
import { Checkbox } from '../../ui/checkbox';
import { Label } from '../../ui/label';

interface CheckBoxFilterProps {
    options: { label: string; value: string }[];
    value: string;
    onChange: (value: string | null) => void;
}

const CheckBoxFilter: React.FC<CheckBoxFilterProps> = ({ options, value, onChange }) => {
    const handleChange = (optionValue: string) => {
        if (value === optionValue) {
            onChange(null);
        } else {
            onChange(optionValue);
        }
    };

    return (
        <div className="space-y-2">
            <Label>Select Option</Label>
            {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                    <Checkbox
                        id={`single-check-${option.value}`}
                        checked={value === option.value}
                        onCheckedChange={() => handleChange(option.value)}
                    />
                    <Label htmlFor={`single-check-${option.value}`}>{option.label}</Label>
                </div>
            ))}
        </div>
    );
};

export default CheckBoxFilter;
