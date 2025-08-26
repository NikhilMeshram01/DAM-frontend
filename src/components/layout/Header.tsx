import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store';
import { setSearch } from '../../store/slices/assetSlice';
import Input from '../ui/Input';
import Button from '../ui/Button';

const Header: React.FC = () => {
    const { user } = useAppSelector(state => state.auth);
    const { search } = useAppSelector(state => state.asset.filters);
    const dispatch = useAppDispatch();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearch(e.target.value));
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="flex items-center justify-between px-6 py-4">
                {/* Search */}
                <div className="flex-1 max-w-md">
                    <Input
                        type="search"
                        placeholder="Search assets..."
                        value={search}
                        onChange={handleSearchChange}
                        leftIcon={<Search className="w-5 h-5" />}
                        className="bg-gray-50 border-gray-200"
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="p-2">
                        <Bell className="w-5 h-5" />
                    </Button>

                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-[#670D2F] rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                            {user?.name}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;