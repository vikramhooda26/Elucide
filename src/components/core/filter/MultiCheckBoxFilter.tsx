import React from "react";
import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";

interface MultiCheckBoxFilterProps {
  options: { label: string; value: string }[];
  value: string[];
  onChange: (value: string[]) => void;
}

const MultiCheckBoxFilter: React.FC<MultiCheckBoxFilterProps> = ({ options, value, onChange }) => {
  const handleChange = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((item) => item !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  return (
    <div className="space-y-2">
      {/* <Label>Select Options</Label> */}
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <Checkbox
            id={`category-${option.value.toLowerCase()}`}
            checked={value.includes(option.value)}
            onCheckedChange={() => handleChange(option.value)}
          />
          <Label htmlFor={`category-${option.value.toLowerCase()}`}>{option.label}</Label>
        </div>
      ))}
    </div>
  );
};

export default MultiCheckBoxFilter;
