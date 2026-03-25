import styles from './SearchBar.module.css'
import PropTypes from "prop-types"

export default function SearchBar({ city, setCity, handleSearch, loading }) {
    return(
      <div className={styles.searchBar}>
        <input
            disabled={loading}
            value={city}
            onChange={e => setCity(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder='Enter a city...'
        />
      </div>
    )
}

SearchBar.propTypes = {
  city: PropTypes.string.isRequired,
  setCity: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired
}