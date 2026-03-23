import { useState } from 'react';

const API_KEY = import.meta.env.VITE_WEATHER_KEY;

export default function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

async function handleSearch() {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      if (!response.ok) throw new Error('Something went wrong')
      const data = await response.json()
      setWeather(data)
    } catch(error) {
      setError(error.message)
      setWeather(null)
    }
    setLoading(false)
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
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>{Math.round(weather.main.temp)}°C</p>
          <p>{weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed}m/s</p>
        </div>
      )}
    </div>
  )
}
