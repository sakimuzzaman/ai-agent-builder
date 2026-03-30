const AgentPreview = ({ data, selectedProfile, selectedSkills, selectedLayers, setSelectedSkills, setSelectedLayers }) => {

    const profile = data?.agentProfiles.find(p => p.id === selectedProfile)
  
    return (
      <div className="preview-box">
        <h3>Profile</h3>
        {profile ? (
          <p><strong>{profile.name}</strong>: {profile.description}</p>
        ) : <p>No profile selected</p>}
  
        <h3>Skills</h3>
        {selectedSkills.map(id => {
          const skill = data.skills.find(s => s.id === id)
          return (
            <div key={id}>
              {skill?.name}
              <button onClick={() =>
                setSelectedSkills(prev => prev.filter(s => s !== id))
              }>Remove</button>
            </div>
          )
        })}
  
        <h3>Layers</h3>
        {selectedLayers.map(id => {
          const layer = data.layers.find(l => l.id === id)
          return (
            <div key={id}>
              {layer?.name}
              <button onClick={() =>
                setSelectedLayers(prev => prev.filter(l => l !== id))
              }>Remove</button>
            </div>
          )
        })}
      </div>
    )
  }
  
  export default AgentPreview