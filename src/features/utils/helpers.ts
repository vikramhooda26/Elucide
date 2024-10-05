import { ChangeEvent } from "react";
import { FieldValues, UseFormReturn, UseFormSetError } from "react-hook-form";
import { toast } from "sonner";

export const getListOfYears = (aheadInTime?: boolean) => {
    const currentYear = new Date().getFullYear();
    const endYear = aheadInTime ? currentYear + 10 : currentYear;

    return [...new Array(endYear - 1900 + 1)]
        .map((_, index) => ({
            label: (index + 1900).toString(),
            value: (index + 1900).toString()
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
    metricType: "ottPartnerMetrics" | "broadcastPartnerMetrics",
    metrics: any[] | undefined,
    setError: UseFormSetError<any>
) => {
    if (metrics && metrics.length > 0) {
        const result = metrics.map((metric, index) => {
            const metricFields =
                metricType === "ottPartnerMetrics"
                    ? {
                          field1: "ottPartnerId",
                          field2: "year",
                          field3: "viewership",
                          field4: "reach"
                      }
                    : {
                          field1: "broadcastPartnerId",
                          field2: "year",
                          field3: "viewership",
                          field4: "reach"
                      };

            const isAnyProvided =
                metric[metricFields.field1] ||
                metric[metricFields.field2] ||
                metric[metricFields.field3] ||
                metric[metricFields.field4];

            const isRequiredProvided = metric[metricFields.field1] && metric[metricFields.field2];

            if (isAnyProvided && !isRequiredProvided) {
                Object.values(metricFields).forEach((field) => {
                    if (!metric[field]) {
                        setError(
                            `${metricType}.${index}.${field}`,
                            {
                                message: "You must fill these fields"
                            },
                            { shouldFocus: true }
                        );
                    }
                });
                toast.error(
                    `Please fill all the required fields in ${metricType === "ottPartnerMetrics" ? "OTT Partner Metrics" : "Broadcast Partner Metrics"} card`
                );
                return undefined;
            }

            return isAnyProvided ? metric : null;
        });

        return result.some((metric) => metric === undefined) ? undefined : result.filter((metric) => metric !== null);
    }
    return [];
};

export const formatNumberWithCommas = (num: number) => {
    return new Intl.NumberFormat("en-IN").format(num);
};

export const onNumInputChange = (form: UseFormReturn<any>, e: ChangeEvent<HTMLInputElement>, key: string) => {
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

export const validateAssociation = (
    stakeholderType: "TEAM" | "OTHERS",
    association: any[] | undefined,
    setError: UseFormSetError<any>
) => {
    if (association && association.length > 0) {
        const result = association
            .map((association, index) => {
                const associationFields =
                    stakeholderType === "TEAM"
                        ? {
                              field1: "associationLevelId",
                              field2: "costOfAssociation",
                              field3: "brandIds"
                          }
                        : {
                              field1: "associationLevelId",
                              field2: "costOfAssociation",
                              field3: "costOfAssociation"
                          };

                const isAnyProvided =
                    association[associationFields.field1] ||
                    association[associationFields.field2] ||
                    association[associationFields.field3]
                        ? true
                        : false;
                const isAssociationLevelProvided = association[associationFields.field1] ? true : false;
                if (isAnyProvided && !isAssociationLevelProvided) {
                    if (!association["associationLevelId"]) {
                        setError(
                            `${"association"}.${index}.${"associationLevelId"}`,
                            {
                                message: "Association level is required"
                            },
                            { shouldFocus: true }
                        );
                    }
                    toast.error("Please select an association level");
                    return undefined;
                }

                return isAnyProvided ? association : null;
            })
            .filter((association) => association !== null);

        return result.some((v) => v === undefined) ? undefined : result;
    }
    return [];
};

export const convertCroreToRupees = (num: string | undefined) => {
    if (num === undefined) {
        return undefined;
    }

    if (Number.isNaN(Number(num))) {
        return false;
    }

    return Number(num) * 10000000;
};

export const convertRupeesToCrore = (num: string | undefined) => {
    if (num === undefined) {
        return undefined;
    }

    if (Number.isNaN(Number(num))) {
        return false;
    }

    return (Number(num) / 10000000).toString();
};

export const validateEndorsements = (
    endorsements: { name: string; active: boolean }[] | undefined,
    setError: UseFormSetError<any>
) => {
    if (!endorsements || !endorsements.length) {
        return endorsements;
    }

    let hasErrors = false;

    endorsements.map((value, index) => {
        if (!value.name) {
            hasErrors = true;
            setError(
                `endorsements.${index}.name`,
                {
                    message: "This field is required"
                },
                { shouldFocus: true }
            );
        }
    });
    if (hasErrors) {
        toast.error("Please give an endorsement name");
        return null;
    }

    return endorsements;
};

export const customRound = (num: number) => {
    const decimalPart = num - Math.floor(num);

    if (decimalPart < 0.5) {
        return Math.floor(num);
    } else {
        return Math.ceil(num);
    }
};

export const getRandomColor = (index: number) => {
    const colorArr = [
        "#0000FF", // Blue
        "#0000CC", // Medium Blue
        "#000099", // Dark Blue
        "#000066", // Navy Blue

        "#7CB9E8",
        "#00308F",
        "#72A0C1",

        "#007FFF",
        "#89CFF0",
        "#0066b2",
        "#0000FF",
        "#318CE7",
        "#5072A7",
        "#6699CC",
        "#0039a6",
        "#5F9EA0",
        "#A3C1AD",
        "#6082B6",
        "#0093AF",

        "#000033", // Midnight Blue
        "#0033FF", // Azure
        "#0033CC", // Cobalt Blue
        "#003399", // Royal Blue
        "#003366", // Indigo
        "#003349", // Teal Blue
        "#0066FF", // Sky Blue
        "#0066CC", // Deep Sky Blue
        "#006699", // Cerulean
        "#006666", // Caribbean Blue
        "#0099FF", // Dodger Blue
        "#0099CC", // Ocean Blue
        "#009999", // Turquoise Blue
        "#009966", // Aquamarine
        "#00CCFF", // Light Sky Blue
        "#00CCCC", // Light Cyan
        "#00CC99", // Sea Blue
        "#00FFCC", // Aqua Blue
        "#33CCFF", // Baby Blue
        "#33CCCC", // Electric Blue
        "#33CC99", // Aquatic Blue
        "#3399FF", // Light Azure
        "#3366FF", // Cornflower Blue
        "#3366CC", // Ultramarine
        "#336699", // Denim Blue
        "#6699FF", // Periwinkle

        "#cd68e6",
        "#388d3d",
        "#f8e9b5",
        "#5e9643",
        "#cbc1c1",
        "#826e51",
        "#e5bfdb",
        "#735d44",
        "#b4a99a",
        "#53766c",
        "#bcdcf9",
        "#799256",
        "#c4aee2",
        "#4f5095",
        "#caa4a6",
        "#588d58",
        "#c9b8f9",
        "#783d59",
        "#c8b1cb",
        "#795756"
    ];
    if (index < colorArr?.length) {
        return colorArr[index];
    }
    return "#6d080c";
};
