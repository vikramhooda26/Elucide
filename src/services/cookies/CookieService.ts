import Cookies from "js-cookie";

class CookieService {
    static setCookie(key: string, value: any) {
        // const str = JSON.stringify(value);
        // Cookies.set(key, str);
    }

    static getCookie(key: string) {
        // const c = Cookies.get(key);
        // if (!c || c === undefined || c === "undefined") {
        //     return null;
        // }
        // const prs = JSON.parse(c || JSON.stringify(''));
        // return prs || null;
    }

    static removeCookie(key: string) {
        // Cookies.remove(key);
    }
}

export default CookieService;
