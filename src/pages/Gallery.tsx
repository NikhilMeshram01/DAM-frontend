// import React, { useState, useEffect, useRef } from 'react';
// import { useInView } from 'react-intersection-observer';
// import { Filter, Grid3X3, List, Search } from 'lucide-react';
// // import { useAssets, useDownloadAsset } from '../hooks/useAssets';
// import { useAppSelector, useAppDispatch } from '../store';
// import { fetchAssets, setFilters, setViewMode } from '../store/slices/assetSlice';
// import { addToast } from '../store/slices/uiSlice';
// import AssetCard from '../components/assets/AssetCard';
// import AssetPreview from '../components/assets/AssetPreview';
// import { AssetCardSkeleton } from '../components/ui/Skeleton';
// import Button from '../components/ui/Button';
// import Input from '../components/ui/Input';
// import Card from '../components/ui/Card';
// import type { Asset } from '../types';


// const Gallery: React.FC = () => {

//     const { type, search, viewMode } = useAppSelector(state => state.asset);
//     const [previewAsset, setPreviewAsset] = useState<Asset | null>(null);
//     const [isPreviewOpen, setIsPreviewOpen] = useState(false);

//     const dispatch = useAppDispatch();
//     const { assets, isUploading, hasMore, page, isError, isLoading
//         , isLoadingMore
//     } = useAppSelector(state => state.asset);

//     const { ref: loadMoreRef, inView } = useInView({
//         threshold: 0,
//         rootMargin: '100px'
//     });

//     useEffect(() => {
//         dispatch(fetchAssets(0)); // Fetch first page on mount or filters change
//     }, [filters]);
//     console.log(filters.type)
//     useEffect(() => {
//         if (inView && hasMore && !isLoadingMore) {
//             dispatch(fetchAssets(page));  // pass current page explicitly
//         }
//     }, [inView, hasMore, isLoadingMore, page]);

//     const allAssets = assets;

//     const handlePreview = (asset: Asset) => {
//         setPreviewAsset(asset);
//         setIsPreviewOpen(true);
//     };

//     const handleDownload = async (asset: Asset) => {
//         try {
//             // await downloadMutation.mutateAsync(asset.id);
//         } catch (error: any) {
//             dispatch(addToast({
//                 type: 'error',
//                 title: 'Download Failed',
//                 message: 'Unable to download the asset. Please try again.'
//             }));
//         }
//     };

//     const handleShare = (asset: Asset) => {
//         const shareUrl = `${window.location.origin}/asset/${asset.id}`;
//         navigator.clipboard.writeText(shareUrl);
//         dispatch(addToast({
//             type: 'success',
//             title: 'Link Copied',
//             message: 'Asset link copied to clipboard!'
//         }));
//     };

//     const handleFilterChange = (key: string, value: any) => {
//         console.log('value', value)
//         dispatch(setFilters({ [key]: value }));
//     };

//     if (isError) {
//         return (
//             <div className="text-center py-12">
//                 <p className="text-gray-500">Error loading assets. Please try again later.</p>
//             </div>
//         );
//     }

//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                 <div>
//                     <h1 className="text-2xl font-bold text-gray-900">Asset Gallery</h1>
//                     <p className="text-gray-600">Browse and manage your digital assets</p>
//                 </div>

//                 {/* View Toggle */}
//                 <div className="flex items-center space-x-2">
//                     <Button
//                         variant={viewMode === 'grid' ? 'primary' : 'ghost'}
//                         size="sm"
//                         onClick={() => dispatch(setViewMode('grid'))}
//                     >
//                         <Grid3X3 className="w-4 h-4" />
//                     </Button>
//                     <Button
//                         variant={viewMode === 'list' ? 'primary' : 'ghost'}
//                         size="sm"
//                         onClick={() => dispatch(setViewMode('list'))}
//                     >
//                         <List className="w-4 h-4" />
//                     </Button>
//                 </div>
//             </div>

//             {/* Filters */}
//             <Card>
//                 <div className="flex flex-col lg:flex-row gap-4">
//                     <div className="flex-1">
//                         <Input
//                             placeholder="Search assets..."
//                             value={filters.search}
//                             onChange={(e) => handleFilterChange('search', e.target.value)}
//                             leftIcon={<Search className="w-5 h-5" />}
//                         />
//                     </div>

//                     <div className="flex gap-2">
//                         <select
//                             value={filters.type}
//                             onChange={(e) => handleFilterChange('type', e.target.value)}
//                             className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#670D2F]"
//                         >
//                             <option value="">All Types</option>
//                             <option value="image">Images</option>
//                             <option value="video">Videos</option>
//                             <option value="document">Documents</option>
//                             <option value="audio">Audio</option>
//                         </select>

//                         <Button variant="ghost" size="sm">
//                             <Filter className="w-4 h-4" />
//                             Filters
//                         </Button>
//                     </div>
//                 </div>
//             </Card>

//             {/* Assets Grid/List */}
//             <div className="min-h-[400px]">
//                 {isLoading ? (
//                     <div className={`grid gap-6 ${viewMode === 'grid'
//                         ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
//                         : 'grid-cols-1'
//                         }`}>
//                         {Array.from({ length: 12 }).map((_, i) => (
//                             <AssetCardSkeleton key={i} />
//                         ))}
//                     </div>
//                 ) : allAssets.length === 0 ? (
//                     <Card className="text-center py-12">
//                         <div className="text-gray-400 mb-4">
//                             <Search className="w-16 h-16 mx-auto" />
//                         </div>
//                         <h3 className="text-lg font-medium text-gray-900 mb-2">No assets found</h3>
//                         <p className="text-gray-500">Try adjusting your filters or upload some assets to get started.</p>
//                     </Card>
//                 ) : (
//                     <>
//                         <div className={`grid gap-6 ${viewMode === 'grid'
//                             ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
//                             : 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'
//                             }`}>
//                             {allAssets.map((asset, id) => (
//                                 <AssetCard
//                                     key={id}
//                                     asset={asset}
//                                     onPreview={handlePreview}
//                                     onDownload={handleDownload}
//                                     onShare={handleShare}
//                                 />
//                             ))}
//                         </div>

//                         {/* Load More Trigger */}
//                         <div ref={loadMoreRef} className="flex justify-center py-8">
//                             {isLoadingMore && (
//                                 <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
//                                     {Array.from({ length: 8 }).map((_, i) => (
//                                         <AssetCardSkeleton key={`loading-${i}`} />
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     </>
//                 )}
//             </div>

//             {/* Asset Preview Modal */}
//             <AssetPreview
//                 asset={previewAsset}
//                 isOpen={isPreviewOpen}
//                 onClose={() => {
//                     setIsPreviewOpen(false);
//                     setPreviewAsset(null);
//                 }}
//                 onDownload={handleDownload}
//                 onShare={handleShare}
//             />
//         </div>
//     );
// };

// export default Gallery;

import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Filter, Grid3X3, List, Search } from "lucide-react";
import { useAppSelector, useAppDispatch } from "../store";
import { fetchAssets, setViewMode, setSearch, setTypes } from "../store/slices/assetSlice";
import { addToast } from "../store/slices/uiSlice";
import AssetCard from "../components/assets/AssetCard";
import AssetPreview from "../components/assets/AssetPreview";
import { AssetCardSkeleton } from "../components/ui/Skeleton";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import type { Asset } from "../types";

const Gallery: React.FC = () => {

    const { type, search, viewMode } = useAppSelector((state) => state.asset);
    const [previewAsset, setPreviewAsset] = useState<Asset | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const dispatch = useAppDispatch();
    const {
        assets,
        isUploading,
        hasMore,
        page,
        isError,
        isLoading,
        isLoadingMore,
    } = useAppSelector((state) => state.asset);

    const { ref: loadMoreRef, inView } = useInView({
        threshold: 0,
        rootMargin: "100px",
    });

    // Fetch assets on mount and when filters (type, search) change
    useEffect(() => {
        dispatch(fetchAssets(0)); // Always fetch first page on filter change
    }, [type, search, dispatch]);

    // Infinite scroll: fetch next page if in view, hasMore, and not loading more
    useEffect(() => {
        if (inView && hasMore && !isLoadingMore && !isLoading) {
            dispatch(fetchAssets(page + 1)); // Fetch next page
        }
    }, [inView, hasMore, isLoadingMore, isLoading, page, dispatch]);

    const handlePreview = (asset: Asset) => {
        setPreviewAsset(asset);
        setIsPreviewOpen(true);
    };

    const handleDownload = async (asset: Asset) => {
        try {
            // await downloadMutation.mutateAsync(asset.id);
        } catch (error: any) {
            dispatch(
                addToast({
                    type: "error",
                    title: "Download Failed",
                    message: "Unable to download the asset. Please try again.",
                })
            );
        }
    };

    const handleShare = (asset: Asset) => {
        const shareUrl = `${window.location.origin}/asset/${asset.id}`;
        navigator.clipboard.writeText(shareUrl);
        dispatch(
            addToast({
                type: "success",
                title: "Link Copied",
                message: "Asset link copied to clipboard!",
            })
        );
    };

    // Instead of setFilters, dispatch setTypes and setSearch individually
    const handleFilterChange = (key: string, value: any) => {
        if (key === "type") {
            dispatch(setTypes(value));
        } else if (key === "search") {
            dispatch(setSearch(value));
        }
    };

    if (isError) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Error loading assets. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Asset Gallery</h1>
                    <p className="text-gray-600">Browse and manage your digital assets</p>
                </div>

                {/* View Toggle */}
                <div className="flex items-center space-x-2">
                    <Button
                        variant={viewMode === "grid" ? "primary" : "ghost"}
                        size="sm"
                        onClick={() => dispatch(setViewMode("grid"))}
                    >
                        <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                        variant={viewMode === "list" ? "primary" : "ghost"}
                        size="sm"
                        onClick={() => dispatch(setViewMode("list"))}
                    >
                        <List className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <Card>
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                        <Input
                            placeholder="Search assets..."
                            value={search}
                            onChange={(e) => handleFilterChange("search", e.target.value)}
                            leftIcon={<Search className="w-5 h-5" />}
                        />
                    </div>

                    <div className="flex gap-2">
                        <select
                            value={type}
                            onChange={(e) => handleFilterChange("type", e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#670D2F]"
                        >
                            <option value="">All Types</option>
                            <option value="image">Images</option>
                            <option value="video">Videos</option>
                            <option value="document">Documents</option>
                            <option value="audio">Audio</option>
                        </select>

                        <Button variant="ghost" size="sm">
                            <Filter className="w-4 h-4" />
                            Filters
                        </Button>
                    </div>
                </div>
            </Card>

            {/* Assets Grid/List */}
            <div className="min-h-[400px]">
                {isLoading ? (
                    <div
                        className={`grid gap-6 ${viewMode === "grid"
                            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                            : "grid-cols-1"
                            }`}
                    >
                        {Array.from({ length: 12 }).map((_, i) => (
                            <AssetCardSkeleton key={i} />
                        ))}
                    </div>
                ) : assets.length === 0 ? (
                    <Card className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <Search className="w-16 h-16 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No assets found</h3>
                        <p className="text-gray-500">
                            Try adjusting your filters or upload some assets to get started.
                        </p>
                    </Card>
                ) : (
                    <>
                        <div
                            className={`grid gap-6 ${viewMode === "grid"
                                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                                : "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
                                }`}
                        >
                            {assets.map((asset, id) => (
                                <AssetCard
                                    key={id}
                                    asset={asset}
                                    onPreview={handlePreview}
                                    onDownload={handleDownload}
                                    onShare={handleShare}
                                />
                            ))}
                        </div>

                        {/* Load More Trigger */}
                        <div ref={loadMoreRef} className="flex justify-center py-8">
                            {isLoadingMore && (
                                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
                                    {Array.from({ length: 8 }).map((_, i) => (
                                        <AssetCardSkeleton key={`loading-${i}`} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* Asset Preview Modal */}
            <AssetPreview
                asset={previewAsset}
                isOpen={isPreviewOpen}
                onClose={() => {
                    setIsPreviewOpen(false);
                    setPreviewAsset(null);
                }}
                onDownload={handleDownload}
                onShare={handleShare}
            />
        </div>
    );
};

export default Gallery;
