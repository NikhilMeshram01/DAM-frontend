export interface User {
  _id: string;
  // token: string | null;
  // user: any;
  email: string;
  name: string;
  role: "user" | "admin";
  createdAt: string;
}

export interface Asset {
  _id: string;
  team: string;
  filename: string;
  originalName: string;
  size: number;
  mimeType: string;
  category: "image" | "video" | "audio" | "document" | "archive" | "other";
  url: string;
  thumbnailUrl?: string;
  tags: string[];
  downloadCount: number;
  uploader: {
    email: string;
  };
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
  dimensions?: {
    width: number;
    height: number;
  };
  versions: {
    original: string;
    thumbnail: string;
  };
  downloadUrl: {
    original: string;
    thumbnail: string;
  };
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface UploadProgress {
  id: string;
  file: File;
  progress: number;
  status: "pending" | "uploading" | "completed" | "error";
  error?: string;
}

export interface AssetState {
  // filters: {
  //   type: string;
  //   // tags: string[];
  //   // dateRange: {
  //   //   start: string;
  //   //   end: string;
  //   // } | null;
  //   search: string;
  // };
  // type: string;
  search: string;
  assets: Asset[];
  hasMore: boolean;
  total: number;
  page: number;
  isError: any;
  isLoading: boolean;
  isLoadingMore: boolean;
  selectedAsset: Asset | null;
  viewMode: "grid" | "list";
  uploadProgress: UploadProgress[];
  isUploading: boolean;
  category: string;
}

export interface UIState {
  isLoading: boolean;
  toasts: Toast[];
  modals: {
    upload: boolean;
    preview: boolean;
    share: boolean;
  };
}

export interface Toast {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
}

export interface UploadProgress {
  id: string;
  file: File;
  progress: number;
  status: "pending" | "uploading" | "completed" | "error";
  error?: string;
}

export interface AdminStats {
  totalAssets: number;
  totalUploads: number;
  totalDownloads: number;
  storageUsed: number;
  recentUploads: Asset[];
  popularAssets: Asset[];
}
