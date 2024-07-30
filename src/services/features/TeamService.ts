import { API_URL } from "../../lib/constants";
import AjaxService from "../AjaxService";

class TeamService {
    static getAll(params: any) {
        return AjaxService.request(API_URL + "/api/admin/team", params, "GET");
    }
}
export default TeamService;