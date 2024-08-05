import { toast } from "sonner";

export const getListOfYears = () => {
    return [...(new Array(new Date().getFullYear()) as number[])]
        .map((_, index) => ({
            label: (index + 1).toString(),
            value: (index + 1).toString(),
        }))
        .slice(1900, new Date().getFullYear() + 1)
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
