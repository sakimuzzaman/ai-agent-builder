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
      <div>
        <label>Add Skill:</label>
        <select onChange={handleSkillSelect} defaultValue="">
          <option value="" disabled>-- Select Skill --</option>
          {skills.map(s => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.category})
            </option>
          ))}
        </select>
      </div>
    )
  }
  
  export default SkillSelector