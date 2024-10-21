import { AllColumns, matched, notMatched, TMatrics } from "@/types/metadata/Metadata";
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
            const costOfAssociation = filters?.costOfAssociation; // done
            const ageIds = filters?.ageIds; // done
            const genderIds = filters?.genderIds; // done
            const cityIds = filters?.cityIds; // done
            const stateIds = filters?.stateIds; // done
            const activeCampaignIds = filters?.activeCampaignIds;
            const agencyIds = filters?.agencyIds; // done
            const assetIds = filters?.assetIds;
            const broadcastPartnerIds = filters?.broadcastPartnerIds;
            const maincategoryIds = filters?.maincategoryIds; // done
            const subCategoryIds = filters?.subCategoryIds; // done
            const formatIds = filters?.formatIds;
            const primaryMarketIds = filters?.primaryMarketIds; // done
            const secondaryMarketIds = filters?.secondaryMarketIds; // done
            const tertiaryIds = filters?.tertiaryIds; // done
            const primaryMarketingPlatformIds = filters?.primaryMarketingPlatformIds; // done
            const secondaryMarketingPlatformIds = filters?.secondaryMarketingPlatformIds; // done
            const primarySocialMediaPlatformIds = filters?.primarySocialMediaPlatformIds; // done
            const secondarySocialMediaPlatformIds = filters?.secondarySocialMediaPlatformIds; // done
            const yearOfInception = filters?.yearOfInception; // done
            const franchiseFee = filters?.franchiseFee; // done
            const leagueOwnerIds = filters?.leagueOwnerIds; // done
            const nccsIds = filters?.nccsIds; // done
            const ottPartnerIds = filters?.ottPartnerIds; // done
            const parentOrgIds = filters?.parentOrgIds; // done
            const mainpersonalityIds = filters?.mainpersonalityIds; // done
            const subPersonalityTraitIds = filters?.subPersonalityTraitIds; // done
            const sportsDealSummaryLevelIds = filters?.sportsDealSummaryLevelIds;
            const sportsDealSummaryStatusIds = filters?.sportsDealSummaryStatusIds;
            const sportsDealSummaryTerritoryIds = filters?.sportsDealSummaryTerritoryIds;
            const sportsDealSummaryTypeIds = filters?.sportsDealSummaryTypeIds;
            const taglineIds = filters?.taglineIds; // done
            const teamOwnerIds = filters?.teamOwnerIds; // done
            const sportIds = filters?.sportIds;
            const tierIds = filters?.tierIds; // done
            const associationLevelIds = filters?.associationLevelIds; // done
            const nationalityIds = filters?.nationalityIds; // done
            // const socialMediaIds = filters?.socialMediaIds;
            const athleteStatusIds = filters?.athleteStatusIds; // done
            const strategyOverview = filters?.strategyOverview; // done

            const facebook = filters?.facebook; // done
            const instagram = filters?.instagram; // done
            const twitter = filters?.twitter; // done
            const linkedin = filters?.linkedin; // done
            const youtube = filters?.youtube; // done
            const website = filters?.website;  // done

            const contactName = filters?.contactName; // done
            const contactEmail = filters?.contactEmail; // done
            const contactDesignation = filters?.contactDesignation; // done
            const contactNumber = filters?.contactNumber; // done
            const contactLinkedin = filters?.contactLinkedin; // done

            const reachMetrics = filters?.reachMetrics;
            const viewershipMetrics = filters?.viewershipMetrics;
            const yearMetrics = filters?.yearMetrics;
            const partnerIdMetrics = filters?.partnerIdMetrics;
            const endorsement = filters?.endorsement; // done

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

            if (primarySocialMediaPlatformIds && primarySocialMediaPlatformIds?.isMandatory === false && data?.primaryMarketingPlatform) {
                finalObj.primaryMarketingPlatform = data?.primaryMarketingPlatform?.some((platform: any) => primarySocialMediaPlatformIds?.value.includes(platform.id)) ? matched : notMatched;
            }

            if (secondarySocialMediaPlatformIds && secondarySocialMediaPlatformIds?.isMandatory === false && data?.secondaryMarketingPlatform) {
                finalObj.primaryMarketingPlatform = data?.secondaryMarketingPlatform?.some((platform: any) => primarySocialMediaPlatformIds?.value.includes(platform.id)) ? matched : notMatched;
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

            if (contactDesignation && contactDesignation?.isMandatory === false && data?.contactPersons) {
                finalObj.contactDesignation = data?.contactPersons?.some((contact: any) => contact.contactDesignation?.includes(contactDesignation.value)) ? matched : notMatched;
            }

            if (contactNumber && contactNumber?.isMandatory === false && data?.contactPersons) {
                finalObj.contactNumber = data?.contactPersons?.some((contact: any) => contact.contactNumber?.includes(contactNumber.value)) ? matched : notMatched;
            }

            if (contactLinkedin && contactLinkedin?.isMandatory === false && data?.contactPersons) {
                finalObj.contactLinkedin = data?.contactPersons?.some((contact: any) => contact.contactLinkedin?.includes(contactLinkedin.value)) ? matched : notMatched;
            }

            if (maincategoryIds && maincategoryIds?.isMandatory === false && data?.mainCategories) {
                finalObj.mainCategories = data?.mainCategories?.some((category: any) => maincategoryIds?.value.includes(category?.id)) ? matched : notMatched;
            }

            if (subCategoryIds && subCategoryIds?.isMandatory === false && data?.mainCategories) {
                finalObj.subCategories = data?.mainCategories?.some((category: any) => category?.subCategories?.some((subCategory: any) => subCategoryIds?.value.includes(subCategory?.id))) ? matched : notMatched;
            }

            if (yearOfInception && yearOfInception?.isMandatory === false && data?.yearOfInception) {
                finalObj.yearOfInception = yearOfInception?.value === data?.yearOfInception ? matched : notMatched;
            }

            if (franchiseFee && franchiseFee?.isMandatory === false && data?.franchiseFee) {
                finalObj.franchiseFee = franchiseFee?.value === data?.franchiseFee ? matched : notMatched;
            }

            //////////////////////////////////////////////

            if (leagueOwnerIds && leagueOwnerIds.isMandatory === false && data?.owners) {
                finalObj.leagueOwners = data?.owners?.some((owner: any) => leagueOwnerIds.value.includes(owner.id)) ? matched : notMatched;
            }

            if (nccsIds && nccsIds.isMandatory === false && data?.nccs) {
                finalObj.nccs = data.nccs.some((nccs: any) => nccsIds.value.includes(nccs.id)) ? matched : notMatched;
            }

            if (ottPartnerIds && ottPartnerIds?.isMandatory === false && data?.ottPartnerMetrics) {
                finalObj.ottPartner = data?.ottPartnerMetrics?.some((matrics: any) => ottPartnerIds?.value.includes(matrics?.ottPartner?.id)) ? matched : notMatched;
            }

            if (parentOrgIds && parentOrgIds.isMandatory === false && data?.parentOrg) {
                finalObj.parentOrg = parentOrgIds.value.includes(data.parentOrg.id) ? matched : notMatched;
            }

            if (mainpersonalityIds && mainpersonalityIds.isMandatory === false && data?.mainPersonalityTraits) {
                finalObj.mainPersonalityTraits = data?.mainPersonalityTraits?.some((traits: any) => mainpersonalityIds.value.includes(traits.id)) ? matched : notMatched;
            }

            if (subPersonalityTraitIds && subPersonalityTraitIds.isMandatory === false && data?.mainPersonalityTraits) {
                finalObj.subPersonalityTraits = data?.mainPersonalityTraits?.some((traits: any) => traits?.subPersonalityTraits?.some((subTraits: any) => subPersonalityTraitIds?.value.includes(subTraits?.id))) ? matched : notMatched;
            }

            // if (sportsDealSummaryLevelIds && sportsDealSummaryLevelIds.isMandatory === false && data?.sportsDealSummaryLevels) {
            //     finalObj.sportsDealSummaryLevels = sportsDealSummaryLevelIds.value.includes(data.sportsDealSummaryLevels.id) ? matched : notMatched;
            // }

            // if (sportsDealSummaryStatusIds && sportsDealSummaryStatusIds.isMandatory === false && data?.sportsDealSummaryStatus) {
            //     finalObj.sportsDealSummaryStatus = sportsDealSummaryStatusIds.value.includes(data.sportsDealSummaryStatus.id) ? matched : notMatched;
            // }

            // if (sportsDealSummaryTerritoryIds && sportsDealSummaryTerritoryIds.isMandatory === false && data?.sportsDealSummaryTerritories) {
            //     finalObj.sportsDealSummaryTerritories = sportsDealSummaryTerritoryIds.value.includes(data.sportsDealSummaryTerritories.id) ? matched : notMatched;
            // }

            // if (sportsDealSummaryTypeIds && sportsDealSummaryTypeIds.isMandatory === false && data?.sportsDealSummaryTypes) {
            //     finalObj.sportsDealSummaryTypes = sportsDealSummaryTypeIds.value.includes(data.sportsDealSummaryTypes.id) ? matched : notMatched;
            // }

            if (taglineIds && taglineIds.isMandatory === false && data?.taglines) {
                finalObj.taglines = data.taglines.some((tag: any) => taglineIds.value.includes(tag.id)) ? matched : notMatched;
            }

            if (teamOwnerIds && teamOwnerIds.isMandatory === false && data?.owners) {
                finalObj.teamOwners = data?.owners?.some((owner: any) => teamOwnerIds.value.includes(owner.id)) ? matched : notMatched;
            }

            if (tierIds && tierIds.isMandatory === false && data?.tiers) {
                finalObj.tiers = data.tiers.some((tier: any) => tierIds.value.includes(tier.id)) ? matched : notMatched;
            }

            if (associationLevelIds && associationLevelIds?.isMandatory === false && data?.association) {
                finalObj.associationLevel = data?.association?.some((association: any) => associationLevelIds?.value.includes(association?.associationLevel?.id)) ? matched : notMatched;
            }

            // if (socialMediaIds && socialMediaIds.isMandatory === false && data?.socialMedia) {
            //     finalObj.socialMedia = data.socialMedia.some((media: any) => socialMediaIds.value.includes(media.id)) ? matched : notMatched;
            // }

            if (athleteStatusIds && athleteStatusIds.isMandatory === false && data?.status) {
                finalObj.status = athleteStatusIds.value.includes(data.status.id) ? matched : notMatched;
            }

            if (strategyOverview && strategyOverview.isMandatory === false && data?.strategyOverview) {
                finalObj.strategyOverview = strategyOverview.value.includes(data.strategyOverview) ? matched : notMatched;
            }

            if (facebook && facebook.isMandatory === false && data?.facebook) {
                finalObj.facebook = facebook.value.includes(data.facebook) ? matched : notMatched;
            }

            if (instagram && instagram.isMandatory === false && data?.instagram) {
                finalObj.instagram = instagram.value.includes(data.instagram) ? matched : notMatched;
            }

            if (twitter && twitter.isMandatory === false && data?.twitter) {
                finalObj.twitter = twitter.value.includes(data.twitter) ? matched : notMatched;
            }

            if (linkedin && linkedin.isMandatory === false && data?.linkedin) {
                finalObj.linkedin = linkedin.value.includes(data.linkedin) ? matched : notMatched;
            }

            if (youtube && youtube.isMandatory === false && data?.youtube) {
                finalObj.youtube = youtube.value.includes(data.youtube) ? matched : notMatched;
            }

            if (website && website.isMandatory === false && data?.website) {
                finalObj.website = website.value.includes(data.website) ? matched : notMatched;
            }

            //////////////////////////////////////////////


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
                    } else if (operationType === 'gte') {
                        if (cost1 >= d?.costOfAssociation) {
                            finalObj.association = matched;
                            finalObj.associationValues?.push(d);
                        }
                    } else if (operationType === 'lte') {
                        if (cost1 <= d?.costOfAssociation) {
                            finalObj.association = matched;
                            finalObj.associationValues?.push(d);
                        }
                    }
                });
            }

            const checkMatrics = (matricsType: 'ottPartnerMetrics' | 'broadcastPartnerMetrics', filterType: 'ott' | 'broadcast') => {
                finalObj.reachMetrics = notMatched;
                finalObj.viewershipMetrics = notMatched;
                finalObj.yearMetrics = notMatched;

                data?.[matricsType]?.forEach((matricsData: TMatrics) => {
                    if (reachMetrics && finalObj?.reachMetrics === notMatched) {
                        finalObj.reachMetrics = validateMatrics(processedFilters?.['reachMetrics'], matricsData, 'reach', filterType,)
                    }
                    if (viewershipMetrics && finalObj?.viewershipMetrics === notMatched) {
                        finalObj.viewershipMetrics = validateMatrics(processedFilters?.['viewershipMetrics'], matricsData, 'viewership', filterType,)
                    }
                    if (yearMetrics && finalObj.yearMetrics === notMatched) {
                        finalObj.yearMetrics = validateMatrics(processedFilters?.['yearMetrics'], matricsData, 'year', filterType,)
                    }

                    if (partnerIdMetrics && finalObj.partnerIdMetrics === notMatched) {
                        finalObj.partnerIdMetrics = partnerIdMetrics?.value?.includes(filterType === 'ott' ? matricsData?.ottPartner?.id : matricsData?.broadcastPartner?.id) ? matched : notMatched;
                    }
                });
            }

            if (reachMetrics && data?.ottPartnerMetrics) {
                checkMatrics('ottPartnerMetrics', 'ott');
            }

            if (reachMetrics && data?.broadcastPartnerMetrics) {
                checkMatrics('broadcastPartnerMetrics', 'broadcast');
            }

            if (endorsement && endorsement.isMandatory === false && data?.endorsement) {
                finalObj.endorsement = data?.endorsement?.some((endorse: any) => endorsement?.value?.name?.includes(endorse?.name) && endorsement?.value?.isActive === endorse?.active) ? matched : notMatched;
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


const validateMatrics = (matricsFilters: { [key: string]: string; }, matricsData: TMatrics, valueKey: 'reach' | 'year' | 'viewership', filterType: 'ott' | 'broadcast') => {
    let cost1 = Number(matricsFilters?.[valueKey]?.[0]);
    let cost2 = Number(matricsFilters?.[valueKey]?.[1]);
    let value = Number(matricsData?.[valueKey]);
    let operationType = matricsFilters?.operationType;
    let partnerType = matricsFilters?.partnerType;

    if (operationType === 'in' && partnerType === filterType) {
        if (cost1 <= value && value <= cost2) {
            return matched;
        }
    } else if (operationType === 'gte' && partnerType === filterType) {
        if (cost1 >= value) {
            return matched;
        }
    } else if (operationType === 'lte' && partnerType === filterType) {
        if (cost1 <= value) {
            return matched;
        }
    }
    return notMatched;
}

// {
//     "reachMetrics": {
//         "reach": [
//             "0",
//             "7000000"
//         ],
//         "operationType": "in",
//         "partnerType": "ott"
//     },
//     "viewershipMetrics": {
//         "viewership": [
//             "0",
//             "6000000"
//         ],
//        "operationType": "in",
//        "partnerType": "ott"
//     },
//     "partnerIdMetrics": {
//         "partnerIds": [
//             "7",
//             "4"
//         ],
//         "partnerType": "ott"
//     },
//     "yearMetrics": {
//         "year": [
//             "0",
//             "6600000"
//         ],
//         "operationType": "in",
//         "partnerType": "ott"
//     }
// }

// "ottPartnerMetrics": [
//             {
//                 "id": "21",
//                 "viewership": "2500000",
//                 "reach": "2500032103",
//                 "year": "2024",
//                 "ottPartner": {
//                     "id": "4",
//                     "name": "Hotstar"
//                 }
//             },
//             {
//                 "id": "22",
//                 "viewership": "160000",
//                 "reach": "1200000",
//                 "year": "2024",
//                 "ottPartner": {
//                     "id": "3",
//                     "name": "Jio Cinema"
//                 }
//             }
//         ],

// "broadcastPartnerMetrics": [
//             {
//                 "id": "20",
//                 "reach": "39821738127983",
//                 "viewership": "1236182873",
//                 "year": "2020",
//                 "broadcastPartner": {
//                     "id": "4",
//                     "name": "Viacom18"
//                 }
//             },
//             {
//                 "id": "21",
//                 "reach": "9210931923091",
//                 "viewership": "9213012390",
//                 "year": "2020",
//                 "broadcastPartner": {
//                     "id": "6",
//                     "name": "Sports18 Khel"
//                 }
//             }
//         ]

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
