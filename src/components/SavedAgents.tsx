

const SavedAgents = ({ agents, onLoad, onDelete }) => {
  return (
    <div>
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Saved Agents
      </h2>

      {/* Empty State */}
      {agents.length === 0 && (
        <p className="text-gray-500 text-sm">
          No saved agents yet.
        </p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4
                       hover:shadow-md transition duration-200"
          >
            {/* Agent Name */}
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              {agent.name}
            </h3>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => onLoad(agent)}
                className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-lg
                           hover:bg-indigo-700 transition text-sm font-medium"
              >
                Load
              </button>

              <button
                onClick={() => onDelete(index)}
                className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg
                           hover:bg-red-600 transition text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SavedAgents