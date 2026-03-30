interface Props {
    selectedProvider: string
    setSelectedProvider: (val: string) => void
  }
  
  const ProviderSelector = ({ selectedProvider, setSelectedProvider }: Props) => {
  
    const providers = ['Gemini', 'ChatGPT', 'Kimi', 'Claude', 'DeepSeek']
  
    return (
      <div>
        <label>AI Provider:</label>
        <select
          value={selectedProvider}
          onChange={(e) => setSelectedProvider(e.target.value)}
        >
          <option value="">-- Select Provider --</option>
          {providers.map(p => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>
    )
  }
  
  export default ProviderSelector