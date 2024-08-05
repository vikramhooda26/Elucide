export const API_URL =
    import.meta.env.VITE_BACKEND_URL ||
    "https://elucide-sports-backend.vercel.app";

export const Local_URL = "http://localhost:3000";

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

    TEAM: "/team/view",
    TEAM_LIST: "/team/list",
    CREATE_TEAM: "/team/create",
    EDIT_TEAM: "/team/edit",

    LEAGUE: "/league/view",
    LEAGUE_LIST: "/league/list",
    CREATE_LEAGUE: "/league/create",
    EDIT_LEAGUE: "/league/edit",

    BRAND: "/brand/view",
    BRAND_LIST: "/brand/list",
    CREATE_BRAND: "/brand/create",
    EDIT_BRAND: "/brand/edit",

    ATHLETE: "/athlete/view",
    ATHLETE_LIST: "/athlete/list",
    CREATE_ATHLETE: "/athlete/create",
    EDIT_ATHLETE: "/athlete/edit",

    DATA_ENTRY_LIST: "/data-entry",
    TEMP_MAIL: "/mail/list",

    LEAGUE_ADMIN: "/data-entry",
    ATHLETE_ADMIN: "/data-entry/athlete/list",
    TEAM_ADMIN: "/data-entry/team/list",
    BRAND_ADMIN: "/data-entry/brand/list",
} as const;

export const HTTP_STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    PARTIAL_CONTENT: 206,
    MULTIPLE_CHOICES: 300,
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
} as const;
