import { getLocationKey, getLocationData, getCurrentWeather, getFiveDayForecast } from "./weatherService.mjs";

async function handleLocationSubmit(e) {
    e.preventDefault();

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
    } else {
        console.log("Data is null"); // adjust this later to add an alert that is displayed to the user.
    }
}

export function initializeFormHandling() {
    const realLocationForm = document.getElementById("real-location-form");

    // Remove event listeners to prevent memory leaking 
    realLocationForm.removeEventListener("submit", handleLocationSubmit);

    // Add event listeners
    realLocationForm.addEventListener("submit", handleLocationSubmit);
}