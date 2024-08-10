import { API_URL } from "../../lib/constants";
import AjaxService from "../AjaxService";

class MetadataService {
    static getAllAge(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/age-range/get-all",
            params,
            "GET"
        );
    }

    static getOneAgeRange(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/age-range/" + id, params, "GET");
    }

    static getAllCity(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/city/get-all",
            params,
            "GET"
        );
    }

    static getAllSport(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/sport/get-all",
            params,
            "GET"
        );
    }

    static getAllCountry(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/nationality/get-all",
            params,
            "GET"
        );
    }

    static getAllTier(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/tier/get-all",
            params,
            "GET"
        );
    }

    static getAllTerritory(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/territory/get-all",
            params,
            "GET"
        );
    }

    static getAllTeamOwner(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/team-owner/get-all",
            params,
            "GET"
        );
    }

    static getAllTagline(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/tagline/get-all",
            params,
            "GET"
        );
    }

    static getAllParentOrg(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/parent-org/get-all",
            params,
            "GET"
        );
    }

    static getAllMarketingPlatform(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/marketing-platform/get-all",
            params,
            "GET"
        );
    }

    static getAllOttPartner(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/ott-partner/get-all",
            params,
            "GET"
        );
    }

    static getAllSubPersonality(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/sub-personality/get-all",
            params,
            "GET"
        );
    }

    static getOneSubPersonality(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/sub-personality/" + id, params, "GET");
    }

    static getAllLevel(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/level/get-all",
            params,
            "GET"
        );
    }

    static getAllSubCategory(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/subcategory/get-all",
            params,
            "GET"
        );
    }

    static getOneSubCategory(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/subcategory/" + id, params, "GET");
    }

    static getAllKeyMarket(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/key-market/get-all",
            params,
            "GET"
        );
    }

    static getAllLeagueOwner(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/league-owner/get-all",
            params,
            "GET"
        );
    }

    static getAllNccs(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/nccs/get-all",
            params,
            "GET"
        );
    }

    static getAllMainCategory(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/category/get-all",
            params,
            "GET"
        );
    }

    static getOneCategory(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/category/" + id, params, "GET");
    }

    static getAllState(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/state/get-all",
            params,
            "GET"
        );
    }

    static getAllBroadcastPartner(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/broadcast-partner/get-all",
            params,
            "GET"
        );
    }

    static getAllAsset(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/asset/get-all",
            params,
            "GET"
        );
    }

    static getAllAgency(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/agency/get-all",
            params,
            "GET"
        );
    }

    static getAllGender(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/gender/get-all",
            params,
            "GET"
        );
    }

    static getAllActivation(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/activation/get-all",
            params,
            "GET"
        );
    }

    static getOneActivation(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/activation/" + id, params, "GET");
    }

    static getAllActiveCampaign(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/active-campaign/get-all",
            params,
            "GET"
        );
    }

    static getAllPersonality(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/personality/get-all",
            params,
            "GET"
        );
    }

    static getOnePersonality(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/personality/" + id, params, "GET");
    }

    static getAllSportsDealSummary(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/sports-deal-summary/get-all",
            params,
            "GET"
        );
    }

    static createSportsDealSummary(params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/sports-deal-summary/create`,
            params,
            "POST"
        );
    }

    static getOneSportsDealSummary(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/sports-deal-summary/" + id, params, "GET");
    }

    static createActivation(params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/activation/create`,
            params,
            "POST"
        );
    }

    static createActiveCampaign(params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/active-campaign/create`,
            params,
            "POST"
        );
    }

    static createGender(params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/gender/create`,
            params,
            "POST"
        );
    }

    static createAgency(params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/agency/create`,
            params,
            "POST"
        );
    }

    static createAsset(params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/asset/create`,
            params,
            "POST"
        );
    }

    static createTagline(params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/tagline/create`,
            params,
            "POST"
        );
    }

    static createSport(params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/sport/create`,
            params,
            "POST"
        );
    }

    static createNationality(params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/nationality/create`,
            params,
            "POST"
        );
    }

    static createTier(params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/tier/create`,
            params,
            "POST"
        );
    }

    static createTerritory(params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/territory/create`,
            params,
            "POST"
        );
    }

    static createTeamOwner(params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/team-owner/create`,
            params,
            "POST"
        );
    }

    static createParentOrg(params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/parent-org/create`,
            params,
            "POST"
        );
    }

    static createOttPartner(params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/ott-partner/create`,
            params,
            "POST"
        );
    }

    static createMarketingPlatform(params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/marketing-platform/create`,
            params,
            "POST"
        );
    }

    static createLevel(params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/level/create`,
            params,
            "POST"
        );
    }

    static createSubpersonality(params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/sub-personality/create`,
            params,
            "POST"
        );
    }

    static createLeagueOwner(params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/league-owner/create`,
            params,
            "POST"
        );
    }

    static createKeyMarket(params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/key-market/create`,
            params,
            "POST"
        );
    }

    static createNccs(params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/nccs/create`,
            params,
            "POST"
        );
    }

    static createMaincategory(params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/category/create`,
            params,
            "POST"
        );
    }

    static createCity(params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/city/create`,
            params,
            "POST"
        );
    }

    static createState(params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/state/create`,
            params,
            "POST"
        );
    }

    static createSubcategory(params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/subcategory/create`,
            params,
            "POST"
        );
    }

    static createBroadcastPartner(params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/broadcast-partner/create`,
            params,
            "POST"
        );
    }

    static createMainPersonality(params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/personality/create`,
            params,
            "POST"
        );
    }

    static createSubPersonality(params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/sub-personality/create`,
            params,
            "POST"
        );
    }

    static createAgeRange(params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/age-range/create`,
            params,
            "POST"
        );
    }
}
export default MetadataService;
