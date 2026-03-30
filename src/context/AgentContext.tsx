import { createContext,useContext } from 'react'
import { useAgentBuilder } from '../hooks/useAgentBuilder'

const AgentContext = createContext<any>(null)

export const AgentProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useAgentBuilder()

  return (
    <AgentContext.Provider value={value}>
      {children}
    </AgentContext.Provider>
  )
}

export const useAgent = () => {
  const context = useContext(AgentContext)

  if (!context) {
    throw new Error("useAgent must be used inside AgentProvider")
  }

  return context
}