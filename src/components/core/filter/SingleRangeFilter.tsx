import React, { useState } from "react";
import { RangeSlider } from "../../ui/RangeSlider";
import CheckBoxFilter from "./CheckBoxFilter";

const rangeInitialValue = { value: [0, 0], operationType: "in" };
const singleBoundInitialValue = { value: [0], operationType: "gt" };

type Props = {
    onValueChange: (value: { value: number[]; operationType: string }) => void;

    className?: string;
    subTitle: { title1: string };
    min: number;
    max: number;
    minStepsBetweenThumbs: number;
    step: number;
    formatLabel?: (value: number) => string;
    values?: { value: number[] | readonly number[]; operationType: string };
    isSingle?: boolean;
    isEdit?: boolean;
};

function SingleRangeFilter({
    onValueChange,

    className,
    subTitle,
    min,
    max,
    step,
    formatLabel,
    values,
    isSingle = false,
    isEdit = false
}: Props) {
    const [rangeValue, setRangeValue] = useState(rangeInitialValue);
    const [singleBoundValue, setSingleBoundValue] = useState(singleBoundInitialValue);

    const handleRangeChange = (value: number[]) => {
        const sliderValue = { value: value, operationType: values?.operationType || "" };
        onValueChange(sliderValue);

        if (values?.operationType === "in") {
            setRangeValue(sliderValue);
        } else {
            setSingleBoundValue(sliderValue);
        }
    };

    const handleOperationChange = (operationType: string) => {
        if (!operationType) {
            return;
        }
        if (operationType === "in") {
            onValueChange(rangeValue);
        } else {
            onValueChange({ value: singleBoundValue?.value as number[], operationType });
        }
    };

    return (
        <div>
            <div className="flex items-center space-x-2">
                <CheckBoxFilter
                    value={values?.operationType || ""}
                    options={
                        [
                            { label: "Greater", value: "gte" },
                            { label: "Lesser", value: "lte" }
                        ] || []
                    }
                    onChange={(value) => handleOperationChange(value || "")}
                    className={"mx-4 mb-4 flex items-center space-x-2"}
                />
                <CheckBoxFilter
                    value={values?.operationType || ""}
                    options={[{ label: "Range", value: "in" }] || []}
                    onChange={(value) => handleOperationChange(value || "")}
                    className={"mx-4 mb-4 flex items-center space-x-2"}
                />
            </div>
            <div className="my-1">{subTitle?.title1}</div>
            <RangeSlider
                minStepsBetweenThumbs={1}
                min={min || 0}
                max={max || 100}
                step={step}
                onValueChange={(value) => handleRangeChange(value)}
                className="w-full"
                isSingle={values?.operationType !== "in"}
                value={values?.value}
            />
        </div>
    );
}

export default SingleRangeFilter;
