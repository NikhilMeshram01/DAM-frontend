import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useAppDispatch } from '../../store';
import { removeToast } from '../../store/slices/uiSlice';
import type { Toast as ToastType } from '../../types';

interface ToastProps {
    toast: ToastType;
}

const Toast: React.FC<ToastProps> = ({ toast }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (toast.duration) {
            const timer = setTimeout(() => {
                dispatch(removeToast(toast.id));
            }, toast.duration);

            return () => clearTimeout(timer);
        }
    }, [toast, dispatch]);

    const icons = {
        success: <CheckCircle className="w-5 h-5 text-green-500" />,
        error: <AlertCircle className="w-5 h-5 text-red-500" />,
        warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
        info: <Info className="w-5 h-5 text-blue-500" />
    };

    const borderColors = {
        success: 'border-l-green-500',
        error: 'border-l-red-500',
        warning: 'border-l-yellow-500',
        info: 'border-l-blue-500'
    };

    return (
        <div className={`bg-white rounded-lg shadow-lg border-l-4 ${borderColors[toast.type]} p-4 mb-4 max-w-md animate-in slide-in-from-right duration-200`}>
            <div className="flex items-start">
                <div className="flex-shrink-0">
                    {icons[toast.type]}
                </div>
                <div className="ml-3 flex-1">
                    <h4 className="text-sm font-semibold text-gray-900">{toast.title}</h4>
                    {toast.message && (
                        <p className="text-sm text-gray-600 mt-1">{toast.message}</p>
                    )}
                </div>
                <button
                    onClick={() => dispatch(removeToast(toast.id))}
                    className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default Toast;