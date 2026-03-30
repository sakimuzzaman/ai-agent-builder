interface Props {
    loading: boolean
    sessionTime: number
    onReload: () => void
  }
  
  const Header = ({ loading, sessionTime, onReload }: Props) => {
    return (
      <header className="header">
        <h1>AI Agent Builder</h1>
        <p>Design your custom AI personality and capability set.</p>
  
        <div className="header-actions">
          <button onClick={onReload} disabled={loading}>
            {loading ? 'Fetching...' : 'Reload Configuration Data'}
          </button>
  
          <span>Session Active: {sessionTime}s</span>
        </div>
      </header>
    )
  }
  
  export default Header