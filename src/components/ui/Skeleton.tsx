import React from 'react';

interface SkeletonProps {
    className?: string;
    width?: string;
    height?: string;
    rounded?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
    className = '',
    width = 'w-full',
    height = 'h-4',
    rounded = false
}) => {
    const roundedClass = rounded ? 'rounded-full' : 'rounded';

    return (
        <div
            className={`bg-gray-200 animate-pulse ${width} ${height} ${roundedClass} ${className}`}
        />
    );
};

export const AssetCardSkeleton: React.FC = () => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Skeleton height="h-48" rounded={false} />
            <div className="p-4 space-y-2">
                <Skeleton height="h-4" width="w-3/4" />
                <Skeleton height="h-3" width="w-1/2" />
                <div className="flex justify-between items-center pt-2">
                    <Skeleton height="h-3" width="w-16" />
                    <Skeleton height="h-8" width="w-20" rounded />
                </div>
            </div>
        </div>
    );
};

export const ListSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
    return (
        <div className="space-y-4">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                    <Skeleton width="w-16" height="h-16" rounded />
                    <div className="ml-4 flex-1 space-y-2">
                        <Skeleton height="h-4" width="w-1/3" />
                        <Skeleton height="h-3" width="w-1/4" />
                    </div>
                    <Skeleton height="h-8" width="w-24" rounded />
                </div>
            ))}
        </div>
    );
};

export default Skeleton;