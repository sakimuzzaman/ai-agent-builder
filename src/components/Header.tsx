

interface Props {
    loading: boolean
    sessionTime: number
    onReload: () => void
  }
  
  const Header = ({ loading, sessionTime, onReload }: Props) => {
    return (
      <header className="bg-lenear-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-b-xl shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Title and description */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl text-orange-300 font-bold tracking-wide drop-shadow-md">
              AI Agent Builder
            </h1>
            <p className="mt-1 text-indigo-500 text-sm md:text-base">
              Design your custom AI personality and capability set.
            </p>
          </div>
  
          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={onReload}
              disabled={loading}
              className={`px-5 py-2 rounded-lg font-medium transition-colors duration-200
                ${loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-white text-indigo-600 hover:bg-indigo-50'
                }`}
            >
              {loading ? 'Fetching...' : 'Reload Configuration Data'}
            </button>
  
            <span className="text-sm sm:text-base text-purple-500 font-semibold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
              Session Active: <span className="text-yellow-700">{sessionTime}s</span>
            </span>
          </div>
        </div>
      </header>
    )
  }
  
  export default Header