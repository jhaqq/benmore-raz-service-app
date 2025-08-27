export default function LoadingServiceCard() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded"></div>
            <div>
              <div className="h-5 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-12"></div>
        </div>

        <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>

        <div className="flex flex-wrap gap-1">
          <div className="h-6 bg-gray-200 rounded w-16"></div>
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-6 bg-gray-200 rounded w-14"></div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
          <div className="space-y-2">
            <div className="h-12 bg-gray-200 rounded w-full"></div>
            <div className="h-12 bg-gray-200 rounded w-full"></div>
            <div className="h-12 bg-gray-200 rounded w-full"></div>
          </div>
        </div>

        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );
}