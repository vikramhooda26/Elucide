import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { CONFIG_KEY, LOGIN_TYPE } from "../constant";
import AuthService from "./auth/AuthService";

type Resp = {
    status: number;
    resp: any;
};
class AjaxService {
    static prepareParams(params: any) {
        const keys = Object.keys(params || {});
        let t: any = {};
        keys.forEach((x) => {
            const p = typeof params[x];
            t[x] = p == "object" && p != null ? JSON.stringify(params[x]) : params[x];
        });
        return t;
    }

    static async request(
        url: string,
        params: any,
        method: string = "GET",
        config: AxiosRequestConfig = {},
        dataConfig: any = {}
    ): Promise<Resp> {
        try {
            let defaultConfig: AxiosRequestConfig = {
                headers: {
                    "Content-Type":
                        dataConfig?.contentType?.length > 0
                            ? dataConfig?.contentType
                            : "application/json",
                    loginType: LOGIN_TYPE,
                    configKey: CONFIG_KEY,
                },
            };

            if (dataConfig?.responseType?.length > 0) {
                defaultConfig["responseType"] = dataConfig?.responseType;
            }

            const t = AuthService.getToken();

            if (t) {
                defaultConfig.headers!.Authorization = "JWT " + t;
            } else if (!t || t?.length <= 0) {
                const unProtectedAPI = AuthService.getUnProtectedAPI();
                if (unProtectedAPI?.every((d: string, i: number) => !url?.includes(d))) {
                    return { status: 404, resp: {} };
                }
            }

            const r: AxiosResponse = await axios({
                url: url,
                method,
                data: ["put", "post"].indexOf(method.toLowerCase()) != -1 ? params : {},
                params:
                    ["put", "post"].indexOf(method.toLowerCase()) == -1
                        ? this.prepareParams(params)
                        : {},
                ...defaultConfig,
                ...config,
            });

            return { status: r.status, resp: r.data };
        } catch (error: any) {
            if (error?.response?.status === 440) {
                AuthService.setToken("");
                // window.location.href = "/auth/access-pin";
            }
            return {
                status: axios.isAxiosError(error) ? error.response?.status || -1 : -1,
                resp: axios.isAxiosError(error) ? error.response?.data : null,
            };
        }
    }
}

export default AjaxService;