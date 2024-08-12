import { API_URL } from "../../lib/constants";
import AjaxService from "../AjaxService";

class BrandService {
    static getAll(params: any) {
        return AjaxService.request(API_URL + "/api/admin/brand", params, "GET");
    }

    static getOne(id: string, params?: any) {
        return AjaxService.request(
            API_URL + "/api/admin/brand/" + id,
            params,
            "GET"
        );
    }

    static createBrand(params?: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/brand/create`,
            params,
            "POST"
        );
    }

    static editBrand(id: string, params?: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/brand/edit/${id}`,
            params,
            "PUT"
        );
    }
}
export default BrandService;
