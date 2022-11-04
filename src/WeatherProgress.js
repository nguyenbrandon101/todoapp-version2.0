import React from "react";
import Pie from "./Pie";
export default function WeatherProgress(props) {
/* String converter for city (upper case) */
    function convertCase(str) {
    var lower = String(str).toLowerCase();
    return lower.replace(/(^| )(\w)/g, function(x) {
        return x.toUpperCase();
    });
    }
    const api = {
        key: "685f452232fe143a9512c118bf0401a7",
        base: "https://api.openweathermap.org/data/2.5/"
    }
    const [valid,setValid] = React.useState(true)
    const [start,setStart] = React.useState(false)
    /** Value input of the city we want to search */
    const [citysearch,setCity] = React.useState("")
    /** Data weather of the city we searched */
    const [weatherData, setWeatherData] = React.useState({})
     /* When we click enter in the search input */
    async function search(event) {
        if (event.key === "Enter") {
            const response = await fetch(`${api.base}weather?q=${citysearch}&appid=${api.key}`)
            if (response.ok) {
                setValid(prev=> true)
                const data = await response.json()
                setWeatherData(prev =>data)
                setCity(prev => "")
                setStart(prev => true)
            } else {
                setValid(prev => false)
                setStart(prev => false)
                throw new Error("Enter a Valid City")
            }
        }
    }
    const rainy = ["Thunderstorm","Drizzle","Rain","Snow"]
    const sun = ["Clear"]
    function typeWeather() {
        console.log(weatherData.weather[0].main )
        if (rainy.includes(weatherData.weather[0].main)) {
            return require('./rain.png')
        } else if
            (sun.includes(weatherData.weather[0].main)) {
                return require('./sunny.png')
            } else {
                return require('./cloudy.png')
            }
    }

    return (
        <div className="weatherProg">
            <div className="progCirc">
                <h1>Task Progression</h1> 
                <Pie percentage={(props.done/props.total)*100} colour={"#EA40A4"} className="pieLetter" />
            </div>
            <div className="weather">
                <h1 className="weatherTitle">Today's Weather</h1> 
                <input 
                type="text" 
                placeholder ="Enter your city..." 
                onKeyDown={search} 
                onChange = {(event) => convertCase(setCity(event.target.value))}
                value = {citysearch}
                className = "weatherInput"
                >
                </input>
                <div className="weatherDisplay">
                    {start && <h1 className="cityName">{weatherData.name}</h1>}
                    {start && <h2 className="temp">{(Math.round((((weatherData.main.temp-273.15)*(9/5)+32))*100)/100).toFixed(2)} °F</h2>}
                    {start && <h2 className="weatherType">{convertCase(weatherData.weather[0].description)}</h2>}
                    {start && <img src= {typeWeather()} className ="navIcon"/>}
                    {valid == false && <h1 className="invalidCity">Please Enter A Valid City</h1>}
                </div>
            </div>
        </div>
    )
}
