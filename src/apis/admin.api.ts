import type { AdminStats } from "../types";

export const getStats = async (): Promise<AdminStats> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const mockStats: AdminStats = {
    totalAssets: 1250,
    totalUploads: 850,
    totalDownloads: 5420,
    storageUsed: 15.6, // GB
    recentUploads: [],
    popularAssets: [],
  };

  return mockStats;
};
