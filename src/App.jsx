import { useState } from 'react';
import SearchBar from './components/SearchBar';
import Forecast from './components/Forecast';
import WeatherCard from './components/WeatherCard';
import { fetchWeather, fetchForecast } from './api/weather';

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
      const data = await fetchWeather(city)
      setWeather(data)
      const forecastData = await fetchForecast(city)
      const daily = forecastData.list.filter(item => item.dt_txt.includes('12:00:00'))
      setForecast(daily)
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
