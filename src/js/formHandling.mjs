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

    const resultFlagContainer = document.getElementById('result-flag-container');
    const resultFlag = document.getElementById('result-flag');

    if (locationKey != null) {
        resultFlagContainer.style.display = 'flex';
        resultFlag.innerText = 'Weather Information for Location Found';
        resultFlagContainer.style.backgroundColor = 'green';

        
        const currentWeather = await getCurrentWeather(locationKey);
        const fiveDayForecast = await getFiveDayForecast(locationKey);

        console.log(currentWeather);
        console.log(fiveDayForecast);

        weatherDisplayContainer.innerHTML = weatherDisplayTemplate(cityName, cityState, currentWeather, fiveDayForecast);
        addToSessionStorage(cityName, cityState, postalCode);
        window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
        resultFlagContainer.style.display = 'flex';
        resultFlag.innerText = 'No Results. Please Try Again.';
        resultFlagContainer.style.backgroundColor = 'red';
    }
}

// Handles fictional location submission
async function handleFictionalLocationSubmit(e) {
    e.preventDefault();

    const weatherDisplayContainer = document.getElementById("weather-display-container");
    const fictionalLocation = document.getElementById("dropdown").value;

    let fictionalLocationData = null;

    if (fictionalLocation.toLowerCase() === 'hoth') {
        fictionalLocationData = hothData;
    } else if (fictionalLocation.toLowerCase() === 'coruscant') {
        fictionalLocationData = coruscantData;
    } else if (fictionalLocation.toLowerCase() === 'tatooine') {
        fictionalLocationData = tatooineData;
    }
    
    weatherDisplayContainer.innerHTML = weatherDisplayFictionalTemplate(fictionalLocationData);
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Handle when user clicks close button on result flag
function handleResultFlagClose(e) {
    e.preventDefault();

    const resultFlagContainer = document.getElementById("result-flag-container");
    resultFlagContainer.style.display = "none";
}

// Handles the event listeners for the forms
export function initializeFormHandling() {
    const realLocationForm = document.getElementById("real-location-form");
    const fictionalLocationForm = document.getElementById("fictional-location-form");
    const resultFlagClose = document.getElementById("flag-close");

    // Remove event listeners to prevent memory leaking 
    realLocationForm.removeEventListener("submit", handleLocationSubmit);
    fictionalLocationForm.removeEventListener("submit", handleFictionalLocationSubmit);
    resultFlagClose.removeEventListener("click", handleResultFlagClose);
    

    // Add event listeners
    realLocationForm.addEventListener("submit", handleLocationSubmit);
    fictionalLocationForm.addEventListener("submit", handleFictionalLocationSubmit);
    resultFlagClose.addEventListener("click", handleResultFlagClose);
}