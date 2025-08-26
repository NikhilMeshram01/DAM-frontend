import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, Image, HardDrive, Download, Eye, TrendingUp } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Dashboard: React.FC = () => {
    const stats = [
        {
            title: 'Total Assets',
            value: '1,234',
            icon: Image,
            color: 'bg-blue-500',
            change: '+12%'
        },
        {
            title: 'Storage Used',
            value: '15.6 GB',
            icon: HardDrive,
            color: 'bg-green-500',
            change: '+2.3 GB'
        },
        {
            title: 'Downloads',
            value: '5,420',
            icon: Download,
            color: 'bg-purple-500',
            change: '+18%'
        },
        {
            title: 'Views',
            value: '12.4K',
            icon: Eye,
            color: 'bg-orange-500',
            change: '+24%'
        }
    ];

    const recentAssets = [
        { id: '1', name: 'Product_Image_001.jpg', type: 'image', size: '2.4 MB', date: '2 hours ago' },
        { id: '2', name: 'Marketing_Video.mp4', type: 'video', size: '45.2 MB', date: '5 hours ago' },
        { id: '3', name: 'Brand_Guidelines.pdf', type: 'document', size: '1.8 MB', date: '1 day ago' },
        { id: '4', name: 'Logo_Variations.zip', type: 'archive', size: '8.9 MB', date: '2 days ago' },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600">Welcome back! Here's what's happening with your assets.</p>
                </div>
                <Link to="/upload">
                    <Button leftIcon={<Upload className="w-4 h-4" />}>
                        Upload Assets
                    </Button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index} className="relative overflow-hidden">
                        <div className="flex items-center">
                            <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                                <stat.icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                            </div>
                            <div className="ml-4 flex-1">
                                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                <div className="flex items-center">
                                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                    <span className="ml-2 text-sm text-green-600 flex items-center">
                                        <TrendingUp className="w-4 h-4 mr-1" />
                                        {stat.change}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                    <div className="text-center py-6">
                        <Upload className="w-12 h-12 text-[#670D2F] mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Files</h3>
                        <p className="text-gray-600 mb-4">Add new assets to your library</p>
                        <Link to="/upload">
                            <Button size="sm">Upload Now</Button>
                        </Link>
                    </div>
                </Card>

                <Card>
                    <div className="text-center py-6">
                        <Image className="w-12 h-12 text-[#670D2F] mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Browse Gallery</h3>
                        <p className="text-gray-600 mb-4">Explore your asset collection</p>
                        <Link to="/gallery">
                            <Button size="sm" variant="secondary">View Gallery</Button>
                        </Link>
                    </div>
                </Card>

                <Card>
                    <div className="text-center py-6">
                        <TrendingUp className="w-12 h-12 text-[#670D2F] mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics</h3>
                        <p className="text-gray-600 mb-4">View usage and performance</p>
                        <Link to="/admin">
                            <Button size="sm" variant="secondary">View Stats</Button>
                        </Link>
                    </div>
                </Card>
            </div>

            {/* Recent Assets */}
            <Card>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Assets</h3>
                    <Link to="/gallery">
                        <Button variant="ghost" size="sm">View All</Button>
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Name</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Size</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Uploaded</th>
                                <th className="text-right py-3 px-4 font-medium text-gray-900">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentAssets.map((asset) => (
                                <tr key={asset.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center mr-3">
                                                <Image className="w-4 h-4 text-gray-500" />
                                            </div>
                                            <span className="font-medium text-gray-900">{asset.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-gray-600 capitalize">{asset.type}</td>
                                    <td className="py-3 px-4 text-gray-600">{asset.size}</td>
                                    <td className="py-3 px-4 text-gray-600">{asset.date}</td>
                                    <td className="py-3 px-4 text-right">
                                        <Button variant="ghost" size="sm">
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default Dashboard;