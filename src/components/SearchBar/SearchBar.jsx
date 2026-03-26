import styles from './SearchBar.module.css'
import PropTypes from "prop-types"
import { useRef, useEffect } from 'react'

export default function SearchBar({ city, setCity, handleSearch, loading, suggestions, setSuggestions, setIsSelecting }) {
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setSuggestions([])
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return(
    <div ref={ref} className={styles.searchBar} style={{ position: 'relative' }}>
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
                      setIsSelecting(true)
                      setSuggestions([])
                      handleSearch(s.name)
                      setTimeout(() => setIsSelecting(false), 500)
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
  handleSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  suggestions: PropTypes.array.isRequired,
  setSuggestions: PropTypes.func.isRequired,
  setIsSelecting: PropTypes.func.isRequired
}