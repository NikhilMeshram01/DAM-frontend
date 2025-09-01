import React from 'react';
import { Download, Eye, Share2, FileText, Video, Music } from 'lucide-react';
import type { Asset } from '../../types';
import { formatFileSize, formatDate } from '../../utils/helpers';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface AssetCardProps {
    asset: Asset;
    onPreview: (asset: Asset) => void;
    onDownload: (asset: Asset) => void;
    onShare: (asset: Asset) => void;
}

const AssetCard: React.FC<AssetCardProps> = ({
    asset,
    onPreview,
    onDownload,
    onShare
}) => {
    console.log(asset)
    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'video': return <Video className="w-4 h-4" />;
            case 'audio': return <Music className="w-4 h-4" />;
            case 'document': return <FileText className="w-4 h-4" />;
            default: return null;
        }
    };

    const renderThumbnail = () => {
        if (asset.category === 'image' && asset.downloadUrl?.original) {
            return (
                <img
                    src={asset.downloadUrl.original}
                    alt={asset.originalName}
                    className="w-full h-48 object-cover"
                />
            );
        }
        if (asset.category === 'video' && asset.downloadUrl?.thumbnail) {
            return (
                <img
                    src={asset.downloadUrl.thumbnail}
                    alt={asset.originalName}
                    className="w-full h-48 object-cover"
                />
            );
        }
        if (asset.category === 'document' && asset.downloadUrl?.thumbnail) {
            return (
                <img
                    src={asset.downloadUrl.thumbnail}
                    alt={asset.originalName}
                    className="w-full h-48 object-cover"
                />
            );
        }

        return (
            <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    {getTypeIcon(asset.category) || <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />}
                    <p className="text-sm text-gray-500">{asset.category?.toUpperCase()}</p>
                </div>
            </div>
        );
    };

    return (
        <Card hover className="overflow-hidden group">
            {/* Thumbnail */}
            <div className="relative cursor-pointer" onClick={() => onPreview(asset)}>
                {renderThumbnail()}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                    <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="font-medium text-gray-900 truncate mb-1">
                    {asset.originalName}
                </h3>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{formatFileSize(asset.size)}</span>
                    <span>{formatDate(asset.createdAt)}</span>
                </div>

                {/* Tags */}
                {asset.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                        {asset.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="px-2 py-1 text-xs bg-[#EF88AD] bg-opacity-20 text-[#670D2F] rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                        {asset.tags.length > 3 && (
                            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                                +{asset.tags.length - 3}
                            </span>
                        )}
                    </div>
                )}

                {/* uploaded by */}
                <h3 className=" text-gray-900">
                    <span className='text-sm'>by : </span>
                    <span className='text-sm'>{asset.uploader.email}</span>
                </h3>

                {/* Actions */}
                <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                        {asset.downloadCount} downloads
                    </span>

                    <div className="flex space-x-1">
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onDownload(asset)}
                            className="p-1"
                        >
                            <Download className="w-4 h-4" />
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onShare(asset)}
                            className="p-1"
                        >
                            <Share2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default AssetCard;