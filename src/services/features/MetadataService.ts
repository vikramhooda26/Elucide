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

    static getAllCity(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/city/get-all",
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

    static getAllMainCategory(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/category/get-all",
            params,
            "GET"
        );
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

    static createActivation(params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/activation/create`,
            params,
            "POST"
        );
    }
}
export default MetadataService;
