import type { Asset } from "../types";
import api from "./api";

// Types
export interface PresignResponse {
  url: string;
  key: string;
}

export interface ConfirmUploadPayload {
  key: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  size: number;
  tags: string[];
  category: string;
}

const API_BASE = "api/v1/storage";

export const getPresignedUrl = async (
  fileName: string
): Promise<PresignResponse> => {
  const response = await api.post(`${API_BASE}/presign`, { fileName });
  return response.data;
};

export const confirmUpload = async (
  payload: ConfirmUploadPayload
): Promise<void> => {
  await api.post(`${API_BASE}/confirm`, payload);
};

// export const uploadAssets = async (
//   files: File[],
//   onProgress?: (progress: number) => void
// ): Promise<Asset[]> => {
//   try {
//     const res = await api.post(
//       `${API_BASE}/login`,
//       { email, password },
//       { withCredentials: true }
//     );
//     if (!res.data?.data) {
//       throw new Error("Invalid response from server");
//     }
//     return res.data.data as User;
//   } catch (error: any) {
//     throw new Error(error.response?.data?.message || "Failed to login");
//   }

//   return mockAssets;
// };

// import axios from "../utils/axiosInstance"; // adjust path
// import { Asset } from "../types"; // adjust to your type location

interface GetAssetsResponse {
  page: number;
  assets: Asset[];
  hasMore: boolean;
  total: number;
}

export const getAssets = async (
  page = 0,
  filters: Record<string, any> = {}
): Promise<GetAssetsResponse> => {
  console.log("hit");
  const limit = 20;
  const params = new URLSearchParams();

  // Backend expects 1-based page indexing
  params.set("page", (page + 1).toString());
  params.set("limit", limit.toString());

  for (const key in filters) {
    if (filters[key] != null) {
      if (Array.isArray(filters[key])) {
        filters[key].forEach((val) => params.append(key, val));
      } else {
        params.set(key, filters[key]);
      }
    }
  }
  console.log(params);

  const response = await api.get("/api/v1/asset/assets", {
    params,
  });

  const data = response.data;

  return {
    page: data.pagination.page, // add this line
    assets: data.data.assets,
    hasMore: data.pagination.page < data.pagination.pages,
    total: data.pagination.total,
  };
};

export const getAsset = async (id: string): Promise<Asset> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const mockAsset: Asset = {
    // id,
    // filename: `asset-${id}.jpg`,
    // originalName: `Sample Image ${id}`,
    // size: 2500000,
    // mimeType: "image/jpeg",
    // category: "image",
    // url: `https://picsum.photos/800/600?random=${id}`,
    // thumbnailUrl: `https://picsum.photos/200/150?random=${id}`,
    // tags: ["sample", "demo", "image"],
    // downloads: Math.floor(Math.random() * 100),
    // uploadedBy: "user@dam.com",
    // createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    // updatedAt: new Date().toISOString(),
    // dimensions: { width: 1920, height: 1080 },
  };

  return mockAsset;
};

export const downloadAsset = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  // Mock download - would normally trigger file download
  console.log(`Downloading asset ${id}`);
};
