import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'md',
    className = '',
    text
}) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8'
    };

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className="flex items-center space-x-2">
                <Loader2 className={`animate-spin ${sizeClasses[size]} text-[#670D2F]`} />
                {text && <span className="text-sm text-gray-600">{text}</span>}
            </div>
        </div>
    );
};

export default LoadingSpinner;