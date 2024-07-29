import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { HTTP_STATUS_CODES, NAVIGATION_ROUTES } from "../lib/constants";
import { NavigateFunction } from "react-router-dom";
import { toast } from "sonner";

type Resp = {
    status: number;
    data: any;
};
class AjaxService {
    static prepareParams(params: any) {
        const keys = Object.keys(params || {});
        let t: any = {};
        keys.forEach((x) => {
            const p = typeof params[x];
            t[x] =
                p == "object" && p != null
                    ? JSON.stringify(params[x])
                    : params[x];
        });
        return t;
    }

    static handleCommonErrors(
        error: any,
        logout: () => void,
        navigate?: NavigateFunction
    ) {
        switch (error.response.status) {
            case HTTP_STATUS_CODES.FORBIDDEN:
                logout();
                if (
                    window.location.pathname.startsWith(NAVIGATION_ROUTES.LOGIN)
                ) {
                    toast.error("Login failed!");
                } else {
                    toast.error("Session expired!");
                }
                if (navigate) {
                    navigate(NAVIGATION_ROUTES.HOME, { replace: true });
                } else {
                    window.location.href = NAVIGATION_ROUTES.HOME;
                }
                break;
            case HTTP_STATUS_CODES.BAD_REQUEST:
                toast.error(
                    "Invalid Request. Contact the developer for support"
                );
                break;
            default:
                return error;
        }
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
                },
            };

            if (dataConfig?.responseType?.length > 0) {
                defaultConfig["responseType"] = dataConfig?.responseType;
            }

            const r: AxiosResponse = await axios({
                url: url,
                method,
                data:
                    ["put", "post"].indexOf(method.toLowerCase()) != -1
                        ? params
                        : {},
                params:
                    ["put", "post"].indexOf(method.toLowerCase()) == -1
                        ? this.prepareParams(params)
                        : {},
                ...defaultConfig,
                ...config,
                withCredentials: true,
            });

            return { status: r.status, data: r.data };
        } catch (error: any) {
            throw error;
        }
    }
}

export default AjaxService;
