import { API_URL } from "../../lib/constants";
import AjaxService from "../AjaxService";

class MetadataService {
    static getAllAge(params: any) {
        return AjaxService.request(API_URL + "/api/admin/age-range/get-all", params, "GET");
    }

    static editAgeRange(id: string, params: any) {
        return AjaxService.request(API_URL + "/api/admin/age-range/edit/" + id, params, "PUT");
    }

    static editTerritory(id: string, params: any) {
        return AjaxService.request(API_URL + "/api/admin/territory/edit/" + id, params, "PUT");
    }

    static editTagline(id: string, params: any) {
        return AjaxService.request(API_URL + "/api/admin/tagline/edit/" + id, params, "PUT");
    }

    static editSport(id: string, params: any) {
        return AjaxService.request(API_URL + "/api/admin/sport/edit/" + id, params, "PUT");
    }

    static getOneAgeRange(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/age-range/" + id, params, "GET");
    }

    static getOneNationality(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/nationality/" + id, params, "GET");
    }

    static getOneTier(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/tier/" + id, params, "GET");
    }

    static getOneTeamOwner(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/team-owner/" + id, params, "GET");
    }

    static getOneTagline(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/tagline/" + id, params, "GET");
    }

    static getOneSport(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/sport/" + id, params, "GET");
    }

    static getOneParentOrg(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/parent-org/" + id, params, "GET");
    }

    static getOneOttPartner(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/ott-partner/" + id, params, "GET");
    }

    static getOneKeyMarket(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/key-market/" + id, params, "GET");
    }

    static getOneMarketingPlatform(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/marketing-platform/" + id, params, "GET");
    }

    static editMarketingPlatform(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/marketing-platform/edit/" + id, params, "PUT");
    }

    static getOneNccsClass(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/nccs/" + id, params, "GET");
    }

    static getOneCity(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/city/" + id, params, "GET");
    }

    static editCity(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/city/edit/" + id, params, "PUT");
    }

    static editCategory(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/category/edit/" + id, params, "PUT");
    }

    static getOneState(id: string) {
        return AjaxService.request(API_URL + "/api/admin/state/" + id, "GET");
    }

    static getOneBroadcastPartner(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/broadcast-partner/" + id, params, "GET");
    }

    static getAllCity(params: any) {
        return AjaxService.request(API_URL + "/api/admin/city/get-all", params, "GET");
    }

    static getAllSport(params: any) {
        return AjaxService.request(API_URL + "/api/admin/sport/get-all", params, "GET");
    }

    static getAllCountry(params: any) {
        return AjaxService.request(API_URL + "/api/admin/nationality/get-all", params, "GET");
    }

    static getAllTier(params: any) {
        return AjaxService.request(API_URL + "/api/admin/tier/get-all", params, "GET");
    }

    static getAllTerritory(params: any) {
        return AjaxService.request(API_URL + "/api/admin/territory/get-all", params, "GET");
    }

    static getAllTeamOwner(params: any) {
        return AjaxService.request(API_URL + "/api/admin/team-owner/get-all", params, "GET");
    }

    static getAllTagline(params: any) {
        return AjaxService.request(API_URL + "/api/admin/tagline/get-all", params, "GET");
    }

    static getAllParentOrg(params: any) {
        return AjaxService.request(API_URL + "/api/admin/parent-org/get-all", params, "GET");
    }

    static getAllMarketingPlatform(params: any) {
        return AjaxService.request(API_URL + "/api/admin/marketing-platform/get-all", params, "GET");
    }

    static getAllOttPartner(params: any) {
        return AjaxService.request(API_URL + "/api/admin/ott-partner/get-all", params, "GET");
    }

    static getAllSubPersonality(params: any) {
        return AjaxService.request(API_URL + "/api/admin/sub-personality/get-all", params, "GET");
    }

    static getOneSubPersonality(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/sub-personality/" + id, params, "GET");
    }

    static editSubPersonality(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/sub-personality/edit/" + id, params, "PUT");
    }

    static getAllLevel(params: any) {
        return AjaxService.request(API_URL + "/api/admin/level/get-all", params, "GET");
    }

    static getAllSubCategory(params: any) {
        return AjaxService.request(API_URL + "/api/admin/subcategory/get-all", params, "GET");
    }

    static getOneSubCategory(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/subcategory/" + id, params, "GET");
    }

    static getAllKeyMarket(params: any) {
        return AjaxService.request(API_URL + "/api/admin/key-market/get-all", params, "GET");
    }

    static getAllLeagueOwner(params: any) {
        return AjaxService.request(API_URL + "/api/admin/league-owner/get-all", params, "GET");
    }

    static getAllNccs(params: any) {
        return AjaxService.request(API_URL + "/api/admin/nccs/get-all", params, "GET");
    }

    static getAllMainCategory(params: any) {
        return AjaxService.request(API_URL + "/api/admin/category/get-all", params, "GET");
    }

    static getOneCategory(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/category/" + id, params, "GET");
    }

    static getAllState(params: any) {
        return AjaxService.request(API_URL + "/api/admin/state/get-all", params, "GET");
    }

    static getAllBroadcastPartner(params: any) {
        return AjaxService.request(API_URL + "/api/admin/broadcast-partner/get-all", params, "GET");
    }

    static getAllAsset(params: any) {
        return AjaxService.request(API_URL + "/api/admin/asset/get-all", params, "GET");
    }

    static getAllAgency(params: any) {
        return AjaxService.request(API_URL + "/api/admin/agency/get-all", params, "GET");
    }

    static getAllGender(params: any) {
        return AjaxService.request(API_URL + "/api/admin/gender/get-all", params, "GET");
    }

    static getAllActivation(params: any) {
        return AjaxService.request(API_URL + "/api/admin/activation/get-all", params, "GET");
    }

    static getOneActivation(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/activation/" + id, params, "GET");
    }

    static getAllActiveCampaign(params: any) {
        return AjaxService.request(API_URL + "/api/admin/active-campaign/get-all", params, "GET");
    }

    static getAllPersonality(params: any) {
        return AjaxService.request(API_URL + "/api/admin/personality/get-all", params, "GET");
    }

    static getOnePersonality(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/personality/" + id, params, "GET");
    }

    static getAllSportsDealSummary(params: any) {
        return AjaxService.request(API_URL + "/api/admin/sports-deal-summary/get-all", params, "GET");
    }

    static createSportsDealSummary(params: any) {
        return AjaxService.request(`${API_URL}/api/admin/sports-deal-summary/create`, params, "POST");
    }

    static editSportsDealSummary(id: string, params: any) {
        return AjaxService.request(`${API_URL}/api/admin/sports-deal-summary/edit/${id}`, params, "PUT");
    }

    static getOneSportsDealSummary(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/sports-deal-summary/" + id, params, "GET");
    }

    static createActivation(params: any) {
        return AjaxService.request(`${API_URL}/api/admin/activation/create`, params, "POST");
    }

    static createActiveCampaign(params: any) {
        return AjaxService.request(`${API_URL}/api/admin/active-campaign/create`, params, "POST");
    }

    static editActiveCampign(id: string, params: any) {
        return AjaxService.request(`${API_URL}/api/admin/active-campaign/edit/${id}`, params, "PUT");
    }

    static createGender(params: any) {
        return AjaxService.request(`${API_URL}/api/admin/gender/create`, params, "POST");
    }

    static editGender(id: string, params: any) {
        return AjaxService.request(`${API_URL}/api/admin/gender/edit/${id}`, params, "PUT");
    }

    static createAgency(params: any) {
        return AjaxService.request(`${API_URL}/api/admin/agency/create`, params, "POST");
    }

    static editAgency(id: string, params: any) {
        return AjaxService.request(`${API_URL}/api/admin/agency/edit/${id}`, params, "PUT");
    }

    static createAsset(params: any) {
        return AjaxService.request(`${API_URL}/api/admin/asset/create`, params, "POST");
    }

    static editAsset(id: string, params: any) {
        return AjaxService.request(`${API_URL}/api/admin/asset/edit/${id}`, params, "PUT");
    }

    static createTagline(params: any) {
        return AjaxService.request(`${API_URL}/api/admin/tagline/create`, params, "POST");
    }

    static createSport(params: any) {
        return AjaxService.request(`${API_URL}/api/admin/sport/create`, params, "POST");
    }

    static createNationality(params: any) {
        return AjaxService.request(`${API_URL}/api/admin/nationality/create`, params, "POST");
    }

    static editNationality(id: string, params: any) {
        return AjaxService.request(`${API_URL}/api/admin/nationality/edit/${id}`, params, "PUT");
    }

    static createTier(params: any) {
        return AjaxService.request(`${API_URL}/api/admin/tier/create`, params, "POST");
    }

    static updateTier(id: string, params: any) {
        return AjaxService.request(`${API_URL}/api/admin/tier/edit/${id}`, params, "PUT");
    }

    static createTerritory(params: any) {
        return AjaxService.request(`${API_URL}/api/admin/territory/create`, params, "POST");
    }

    static createTeamOwner(params: any) {
        return AjaxService.request(`${API_URL}/api/admin/team-owner/create`, params, "POST");
    }

    static createParentOrg(params: any) {
        return AjaxService.request(`${API_URL}/api/admin/parent-org/create`, params, "POST");
    }

    static editParentOrg(id: string, params: any) {
        return AjaxService.request(`${API_URL}/api/admin/parent-org/edit/${id}`, params, "PUT");
    }

    static editTeamOwner(id: string, params: any) {
        return AjaxService.request(`${API_URL}/api/admin/team-owner/edit/${id}`, params, "PUT");
    }

    static createOttPartner(params: any) {
        return AjaxService.request(`${API_URL}/api/admin/ott-partner/create`, params, "POST");
    }

    static editOttPartner(id: string, params: any) {
        return AjaxService.request(`${API_URL}/api/admin/ott-partner/edit/${id}`, params, "PUT");
    }

    static createMarketingPlatform(params: any) {
        return AjaxService.request(`${API_URL}/api/admin/marketing-platform/create`, params, "POST");
    }

    static createLevel(params: any) {
        return AjaxService.request(`${API_URL}/api/admin/level/create`, params, "POST");
    }

    static editLevel(id: string, params: any) {
        return AjaxService.request(`${API_URL}/api/admin/level/edit/${id}`, params, "PUT");
    }

    static createSubpersonality(params: any) {
        return AjaxService.request(`${API_URL}/api/admin/sub-personality/create`, params, "POST");
    }

    static createLeagueOwner(params: any) {
        return AjaxService.request(`${API_URL}/api/admin/league-owner/create`, params, "POST");
    }

    static editLeagueOwner(id: string, params: any) {
        return AjaxService.request(`${API_URL}/api/admin/league-owner/edit/${id}`, params, "PUT");
    }

    static createKeyMarket(params: any) {
        return AjaxService.request(`${API_URL}/api/admin/key-market/create`, params, "POST");
    }

    static editKeyMarket(id: string, params: any) {
        return AjaxService.request(`${API_URL}/api/admin/key-market/edit/${id}`, params, "PUT");
    }

    static createNccs(params: any) {
        return AjaxService.request(`${API_URL}/api/admin/nccs/create`, params, "POST");
    }

    static editNccs(id: string, params: any) {
        return AjaxService.request(`${API_URL}/api/admin/nccs/edit/${id}`, params, "PUT");
    }

    static createMaincategory(params: any) {
        return AjaxService.request(`${API_URL}/api/admin/category/create`, params, "POST");
    }

    static createCity(params: any) {
        return AjaxService.request(`${API_URL}/api/admin/city/create`, params, "POST");
    }

    static createState(params: any) {
        return AjaxService.request(`${API_URL}/api/admin/state/create`, params, "POST");
    }

    static editState(id: string, params: any) {
        return AjaxService.request(`${API_URL}/api/admin/state/edit/${id}`, params, "PUT");
    }

    static createSubcategory(params: any) {
        return AjaxService.request(`${API_URL}/api/admin/subcategory/create`, params, "POST");
    }

    static editSubcategory(id: string, params: any) {
        return AjaxService.request(`${API_URL}/api/admin/subcategory/edit/${id}`, params, "PUT");
    }

    static createBroadcastPartner(params: any) {
        return AjaxService.request(`${API_URL}/api/admin/broadcast-partner/create`, params, "POST");
    }

    static editBroadcastPartner(id: string, params: any) {
        return AjaxService.request(`${API_URL}/api/admin/broadcast-partner/edit/${id}`, params, "PUT");
    }

    static createMainPersonality(params: any) {
        return AjaxService.request(`${API_URL}/api/admin/personality/create`, params, "POST");
    }

    static editMainPersonality(id: String, params: any) {
        return AjaxService.request(`${API_URL}/api/admin/personality/edit/${id}`, params, "PUT");
    }

    static createSubPersonality(params: any) {
        return AjaxService.request(`${API_URL}/api/admin/sub-personality/create`, params, "POST");
    }

    static createAgeRange(params: any) {
        return AjaxService.request(`${API_URL}/api/admin/age-range/create`, params, "POST");
    }

    static deleteData(id: string, apiEndPoint: string) {
        return AjaxService.request(API_URL + apiEndPoint + id, {}, "DELETE");
    }

    static getAllAssociationLevel(params: any) {
        return AjaxService.request(API_URL + "/api/admin/association-level/get-all", params, "GET");
    }

    static createAssociationLevel(params: any) {
        return AjaxService.request(`${API_URL}/api/admin/association-level/create`, params, "POST");
    }

    static editAssociationLevel(id: string, params: any) {
        return AjaxService.request(`${API_URL}/api/admin/association-level/edit/${id}`, params, "PUT");
    }

    static editActivationSummary(id: string, params: any) {
        return AjaxService.request(`${API_URL}/api/admin/activation/edit/${id}`, params, "PUT");
    }

    static getOneAssociationLevel(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/association-level/" + id, params, "GET");
    }

    static getOneGender(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/gender/" + id, params, "GET");
    }

    static getOneTerritory(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/territory/" + id, params, "GET");
    }

    static getOneLevel(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/level/" + id, params, "GET");
    }

    static getOneLeagueOwner(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/league-owner/" + id, params, "GET");
    }

    static getOneSubcategory(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/subcategory/" + id, params, "GET");
    }

    static getOneAsset(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/asset/" + id, params, "GET");
    }

    static getOneAgency(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/agency/" + id, params, "GET");
    }

    static getOneActiveCampaign(id: string, params?: any) {
        return AjaxService.request(API_URL + "/api/admin/active-campaign/" + id, params, "GET");
    }
}
export default MetadataService;
