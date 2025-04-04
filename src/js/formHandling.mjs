import { getLocationKey, getLocationData, getCurrentWeather, getFiveDayForecast } from "./weatherService.mjs";
import { weatherDisplayTemplate, weatherDisplayFictionalTemplate } from "./templates.mjs";
import { addToSessionStorage } from "./sessionStorage.mjs";
import coruscantData from '../json/coruscant.json';
import hothData from '../json/hoth.json';
import tatooineData from '../json/tatooine.json';

// Handles real location submission
async function handleLocationSubmit(e) {
    e.preventDefault();

    const weatherDisplayContainer = document.getElementById("weather-display-container");
    const cityName = document.getElementById("cityName").value;
    const cityState = document.getElementById("cityState").value;
    const postalCode = document.getElementById("postalCode").value;

    const locationData = await getLocationData(postalCode);
    const locationKey = await getLocationKey(locationData, cityName, cityState);

    if (locationKey != null) {
        const currentWeather = await getCurrentWeather(locationKey);
        const fiveDayForecast = await getFiveDayForecast(locationKey);

        console.log(currentWeather);
        console.log(fiveDayForecast);

        weatherDisplayContainer.innerHTML = weatherDisplayTemplate(cityName, cityState, currentWeather, fiveDayForecast);
        addToSessionStorage(cityName, cityState, postalCode);
        window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        console.log("Data is null"); // adjust this later to add an alert that is displayed to the user.
    }
}

// Handles fictional location submission
async function handleFictionalLocationSubmit(e) {
    e.preventDefault();

    const weatherDisplayContainer = document.getElementById("weather-display-container");
    const ficionalLocation = document.getElementById("dropdown").value;

    const fictionalLocationData = eval(`${ficionalLocation.toLowerCase()}Data`);

    if (fictionalLocationData != null) {
        weatherDisplayContainer.innerHTML = weatherDisplayFictionalTemplate(fictionalLocationData);
        window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        console.log("Data is null"); // adjust this later to add an alert that is displayed to the user.
    }
}

// Handles the event listeners for the forms
export function initializeFormHandling() {
    const realLocationForm = document.getElementById("real-location-form");
    const fictionalLocationForm = document.getElementById("fictional-location-form");

    // Remove event listeners to prevent memory leaking 
    realLocationForm.removeEventListener("submit", handleLocationSubmit);
    fictionalLocationForm.removeEventListener("submit", handleFictionalLocationSubmit);
    

    // Add event listeners
    realLocationForm.addEventListener("submit", handleLocationSubmit);
    fictionalLocationForm.addEventListener("submit", handleFictionalLocationSubmit);
}