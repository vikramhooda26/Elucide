import { API_URL } from "../../lib/constants";
import AjaxService from "../AjaxService";

class AthleteService {
    static create(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/athlete/create",
            params,
            "POST"
        );
    }

    static getAll(params: any) {
        return AjaxService.request(API_URL + "/api/admin/athlete", params, "GET");
    }
}
export default AthleteService;
