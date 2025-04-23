import { API_URL } from "../../lib/constants";
import AjaxService from "../AjaxService";

class LeagueService {
  static getAll() {
    return AjaxService.request(API_URL + "/api/admin/league", "GET");
  }

  static getOne(id: string, params?: any) {
    return AjaxService.request(API_URL + "/api/admin/league/" + id, params, "GET");
  }

  static createLeague(params?: any) {
    return AjaxService.request(`${API_URL}/api/admin/league/create`, params, "POST");
  }

  static editLeague(id: string, params?: any) {
    return AjaxService.request(`${API_URL}/api/admin/league/edit/${id}`, params, "PUT");
  }

  static getFilteredLeagues(params: any) {
    return AjaxService.request(API_URL + "/api/admin/filter/league", params, "POST");
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

    return AjaxService.request(API_URL + "/api/admin/league", params, "GET");
  }
}

export default LeagueService;
