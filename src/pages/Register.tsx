import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useAppDispatch, useAppSelector } from '../store';
import { registerUser } from '../store/slices/authSlice';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import { HardDrive, Mail, Lock, User } from 'lucide-react';

// ✅ Validation schema
const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords do not match')
        .required('Please confirm your password'),
    team: yup.string().required('team is required')
});

type FormData = yup.InferType<typeof schema>;

const Register: React.FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { isLoading, isAuthenticated } = useAppSelector(state => state.auth);
    console.log("isAuthenticated", isAuthenticated)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/gallery');
        }
    }, [isAuthenticated, navigate]);

    const onSubmit = async (data: FormData) => {
        try {
            console.log('team', data.team)
            await dispatch(registerUser({
                name: data.name,
                email: data.email,
                password: data.password,
                confirmPassword: data.confirmPassword,
                team: data.team
            })).unwrap();
            // navigate('/gallery');
        } catch (error: any) {
            setError('root', {
                message: error?.message || 'Registration failed. Please try again.',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#3A0519] via-[#670D2F] to-[#A53860] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
                        <HardDrive className="w-8 h-8 text-[#670D2F]" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Digital Asset Management</h1>
                    <p className="text-[#EF88AD] mt-2">Manage your assets (images, videos, documents etc) digitally</p>
                </div>

                <Card>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
                            <p className="text-gray-600 mt-2">Sign up to get started</p>
                        </div>

                        {errors.root?.message && (
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-600">{errors.root.message}</p>
                            </div>
                        )}

                        <div className="space-y-4">
                            <Input
                                label="Full Name"
                                placeholder="Enter your full name"
                                leftIcon={<User className="w-5 h-5" />}
                                error={errors.name?.message}
                                {...register('name')}
                            />

                            <Input
                                label="Email"
                                type="email"
                                placeholder="Enter your email"
                                leftIcon={<Mail className="w-5 h-5" />}
                                error={errors.email?.message}
                                {...register('email')}
                            />

                            <Input
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                leftIcon={<Lock className="w-5 h-5" />}
                                error={errors.password?.message}
                                {...register('password')}
                            />

                            <Input
                                label="Confirm Password"
                                type="password"
                                placeholder="Confirm your password"
                                leftIcon={<Lock className="w-5 h-5" />}
                                error={errors.confirmPassword?.message}
                                {...register('confirmPassword')}
                            />

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Team</label>
                                <select
                                    {...register('team')}
                                    className={`w-full px-3 py-2 border ${errors.team ? 'border-red-500' : 'border-gray-300'
                                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#670D2F]`}
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        Select a team
                                    </option>
                                    <option value="DevOps">DevOps</option>
                                    <option value="Frontend">Frontend</option>
                                    <option value="Backend">Backend</option>
                                    <option value="Testing">Testing</option>
                                    <option value="HR">HR</option>
                                    <option value="Finance">Finance</option>
                                </select>
                                {errors.team && (
                                    <p className="mt-1 text-sm text-red-600">{errors.team.message}</p>
                                )}
                            </div>

                        </div>

                        <Button type="submit" isLoading={isLoading} fullWidth size="lg">
                            Create Account
                        </Button>

                        <div className="text-center">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <Link to="/login" className="text-[#670D2F] hover:text-[#A53860] font-medium">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Register;
