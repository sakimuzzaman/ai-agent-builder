const SavedAgents = ({ agents, onLoad, onDelete }) => {
    return (
      <div className="saved-agents">
        {agents.map((agent, index) => (
          <div key={index} className="card">
            <h3>{agent.name}</h3>
  
            <button onClick={() => onLoad(agent)}>Load</button>
            <button onClick={() => onDelete(index)}>Delete</button>
          </div>
        ))}
      </div>
    )
  }
  
  export default SavedAgents