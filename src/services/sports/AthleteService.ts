import { API_ENDPOINT } from "../../constant";
import AjaxService from "../AjaxService";

class AthleteService {
    static create(params: any) {
        return AjaxService.request(
            API_ENDPOINT + "/api/admin/athlete/create",
            params,
            "POST"
        );
    }
}
export default AthleteService;