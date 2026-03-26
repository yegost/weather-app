import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import Forecast from './components/Forecast/Forecast';
import WeatherCard from './components/WeatherCard/WeatherCard';
import { fetchWeather, fetchForecast } from './api/weather';
import { API_KEY } from './api/config';

export default function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [forecast, setForecast] = useState([])
  const [unit, setUnit] = useState('C')
  const [suggestions, setSuggestions] = useState([])
  const [isSelecting, setIsSelecting] = useState(false)

  async function handleSearch(searchCity = city) {
    setLoading(true)
    setError('')
    try {
      const data = await fetchWeather(city)
      setWeather(data)
      const forecastData = await fetchForecast(city)
      const daily = forecastData.list.filter(item => item.dt_txt.includes('12:00:00'))
      setForecast(daily)
      setCity('')
    } catch(error) {
      setError(`Couldn't find results for ${city}.`)
      setWeather(null)
      setForecast([])
    }
    setLoading(false)
  }

  function getBackground(condition, temp) {
    const c = condition.toLowerCase()
    const t = temp < 10 ? 'cold' : temp < 20 ? 'mild' : 'warm'
    const known = ['clear', 'clouds', 'rain', 'drizzle', 'thunderstorm', 'snow', 'mist', 'smoke', 'haze']
    return known.includes(c) ? `${c}-${t}` : "default"
  }

  useEffect(() => {
      console.log(weather?.weather[0].main)
      const condition = weather
        ? getBackground(weather.weather[0].main, weather.main.temp)
        : 'default'
      document.body.className = condition
  }, [weather])

  useEffect(() => {
    if (isSelecting) {
      setSuggestions([])
      return
    }
    const timer = setTimeout(() => {
      fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`)
      .then(res => res.json())
      .then(data => setSuggestions(data))
    }, 300)
    return () => clearTimeout(timer)
  }, [city])

  return(
    <div>
      <div className="top-bar">
        <h1>Weather App</h1>
        <SearchBar city={city} 
          setCity={setCity} 
          handleSearch={handleSearch} 
          loading={loading} 
          suggestions={suggestions} 
          setSuggestions={setSuggestions} 
          setIsSelecting={setIsSelecting}
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weather && (
        <WeatherCard weather={weather} unit={unit} setUnit={setUnit} />
      )}
      {forecast.length > 0 && (
        <Forecast forecast={forecast} unit={unit} />
      )}
    </div>
  )
}
