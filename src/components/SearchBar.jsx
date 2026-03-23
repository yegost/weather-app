export default function SearchBar({ city, setCity, handleSearch }) {
    return(
      <div>
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