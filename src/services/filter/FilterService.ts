import { AllColumns, matched, notMatched } from "@/types/metadata/Metadata";
import { FilterContent } from "../../components/core/filter/FilterModal";
import { differenceInYears } from "date-fns";
import { TAssociation } from "@/features/league/constants.ts/metadata";

class FilterService {
    static processFilterData(filterData: Record<string, { type: string; value: any; isMandatory: boolean }>) {
        if (!filterData || Object.keys(filterData)?.length <= 0) {
            return;
        }

        const processedFilters: { [key: string]: any } = {};

        processedFilters.isMandatory = true;

        let optionalCount = 0;

        Object.entries(filterData).map(([key, filter]) => {
            if (key && filter && filter?.value) {
                if (typeof filter?.value === "object") {
                    if (Array.isArray(filter?.value) && filter?.value?.length <= 0) {
                        return;
                    } else if (Object.keys(filter?.value)?.length <= 0) {
                        return;
                    } else {
                        processedFilters[key] = filter?.value;
                    }
                } else if (typeof filter?.value === "string" && filter?.value?.length > 0) {
                    processedFilters[key] = filter?.value;
                } else if (
                    typeof filter?.value === "number" ||
                    typeof filter?.value === "bigint" ||
                    typeof filter?.value === "boolean"
                ) {
                    processedFilters[key] = filter?.value;
                }

                if (!filter?.isMandatory) {
                    ++optionalCount;
                }
            }
        });

        if (optionalCount) {
            processedFilters.isMandatory = false;
        }

        if (processedFilters?.costOfAssociation) {
            let costOfAssociation = processedFilters?.costOfAssociation;
            if (!costOfAssociation?.operationType) {
                throw new Error("Please select any of these ['Greater', 'Lesser'].");
            }

            if (!costOfAssociation?.value1 || !costOfAssociation?.value2) {
                throw new Error("Please select valid range of cost of association.");
            }

            const operationType = costOfAssociation?.operationType;

            let value11 = (costOfAssociation?.value1?.[0] || 0) * 10000000;
            let value12 = (costOfAssociation?.value1?.[1] || 0) * 10000000;
            let value21 = (costOfAssociation?.value2?.[0] || 0) * 100000;
            let value22 = (costOfAssociation?.value2?.[1] || 0) * 100000;

            let cost = [];
            if (operationType !== "in") {
                cost = [value11 + value21];
            } else {
                cost = [value11 + value21, value12 + value22];
            }

            costOfAssociation = { cost, operationType };
            processedFilters.costOfAssociation = costOfAssociation;
        }

        if (processedFilters?.reachMetrics) {
            let reachMetrics = processedFilters?.reachMetrics;
            if (!reachMetrics?.operationType) {
                throw new Error("Please select any of these ['Greater', 'Lesser'].");
            }

            if (!reachMetrics?.value1 || !reachMetrics?.value2) {
                throw new Error("Please select valid range of reach.");
            }

            const operationType = reachMetrics?.operationType;
            const partnerType = reachMetrics?.checkType;

            let reach = shapeRange(reachMetrics, operationType);

            reachMetrics = { reach, operationType, partnerType };
            processedFilters.reachMetrics = reachMetrics;
        }

        if (processedFilters?.viewershipMetrics) {
            let viewershipMetrics = processedFilters?.viewershipMetrics;
            if (!viewershipMetrics?.operationType) {
                throw new Error("Please select any of these ['Greater', 'Lesser'].");
            }

            if (!viewershipMetrics?.value1 || !viewershipMetrics?.value2) {
                throw new Error("Please select valid range of viewship.");
            }

            const operationType = viewershipMetrics?.operationType;
            const partnerType = viewershipMetrics?.checkType;

            let viewership = shapeRange(viewershipMetrics, operationType);

            viewershipMetrics = { viewership, operationType, partnerType };
            processedFilters.viewershipMetrics = viewershipMetrics;
        }

        if (processedFilters?.yearMetrics) {
            let yearMetrics = processedFilters?.yearMetrics;
            if (!yearMetrics?.operationType) {
                throw new Error("Please select any of these ['Greater', 'Lesser'].");
            }

            if (!yearMetrics?.value1 || !yearMetrics?.value2) {
                throw new Error("Please select valid range of year matrics.");
            }

            const operationType = yearMetrics?.operationType;
            const partnerType = yearMetrics?.checkType;

            let year = shapeRange(yearMetrics, operationType);

            yearMetrics = { year, operationType, partnerType };
            processedFilters.yearMetrics = yearMetrics;
        }

        if (processedFilters?.partnerIdMetrics) {
            let partnerIdMetrics = processedFilters?.partnerIdMetrics;
            if (!partnerIdMetrics?.checkType) {
                throw new Error("Please select any of these ['OTT', 'Broadcast'].");
            }

            if (!partnerIdMetrics?.value) {
                throw new Error("Please select valid partners");
            }

            let partnerIds = partnerIdMetrics?.value || [];

            partnerIdMetrics = { partnerIds, partnerType: partnerIdMetrics?.checkType };
            processedFilters.partnerIdMetrics = partnerIdMetrics;
        }

        if (processedFilters?.endorsement) {
            let endorsement = processedFilters?.endorsement;
            if (!endorsement?.value) {
                throw new Error("Please enter endrosement name.");
            }

            let name = endorsement?.value || "";

            endorsement = { name, isActive: endorsement?.isActive || false };
            processedFilters.endorsement = endorsement;
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

            athleteAge = { age, operationType: athleteAge?.operationType };
            processedFilters.athleteAge = athleteAge;
        }

        if (processedFilters?.yearOfInception?.length > 0) {
            processedFilters.yearOfInception = processedFilters?.yearOfInception?.[0];
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

    static validateMatching(
        listData: AllColumns[],
        filters: Record<string, { type: string; value: any; isMandatory: boolean }>
    ) {
        const finalList: any = [];
        const processedFilters = this.processFilterData(filters);

        const matchData = (data: AllColumns) => {
            if (!data || Object.keys(data)?.length === 0) return;

            const finalObj: { [key: string]: string } & { associationValues: TAssociation[] } = { ...data } as {
                [key: string]: string;
            } & { associationValues: TAssociation[] };

            const brandIds = filters?.brandIds;
            const teamIds = filters?.teamIds;
            const leagueIds = filters?.leagueIds;
            const athleteIds = filters?.athleteIds;

            const statusIds = filters?.statusIds; // done
            const athleteAge = filters?.athleteAge; // done
            const athleteGenderIds = filters?.athleteGenderIds; // done
            const costOfAssociation = filters?.costOfAssociation;
            const ageIds = filters?.ageIds; // done
            const genderIds = filters?.genderIds;
            const cityIds = filters?.cityIds;
            const stateIds = filters?.stateIds;
            const activeCampaignIds = filters?.activeCampaignIds;
            const agencyIds = filters?.agencyIds;
            const assetIds = filters?.assetIds;
            const broadcastPartnerIds = filters?.broadcastPartnerIds;
            const maincategoryIds = filters?.maincategoryIds;
            const subCategoryIds = filters?.subCategoryIds;
            const formatIds = filters?.formatIds;
            const primaryMarketIds = filters?.primaryMarketIds;
            const secondaryMarketIds = filters?.secondaryMarketIds;
            const tertiaryIds = filters?.tertiaryIds;
            const primaryMarketingPlatformIds = filters?.primaryMarketingPlatformIds;
            const secondaryMarketingPlatformIds = filters?.secondaryMarketingPlatformIds;
            const primarySocialMediaPlatformIds = filters?.primarySocialMediaPlatformIds;
            const secondarySocialMediaPlatformIds = filters?.secondarySocialMediaPlatformIds;
            const yearOfInception = filters?.yearOfInception;
            const franchiseFee = filters?.franchiseFee;
            const leagueOwnerIds = filters?.leagueOwnerIds;
            const nccsIds = filters?.nccsIds;
            const ottPartnerIds = filters?.ottPartnerIds;
            const parentOrgIds = filters?.parentOrgIds;
            const mainpersonalityIds = filters?.mainpersonalityIds;
            const subPersonalityTraitIds = filters?.subPersonalityTraitIds;
            const sportsDealSummaryLevelIds = filters?.sportsDealSummaryLevelIds;
            const sportsDealSummaryStatusIds = filters?.sportsDealSummaryStatusIds;
            const sportsDealSummaryTerritoryIds = filters?.sportsDealSummaryTerritoryIds;
            const sportsDealSummaryTypeIds = filters?.sportsDealSummaryTypeIds;
            const taglineIds = filters?.taglineIds;
            const teamOwnerIds = filters?.teamOwnerIds;
            const sportIds = filters?.sportIds;
            const tierIds = filters?.tierIds;
            const associationLevelIds = filters?.associationLevelIds;
            const nationalityIds = filters?.nationalityIds;
            const socialMediaIds = filters?.socialMediaIds;
            const athleteStatusIds = filters?.athleteStatusIds;
            const strategyOverview = filters?.strategyOverview;

            const facebook = filters?.facebook;
            const instagram = filters?.instagram;
            const twitter = filters?.twitter;
            const linkedin = filters?.linkedin;
            const youtube = filters?.youtube;
            const website = filters?.website;

            const contactName = filters?.contactName;
            const contactDesignation = filters?.contactDesignation;
            const contactEmail = filters?.contactEmail;
            const contactNumber = filters?.contactNumber;
            const contactLinkedin = filters?.contactLinkedin;

            const reachMetrics = filters?.reachMetrics;
            const viewershipMetrics = filters?.viewershipMetrics;
            const yearMetrics = filters?.yearMetrics;
            const partnerIdMetrics = filters?.partnerIdMetrics;
            const endorsement = filters?.endorsement;

            if (ageIds && ageIds?.isMandatory === false && data?.age) {
                finalObj.age = data?.age?.some((age: any) => ageIds?.value.includes(age.id)) ? matched : notMatched;
            }

            if (athleteAge && athleteAge?.isMandatory === false && data?.athleteAge) {
                finalObj.athleteAge = "";
                const athleteAge: number = differenceInYears(new Date(), new Date(data?.athleteAge)) || 0;
                if (processedFilters?.["athleteAge"]?.operationType === "in") {
                    finalObj.athleteAge =
                        processedFilters?.["athleteAge"]?.age?.[0] <= athleteAge &&
                        athleteAge <= processedFilters?.["athleteAge"]?.age?.[1]
                            ? matched
                            : notMatched;
                } else if (processedFilters?.["athleteAge"]?.operationType === "gte") {
                    finalObj.athleteAge =
                        processedFilters?.["athleteAge"]?.age?.[0] >= athleteAge ? matched : notMatched;
                } else if (processedFilters?.["athleteAge"]?.operationType === "lte") {
                    finalObj.athleteAge =
                        processedFilters?.["athleteAge"]?.age?.[0] <= athleteAge ? matched : notMatched;
                }
            }

            if (athleteGenderIds && athleteGenderIds?.isMandatory === false && data?.athleteGender) {
                finalObj.athleteGender = athleteGenderIds?.value.includes(data?.athleteGender?.id)
                    ? matched
                    : notMatched;
            }

            if (genderIds && genderIds?.isMandatory === false && data?.gender) {
                finalObj.gender = data?.gender?.some((gender: any) => genderIds?.value.includes(gender.id))
                    ? matched
                    : notMatched;
            }

            if (nationalityIds && nationalityIds?.isMandatory === false && data?.nationality) {
                finalObj.nationality = nationalityIds?.value.includes(data?.nationality?.id) ? matched : notMatched;
            }

            if (sportIds && sportIds?.isMandatory === false && data?.sport) {
                finalObj.sport = sportIds?.value.includes(data?.sport?.id) ? matched : notMatched;
            }

            if (agencyIds && agencyIds?.isMandatory === false && data?.agency) {
                finalObj.agency = agencyIds?.value.includes(data?.agency?.id) ? matched : notMatched;
            }

            if (statusIds && statusIds?.isMandatory === false && data?.status) {
                finalObj.status = statusIds?.value?.includes(data?.status?.id) ? matched : notMatched;
            }

            if (stateIds && stateIds?.isMandatory === false && data?.state) {
                finalObj.state = data?.state?.some((state: any) => stateIds?.value.includes(state.id))
                    ? matched
                    : notMatched;
            }

            if (cityIds && cityIds?.isMandatory === false && data?.city) {
                finalObj.city = cityIds?.value.includes(data?.city?.id) ? matched : notMatched;
            }

            if (teamIds && teamIds?.isMandatory === false && data?.team) {
                finalObj.team = teamIds?.value?.includes(data?.team?.id) ? matched : notMatched;
            }

            // if (brandIds && brandIds?.isMandatory === false && data?.brand) {
            //     finalObj.brand = brandIds?.value?.includes(data?.brand?.id) ? 'Matched' : 'Not Matched';
            // }

            if (parentOrgIds && parentOrgIds?.isMandatory === false && data?.parentOrg) {
                finalObj.parentOrg = parentOrgIds?.value?.includes(data?.parentOrg?.id) ? matched : notMatched;
            }

            if (primaryMarketIds && primaryMarketIds?.isMandatory === false && data?.primaryKeyMarket) {
                finalObj.primaryKeyMarket = data?.primaryKeyMarket?.some((market: any) =>
                    primaryMarketIds?.value.includes(market.id)
                )
                    ? matched
                    : notMatched;
            }

            if (secondaryMarketIds && secondaryMarketIds?.isMandatory === false && data?.secondaryKeyMarket) {
                finalObj.secondaryKeyMarket = data?.secondaryKeyMarket?.some((market: any) =>
                    secondaryMarketIds?.value.includes(market.id)
                )
                    ? matched
                    : notMatched;
            }

            if (tertiaryIds && tertiaryIds?.isMandatory === false && data?.tertiary) {
                finalObj.tertiary = data?.tertiary?.some((market: any) => tertiaryIds?.value.includes(market.id))
                    ? matched
                    : notMatched;
            }

            if (
                primaryMarketingPlatformIds &&
                primaryMarketingPlatformIds?.isMandatory === false &&
                data?.primaryMarketingPlatform
            ) {
                finalObj.primaryMarketingPlatform = data?.primaryMarketingPlatform?.some((platform: any) =>
                    primaryMarketingPlatformIds?.value.includes(platform.id)
                )
                    ? matched
                    : notMatched;
            }

            if (
                secondaryMarketingPlatformIds &&
                secondaryMarketingPlatformIds?.isMandatory === false &&
                data?.secondaryMarketingPlatform
            ) {
                finalObj.secondaryMarketingPlatform = data?.secondaryMarketingPlatform?.some((platform: any) =>
                    secondaryMarketingPlatformIds?.value.includes(platform.id)
                )
                    ? matched
                    : notMatched;
            }

            if (contactName && contactName?.isMandatory === false && data?.contactPersons) {
                finalObj.contactName = data?.contactPersons?.some((contact: any) =>
                    contact.contactName.includes(contactName.value)
                )
                    ? matched
                    : notMatched;
            }

            if (contactEmail && contactEmail?.isMandatory === false && data?.contactPersons) {
                finalObj.contactEmail = data?.contactPersons?.some((contact: any) =>
                    contact.contactEmail?.includes(contactEmail.value)
                )
                    ? matched
                    : notMatched;
            }

            if (costOfAssociation && data?.association) {
                finalObj.association = notMatched;
                finalObj.associationValues = [];

                const cost1 = processedFilters?.["costOfAssociation"]?.cost?.[0];
                const cost2 = processedFilters?.["costOfAssociation"]?.cost?.[1];
                const operationType = processedFilters?.["costOfAssociation"]?.operationType;

                data?.association?.forEach((d) => {
                    if (!d?.costOfAssociation) return;

                    if (operationType === "in") {
                        if (cost1 <= d?.costOfAssociation && d?.costOfAssociation <= cost2) {
                            finalObj.association = matched;
                            finalObj.associationValues?.push(d);
                        }
                    } else if (operationType === "gte") {
                        if (cost1 >= athleteAge) {
                            finalObj.association = matched;
                            finalObj.associationValues?.push(d);
                        }
                    } else if (operationType === "lte") {
                        if (cost1 <= athleteAge) {
                            finalObj.association = matched;
                            finalObj.associationValues?.push(d);
                        }
                    }
                });
            }

            return finalObj;
        };

        listData?.forEach((data: AllColumns) => {
            const matchedData = matchData(data);
            finalList?.push(matchedData);
        });

        return finalList;
    }
}

export default FilterService;

const shapeRange = (valueRanges: any, operationType: string) => {
    let value11 = (valueRanges?.value1?.[0] || 0) * 1000000;
    let value12 = (valueRanges?.value1?.[1] || 0) * 1000000;
    let value21 = (valueRanges?.value2?.[0] || 0) * 1000;
    let value22 = (valueRanges?.value2?.[1] || 0) * 1000;

    let cost = [];
    if (operationType !== "in") {
        cost = [value11 + "" + value21 + ""];
    } else {
        cost = [value11 + value21 + "", value12 + value22 + ""];
    }

    return cost;
};

// "association": [
//     {
//         "associationId": "19",
//         "associationLevel": {
//             "id": "3",
//             "name": "Association level name 3"
//         },
//         "costOfAssociation": "75000000"
//     },
//     {
//         "associationId": "20",
//         "associationLevel": {
//             "id": "5",
//             "name": "Brand Ambassador"
//         },
//         "costOfAssociation": "100000000"
//     }
// ],

// reachMetrics: {"value1":[380000000],"value2":[3000000],"operationType":"gte","checkType":"ott"}
// viewershipMetrics: {"value1":[340000000],"value2":[3000000],"operationType":"lte","checkType":"ott"}
// yearMetrics: {"value1":[380000000],"value2":[1000000],"operationType":"lte","checkType":"broadcast"}
// partnerIdMetrics: {"value":["7","6"],"checkType":"broadcast"}
// endorsement: {"value":"endrosement","isActive":true}

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
