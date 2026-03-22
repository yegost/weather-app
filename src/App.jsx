import { useState } from 'react';


export default function App() {
  const [city, setCity] = useState('')

  function handleSearch() {
    console.log('searching for: ', city)
  }

  return(
    <div>
      <h1>Weather App</h1>
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