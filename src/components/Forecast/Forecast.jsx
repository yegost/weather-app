import './Forecast.css'
import PropTypes from "prop-types"

export default function Forecast({ forecast }) {
    return(
        <div className="forecast">
            {forecast.map(item => (
                <div key={item.dt_txt} className="forecast-card">
                    <p className="date">{item.dt_txt.slice(8, 10)}<span>{new Date(item.dt_txt).toLocaleDateString('en-GB', { weekday: 'short'})}</span></p>
                    <div className="body-container">
                        <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt={item.weather[0].description} />
                        <div className="temp-container">
                            <p className="max-temp">{Math.round(item.main.temp_max)}°</p>
                            <p className="min-temp">{Math.round(item.main.temp_min)}°</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

Forecast.propTypes = {
    forecast: PropTypes.array.isRequired
}