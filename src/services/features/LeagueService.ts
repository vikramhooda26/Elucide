import { API_URL } from "../../lib/constants";
import AjaxService from "../AjaxService";

class LeagueService {
    static getAll() {
        return AjaxService.request(API_URL + "/api/admin/league", "GET");
    }

    static getOne(id: string, params?: any) {
        return AjaxService.request(
            API_URL + "/api/admin/league/" + id,
            params,
            "GET"
        );
    }

    static createLeague(params?: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/league/create`,
            params,
            "POST"
        );
    }

    static editLeague(id: string, params?: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/league/edit/${id}`,
            params,
            "PUT"
        );
    }
}

export default LeagueService;
