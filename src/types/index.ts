export interface User {
  token: string | null;
  user: any;
  _id: string;
  email: string;
  name: string;
  role: "user" | "admin";
  createdAt: string;
}

export interface Asset {
  id: string;
  filename: string;
  originalName: string;
  size: number;
  mimeType: string;
  type: "image" | "video" | "document" | "audio";
  url: string;
  thumbnailUrl?: string;
  tags: string[];
  downloads: number;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
  dimensions?: {
    width: number;
    height: number;
  };
}

export interface AuthState {
  user: User | null;
  // token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface AssetState {
  filters: {
    type: string;
    tags: string[];
    dateRange: {
      start: string;
      end: string;
    } | null;
    search: string;
  };
  selectedAsset: Asset | null;
  viewMode: "grid" | "list";
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
