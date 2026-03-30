import { useEffect, useState } from "react"
import AgentPreview from "./components/AgentPreview"
import Header from "./components/Header"
import LayerSelector from "./components/LayerSelector"
import ProfileSelector from "./components/ProfileSelector"
import ProviderSelector from "./components/ProviderSelector"
import SavedAgents from "./components/SavedAgents"
import SkillSelector from "./components/SkillSelector"



  //  Types Declaration
  interface AgentProfile {
    id: string
    name: string
    description: string
  }
  
  interface Skill {
    id: string
    name: string
    category: string
    description: string
  }
  
  interface Layer {
    id: string
    name: string
    type: string
    description: string
  }
  
  interface AgentData {
    agentProfiles: AgentProfile[]
    skills: Skill[]
    layers: Layer[]
  }
  
  interface SavedAgent {
    name: string
    profileId: string
    skillIds: string[]
    layerIds: string[]
    provider?: string
  }


function App() {
  
  //  API state
  const [data, setData] = useState<AgentData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  //  Selection state
  const [selectedProfile, setSelectedProfile] = useState('')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedLayers, setSelectedLayers] = useState<string[]>([])
  const [selectedProvider, setSelectedProvider] = useState('')

  //  Saving state
  const [agentName, setAgentName] = useState('')
  const [savedAgents, setSavedAgents] = useState<SavedAgent[]>([])

  //  Session timer
  const [sessionTime, setSessionTime] = useState(0)

  
  // =========================
  // ⏱ Session Timer
  // =========================
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // =========================
  // 💾 Load from localStorage
  // =========================
  useEffect(() => {
    const saved = localStorage.getItem('savedAgents')
    if (saved) {
      try {
        setSavedAgents(JSON.parse(saved))
      } catch (err) {
        console.error('Failed to parse saved agents', err)
      }
    }
  }, [])

  // =========================
  // 📊 Analytics (optional)
  // =========================
  useEffect(() => {
    const interval = setInterval(() => {
      console.log(
        agentName
          ? `[Analytics] Working on: "${agentName}"`
          : `[Analytics] Working on unnamed agent`
      )
    }, 8000)

    return () => clearInterval(interval)
  }, [agentName])

  // =========================
  // 🌐 Fetch API
  // =========================
  const fetchAPI = async () => {
    setLoading(true)
    setError(null)

    try {
      const delay = Math.floor(Math.random() * 2000) + 1000
      await new Promise(res => setTimeout(res, delay))

      const res = await fetch('/data.json')

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const json: AgentData = await res.json()
      setData(json)

    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  // =========================
  // 🚀 Initial Load
  // =========================
  useEffect(() => {
    fetchAPI()
  }, [])

  // =========================
  // 💾 Save Agent
  // =========================
  const handleSaveAgent = () => {
    if (!agentName.trim()) {
      alert('Please enter a name')
      return
    }

    const newAgent: SavedAgent = {
      name: agentName,
      profileId: selectedProfile,
      skillIds: selectedSkills,
      layerIds: selectedLayers,
      provider: selectedProvider,
    }

    const updated = [...savedAgents, newAgent]

    setSavedAgents(updated)
    localStorage.setItem('savedAgents', JSON.stringify(updated))

    setAgentName('')
    alert(`Agent "${newAgent.name}" saved`)
  }

  // =========================
  // 📂 Load Agent
  // =========================
  const handleLoadAgent = (agent: SavedAgent) => {
    setSelectedProfile(agent.profileId || '')
    setSelectedSkills(agent.skillIds || [])
    setSelectedLayers(agent.layerIds || [])
    setSelectedProvider(agent.provider || '')
    setAgentName(agent.name)
  }

  // =========================
  // ❌ Delete Agent
  // =========================
  const handleDeleteAgent = (index: number) => {
    const updated = savedAgents.filter((_, i) => i !== index)

    setSavedAgents(updated)
    localStorage.setItem('savedAgents', JSON.stringify(updated))
  }



  return (
    <div className="main">
      <Header
        loading={loading}
        sessionTime={sessionTime}
        onReload={fetchAPI}
      />

      <div className="layout">
        <div className="left">
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
        </div>
      </div>

      <SavedAgents
        agents={savedAgents}
        onLoad={handleLoadAgent}
        onDelete={handleDeleteAgent}
      />
    </div>
  )
}

export default App
