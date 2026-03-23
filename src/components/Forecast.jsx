export default function Forecast({ forecast }) {
    return(
        <div>
            {forecast.map(item => (
                <div key={item.dt_txt}>
                    <p>Date: {item.dt_txt.slice(0, 10)}</p>
                    <p>Temperature: {Math.round(item.main.temp)}°C</p>
                    <p>Max temp: {Math.round(item.main.temp_max)}°C</p>
                    <p>Min temp: {Math.round(item.main.temp_min)}°C</p>
                    <p>Description: {item.weather[0].description}</p>
                </div>
            ))}
        </div>
    )
}