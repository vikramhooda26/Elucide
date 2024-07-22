import { API_ENDPOINT, API_VERSION } from "../../constant";
import AjaxService from "../AjaxService";
import StorageService from "../common/StorageService";

class AuthService {

    static doLogin(params: any) {
        return AjaxService.request(
            API_ENDPOINT + "/api/auth/login",
            params,
            "POST"
        );
    }

    static getUserDetails(id: string) {
        return AjaxService.request(
            API_ENDPOINT + "api/" + API_VERSION + "/view/" + id,
            "GET"
        );
    }

    static doLogout() {
        return AjaxService.request(
            API_ENDPOINT + "api/" + API_VERSION + "/logout",
            {},
            "PUT"
        );
    }

    static setUser(value: any) {
        StorageService.set("u", value);
    }

    static getUser() {
        return StorageService.get("u") || {};
    }

    static clearUser() {
        StorageService.remove("u");
    }

}

export default AuthService;