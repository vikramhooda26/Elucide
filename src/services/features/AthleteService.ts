import { API_URL } from "@/lib/constants";
import AjaxService from "../AjaxService";

class AthleteService {
  static createAthlete(params: any) {
    return AjaxService.request(API_URL + "/api/admin/athlete/create", params, "POST");
  }

  static editAthlete(id: string, params: any) {
    return AjaxService.request(API_URL + "/api/admin/athlete/edit/" + id, params, "PUT");
  }

  static getAll() {
    return AjaxService.request(API_URL + "/api/admin/athlete", "GET");
  }

  static getPaginated(page: number, pageSize: number, sorting?: { id: string; desc: boolean }[], search?: string) {
    const skip = page * pageSize;
    const take = pageSize;

    const params: any = { skip, take };

    if (sorting && sorting.length > 0) {
      const sort = sorting[0];

      params.orderBy = sort.id;
      params.orderDirection = sort.desc ? "desc" : "asc";
    }

    if (search && search.trim() !== "") {
      params.search = search.trim();
    }

    return AjaxService.request(API_URL + "/api/admin/athlete", params, "GET");
  }

  static getOne(id: string, params?: any) {
    return AjaxService.request(API_URL + "/api/admin/athlete/" + id, params, "GET");
  }

  static getFilteredAthletes(params: any) {
    return AjaxService.request(API_URL + "/api/admin/filter/athlete", params, "POST");
  }
}
export default AthleteService;
