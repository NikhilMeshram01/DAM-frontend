import React, { useState } from 'react';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';
import type { UploadProgress } from '../../types';
import { formatFileSize } from '../../utils/helpers';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface UploadZoneProps {
    onUpload: (files: File[]) => void;
    isUploading: boolean;
    uploadProgress: UploadProgress[];
}

const UploadZone: React.FC<UploadZoneProps> = ({
    onUpload,
    isUploading,
    uploadProgress
}) => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        setSelectedFiles(files);
    };

    const handleUpload = () => {
        if (selectedFiles.length > 0) {
            onUpload(selectedFiles);
        }
    };

    const removeFile = (index: number) => {
        setSelectedFiles(files => files.filter((_, i) => i !== index));
    };

    const clearFiles = () => {
        setSelectedFiles([]);
    };

    return (
        <div className="space-y-6">
            {/* Upload Area */}
            <Card className="border-2 border-dashed border-gray-300 hover:border-[#670D2F] transition-colors">
                <div className="text-center py-12">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Upload Files
                    </h3>
                    <p className="text-gray-500 mb-4">
                        Select multiple files to upload to your asset library
                    </p>

                    <input
                        type="file"
                        multiple
                        onChange={handleFileSelect}
                        className="hidden"
                        id="file-upload"
                        accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
                    />

                    <label
                        htmlFor="file-upload"
                        className="inline-flex items-center px-4 py-2 bg-[#670D2F] text-white rounded-lg hover:bg-[#A53860] transition-colors cursor-pointer"
                    >
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Files
                    </label>
                </div>
            </Card>

            {/* Selected Files */}
            {selectedFiles.length > 0 && (
                <Card>
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-medium">Selected Files ({selectedFiles.length})</h4>
                        <Button variant="ghost" size="sm" onClick={clearFiles}>
                            Clear All
                        </Button>
                    </div>

                    <div className="space-y-2">
                        {selectedFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex-1">
                                    <p className="font-medium text-sm">{file.name}</p>
                                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeFile(index)}
                                    className="p-1"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 flex justify-end">
                        <Button
                            onClick={handleUpload}
                            isLoading={isUploading}
                            disabled={selectedFiles.length === 0}
                            leftIcon={<Upload className="w-4 h-4" />}
                        >
                            Upload {selectedFiles.length} File{selectedFiles.length !== 1 ? 's' : ''}
                        </Button>
                    </div>
                </Card>
            )}

            {/* Upload Progress */}
            {uploadProgress.length > 0 && (
                <Card>
                    <h4 className="text-lg font-medium mb-4">Upload Progress</h4>
                    <div className="space-y-3">
                        {uploadProgress.map((item) => (
                            <div key={item.id} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">{item.file.name}</span>
                                    <div className="flex items-center space-x-2">
                                        {item.status === 'completed' && (
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                        )}
                                        {item.status === 'error' && (
                                            <AlertCircle className="w-4 h-4 text-red-500" />
                                        )}
                                        <span className="text-sm text-gray-500">{item.progress}%</span>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-300 ${item.status === 'error'
                                            ? 'bg-red-500'
                                            : item.status === 'completed'
                                                ? 'bg-green-500'
                                                : 'bg-[#670D2F]'
                                            }`}
                                        style={{ width: `${item.progress}%` }}
                                    />
                                </div>
                                {item.error && (
                                    <p className="text-xs text-red-600">{item.error}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    );
};

export default UploadZone;