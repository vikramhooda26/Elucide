// export const API_ENDPOINT = "https://elucide-sports-backend.onrender.com/";

export const API_URL =
    import.meta.env.VITE_BACKEND_URL ||
    "https://elucide-sports-backend.vercel.app";

export const API_VERSION = "v1";

export const ASSET = API_URL + "api/v1/asset/fileView/";

export const CASE_INSENSITIVE = "i";

export const APP_VERSION = "1.0.1";

export const roles = ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"] as const;

export type TRoles = (typeof roles)[number];

export const LOCAL_STORAGE_KEYS = {
    USER: "@user",
} as const;

export const NAVIGATION_ROUTES = {
    LOGIN: "/elucide/login",
    HOME: "/elucide/home",
    DASHBOARD: "/dashboard",
} as const;
