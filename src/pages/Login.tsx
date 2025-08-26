import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAppDispatch, useAppSelector } from '../store';
import { loginUser } from '../store/slices/authSlice';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { HardDrive, Mail, Lock } from 'lucide-react';

// Yup Validation Schema
const schema = yup.object().shape({
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

type FormData = {
    email: string;
    password: string;
};

const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoading, isAuthenticated } = useAppSelector(state => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const from = location.state?.from?.pathname || '/dashboard';

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const onSubmit = async (data: FormData) => {
        try {
            await dispatch(loginUser(data)).unwrap();
            navigate(from, { replace: true });
        } catch (error: any) {
            setError('root', {
                message: error?.message || 'Login failed. Please try again.',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#3A0519] via-[#670D2F] to-[#A53860] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo & Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
                        <HardDrive className="w-8 h-8 text-[#670D2F]" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Digital Asset Management</h1>
                    <p className="text-[#EF88AD] mt-2">Manage your assets (images, videos, documents etc) digitally</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
                        <p className="text-gray-600 mt-2">Sign in to your account</p>
                    </div>

                    {/* Display login error */}
                    {errors.root?.message && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600">{errors.root.message}</p>
                        </div>
                    )}

                    {/* Email Input */}
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="Enter your email"
                        leftIcon={<Mail className="w-5 h-5" />}
                        error={errors.email?.message}
                        {...register('email')}
                    />

                    {/* Password Input with internal toggle */}
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        leftIcon={<Lock className="w-5 h-5" />}
                        error={errors.password?.message}
                        {...register('password')}
                    />

                    <Button
                        disabled={isLoading}
                        type="submit"
                        isLoading={isLoading}
                        fullWidth
                        size="lg"
                    >
                        Sign In
                    </Button>

                    <div className="text-center">
                        <p className="text-gray-600">
                            Don’t have an account?{' '}
                            <Link to="/register" className="text-[#670D2F] hover:text-[#A53860] font-medium">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
