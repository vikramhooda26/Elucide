import { API_URL } from "@/lib/constants";
import AjaxService from "../AjaxService";

class TeamService {
  static createTeam(params: any) {
    return AjaxService.request(`${API_URL}/api/admin/team/create`, params, "POST");
  }

  static editTeam(id: string, params: any) {
    return AjaxService.request(`${API_URL}/api/admin/team/edit/${id}`, params, "PUT");
  }

  static getAll(params: any) {
    return AjaxService.request(API_URL + "/api/admin/team", params, "GET");
  }

  static getOne(id: string, params?: any) {
    return AjaxService.request(API_URL + "/api/admin/team/" + id, params, "GET");
  }

  static getFilteredTeams(params: any) {
    return AjaxService.request(API_URL + "/api/admin/filter/team", params, "POST");
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

    return AjaxService.request(API_URL + "/api/admin/team", params, "GET");
  }
}
export default TeamService;
