


const AgentPreview = ({
  data,
  selectedProfile,
  selectedSkills,
  selectedLayers,
  setSelectedSkills,
  setSelectedLayers
}) => {

  const profile = data?.agentProfiles.find(p => p.id === selectedProfile)

  return (
    <div className="flex flex-col gap-6">

      {/* PROFILE */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Profile
        </h3>

        {profile ? (
          <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3">
            <p className="font-semibold text-indigo-700">
              {profile.name}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {profile.description}
            </p>
          </div>
        ) : (
          <p className="text-gray-400 text-sm">
            No profile selected
          </p>
        )}
      </div>

      {/* SKILLS */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Skills
        </h3>

        {selectedSkills.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No skills selected
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map(id => {
              const skill = data.skills.find(s => s.id === id)
              if (!skill) return null

              return (
                <span
                  key={id}
                  className="flex items-center gap-2 bg-indigo-100 text-indigo-700
                             px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill.name}

                  <button
                    onClick={() =>
                      setSelectedSkills(prev => prev.filter(s => s !== id))
                    }
                    className="text-indigo-500 hover:text-red-500 transition"
                  >
                    ✕
                  </button>
                </span>
              )
            })}
          </div>
        )}
      </div>

      {/* LAYERS */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Layers
        </h3>

        {selectedLayers.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No layers selected
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selectedLayers.map(id => {
              const layer = data.layers.find(l => l.id === id)
              if (!layer) return null

              return (
                <span
                  key={id}
                  className="flex items-center gap-2 bg-purple-100 text-purple-700
                             px-3 py-1 rounded-full text-sm font-medium"
                >
                  {layer.name}

                  <button
                    onClick={() =>
                      setSelectedLayers(prev => prev.filter(l => l !== id))
                    }
                    className="text-purple-500 hover:text-red-500 transition"
                  >
                    ✕
                  </button>
                </span>
              )
            })}
          </div>
        )}
      </div>

    </div>
  )
}

export default AgentPreview