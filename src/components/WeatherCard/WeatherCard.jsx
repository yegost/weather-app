import './WeatherCard.css'
import PropTypes from "prop-types"

export default function WeatherCard({ weather, unit, setUnit }) {
    const toF = c => Math.round(c * 9/5 + 32)

    return(
        <div className="weather-card">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <div className="temp-change">
                <p className="temp">{unit === "C" ? Math.round(weather.main.temp) : toF(weather.main.temp)}</p>
                <p className="temp-unit">°{unit}</p>
                <button onClick={() => setUnit(unit === "C" ? "F" : "C")}>{unit === "C" ? "F" : "C"}</button>
            </div>
            <p className="description">{weather.weather[0].description}</p>
            <div className="details">
                <p>Humidity: {weather.main.humidity}%</p>
                <p>Wind: {weather.wind.speed}m/s</p>
            </div>
        </div>
    )
}

WeatherCard.propTypes = {
    weather: PropTypes.object.isRequired,
    unit: PropTypes.string.isRequired,
    setUnit: PropTypes.func.isRequired
}