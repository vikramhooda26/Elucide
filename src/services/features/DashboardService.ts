import { API_URL } from "../../lib/constants";
import AjaxService from "../AjaxService";

class DashboardService {
    static master() {
        return AjaxService.request(API_URL + "/api/admin/dashboard/master", {}, "GET");
    }

    static brand() {
        return AjaxService.request(API_URL + "/api/admin/dashboard/brand", {}, "GET");
    }

    static league() {
        return AjaxService.request(API_URL + "/api/admin/dashboard/league", {}, "GET");
    }

    static team() {
        return AjaxService.request(API_URL + "/api/admin/dashboard/team", {}, "GET");
    }

    static athlete() {
        return AjaxService.request(API_URL + "/api/admin/dashboard/athlete", {}, "GET");
    }

    static getFilteredStakes(params: any) {
        return AjaxService.request(API_URL + "/api/admin/filter/multiple", params, "POST");
    }
}

export default DashboardService;
