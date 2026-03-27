import styles from './WeatherCard.module.css'
import PropTypes from "prop-types"

export default function WeatherCard({ weather, unit, setUnit }) {
    const toF = c => Math.round(c * 9/5 + 32)

    return(
        <div className={styles.weatherCard}>
            <div className={styles.left}>
                <h2>{weather.name}, {weather.sys.country}</h2>
                <div className={styles.tempContainer}>
                    <p className={styles.temp}>{unit === "C" 
                        ? Math.round(weather.main.temp) 
                        : toF(weather.main.temp)}
                    </p>
                    <div className={styles.tempChange}>
                        <p className={styles.tempUnit}>°{unit}</p>
                        <hr />
                        <button onClick={() => setUnit(unit === "C" ? "F" : "C")}>
                            {unit === "C" ? "F" : "C"}
                        </button>
                    </div>
                </div>
                <p className={styles.description}>{weather.weather[0].description}</p>
            </div>
            <div className={styles.right}>
                <p>💧 Humidity: {weather.main.humidity}%</p>
                <p>💨 Wind: {weather.wind.speed}m/s</p>
                <p>🌡️ Feels like {unit === "C" 
                    ? Math.round(weather.main.feels_like) 
                    : toF(weather.main.feels_like)}°</p>
            </div>
        </div>
    )
}

WeatherCard.propTypes = {
    weather: PropTypes.object.isRequired,
    unit: PropTypes.string.isRequired,
    setUnit: PropTypes.func.isRequired
}