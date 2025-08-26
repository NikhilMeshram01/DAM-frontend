import type { Asset } from "../types";

export const getAssets = async (
  page = 0,
  filters: any = {}
): Promise<{ assets: Asset[]; hasMore: boolean; total: number }> => {
  // Mock implementation with realistic data
  await new Promise((resolve) => setTimeout(resolve, 500));

  const mockAssets: Asset[] = Array.from({ length: 20 }, (_, i) => {
    const id = (page * 20 + i + 1).toString();
    const types = ["image", "video", "document", "audio"];
    const type = types[
      Math.floor(Math.random() * types.length)
    ] as Asset["type"];

    return {
      id,
      filename: `asset-${id}.${
        type === "image"
          ? "jpg"
          : type === "video"
          ? "mp4"
          : type === "document"
          ? "pdf"
          : "mp3"
      }`,
      originalName: `Sample ${type} ${id}`,
      size: Math.floor(Math.random() * 10000000) + 100000,
      mimeType: `${type}/${type === "image" ? "jpeg" : type}`,
      type,
      url: `https://picsum.photos/400/300?random=${id}`,
      thumbnailUrl: `https://picsum.photos/200/150?random=${id}`,
      tags: ["sample", "demo", type],
      downloads: Math.floor(Math.random() * 100),
      uploadedBy: "user@dam.com",
      createdAt: new Date(
        Date.now() - Math.random() * 10000000000
      ).toISOString(),
      updatedAt: new Date().toISOString(),
      dimensions: type === "image" ? { width: 1920, height: 1080 } : undefined,
    };
  });

  return {
    assets: mockAssets,
    hasMore: page < 4, // Mock pagination
    total: 100,
  };
};

export const getAsset = async (id: string): Promise<Asset> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const mockAsset: Asset = {
    id,
    filename: `asset-${id}.jpg`,
    originalName: `Sample Image ${id}`,
    size: 2500000,
    mimeType: "image/jpeg",
    type: "image",
    url: `https://picsum.photos/800/600?random=${id}`,
    thumbnailUrl: `https://picsum.photos/200/150?random=${id}`,
    tags: ["sample", "demo", "image"],
    downloads: Math.floor(Math.random() * 100),
    uploadedBy: "user@dam.com",
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    updatedAt: new Date().toISOString(),
    dimensions: { width: 1920, height: 1080 },
  };

  return mockAsset;
};

export const uploadAssets = async (
  files: File[],
  onProgress?: (progress: number) => void
): Promise<Asset[]> => {
  // Mock upload with progress
  for (let i = 0; i <= 100; i += 10) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    onProgress?.(i);
  }

  const mockAssets: Asset[] = files.map((file, index) => ({
    id: Date.now().toString() + index,
    filename: file.name,
    originalName: file.name,
    size: file.size,
    mimeType: file.type,
    type: file.type.startsWith("image/")
      ? "image"
      : file.type.startsWith("video/")
      ? "video"
      : file.type.startsWith("audio/")
      ? "audio"
      : "document",
    url: URL.createObjectURL(file),
    thumbnailUrl: URL.createObjectURL(file),
    tags: [],
    downloads: 0,
    uploadedBy: "current-user",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  return mockAssets;
};

export const downloadAsset = async (id: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  // Mock download - would normally trigger file download
  console.log(`Downloading asset ${id}`);
};
