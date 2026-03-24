import './SearchBar.css'
import PropTypes from "prop-types"

export default function SearchBar({ city, setCity, handleSearch }) {
    return(
      <div className="search-bar">
        <input
            value={city}
            onChange={e => setCity(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder='Enter a city...'
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    )
}

SearchBar.propTypes = {
  city: PropTypes.string.isRequired,
  setCity: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired
}