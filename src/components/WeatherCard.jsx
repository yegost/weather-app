export default function WeatherCard({ weather }) {
    return(
        <div>
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p>{Math.round(weather.main.temp)}°C</p>
            <p>{weather.weather[0].description}</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed}m/s</p>
        </div>
    )
}