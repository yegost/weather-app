import styles from './Forecast.module.css'
import PropTypes from "prop-types"

export default function Forecast({ forecast, unit }) {
    const toF = c => Math.round(c * 9/5 + 32)

    return(
        <div className={styles.forecast}>
            {forecast.map(item => (
                <div key={item.dt_txt} className={styles.forecastCard}>
                    <p className={styles.date}>{item.dt_txt.slice(8, 10)}<span>{new Date(item.dt_txt).toLocaleDateString('en-GB', { weekday: 'short'})}</span></p>
                    <div className={styles.bodyContainer}>
                        <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt={item.weather[0].description} />
                        <div className={styles.tempContainer}>
                            <p className={styles.maxTemp}>{unit === "C" 
                                ? Math.round(item.main.temp_max) + "°"
                                : toF(item.main.temp_max) + "°"}
                            </p>
                            <p className={styles.minTemp}>{unit === "C" 
                                ? Math.round(item.main.temp_min) + "°"
                                : toF(item.main.temp_min) + "°"}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

Forecast.propTypes = {
    forecast: PropTypes.array.isRequired,
    unit: PropTypes.string.isRequired
}