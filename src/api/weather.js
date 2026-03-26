import { API_KEY } from "./config"

export async function fetchWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)
    if (!response.ok) throw new Error('Something went wrong') 
    return response.json()
}

export async function fetchForecast(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)
    if (!response.ok) throw new Error('Could not get forecast')
    return response.json()
}