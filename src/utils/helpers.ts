import { ASSET_TYPES } from "./constants";

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const getFileType = (
  filename: string
): "image" | "video" | "document" | "audio" => {
  const extension = filename.split(".").pop()?.toLowerCase() || "";

  if (ASSET_TYPES.image.includes(extension)) return "image";
  if (ASSET_TYPES.video.includes(extension)) return "video";
  if (ASSET_TYPES.document.includes(extension)) return "document";
  if (ASSET_TYPES.audio.includes(extension)) return "audio";

  return "document";
};

export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
};

export const getFileIcon = (type: string): string => {
  switch (type) {
    case "image":
      return "🖼️";
    case "video":
      return "🎬";
    case "document":
      return "📄";
    case "audio":
      return "🎵";
    default:
      return "📁";
  }
};
