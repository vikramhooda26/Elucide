import { ChangeEvent } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export const getListOfYears = (aheadInTime?: boolean) => {
    const currentYear = new Date().getFullYear();
    const endYear = aheadInTime ? currentYear + 10 : currentYear;

    return [...new Array(endYear - 1900 + 1)]
        .map((_, index) => ({
            label: (index + 1900).toString(),
            value: (index + 1900).toString(),
        }))
        .reverse();
};

export const convertStringToFloat = (feeString: string): number | null => {
    const sanitizedString = feeString.replace(/,/g, "").trim();

    const feeNumber = parseFloat(sanitizedString);

    if (isNaN(feeNumber) || feeNumber < 0) {
        return null;
    }

    return feeNumber;
};

export const validateMetrics = (
    metricType: "viewershipMetrics" | "reachMetrics",
    metrics: any[] | undefined,
    setError: any
) => {
    if (metrics && metrics.length > 0) {
        const result = metrics
            .map((metric, index) => {
                const metricFields =
                    metricType === "viewershipMetrics"
                        ? {
                              field1: "viewership",
                              field2: "viewershipType",
                              field3: "year",
                          }
                        : { field1: "reach", field2: "year", field3: "year" };

                const isAnyProvided =
                    metric[metricFields.field1] ||
                    metric[metricFields.field2] ||
                    metric[metricFields.field3];
                const isAllProvided =
                    metric[metricFields.field1] &&
                    metric[metricFields.field2] &&
                    metric[metricFields.field3];

                if (isAnyProvided && !isAllProvided) {
                    Object.values(metricFields).forEach((field) => {
                        if (!metric[field]) {
                            setError(`${metricType}.${index}.${field}`, {
                                message: "You must fill all the fields",
                            });
                        }
                    });
                    toast.error(
                        `Please fill all the fields in ${
                            metricType.split("M")[0]
                        } card`
                    );
                    return undefined;
                }

                return isAnyProvided ? metric : null;
            })
            .filter((metric) => metric !== null);

        return result;
    }
    return [];
};

export const formatNumberWithCommas = (num: number) => {
    return new Intl.NumberFormat("en-IN").format(num);
};

export const onNumInputChange = (
    form: UseFormReturn<any>,
    e: ChangeEvent<HTMLInputElement>,
    key: string
) => {
    const inputValue = e.target.value;
    if (/^\d*\.?\d*$/.test(inputValue) || inputValue === "") {
        form.setValue(key, inputValue);
    } else {
        let hasDot = false;
        const sanitizedValue = inputValue
            .replace(/[^0-9.]/g, "")
            .replace(/(\..*?)\..*/g, "$1")
            .split("")
            .filter((char) => {
                const charCode = char.charCodeAt(0);
                if (charCode >= 48 && charCode <= 57) {
                    return true;
                }
                if (charCode === 46 && !hasDot) {
                    hasDot = true;
                    return true;
                }
                return false;
            })
            .join("");

        form.setValue(key, sanitizedValue);
    }
};

export const convertCroreToRupees = (num: string | undefined) => {
    if (num === undefined) {
        return undefined;
    }

    if (Number.isNaN(Number(num))) {
        return false;
    }

    return (Number(num) * 10000000).toString();
};
