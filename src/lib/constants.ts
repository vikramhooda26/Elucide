export const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const Local_URL = "http://localhost:3000";

export const API_VERSION = "v1";

export const ASSET = API_URL + "api/v1/asset/fileView/";

export const CASE_INSENSITIVE = "i";

export const APP_VERSION = "1.0.1";

export const roles = ["SUPER_ADMIN", "ADMIN", "STAFF", "USER"] as const;

export type TRoles = (typeof roles)[number];

export const LOCAL_STORAGE_KEYS = {
  USER: "@user"
} as const;

const dataEntryRoute = "/data-entry";

export const NAVIGATION_ROUTES = {
  LOGIN: "/elucide/login",
  HOME: "/elucide/home",
  DASHBOARD: "/dashboard",
  EXPLORE: "/explore",

  CREATE_USER: "/create-user",
  USERS_LIST: "/users-list",
  EDIT_USER: "/edit-user",

  BRAND_DASHBOARD: "/brand/dashboard",
  League_DASHBOARD: "/league/dashboard",
  TEAM_DASHBOARD: "/team/dashboard",
  ATHLETE_DASHBOARD: "/athlete/dashboard",

  TEAM: "/team/view",
  TEAM_LIST: "/team/list",
  CREATE_TEAM: dataEntryRoute + "/team/create",
  EDIT_TEAM: dataEntryRoute + "/team/edit",

  LEAGUE: "/league/view",
  LEAGUE_LIST: "/league/list",
  CREATE_LEAGUE: dataEntryRoute + "/league/create",
  EDIT_LEAGUE: dataEntryRoute + "/league/edit",

  BRAND: "/brand/view",
  BRAND_LIST: "/brand/list",
  CREATE_BRAND: dataEntryRoute + "/brand/create",
  EDIT_BRAND: dataEntryRoute + "/brand/edit",

  ATHLETE: "/athlete/view",
  ATHLETE_LIST: "/athlete/list",
  CREATE_ATHLETE: dataEntryRoute + "/athlete/create",
  EDIT_ATHLETE: dataEntryRoute + "/athlete/edit",

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

  CITY: dataEntryRoute + "/city/view",
  CITY_LIST: dataEntryRoute + "/city/list",
  CITY_CREATE: dataEntryRoute + "/city/create",
  CITY_EDIT: dataEntryRoute + "/city/edit",

  STATE: dataEntryRoute + "/state/view",
  STATE_LIST: dataEntryRoute + "/state/list",
  STATE_CREATE: dataEntryRoute + "/state/create",
  STATE_EDIT: dataEntryRoute + "/state/edit",

  SUB_CATEGORY: dataEntryRoute + "/sub-category/view",
  SUB_CATEGORY_LIST: dataEntryRoute + "/sub-category/list",
  SUB_CATEGORY_CREATE: dataEntryRoute + "/sub-category/create",
  SUB_CATEGORY_EDIT: dataEntryRoute + "/sub-category/edit",

  MAIN_CATEGORY: dataEntryRoute + "/main-category/view",
  MAIN_CATEGORY_LIST: dataEntryRoute + "/main-category/list",
  MAIN_CATEGORY_CREATE: dataEntryRoute + "/main-category/create",
  MAIN_CATEGORY_EDIT: dataEntryRoute + "/main-category/edit",

  NCCS: dataEntryRoute + "/nccs/view",
  NCCS_LIST: dataEntryRoute + "/nccs/list",
  NCCS_CREATE: dataEntryRoute + "/nccs/create",
  NCCS_EDIT: dataEntryRoute + "/nccs/edit",

  KEY_MARKET: dataEntryRoute + "/key-market/view",
  KEY_MARKET_LIST: dataEntryRoute + "/key-market/list",
  KEY_MARKET_CREATE: dataEntryRoute + "/key-market/create",
  KEY_MARKET_EDIT: dataEntryRoute + "/key-market/edit",

  LEAGUE_OWNER: dataEntryRoute + "/league-owner/view",
  LEAGUE_OWNER_LIST: dataEntryRoute + "/league-owner/list",
  LEAGUE_OWNER_CREATE: dataEntryRoute + "/league-owner/create",
  LEAGUE_OWNER_EDIT: dataEntryRoute + "/league-owner/edit",

  LEVEL: dataEntryRoute + "/level/view",
  LEVEL_LIST: dataEntryRoute + "/level/list",
  LEVEL_CREATE: dataEntryRoute + "/level/create",
  LEVEL_EDIT: dataEntryRoute + "/level/edit",

  SUB_PERSONALITY: dataEntryRoute + "/sub-personality/view",
  SUB_PERSONALITY_LIST: dataEntryRoute + "/sub-personality/list",
  SUB_PERSONALITY_CREATE: dataEntryRoute + "/sub-personality/create",
  SUB_PERSONALITY_EDIT: dataEntryRoute + "/sub-personality/edit",

  MARKETING_PLATFORM: dataEntryRoute + "/marketing-platform/view",
  MARKETING_PLATFORM_LIST: dataEntryRoute + "/marketing-platform/list",
  MARKETING_PLATFORM_CREATE: dataEntryRoute + "/marketing-platform/create",
  MARKETING_PLATFORM_EDIT: dataEntryRoute + "/marketing-platform/edit",

  OTT_PARTNER: dataEntryRoute + "/ott-partner/view",
  OTT_PARTNER_LIST: dataEntryRoute + "/ott-partner/list",
  OTT_PARTNER_CREATE: dataEntryRoute + "/ott-partner/create",
  OTT_PARTNER_EDIT: dataEntryRoute + "/ott-partner/edit",

  PARENT_ORG: dataEntryRoute + "/parent-organization/view",
  PARENT_ORG_LIST: dataEntryRoute + "/parent-organization/list",
  PARENT_ORG_CREATE: dataEntryRoute + "/parent-organization/create",
  PARENT_ORG_EDIT: dataEntryRoute + "/parent-organization/edit",

  SPORT: dataEntryRoute + "/sport/view",
  SPORT_LIST: dataEntryRoute + "/sport/list",
  SPORT_CREATE: dataEntryRoute + "/sport/create",
  SPORT_EDIT: dataEntryRoute + "/sport/edit",

  TAGLINE: dataEntryRoute + "/tagline/view",
  TAGLINE_LIST: dataEntryRoute + "/tagline/list",
  TAGLINE_CREATE: dataEntryRoute + "/tagline/create",
  TAGLINE_EDIT: dataEntryRoute + "/tagline/edit",

  TEAM_OWNER: dataEntryRoute + "/team-owner/view",
  TEAM_OWNER_LIST: dataEntryRoute + "/team-owner/list",
  TEAM_OWNER_CREATE: dataEntryRoute + "/team-owner/create",
  TEAM_OWNER_EDIT: dataEntryRoute + "/team-owner/edit",

  TERRITORY: dataEntryRoute + "/territory/view",
  TERRITORY_LIST: dataEntryRoute + "/territory/list",
  TERRITORY_CREATE: dataEntryRoute + "/territory/create",
  TERRITORY_EDIT: dataEntryRoute + "/territory/edit",

  TIER: dataEntryRoute + "/tier/view",
  TIER_LIST: dataEntryRoute + "/tier/list",
  TIER_CREATE: dataEntryRoute + "/tier/create",
  TIER_EDIT: dataEntryRoute + "/tier/edit",

  COUNTRY: dataEntryRoute + "/nationality/view",
  COUNTRY_LIST: dataEntryRoute + "/nationality/list",
  COUNTRY_CREATE: dataEntryRoute + "/nationality/create",
  COUNTRY_EDIT: dataEntryRoute + "/nationality/edit",

  ASSOCIATION_LEVEL: dataEntryRoute + "/association-level/view",
  ASSOCIATION_LEVEL_LIST: dataEntryRoute + "/association-level/list",
  ASSOCIATION_LEVEL_CREATE: dataEntryRoute + "/association-level/create",
  ASSOCIATION_LEVEL_EDIT: dataEntryRoute + "/association-level/edit",

  TEMP_MAIL: "/mail/list"
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
  GATEWAY_TIMEOUT: 504
} as const;
