
interface Props {
    selectedProvider: string
    setSelectedProvider: (val: string) => void
  }
  
  const ProviderSelector = ({ selectedProvider, setSelectedProvider }: Props) => {
    const providers = ['Gemini', 'ChatGPT', 'Kimi', 'Claude', 'DeepSeek']
  
    return (
      <div className="flex flex-col gap-2 w-full max-w-sm">
        <label className="text-gray-700 font-medium">AI Provider:</label>
        <select
          value={selectedProvider}
          onChange={(e) => setSelectedProvider(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                     transition duration-200 bg-white hover:border-indigo-400 cursor-pointer"
        >
          <option value="">-- Select Provider --</option>
          {providers.map(p => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
    )
  }
  
  export default ProviderSelector