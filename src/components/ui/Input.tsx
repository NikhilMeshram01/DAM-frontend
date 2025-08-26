import React, { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
    label,
    error,
    leftIcon,
    rightIcon,
    fullWidth = true,
    className = '',
    type,
    ...props
}, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    const inputClasses = `
        block px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-[#670D2F] focus:border-[#670D2F]
        disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
        ${leftIcon ? 'pl-10' : ''}
        ${(isPassword || rightIcon) ? 'pr-10' : ''}
        ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''}
        ${fullWidth ? 'w-full' : ''}
        ${className}
    `;

    return (
        <div className={`${fullWidth ? 'w-full' : 'inline-block'}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <div className="relative">
                {leftIcon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400">{leftIcon}</span>
                    </div>
                )}

                <input
                    ref={ref}
                    type={inputType}
                    className={inputClasses}
                    {...props}
                />

                {/* Password toggle or right icon */}
                {(isPassword && !rightIcon) ? (
                    <button
                        type="button"
                        onClick={() => setShowPassword(prev => !prev)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                ) : rightIcon && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-400">{rightIcon}</span>
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
