import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Upload,
    Image,
    Settings,
    Users,
    LogOut,
    HardDrive
} from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store';
import { logoutUser } from '../../store/slices/authSlice';
import Button from '../ui/Button';

const Sidebar: React.FC = () => {

    const { user } = useAppSelector(state => state.auth);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    };

    const navigation = [
        // { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Gallery', href: '/gallery', icon: Image },
        { name: 'Upload', href: '/upload', icon: Upload },
        ...(user?.role === 'admin' ? [
            { name: 'Admin', href: '/admin', icon: Settings },
            // { name: 'Users', href: '/users', icon: Users },
        ] : []),
    ];

    return (
        <div className="flex flex-col h-full bg-[#3A0519] text-white">
            {/* Logo */}
            <div className="flex items-center p-6 border-b border-[#670D2F]">
                <HardDrive className="w-8 h-8 text-[#EF88AD]" />
                <h1 className="ml-3 text-xl font-bold">DAM System</h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navigation.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${isActive
                                ? 'bg-[#670D2F] text-white'
                                : 'text-gray-300 hover:bg-[#670D2F] hover:text-white'
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5 mr-3" />
                        {item.name}
                    </NavLink>
                ))}
            </nav>

            {/* User Info & Logout */}
            <div className="p-4 border-t border-[#670D2F]">
                <div className="mb-4 text-sm">
                    <p className="text-gray-300">Signed in as</p>
                    <p className="font-medium text-white">{user?.email}</p>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    leftIcon={<LogOut className="w-4 h-4" />}
                    className="w-full text-gray-300 hover:bg-[#670D2F] hover:text-white"
                >
                    Sign Out
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;