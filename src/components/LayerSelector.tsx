
interface Props {
  layers: any[]
  selectedLayers: string[]
  setSelectedLayers: React.Dispatch<React.SetStateAction<string[]>>
}

const LayerSelector = ({ layers, selectedLayers, setSelectedLayers }: Props) => {

  const handleLayerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const layerId = e.target.value

    if (layerId && !selectedLayers.includes(layerId)) {
      setSelectedLayers(prev => [...prev, layerId])
    }

    e.target.value = ""
  }

  return (
    <div className="flex flex-col gap-3 w-full max-w-md">

      {/* Label */}
      <label className="text-gray-700 font-medium">
        Add Layer:
      </label>

      {/* Dropdown */}
      <select
        onChange={handleLayerSelect}
        defaultValue=""
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
                   bg-white cursor-pointer
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                   hover:border-indigo-400 transition duration-200"
      >
        <option value="" disabled>
          -- Select Layer --
        </option>
        {layers.map(l => (
          <option key={l.id} value={l.id}>
            {l.name} ({l.type})
          </option>
        ))}
      </select>

      {/* Selected Layers */}
      <div className="flex flex-wrap gap-2">
        {selectedLayers.map(layerId => {
          const layer = layers.find(l => l.id === layerId)
          if (!layer) return null

          return (
            <span
              key={layerId}
              className="flex items-center gap-2 bg-purple-100 text-purple-700
                         px-3 py-1 rounded-full text-sm font-medium"
            >
              {layer.name}

              {/* Remove Button */}
              <button
                onClick={() =>
                  setSelectedLayers(prev => prev.filter(id => id !== layerId))
                }
                className="text-purple-500 hover:text-red-500 transition"
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

export default LayerSelector