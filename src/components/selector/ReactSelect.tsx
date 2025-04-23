import React from "react";
import Select, { GroupBase, StylesConfig } from "react-select";

interface OptionType {
  label: string;
  value: string;
}

interface MySelectComponentProps {
  field: any; // You can replace `any` with the correct type for your field prop
  selectArr: OptionType[] | null | [] | undefined;
}

const customStyles: StylesConfig<OptionType, true, GroupBase<OptionType>> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "bg-background",
    borderColor: state.isFocused ? "ring-ring" : "border-input",
    boxShadow: state.isFocused ? "ring-2 ring-ring ring-offset-2" : "none",
    "&:hover": {
      borderColor: state.isFocused ? "ring-ring" : "border-input"
    },
    borderRadius: "0.375rem", // rounded-md
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "0 1em 0 0", // px-3 py-2
    fontSize: "0.875rem", // text-sm
    overflow: "hidden"
  }),
  input: (provided) => ({
    ...provided,
    margin: 0,
    padding: 0
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "text-muted-foreground"
  }),
  singleValue: (provided) => ({
    ...provided,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "bg-muted-foreground",
    borderRadius: "0.25rem", // rounded
    padding: "0 0.5rem" // px-2
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "text-foreground"
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "text-muted",
    "&:hover": {
      backgroundColor: "bg-muted",
      color: "text-foreground"
    }
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "white", // Ensure dropdown background color is white
    color: "black" // Ensure dropdown text color is black
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "lightgray" : "white", // Selected option background
    color: state.isSelected ? "black" : "black", // Selected option text color
    "&:hover": {
      backgroundColor: "lightgray", // Hover background color
      color: "black" // Hover text color
    }
  })
};

const ReactSelect: React.FC<MySelectComponentProps> = ({ field, selectArr }) => {
  return (
    <Select
      {...field}
      options={selectArr}
      isMulti
      classNamePrefix="select"
      isClearable
      isSearchable
      styles={customStyles}
      className=""
      aria-label="Select status"
    />
  );
};

export default ReactSelect;
