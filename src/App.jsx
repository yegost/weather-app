import { useState } from 'react';
import SearchBar from './components/SearchBar';
import Forecast from './components/Forecast';
import WeatherCard from './components/WeatherCard';

const API_KEY = import.meta.env.VITE_WEATHER_KEY;

export default function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [forecast, setForecast] = useState([])

async function handleSearch() {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      if (!response.ok) throw new Error('Something went wrong')
      const data = await response.json()
      setWeather(data)
      const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
      if (!forecastResponse.ok) throw new Error('Could not get forecast')
      const forecastData = await forecastResponse.json()
      const daily = forecastData.list.filter(item => item.dt_txt.includes('12:00:00'))
      setForecast(daily)
      console.log(daily)
    } catch(error) {
      setError(error.message)
      setWeather(null)
    }
    setLoading(false)
  }

  return(
    <div>
      <h1>Weather App</h1>
      <SearchBar city={city} setCity={setCity} handleSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weather && (
        <WeatherCard weather={weather} />
      )}
      {forecast.length > 0 && (
        <Forecast forecast={forecast} />
      )}
    </div>
  )
}
