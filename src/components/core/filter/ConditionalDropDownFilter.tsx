import React from "react";
import SelectBox from "../../ui/multi-select";
import CheckBoxFilter from "./CheckBoxFilter";

export interface Option {
    value: string;
    label: string;
}

interface SelectBoxProps {
    values?: { value: string[] | string | undefined; checkType: string };
    onChange: (values: { value: string[] | string | undefined; checkType: string }) => void;
    placeholder?: string;
    inputPlaceholder?: string;
    emptyPlaceholder?: string;
    className?: string;
    multiple?: boolean;
    conditionalDropDowns: { [key: string]: Option[] | string } | undefined;
    subTitle?: { title1: string; title2?: string; title3?: string };
    options: Option[];
}

function ConditionalDropDownFilter({
    inputPlaceholder,
    emptyPlaceholder,
    placeholder,
    className = "w-full",
    values,
    onChange,
    multiple,
    conditionalDropDowns,
    options,
    subTitle
}: SelectBoxProps) {
    return (
        <div>
            <div className="mb-2">{subTitle?.title1}</div>
            <div className="flex items-center space-x-2">
                <CheckBoxFilter
                    value={values?.checkType || "ott"}
                    options={options || []}
                    onChange={(val) => onChange({ value: values?.value, checkType: val || "ott" })}
                    className={"mx-4 mb-4 flex items-center space-x-2"}
                />
            </div>
            <div className="my-1">{subTitle?.title2}</div>
            <SelectBox
                options={(conditionalDropDowns?.[values?.checkType || "ott"] as Option[]) || []}
                value={values?.value}
                onChange={(val) => onChange({ value: val, checkType: values?.checkType || "ott" })}
                placeholder={`select ${placeholder}`}
                className={className}
                inputPlaceholder={`Search for ${(inputPlaceholder || "")?.toLowerCase()}...`}
                emptyPlaceholder={`No ${(emptyPlaceholder || "")?.toLowerCase()} data found`}
                multiple={multiple}
            />
        </div>
    );
}

export default ConditionalDropDownFilter;
