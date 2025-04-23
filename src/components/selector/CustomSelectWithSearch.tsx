import { SelectViewport } from "@radix-ui/react-select";
import React, { useEffect, useState } from "react";
import { selectorContentType } from "../../types/components/SelectorTypes";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const CustomSelectWithSearch: React.FC<{
  selectorContent: selectorContentType;
}> = ({ selectorContent }) => {
  const {
    title = "",
    items = [],
    isMultiple = false,
    isSearchable = false,
    isClearable = false,
    searchCallback,
    selectState = [],
    onChange,
    searchFrom
  } = selectorContent?.selectorContent;

  const [selectedValues, setSelectedValues] = useState<string[]>(selectState);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (searchCallback && searchFrom) {
      searchCallback(searchFrom, searchTerm);
    }
  }, [searchTerm, searchCallback]);

  const handleChange = (value: string) => {
    let newSelectedValues;
    if (isMultiple) {
      newSelectedValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
    } else {
      newSelectedValues = [value];
    }
    setSelectedValues(newSelectedValues);
    if (onChange) {
      onChange(newSelectedValues);
    }
  };

  const filteredItems = items.filter((item) => item.label.toLowerCase().includes(searchTerm.toLowerCase()));

  const clearSelection = () => {
    setSelectedValues([]);
    if (onChange) {
      onChange([]);
    }
  };

  return (
    <div className="grid gap-3">
      <Label htmlFor={title.toLowerCase()}>{title}</Label>
      <Select>
        <SelectTrigger id={title.toLowerCase()} aria-label="Select status">
          <SelectValue placeholder={`Select ${title.toLowerCase()}`} />
          {isClearable && selectedValues.length > 0 && (
            <button onClick={clearSelection} className="ml-2">
              Clear
            </button>
          )}
        </SelectTrigger>
        <SelectContent>
          {isSearchable && (
            <div className="p-2">
              <input
                type="text"
                className="w-full rounded border border-gray-300 p-2"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}
          <SelectViewport className="p-1">
            {filteredItems.map((item, i) => (
              <SelectItem key={i} value={item.value} onClick={() => handleChange(item.value)}>
                {item.label}
              </SelectItem>
            ))}
          </SelectViewport>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomSelectWithSearch;
