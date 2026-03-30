
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
    <div className="main">
      <Header
        loading={loading}
        sessionTime={sessionTime}
        onReload={fetchAPI}
      />

      <div className="layout">
        <div className="left">
          {error && <p className="error">{error}</p>}
          {loading && <p>Loading...</p>}

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

        <div className="right">
          <AgentPreview
            data={data}
            selectedProfile={selectedProfile}
            selectedSkills={selectedSkills}
            selectedLayers={selectedLayers}
            setSelectedSkills={setSelectedSkills}
            setSelectedLayers={setSelectedLayers}
          />

          <div className="save-box">
            <input
              value={agentName}
              onChange={(e) => setAgentName(e.target.value)}
              placeholder="Agent name..."
            />
            <button onClick={saveAgent}>Save</button>
          </div>
        </div>
      </div>

      <SavedAgents
        agents={savedAgents}
        onLoad={loadAgent}
        onDelete={deleteAgent}
      />
    </div>
  )
}

export default App
