import { API_URL } from "../../lib/constants";
import AjaxService from "../AjaxService";

class TeamService {
    static createTeam(params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/team/create`,
            params,
            "POST"
        );
    }

    static editTeam(id: string, params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/team/edit/${id}`,
            params,
            "PUT"
        );
    }

    static getAll(params: any) {
        return AjaxService.request(API_URL + "/api/admin/team", params, "GET");
    }

    static getOne(id: string, params?: any) {
        return AjaxService.request(
            API_URL + "/api/admin/team/" + id,
            params,
            "GET"
        );
    }

    static getFilteredTeams(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/filter/team",
            params,
            "POST"
        );
    }
}
export default TeamService;
