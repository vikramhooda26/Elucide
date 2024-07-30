import { API_URL } from "../../lib/constants";
import AjaxService from "../AjaxService";

class BrandService {
    static getAll(params: any) {
        return AjaxService.request(API_URL + "/api/admin/brand", params, "GET");
    }
}
export default BrandService;