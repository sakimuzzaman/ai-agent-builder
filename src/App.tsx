
import AgentPreview from "./components/AgentPreview"
import Header from "./components/Header"
import LayerSelector from "./components/LayerSelector"
import ProfileSelector from "./components/ProfileSelector"
import ProviderSelector from "./components/ProviderSelector"
import SavedAgents from "./components/SavedAgents"
import SkillSelector from "./components/SkillSelector"

import { useAgent } from './context/AgentContext'
 

function App() {

  const {
    data,
    loading,
    error,

    selectedProfile,
    setSelectedProfile,

    selectedSkills,
    setSelectedSkills,

    selectedLayers,
    setSelectedLayers,

    selectedProvider,
    setSelectedProvider,

    agentName,
    setAgentName,

    savedAgents,
    sessionTime,

    fetchAPI,
    saveAgent,
    loadAgent,
    deleteAgent,
  } = useAgent()

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-indigo-50 to-purple-100">

    {/* Header */}
    <Header
      loading={loading}
      sessionTime={sessionTime}
      onReload={fetchAPI}
    />

    <div className="max-w-7xl mx-auto px-4 py-6">

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT PANEL */}
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-5 space-y-5 border border-gray-200">

          {error && (
            <p className="text-red-600 bg-red-50 px-3 py-2 rounded-md text-sm">
              {error}
            </p>
          )}

          {loading && (
            <p className="text-gray-500 text-sm animate-pulse">
              Loading...
            </p>
          )}

          {data && (
            <>
              <ProfileSelector
                profiles={data.agentProfiles}
                selectedProfile={selectedProfile}
                setSelectedProfile={setSelectedProfile}
              />

              <SkillSelector
                skills={data.skills}
                selectedSkills={selectedSkills}
                setSelectedSkills={setSelectedSkills}
              />

              <LayerSelector
                layers={data.layers}
                selectedLayers={selectedLayers}
                setSelectedLayers={setSelectedLayers}
              />

              <ProviderSelector
                selectedProvider={selectedProvider}
                setSelectedProvider={setSelectedProvider}
              />
            </>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="lg:col-span-2 space-y-6">

          {/* Preview Card */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-5 border border-gray-200">
            <AgentPreview
              data={data}
              selectedProfile={selectedProfile}
              selectedSkills={selectedSkills}
              selectedLayers={selectedLayers}
              setSelectedSkills={setSelectedSkills}
              setSelectedLayers={setSelectedLayers}
            />
          </div>

          {/* Save Box */}
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-md p-5 border border-gray-200 flex flex-col sm:flex-row gap-3 items-center">

            <input
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              placeholder="Enter agent name..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-indigo-500
                         focus:border-indigo-500 transition"
            />

            <button
              onClick={saveAgent}
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg
                         hover:bg-indigo-700 active:scale-95
                         transition duration-200 font-medium shadow"
            >
              Save Agent
            </button>
          </div>
        </div>
      </div>

      {/* Saved Agents */}
      <div className="mt-8 bg-white/80 backdrop-blur-md rounded-xl shadow-md p-5 border border-gray-200">
        <SavedAgents
          agents={savedAgents}
          onLoad={loadAgent}
          onDelete={deleteAgent}
        />
      </div>

    </div>
  </div>

    
  )

 
}

export default App
