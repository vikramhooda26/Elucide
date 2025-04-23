import { API_URL } from "../../lib/constants";
import AjaxService from "../AjaxService";

class BrandService {
  static getAll(params: any) {
    return AjaxService.request(API_URL + "/api/admin/brand", params, "GET");
  }

  static getOne(id: string, params?: any) {
    return AjaxService.request(API_URL + "/api/admin/brand/" + id, params, "GET");
  }

  static createBrand(params?: any) {
    return AjaxService.request(`${API_URL}/api/admin/brand/create`, params, "POST");
  }

  static editBrand(id: string, params?: any) {
    return AjaxService.request(`${API_URL}/api/admin/brand/edit/${id}`, params, "PUT");
  }

  static getFilteredBrands(params: any) {
    return AjaxService.request(API_URL + "/api/admin/filter/brand", params, "POST");
  }

  static getPaginated(page: number, pageSize: number, sorting?: { id: string; desc: boolean }[]) {
    const skip = page * pageSize;
    const take = pageSize;

    const params: any = { skip, take };

    if (sorting && sorting.length > 0) {
      const sort = sorting[0];

      params.orderBy = sort.id;
      params.orderDirection = sort.desc ? "desc" : "asc";
    }

    return AjaxService.request(API_URL + "/api/admin/brand", params, "GET");
  }
}
export default BrandService;
