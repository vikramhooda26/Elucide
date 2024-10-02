import { FilterContent } from "../../components/core/filter/FilterModal";

class FilterService {

    static processFilterData(filterData: Record<string, { type: string; value: any, isMandatory: boolean; }>) {

        if (!filterData || Object.keys(filterData)?.length <= 0) {
            return;
        }

        const processedFilters: { [key: string]: any } = {};

        processedFilters.isMandatory = true;

        Object.entries(filterData).map(([key, filter]) => {
            if (key && filter && filter?.value) {
                if (typeof filter?.value === 'object') {
                    if (Array.isArray(filter?.value) && filter?.value?.length <= 0) {
                        return;
                    } else if (Object.keys(filter?.value)?.length <= 0) {
                        return;
                    } else {
                        processedFilters[key] = filter?.value;
                    }
                } else if (typeof filter?.value === 'string' && filter?.value?.length > 0) {
                    processedFilters[key] = filter?.value;
                } else if (typeof filter?.value === 'number' || typeof filter?.value === 'bigint' || typeof filter?.value === 'boolean') {
                    processedFilters[key] = filter?.value;
                }
            }
        });

        if (processedFilters?.costOfAssociation) {
            let costOfAssociation = processedFilters?.costOfAssociation;
            if (!costOfAssociation?.operationType) {
                throw new Error("Please select any of these ['Greater', 'Lesser'].");
            }

            if (!costOfAssociation?.value1 || !costOfAssociation?.value2) {
                throw new Error("Please select valid range of cost of association.");
            }

            const operationType = costOfAssociation?.operationType;

            let value11 = costOfAssociation?.value1?.[0] || 0;
            let value12 = costOfAssociation?.value1?.[1] || 0;
            let value21 = costOfAssociation?.value2?.[0] || 0;
            let value22 = costOfAssociation?.value2?.[1] || 0;

            let cost = [];
            if (operationType !== 'in') {
                cost = [value11 + value21];
            } else {
                cost = [value11 + value21, value12 + value22];
            }

            costOfAssociation = { cost, operationType }
            processedFilters.costOfAssociation = costOfAssociation;
        }

        if (processedFilters?.athleteAge) {
            let athleteAge = processedFilters?.athleteAge;
            if (!athleteAge?.operationType) {
                throw new Error("Please select any of these ['Greater', 'Lesser'].");
            }

            if (!athleteAge?.value) {
                throw new Error("Please select valid age range");
            }

            let value = athleteAge?.value || [0];

            const age = value;

            athleteAge = { age, operationType: athleteAge?.operationType }
            processedFilters.athleteAge = athleteAge;
        }
        if (processedFilters?.yearOfInception?.length > 0) {
            processedFilters.yearOfInception = processedFilters?.yearOfInception?.[0]
        }
        if (processedFilters?.franchiseFee?.length > 0) {
            if (!isNaN(processedFilters?.franchiseFee)) {
                processedFilters.franchiseFee = Number(processedFilters?.franchiseFee || 0);
            } else {
                delete processedFilters?.franchiseFee;
            }

        }

        return processedFilters;
    }
}

export default FilterService;


// Applied Filters:
// athleteIds: ["14","11"]
// statusIds: ["3","2"]
// athleteAge: [27,69]
// athleteGenderIds: ["2","1"]
// costOfAssociation: {"value1":[53000],"value2":[500000],"operationType":"gt"}
// ageIds: ["1","3","5"]
// genderIds: ["2","1"]
// stateIds: ["12","5","7"]
// agencyIds: ["8","5","3"]
// primaryMarketIds: ["3","8"]
// secondaryMarketIds: ["6","8"]
// tertiaryIds: ["12","5","1"]
// primarySocialMediaPlatformIds: ["2","5"]
// secondarySocialMediaPlatformIds: ["1","3"]
// nccsIds: ["1","3"]
// subPersonalityTraitIds: ["55","53","52"]
// sportIds: ["16","17"]
// tierIds: ["1","4"]
// associationLevelIds: ["6","4","3"]
// nationalityIds: ["5","6"]
// socialMediaIds: ["1","3"]
// athleteStatusIds: ["1","3"]
// strategyOverview: "Strategies "
// facebook: "Facebook"
// instagram: "Instagram"
// twitter: "Twitter"
// linkedin: "LinkedIn"
// youtube: "Youtube"
// website: "Website"
// contactName: "Contact Name"
// contactDesignation: "Contact Designation"
// contactEmail: "Contact Email"
// contactNumber: "Contact Number"
// contactLinkedin: "Contact LinkedIn"