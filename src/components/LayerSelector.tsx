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
      <div>
        <label>Add Layer:</label>
        <select onChange={handleLayerSelect} defaultValue="">
          <option value="" disabled>-- Select Layer --</option>
          {layers.map(l => (
            <option key={l.id} value={l.id}>
              {l.name} ({l.type})
            </option>
          ))}
        </select>
      </div>
    )
  }
  
  export default LayerSelector