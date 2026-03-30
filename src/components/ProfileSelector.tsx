
interface Props {
    profiles: any[]
    selectedProfile: string
    setSelectedProfile: (id: string) => void
  }
  
  const ProfileSelector = ({ profiles, selectedProfile, setSelectedProfile }: Props) => {
    return (
      <div className="flex flex-col gap-2 w-full max-w-sm">
        <label className="text-gray-700 font-medium">Base Profile:</label>
        <select
          value={selectedProfile}
          onChange={(e) => setSelectedProfile(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                     transition duration-200 bg-white hover:border-indigo-400"
        >
          <option value="">-- Select a Profile --</option>
          {profiles.map(p => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
    )
  }
  
  export default ProfileSelector