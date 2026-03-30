import { useEffect, useState } from "react"
import type { AgentData } from '../types/agent';
import type { SavedAgent } from '../types/agent';

export const useAgentBuilder = () => {
  const [data, setData] = useState<AgentData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [selectedProfile, setSelectedProfile] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedLayers, setSelectedLayers] = useState<string[]>([])
  const [selectedProvider, setSelectedProvider] = useState("")

  const [agentName, setAgentName] = useState("")
  const [savedAgents, setSavedAgents] = useState<SavedAgent[]>([])

  const [sessionTime, setSessionTime] = useState(0)

  /* ===== EFFECTS ===== */

  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem("savedAgents")
    if (saved) {
      try {
        setSavedAgents(JSON.parse(saved))
      } catch (e) {
        console.error("Parse error", e)
      }
    }
  }, [])

  useEffect(() => {
    fetchAPI()
  }, [])

  /* ===== API ===== */

  const fetchAPI = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/data.json")

      if (!res.ok) throw new Error("Failed to fetch")

      const json = await res.json()
      setData(json)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  /* ===== ACTIONS ===== */

  const saveAgent = () => {
    if (!agentName.trim()) {
      alert("Enter agent name")
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
    localStorage.setItem("savedAgents", JSON.stringify(updated))
    setAgentName("")
  }

  const loadAgent = (agent: SavedAgent) => {
    setSelectedProfile(agent.profileId)
    setSelectedSkills(agent.skillIds)
    setSelectedLayers(agent.layerIds)
    setSelectedProvider(agent.provider || "")
    setAgentName(agent.name)
  }

  const deleteAgent = (index: number) => {
    const updated = savedAgents.filter((_, i) => i !== index)

    setSavedAgents(updated)
    localStorage.setItem("savedAgents", JSON.stringify(updated))
  }

  return {
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
  }
}