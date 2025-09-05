export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
          <span className="text-white font-bold text-xl">KR</span>
        </div>
        
        <div className="space-y-2">
          <div className="h-4 bg-white bg-opacity-20 rounded w-48 mx-auto animate-pulse"></div>
          <div className="h-4 bg-white bg-opacity-20 rounded w-32 mx-auto animate-pulse"></div>
        </div>
        
        <p className="text-white text-opacity-70">
          Loading KnowYourRightsAI...
        </p>
      </div>
    </div>
  );
}
