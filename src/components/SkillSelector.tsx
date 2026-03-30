
interface Props {
    skills: any[]
    selectedSkills: string[]
    setSelectedSkills: React.Dispatch<React.SetStateAction<string[]>>
  }
  
  const SkillSelector = ({ skills, selectedSkills, setSelectedSkills }: Props) => {
  
    const handleSkillSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const skillId = e.target.value
  
      if (skillId && !selectedSkills.includes(skillId)) {
        setSelectedSkills(prev => [...prev, skillId])
      }
  
      e.target.value = ""
    }
  
    return (
      <div className="flex flex-col gap-3 w-full max-w-md">
        {/* Label */}
        <label className="text-gray-700 font-medium">
          Add Skill:
        </label>
  
        {/* Dropdown */}
        <select
          onChange={handleSkillSelect}
          defaultValue=""
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                     bg-white cursor-pointer
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                     hover:border-indigo-400 transition duration-200"
        >
          <option value="" disabled>
            -- Select Skill --
          </option>
          {skills.map(s => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.category})
            </option>
          ))}
        </select>
  
        {/* Selected Skills */}
        <div className="flex flex-wrap gap-2">
          {selectedSkills.map(skillId => {
            const skill = skills.find(s => s.id === skillId)
            if (!skill) return null
  
            return (
              <span
                key={skillId}
                className="flex items-center gap-2 bg-indigo-100 text-indigo-700
                           px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill.name}
  
                {/* Remove Button */}
                <button
                  onClick={() =>
                    setSelectedSkills(prev => prev.filter(id => id !== skillId))
                  }
                  className="text-indigo-500 hover:text-red-500 transition"
                >
                  ✕
                </button>
              </span>
            )
          })}
        </div>
      </div>
    )
  }
  
  export default SkillSelector