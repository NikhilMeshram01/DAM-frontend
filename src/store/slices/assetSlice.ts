import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AssetState, Asset } from "../../types";

const initialState: AssetState = {
  filters: {
    type: "",
    tags: [],
    dateRange: null,
    search: "",
  },
  selectedAsset: null,
  viewMode: "grid",
};

const assetSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {
    setFilters: (
      state,
      action: PayloadAction<Partial<AssetState["filters"]>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        type: "",
        tags: [],
        dateRange: null,
        search: "",
      };
    },
    setSelectedAsset: (state, action: PayloadAction<Asset | null>) => {
      state.selectedAsset = action.payload;
    },
    setViewMode: (state, action: PayloadAction<"grid" | "list">) => {
      state.viewMode = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
    },
    addTag: (state, action: PayloadAction<string>) => {
      if (!state.filters.tags.includes(action.payload)) {
        state.filters.tags.push(action.payload);
      }
    },
    removeTag: (state, action: PayloadAction<string>) => {
      state.filters.tags = state.filters.tags.filter(
        (tag) => tag !== action.payload
      );
    },
  },
});

export const {
  setFilters,
  clearFilters,
  setSelectedAsset,
  setViewMode,
  setSearch,
  addTag,
  removeTag,
} = assetSlice.actions;

export default assetSlice.reducer;
