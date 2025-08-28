import React, { useEffect, useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
import {
    // Users,
    HardDrive,
    Download,
    Upload,
    TrendingUp,
    // Eye,
    Image,
    Video,
    FileText,
    Music
} from 'lucide-react';
// import { adminApi } from '../services/api';
import Card from '../components/ui/Card';
import { getStats } from '../apis/admin.api';
// import { AssetCardSkeleton } from '../components/ui/Skeleton';
// import { formatFileSize } from '../utils/helpers';
// import { QUERY_KEYS } from '../utils/constants';

type Activity =
    {
        action: string,
        asset: string,
        time: string,
        user: string
    }

type Stats = {
    totalAssets: number;
    totalUploads: number;
    totalDownloads: number;
    storageUsed: number;
    recentUploads: any[]; // Replace `any` with proper asset type if available
    popularAssets: any[];
    totalStorageGB: number;
    assetTypes: {
        document: string | 0;
        image: string | 0
        video: string | 0
        audio: string | 0
    },
    recentActivity: Activity[],
    todaysDownloads: number
};

const AdminDashboard: React.FC = () => {

    const [stats, setStats] = useState<Stats>()
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getStats();
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch stats:", error);
            }
        };

        fetchStats();
    }, []);
    console.log(stats?.totalStorageGB)

    const statsCards = [
        {
            title: 'Total Assets',
            value: stats?.totalAssets?.toLocaleString() || '0',
            icon: Image,
            color: 'bg-blue-500',
            change: '+12.5%'
        },
        {
            title: "Today's Downloads",
            value: stats?.todaysDownloads?.toLocaleString() || '0',
            icon: Upload,
            color: 'bg-green-500',
            change: '+8.2%'
        },
        {
            title: 'Total Downloads',
            value: stats?.totalDownloads?.toLocaleString() || '0',
            icon: Download,
            color: 'bg-purple-500',
            change: '+15.7%'
        },
        {
            title: 'Storage Used',
            value: stats ? `${stats?.totalStorageGB.toFixed(2)} GB` : '0 GB',
            icon: HardDrive,
            color: 'bg-orange-500',
            change: '+2.1 GB'
        }
    ];

    const assetCounts = {
        image: Number(stats?.assetTypes?.image || 0),
        video: Number(stats?.assetTypes?.video || 0),
        document: Number(stats?.assetTypes?.document) || 0,
        audio: Number(stats?.assetTypes?.audio) || 0
    };
    const totalAssetTypeCount = Object.values(assetCounts).reduce((sum, count) => sum + count, 0);

    const getPercentage = (count: number) =>
        totalAssetTypeCount > 0 ? Math.round((count / totalAssetTypeCount) * 100) : 0;


    const assetTypeData = [
        { type: 'Images', count: stats?.assetTypes?.image || 0, percentage: getPercentage(assetCounts.image), icon: Image, color: 'bg-blue-500' },
        { type: 'Videos', count: stats?.assetTypes?.video || 0, percentage: getPercentage(assetCounts.video), icon: Video, color: 'bg-green-500' },
        { type: 'Documents', count: stats?.assetTypes?.document || 0, percentage: getPercentage(assetCounts.document), icon: FileText, color: 'bg-yellow-500' },
        { type: 'Audio', count: stats?.assetTypes?.audio || 0, percentage: getPercentage(assetCounts.audio), icon: Music, color: 'bg-purple-500' }
    ];

    const recentActivityData = stats?.recentActivity.map((item, i) => {
        return {
            action: item?.action,
            user: item?.user,
            asset: item?.asset,
            time: item?.time
        }
    })
    console.log(recentActivityData)

    // if (isLoading) {
    //     return (
    //         <div className="space-y-6">
    //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    //                 {Array.from({ length: 4 }).map((_, i) => (
    //                     <AssetCardSkeleton key={i} />
    //                 ))}
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Monitor system performance and user activity</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat, index) => (
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Asset Types Distribution */}
                <Card>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Asset Types</h3>
                    <div className="space-y-4">
                        {assetTypeData.map((item) => (
                            <div key={item.type} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className={`p-2 rounded-lg ${item.color} bg-opacity-10`}>
                                        <item.icon className={`w-5 h-5 ${item.color.replace('bg-', 'text-')}`} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">{item.type}</p>
                                        <p className="text-sm text-gray-500">{item.count} files</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="w-24 bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${item.color}`}
                                            style={{ width: `${item.percentage}%` }}
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 w-10 text-right">
                                        {item.percentage}%
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Storage Usage */}
                <Card>
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Storage Analytics</h3>
                    <div className="space-y-6">
                        <div className="text-center">
                            <div className="relative inline-flex items-center justify-center w-32 h-32 mb-4">
                                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        className="text-gray-200"
                                    />
                                    <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        strokeDasharray={`${Math.min((stats?.totalStorageGB || 0) / 1 * 251.33, 251.33)} 251.33`}
                                        // strokeDasharray={`${(stats?.totalStorageGB || 0) * 2.51} 251.33`}
                                        className="text-[#670D2F]"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-gray-900">{stats?.totalStorageGB.toFixed(2)}GB</div>
                                        <div className="text-sm text-gray-500">of 1GB</div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600">Storage Usage</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                            <div className="text-center">
                                <div className="text-lg font-semibold text-gray-900">85%</div>
                                <div className="text-sm text-gray-500">Efficiency</div>
                            </div>
                            <div className="text-center">
                                <div className="text-lg font-semibold text-gray-900">2.4TB</div>
                                <div className="text-sm text-gray-500">Total Space</div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Recent Activity */}
            <Card>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                    <button className="text-sm text-[#670D2F] hover:text-[#A53860] font-medium">
                        View All
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Action</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Asset</th>
                                <th className="text-left py-3 px-4 font-medium text-gray-900">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentActivityData && recentActivityData.map((activity, index) => (
                                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center">
                                            {activity.action === 'Upload' ? (
                                                <Upload className="w-4 h-4 text-green-500 mr-2" />
                                            ) : (
                                                <Download className="w-4 h-4 text-blue-500 mr-2" />
                                            )}
                                            <span className="font-medium text-gray-900">{activity.action}</span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-gray-600">{activity.user}</td>
                                    <td className="py-3 px-4 text-gray-900 font-medium">{activity.asset}</td>
                                    <td className="py-3 px-4 text-gray-500">{activity.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default AdminDashboard;