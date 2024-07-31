import { API_URL } from "../../lib/constants";
import AjaxService from "../AjaxService";

class LeagueService {
    static getAll(params: any) {
        return AjaxService.request(API_URL + "/api/admin/league", params, "GET");
    }
}

export default LeagueService;