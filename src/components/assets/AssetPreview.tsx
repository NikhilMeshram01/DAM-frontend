import React from 'react';
import { X, Download, Share2 } from 'lucide-react';
import type { Asset } from '../../types';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

interface AssetPreviewProps {
    asset: Asset | null;
    isOpen: boolean;
    onClose: () => void;
    onDownload: (asset: Asset) => void;
    onShare: (asset: Asset) => void;
}

const AssetPreview: React.FC<AssetPreviewProps> = ({
    asset,
    isOpen,
    onClose,
    onDownload,
    onShare
}) => {
    if (!asset) return null;
    console.log("asset", asset)

    const renderPreview = () => {
        switch (asset.category) {
            case 'image':
                return (
                    <img
                        src={asset.downloadUrl?.original}
                        alt={asset.filename}
                        className="max-w-full max-h-96 object-contain mx-auto"
                    />
                );
            case 'document':
                return (
                    <img
                        src={asset.downloadUrl?.thumbnail}
                        alt={asset.filename}
                        className="max-w-full max-h-96 object-contain mx-auto"
                    />
                );
            case 'video':
                return (
                    <video
                        src={asset.downloadUrl?.original}
                        controls
                        className="max-w-full max-h-96 mx-auto"
                    >
                        Your browser does not support video playback.
                    </video>

                );
            case 'audio':
                return (
                    <audio
                        src={asset.url}
                        controls
                        className="w-full"
                    >
                        Your browser does not support audio playback.
                    </audio>
                );
            default:
                return (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Preview not available for this file type</p>
                        <p className="text-sm text-gray-400 mt-2">{asset.filename}</p>
                    </div>
                );
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <div className="space-y-4">
                {/* Preview */}
                <div className="text-center">
                    {renderPreview()}
                </div>



                {/* File Info */}
                <div className="border-t pt-4">
                    <h3 className="font-medium text-gray-900 mb-2">{asset.originalName}</h3>
                    {/* uploaded by */}
                    <h3 className=" text-gray-900 mb-2">
                        <span className='text-sm'>by : </span>
                        <span className='text-sm'>{asset.uploader.email}</span>
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                            <span className="font-medium">Type:</span> {asset.category}
                        </div>
                        <div>
                            <span className="font-medium">Size:</span> {(asset.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                        <div>
                            <span className="font-medium">Downloads:</span> {asset.downloadCount}
                        </div>
                        <div>
                            <span className="font-medium">Uploaded:</span> {new Date(asset.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-2 pt-4 border-t">
                    <Button
                        variant="secondary"
                        onClick={() => onShare(asset)}
                        leftIcon={<Share2 className="w-4 h-4" />}
                    >
                        Share
                    </Button>
                    <Button
                        onClick={() => onDownload(asset)}
                        leftIcon={<Download className="w-4 h-4" />}
                    >
                        Download
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default AssetPreview;