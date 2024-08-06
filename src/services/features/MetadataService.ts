import { API_URL } from "../../lib/constants";
import AjaxService from "../AjaxService";

class MetadataService {
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
