interface Props {
    profiles: any[]
    selectedProfile: string
    setSelectedProfile: (id: string) => void
  }
  
  const ProfileSelector = ({ profiles, selectedProfile, setSelectedProfile }: Props) => {
    return (
      <div>
        <label>Base Profile:</label>
        <select
          value={selectedProfile}
          onChange={(e) => setSelectedProfile(e.target.value)}
        >
          <option value="">-- Select a Profile --</option>
          {profiles.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>
    )
  }
  
  export default ProfileSelector