export const API_PATH = {
  PARTNER_LIST: getV1Path("partner/list"),
  ROLE_LIST: getV1Path("role/list"),
  USER_INFO: getV1Path("personal/me"),
  LOGIN: getV1Path("authen/login"),
  CHANGE_PASS: getV1Path("user/change-password"),
  UPDATE_INFO: getV1Path("personal/update-profile"),
};

export const CHAT_MESSAGE = {
  CONVERSATIONS: getV1Path("chat-messages/conversations"),
  MESSAGES: getV1Path("chat-messages/messages"),
  AI_CONVERSATION: getV1Path("chat-messages/ai-conversation"),
};

export const GENERAL = {
  GENERAL_DATA: getV1Path("report/revenue/trending"),
};

export const USER_MANAGEMENT = {
  USER_LIST: getV1Path("user/list"),
  UPDATE_USER: getV1Path("user/update-user"),
  CREATE_USER: getV1Path("user/create-user"),
  RESET_PASSWORD: getV1Path("user/reset-password"),
};

export const PATH_CONFIG = {
  LIST: getV1Path("config"),
  CREATE_CONFIG: getV1Path("config/create"),
  UPDATE_CONFIG: getV1Path("config/update"),
  DELETE_CONFIG: getV1Path("config/delete"),
  CONFIG_DETAIL: getV1Path("config/detail"),
};

export const CONTENT_MANAGEMENT = {
  LIST: getV1Path("content/list-content-cms"),
  CREATE_CONTENT: getV1Path("content/create-content"),
  UPDATE_CONTENT: getV1Path("content/update-content"),
  DELETE_CONTENT: getV1Path("content/delete-content"),
};

export const COUNTRY_MANAGEMENT = {
  LIST: getV1Path("country/list-country"),
  CREATE_COUNTRY: getV1Path("country/create-country"),
  UPDATE_COUNTRY: getV1Path("country/update-country"),
  DETAIL: getV1Path("country/detail-country"),
  DELETE: getV1Path("country/delete-country"),
};

export const ROAMING_MANAGEMENT = {
  LIST: getV1Path("data/list/roaming/packages"),
  DETAIL: getV1Path("mobileData/detail"),
  CREATE: getV1Path("mobileData/create"),
  DELETE: getV1Path("mobileData/delete"),
  UPDATE: getV1Path("mobileData/update"),
  PARTNER_LIST_ROAMING: getV1Path("roaming/partner/list-roaming-partner"),
};

export const TOPUP_MANAGEMENT = {
  LIST: getV1Path("mobileData/listMobileDataPaging"),
  DETAIL: getV1Path("mobileData/detail"),
  CREATE: getV1Path("mobileData/create"),
  DELETE: getV1Path("mobileData/delete"),
  UPDATE: getV1Path("mobileData/update"),
  LIST_B2B: getV1Path("mobileData/listSyncMobileData"),
  IMPORT_FROM_B2B: getV1Path("mobileData/importArray"),
};

export const FILE_MANAGEMENT = {
  LIST: getV1Path("file/list-file"),
  UPLOAD_FILE: getV1Path("file/upload-file"),
  REPLACE_FILE: getV1Path("file/replace-file"),
  DELETE_FILE: getV1Path("/file/delete-file"),
};

export const ADDRESS_PATH = {
  PROVINCE_LIST: getV1Path("address/list-provinces"),
  PROVINCE_DETAIL: getV1Path("address/detail-provinces"),
  UPDATE_PROVINCE: getV1Path("address/update-provinces"),
  CREATE_PROVINCE: getV1Path("address/create-provinces"),
  DELETE_PROVINCE: getV1Path("address/delete-provinces"),
  DISTRICT_LIST: getV1Path("address/list-districts"),
  DISTRICT_DETAIL: getV1Path("address/detail-districts"),
  UPDATE_DISTRICT: getV1Path("address/update-districts"),
  CREATE_DISTRICT: getV1Path("address/create-districts"),
  DELETE_DISTRICT: getV1Path("address/delete-districts"),
  WARD_LIST: getV1Path("address/list-wards"),
  WARD_DETAIL: getV1Path("address/detail-wards"),
  UPDATE_WARD: getV1Path("address/update-wards"),
  CREATE_WARD: getV1Path("address/create-wards"),
  DELETE_WARD: getV1Path("address/delete-wards"),
  REGIONS: getV1Path("address/list-administrative-regions"),
  UNITS: getV1Path("address/list-administrative-units"),
};

export const PACKAGES_REGISTRAION = {
  PACKAGES_BY_PHONE: getV2Path("mobile/data/phone"),
  DEFAULT_PACKAGE: getV1Path("mobile/data/packages"),
};

export const TRAVEL_SIM = {
  LIST: getV1Path("profile/list"),
  DETAIL: getV1Path("profile/detail"),
  ADD: getV1Path("profile/ocr"),
  CREATE_PROFILE: getV2Path("profile/add"),
  CONFIRM_PROFILE_V2: getV2Path("profile/confirm"),
  CONFIRM: getV1Path("profile/confirm"),
  UPDATE: getV1Path("profile/update"),
  NATION_LIST: getV1Path("profile/location"),
  UPDATE_STATUS: getV1Path("profile/update/status"),
  CONNECT_SIM: getV1Path("profile/connect"),
};

export const ARTICLE_MANAGEMENT = {
  LIST: getV1Path("article"),
  SUMMARIZE: getV1Path("article/summarize"),
  CREATE: getV1Path("article/create"),
  UPDATE: getV1Path("article/update"),
  DELETE: getV1Path("article/delete"),
};

export const STUDENT_MANAGEMENT = {
  LIST: getV1Path("students/list"),
  DROPOUT_PREDICT: getV1Path("students/predict-dropout"),
  PREDICT_DROPOUT: getV1Path("students/predict-dropout"),
  PREDICT_DROPOUT_FILE: getV1Path("students/predict-dropout-file"),
  DROPOUT_PREDICTION_DATA: getV1Path("students/dropout-prediction-data"),
  CREATE_STUDENT: getV1Path("students/add-student"),
};

export const SCHEDULE_MANAGEMENT = {
  LIST: getV1Path("schedules"),
  CREATE_SCHEDULE: getV1Path("schedules"),
  UPDATE_SCHEDULE: getV1Path("schedules"),
  DELETE_SCHEDULE: getV1Path("schedules"),
};

export const TEACHER_MANAGEMENT = {
  LIST: getV1Path("teachers"),
  GET_TEACHER: getV1Path("teachers"),
  CREATE_TEACHER: getV1Path("teachers"),
  UPDATE_TEACHER: getV1Path("teachers"),
  DELETE_TEACHER: getV1Path("teachers"),
};

export const SUBJECT_MANAGEMENT = {
  LIST: getV1Path("subjects"),
  GET_SUBJECT: getV1Path("subjects"),
  CREATE_SUBJECT: getV1Path("subjects"),
  UPDATE_SUBJECT: getV1Path("subjects"),
  DELETE_SUBJECT: getV1Path("subjects"),
};

export const TOOLS = {
  VIDEO_GENERATION: getV1Path("tool/generate/videocall"),
};

function getV1Path(path: String) {
  return `${process.env.REACT_APP_BASE_URL}/api/v1/${path}`;
}

function getV2Path(path: String) {
  return `${process.env.REACT_APP_BASE_URL}/api/v2/${path}`;
}
