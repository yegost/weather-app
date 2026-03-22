import { useState } from 'react';


export default function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)

  const API_KEY = import.meta.env.VITE_WEATHER_KEY;

async function handleSearch() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    const data = await response.json()
    setWeather(data)
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
      {weather && <p>{weather.name}</p>}
    </div>
  )
}