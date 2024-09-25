import { API_URL } from "../../lib/constants";
import AjaxService from "../AjaxService";

class UserService {
    static createUser(params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/user/create`,
            params,
            "POST"
        );
    }

    static editUser(id: string, params: any) {
        return AjaxService.request(
            `${API_URL}/api/admin/user/edit/${id}`,
            params,
            "PUT"
        );
    }

    static deleteUser(id: string) {
        return AjaxService.request(
            `${API_URL}/api/admin/user/delete/${id}`,
            {},
            "DELETE"
        );
    }

    static getAllUsers() {
        return AjaxService.request(API_URL + "/api/admin/user", {}, "GET");
    }

    static fetchUserDetails() {
        return AjaxService.request(
            `${API_URL}/api/admin/user/get-by-id`,
            {},
            "GET"
        );
    }

    static getUserById(id: string) {
        return AjaxService.request(
            `${API_URL}/api/admin/user/${id}`,
            {},
            "GET"
        );
    }
}
export default UserService;
