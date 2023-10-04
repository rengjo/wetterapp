import React, { useState } from "react";
import './WeatherApp.css'
import search_icon from '../Asset/search.png'
import cloud_icon from '../Asset/cloud.png'
import humidity_icon from '../Asset/humidity.png'
import wind_icon from '../Asset/wind.png'
import clear_icon from '../Asset/clear.png'; 
import drizzle_icon from '../Asset/drizzle.png';
import rain_icon from '../Asset/rain.png';
import snow_icon from '../Asset/snow.png';

const WeatherApp = () => {
  // API-Schlüssel für Zugriff auf Wetterdaten
  let api_key = "c36f660b3fbec6ecb0b42c0db2833397";

  // State-Hook für Wetter-Icon
  const [wicon, setWicon] = useState(cloud_icon);

  // Funktion zum Suchen von Wetterdaten basierend auf eingegebenener Stadt
  const search = async () => {
    const element = document.getElementsByClassName("cityInput")[0];
    if (element.value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element.value}&units=Metric&appid=${api_key}`;

    let response = await fetch(url);

    if (response.status === 200) {
      const data = await response.json();
      
      // Aktualisiere Anzeige mit den Wetterdaten
      document.getElementsByClassName("humidity-percent")[0].innerHTML =
        data.main.humidity + "%";
      document.getElementsByClassName("wind-rate")[0].innerHTML =
        data.wind.speed + " km/h";
      document.getElementsByClassName("weather-temp")[0].innerHTML =
        data.main.temp + "°C";
      document.getElementsByClassName("weather-location")[0].innerHTML =
        data.name;

      // Hier wird Wettericon basierend auf Wetterdaten aktualisiert
      if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n")
      {
          setWicon(clear_icon);
      }
      else if (data.weather[0].icon==="02d" || data.weather[0].icon==="02n")
      {
          setWicon(cloud_icon);
      }
      else if (data.weather[0].icon==="03d" || data.weather[0].icon==="03n")
      {
          setWicon(drizzle_icon);
      }
      else if (data.weather[0].icon==="04d" || data.weather[0].icon==="04n")
      {
          setWicon(drizzle_icon);
      }
      else if (data.weather[0].icon==="09d" || data.weather[0].icon==="09n")
      {
          setWicon(rain_icon);
      }
      else if (data.weather[0].icon==="10d" || data.weather[0].icon==="10n")
      {
          setWicon(rain_icon);
      }
      else if (data.weather[0].icon==="13d" || data.weather[0].icon==="13n")
      {
          setWicon(snow_icon);
      }
      else
      {
          setWicon(clear_icon)
      }
    } else {
        // Fehlermeldung
        alert("Oops! Etwas ist schiefgegangen. Bitte versuche es später erneut.");
      }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div className="search-icon" onClick={() => search()}>
          <img src={search_icon} alt="" />
        </div>
        <div className="weather-image">
          <img src={wicon} alt="" />
        </div>
        <div className="weather-temp">24°C</div>
        <div className="weather-location">Munich</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity_icon} alt="" className="icon" />
            <div className="data">
              <div className="humidity-percent">64%</div>
              <div className="text">Luftfeuchtigkeit</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} alt="" className="icon" />
            <div className="data">
              <div className="wind-rate">18 km/h</div>
              <div className="text">Wind Geschwindigkeit</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;