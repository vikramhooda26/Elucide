import { API_URL, API_VERSION, LOCAL_STORAGE_KEYS } from "../../lib/constants";
import AjaxService from "../AjaxService";
import StorageService from "../common/StorageService";

class AuthService {
    static login(params: any) {
        return AjaxService.request(`${API_URL}/api/auth/login`, params, "POST");
    }

    static fetchUserDetails(userId: string) {
        return AjaxService.request(
            `${API_URL}/api/${API_VERSION}/view/${userId}`,
            "GET"
        );
    }

    static logout() {
        return AjaxService.request(`${API_URL}/api/auth/logout`, {}, "POST");
    }

    static setUser(value: any) {
        StorageService.set(LOCAL_STORAGE_KEYS.USER, value);
    }

    static getUser() {
        return StorageService.get(LOCAL_STORAGE_KEYS.USER) || {};
    }

    static clearUser() {
        StorageService.remove(LOCAL_STORAGE_KEYS.USER);
    }
}

export default AuthService;
