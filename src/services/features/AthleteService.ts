import { API_URL } from "../../lib/constants";
import AjaxService from "../AjaxService";

class AthleteService {
    static createAthlete(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/athlete/create",
            params,
            "POST"
        );
    }

    static editAthlete(id: string, params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/athlete/edit/" + id,
            params,
            "PUT"
        );
    }

    static getAll(params: any) {
        return AjaxService.request(
            API_URL + "/api/admin/athlete",
            params,
            "GET"
        );
    }

    static getOne(id: string, params?: any) {
        return AjaxService.request(
            API_URL + "/api/admin/athlete/" + id,
            params,
            "GET"
        );
    }
}
export default AthleteService;
