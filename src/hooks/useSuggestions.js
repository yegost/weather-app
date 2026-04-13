import { useState, useEffect } from 'react'
import { API_KEY } from '../api/config'

export function useSuggestions(city, isSelecting) {
    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        if (isSelecting || city.length < 2) {
            setSuggestions([])
            return
        }
        const timer = setTimeout(() => {
            fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`)
                .then(res => res.json())
                .then(data => setSuggestions(data))
        }, 300)
        return () => clearTimeout(timer)
    }, [city, isSelecting])

    return { suggestions, setSuggestions }
}