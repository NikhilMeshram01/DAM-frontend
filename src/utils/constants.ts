export const API_BASE_URL = "http://localhost:3001/api";

export const ASSET_TYPES = {
  image: ["jpg", "jpeg", "png", "gif", "webp", "svg"],
  video: ["mp4", "avi", "mov", "wmv", "flv", "webm"],
  document: ["pdf", "doc", "docx", "txt", "rtf"],
  audio: ["mp3", "wav", "flac", "aac", "ogg"],
};

export const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

export const SUPPORTED_FORMATS = [
  ...ASSET_TYPES.image,
  ...ASSET_TYPES.video,
  ...ASSET_TYPES.document,
  ...ASSET_TYPES.audio,
];

export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  // DASHBOARD: "/dashboard",
  GALLERY: "/gallery",
  UPLOAD: "/upload",
  ADMIN: "/admin",
  ASSET_DETAILS: "/asset/:id",
};

export const QUERY_KEYS = {
  ASSETS: "assets",
  ASSET_DETAILS: "assetDetails",
  USER: "user",
  ADMIN_STATS: "adminStats",
};
