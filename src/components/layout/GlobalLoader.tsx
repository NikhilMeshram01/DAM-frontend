import React from 'react';
import { useAppSelector } from '../../store';
import LoadingSpinner from '../ui/LoadingSpinner';

const GlobalLoader: React.FC = () => {
    const isLoading = useAppSelector(state => state.ui.isLoading);

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6">
                <LoadingSpinner size="lg" text="Processing..." />
            </div>
        </div>
    );
};

export default GlobalLoader;