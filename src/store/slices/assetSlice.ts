import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { AssetState, Asset } from "../../types";
import {
  confirmUpload,
  getAssets,
  getPresignedUrl,
} from "../../apis/asset.api";
import type { RootState } from "..";

const initialState: AssetState = {
  uploadProgress: [],
  isUploading: false,
  category: "",
  search: "",
  assets: [],
  page: 0,
  isError: null,
  isLoading: true,
  isLoadingMore: false,
  hasMore: true, // ⬅️ NEW
  total: 0, // ⬅️ NEW
  selectedAsset: null,
  viewMode: "grid",
};

function getCategoryFromMimeType(mimeType: string): string {
  const type = mimeType.split("/")[0];
  if (["image", "video", "audio"].includes(type)) return type;

  if (type === "application") {
    if (
      mimeType === "application/pdf" ||
      mimeType.includes("word") ||
      mimeType.includes("excel") ||
      mimeType.includes("presentation")
    ) {
      return "document";
    }
    if (mimeType.includes("zip") || mimeType.includes("rar")) {
      return "archive";
    }
  }

  return "other";
}
export const uploadAssets = createAsyncThunk<
  void,
  {
    files: File[];
    updateFileProgress?: (fileName: string, progress: number) => void;
  },
  { rejectValue: { fileName: string; error: string } }
>(
  "asset/uploadAssets",
  async ({ files, updateFileProgress }, { rejectWithValue }) => {
    console.log("hit");
    for (const file of files) {
      try {
        console.log("file", file);
        // 1. Get presigned URL
        const { url, key } = await getPresignedUrl(file.name);
        // 2. Upload to S3 via XHR
        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("PUT", url, true);
          xhr.setRequestHeader("Content-Type", file.type || "other");

          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable && updateFileProgress) {
              const percent = Math.round((event.loaded / event.total) * 100);
              updateFileProgress(file.name, percent);
            }
          };

          xhr.onload = async () => {
            if (xhr.status === 200) {
              try {
                await confirmUpload({
                  key,
                  fileName: key,
                  originalName: file.name,
                  mimeType: file.type,
                  size: file.size,
                  tags: [],
                  category: getCategoryFromMimeType(file.type),
                });
                resolve();
              } catch (error) {
                reject(error);
              }
            } else {
              reject(new Error(`Upload failed with status ${xhr.status}`));
            }
          };

          xhr.onerror = () => reject(new Error("Network error during upload"));
          xhr.send(file);
        });
      } catch (error: any) {
        console.error(`Failed to upload file: ${file.name}`, error);
        return rejectWithValue({
          fileName: file.name,
          error: error.message || "Upload failed",
        });
      }
    }
  }
);

export const fetchAssets = createAsyncThunk(
  "asset/getAssets",
  async (page: number, { getState }) => {
    const state = getState() as RootState;
    // Build filters object from slice state
    const filters: Record<string, any> = {};

    if (state.asset) {
      filters.category = state.asset.category;
    }
    if (state.asset.search) {
      filters.search = state.asset.search;
    }
    console.log(filters);
    const res = await getAssets(page, filters);
    return res;
  }
);

export const getAsset = createAsyncThunk("asset/getAsset", async () => {});

const assetSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {
    // setFilters: (
    //   state,
    //   action: PayloadAction<Partial<AssetState["filters"]>>
    // ) => {
    //   state.filters = { ...state.filters, ...action.payload };
    //   state.page = 0;
    //   state.assets = [];
    //   state.hasMore = true;
    // },
    // clearFilters: (state) => {
    //   state.filters = {
    //     type: "",
    //     // tags: [],
    //     // dateRange: null,
    //     search: "",
    //   };
    // },
    setTypes: (state, action) => {
      state.category = action.payload;
    },
    clearTypes: (state, action) => {
      state.category = "";
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    clearSearch: (state, action) => {
      state.search = "";
    },
    setSelectedAsset: (state, action: PayloadAction<Asset | null>) => {
      state.selectedAsset = action.payload;
    },
    setViewMode: (state, action: PayloadAction<"grid" | "list">) => {
      state.viewMode = action.payload;
    },
    // addTag: (state, action: PayloadAction<string>) => {
    //   if (!state.filters.tags.includes(action.payload)) {
    //     state.filters.tags.push(action.payload);
    //   }
    // },
    // removeTag: (state, action: PayloadAction<string>) => {
    //   state.filters.tags = state.filters.tags.filter(
    //     (tag) => tag !== action.payload
    //   );
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadAssets.pending, (state, action) => {
        state.isUploading = true;
      })
      .addCase(uploadAssets.fulfilled, (state, action) => {
        state.isUploading = false;
      })
      .addCase(uploadAssets.rejected, (state, action) => {
        state.isUploading = false;
      })
      .addCase(fetchAssets.pending, (state, action) => {
        if (state.page === 0) {
          state.isLoading = true;
        } else {
          state.isLoadingMore = true;
        }
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLoadingMore = false;
        state.hasMore = action.payload.hasMore;
        state.page = action.payload.page; // Use page from API response
        state.total = action.payload.total;

        if (action.meta.arg === 0) {
          // If fetching page 0, replace assets
          state.assets = action.payload.assets;
        } else {
          // Append for next pages
          state.assets = [...state.assets, ...action.payload.assets];
        }
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoadingMore = false;
        state.isError = action.error.message || "Failed to fetch assets";
      })
      .addCase(getAsset.pending, (state, action) => {
        state.isUploading = true;
      })
      .addCase(getAsset.fulfilled, (state, action) => {
        state.isUploading = false;
      })
      .addCase(getAsset.rejected, (state, action) => {
        state.isUploading = false;
      });
  },
});

export const {
  // setFilters,
  // clearFilters,
  setSelectedAsset,
  setViewMode,
  setSearch,
  setTypes,
  clearTypes,
  clearSearch,
  // addTag,
  // removeTag,
} = assetSlice.actions;

export default assetSlice.reducer;
