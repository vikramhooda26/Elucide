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

const dataEntryRoute = "/data-entry";

export const NAVIGATION_ROUTES = {
    LOGIN: "/elucide/login",
    CREATE_USER: "/create-user",
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

    DATA_ENTRY_LIST: dataEntryRoute,

    SPORTS_DEAL_SUMMARY: dataEntryRoute + "/sports-deal-summary/view",
    SPORTS_DEAL_SUMMARY_LIST: dataEntryRoute + "/sports-deal-summary/list",
    CREATE_SPORTS_DEAL_SUMMARY: dataEntryRoute + "/sports-deal-summary/create",
    EDIT_SPORTS_DEAL_SUMMARY: dataEntryRoute + "/sports-deal-summary/edit",

    LEAGUE_ADMIN: dataEntryRoute,
    ATHLETE_ADMIN: dataEntryRoute + "/athlete/list",
    TEAM_ADMIN: dataEntryRoute + "/team/list",
    BRAND_ADMIN: dataEntryRoute + "/brand/list",

    AGE: dataEntryRoute + "/age/view",
    AGE_LIST: dataEntryRoute + "/age/list",
    AGE_CREATE: dataEntryRoute + "/age/create",
    AGE_EDIT: dataEntryRoute + "/age/edit",

    GENDER: dataEntryRoute + "/gender/view",
    GENDER_LIST: dataEntryRoute + "/gender/list",
    GENDER_CREATE: dataEntryRoute + "/gender/create",
    GENDER_EDIT: dataEntryRoute + "/gender/edit",

    ACTIVATION: dataEntryRoute + "/activation/view",
    ACTIVATION_LIST: dataEntryRoute + "/activation/list",
    ACTIVATION_CREATE: dataEntryRoute + "/activation/create",
    ACTIVATION_EDIT: dataEntryRoute + "/activation/edit",

    CAMPAIGN: dataEntryRoute + "/campaign/view",
    CAMPAIGN_LIST: dataEntryRoute + "/campaign/list",
    CAMPAIGN_CREATE: dataEntryRoute + "/campaign/create",
    CAMPAIGN_EDIT: dataEntryRoute + "/campaign/edit",

    PERSONALITY: dataEntryRoute + "/personality/view",
    PERSONALITY_LIST: dataEntryRoute + "/personality/list",
    PERSONALITY_CREATE: dataEntryRoute + "/personality/create",
    PERSONALITY_EDIT: dataEntryRoute + "/personality/edit",

    AGENCY: dataEntryRoute + "/agency/view",
    AGENCY_LIST: dataEntryRoute + "/agency/list",
    AGENCY_CREATE: dataEntryRoute + "/agency/create",
    AGENCY_EDIT: dataEntryRoute + "/agency/edit",

    ASSET: dataEntryRoute + "/asset/view",
    ASSET_LIST: dataEntryRoute + "/asset/list",
    ASSET_CREATE: dataEntryRoute + "/asset/create",
    ASSET_EDIT: dataEntryRoute + "/asset/edit",

    BROADCAST_PARTNER: dataEntryRoute + "/broadcast-partner/view",
    BROADCAST_PARTNER_LIST: dataEntryRoute + "/broadcast-partner/list",
    BROADCAST_PARTNER_CREATE: dataEntryRoute + "/broadcast-partner/create",
    BROADCAST_PARTNER_EDIT: dataEntryRoute + "/broadcast-partner/edit",

    TEMP_MAIL: "/mail/list",
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
