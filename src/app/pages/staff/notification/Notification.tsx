import {
    Settings,
    Heart,
    MessageCircle,
    UserPlus,
    Bell,
    Check,
    AlertTriangle,
    Gift,
    Star
} from 'lucide-react';

export const Notification: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-6 py-6">
                {/* Filter/Tab Section */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                        <button className="px-6 py-2 text-sm font-medium text-white bg-orange-500 rounded-md transition-all duration-200 hover:bg-orange-600">
                            All
                        </button>
                        <button className="px-6 py-2 text-sm font-medium text-gray-600 hover:text-orange-500 hover:bg-white rounded-md transition-all duration-200">
                            Unread
                        </button>
                        <button className="px-6 py-2 text-sm font-medium text-gray-600 hover:text-orange-500 hover:bg-white rounded-md transition-all duration-200">
                            Read
                        </button>
                    </div>

                    <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-orange-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 border border-orange-200 hover:border-orange-300">
                        <Check className="w-4 h-4" />
                        <span>Mark all as read</span>
                    </button>
                </div>

                {/* Notification List */}
                <div className="space-y-1">
                    {/* Unread Like Notification */}
                    <div className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-all duration-200 border-l-4 border-orange-500 bg-orange-50/30">
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">SA</span>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                                <Heart className="w-3 h-3 text-white fill-current" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-gray-900 font-medium">
                                        <span className="font-semibold">Sarah Anderson</span> liked your photo
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                                </div>
                                <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-2"></div>
                            </div>
                        </div>
                    </div>

                    {/* Read Comment Notification */}
                    <div className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-all duration-200">
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">MJ</span>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                <MessageCircle className="w-3 h-3 text-white" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        <span className="font-semibold text-gray-900">Mike Johnson</span> commented on your post: "This is amazing work! Really love the attention to detail."
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">4 hours ago</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Unread Follow Notification */}
                    <div className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-all duration-200 border-l-4 border-orange-500 bg-orange-50/30">
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">ER</span>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                <UserPlus className="w-3 h-3 text-white" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-gray-900 font-medium">
                                        <span className="font-semibold">Emma Rodriguez</span> started following you
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">6 hours ago</p>
                                </div>
                                <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-2"></div>
                            </div>
                        </div>
                    </div>

                    {/* Read System Alert */}
                    <div className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-all duration-200">
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                <Bell className="w-6 h-6 text-white" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                                <AlertTriangle className="w-3 h-3 text-white" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        <span className="font-semibold text-gray-900">System Alert:</span> Your account security settings have been updated successfully.
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Unread Achievement Notification */}
                    <div className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-all duration-200 border-l-4 border-orange-500 bg-orange-50/30">
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                                <Gift className="w-6 h-6 text-white" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                                <Star className="w-3 h-3 text-white fill-current" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-gray-900 font-medium">
                                        <span className="font-semibold">Congratulations!</span> You've earned the "Creator" badge for publishing 10 posts.
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                                </div>
                                <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-2"></div>
                            </div>
                        </div>
                    </div>

                    {/* Read Multiple Likes Notification */}
                    <div className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-all duration-200">
                        <div className="relative">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center border-2 border-white">
                                    <span className="text-white font-semibold text-xs">AL</span>
                                </div>
                                <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center border-2 border-white">
                                    <span className="text-white font-semibold text-xs">JD</span>
                                </div>
                                <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center border-2 border-white">
                                    <span className="text-white font-semibold text-xs">KM</span>
                                </div>
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                                <Heart className="w-3 h-3 text-white fill-current" />
                            </div>
                        </div>
                        <div className="flex-1 min-w-0 ml-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        <span className="font-semibold text-gray-900">Alex Lee, John Doe and Kate Miller</span> liked your recent post about design trends.
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Read Welcome Notification */}
                    <div className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-xl transition-all duration-200">
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-lg">👋</span>
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-gray-700">
                                        <span className="font-semibold text-gray-900">Welcome to our platform!</span> We're excited to have you here. Take a moment to complete your profile.
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Load More Button */}
                <div className="flex justify-center mt-8">
                    <button className="px-6 py-3 text-sm font-medium text-orange-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 border border-orange-200 hover:border-orange-300">
                        Load more notifications
                    </button>
                </div>

                {/* Empty State (Commented Out) */}
                {/*
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bell className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No notifications yet</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            When you get notifications, they'll show up here. We'll let you know about likes, comments, and follows.
          </p>
        </div>
        */}
            </div>
        </div>
    );
}
