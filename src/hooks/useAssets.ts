import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
// import { } from "../services/api";
import { useAppSelector, useAppDispatch } from "../store";
import { addToast } from "../store/slices/uiSlice";
import { QUERY_KEYS } from "../utils/constants";
import {
  downloadAsset,
  getAsset,
  getAssets,
  // uploadAssets,
} from "../apis/asset.api";

export const useAssets = () => {
  const filters = useAppSelector((state) => state.asset.filters);
  const dispatch = useAppDispatch();

  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.ASSETS, filters],
    queryFn: ({ pageParam = 0 }) => getAssets(pageParam, filters),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length : undefined;
    },
    initialPageParam: 0,
  });
};

export const useAsset = (id: string) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.ASSET_DETAILS, id],
    queryFn: () => getAsset(id),
    getNextPageParam: () => undefined,
    initialPageParam: 0,
    enabled: !!id,
  });
};

export const useUploadAssets = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutation({
    // mutationFn: uploadAssets,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ASSETS] });
      dispatch(
        addToast({
          type: "success",
          title: "Upload Successful",
          message: "Your assets have been uploaded successfully.",
        })
      );
    },
    onError: (error: any) => {
      dispatch(
        addToast({
          type: "error",
          title: "Upload Failed",
          message:
            error.message || "Failed to upload assets. Please try again.",
        })
      );
    },
  });
};

export const useDownloadAsset = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: downloadAsset,
    onSuccess: () => {
      dispatch(
        addToast({
          type: "success",
          title: "Download Started",
          message: "Your download will begin shortly.",
        })
      );
    },
    onError: (error: any) => {
      dispatch(
        addToast({
          type: "error",
          title: "Download Failed",
          message:
            error.message || "Failed to download asset. Please try again.",
        })
      );
    },
  });
};
