import styles from './SearchBar.module.css'
import PropTypes from "prop-types"

export default function SearchBar({ city, setCity, handleSearch, loading, suggestions, setSuggestions }) {
  return(
    <div className={styles.searchBar} style={{ position: 'relative' }}>
      <input
          disabled={loading}
          value={city}
          onChange={e => setCity(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder='Enter a city...'
      />
      {suggestions.length > 0 && (
          <ul className={styles.dropdown}>
              {suggestions.map(s => (
                  <li key={`${s.lat}-${s.lon}`} onClick={() => {
                      setCity(s.name)
                      setSuggestions([])
                      handleSearch()
                  }}>
                      {s.name}, {s.country}
                  </li>
              ))}
          </ul>
      )}
    </div>
  )
}

SearchBar.propTypes = {
  city: PropTypes.string.isRequired,
  setCity: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired
}