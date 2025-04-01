import { getLocationKey, getCurrentWeather, getFiveDayForecast } from "./weatherService.mjs";

async function handleLocationSubmit(e) {
    e.preventDefault();

    const cityName = document.getElementById("cityName").value;
    const cityState = document.getElementById("cityState").value;
    const postalCode = document.getElementById("postalCode").value;

    const locationKey = await getLocationKey(cityName, cityState, postalCode);

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
    // Remove event listeners to prevent memory leaking 
    document.getElementById("location-submit").removeEventListener("submit", handleLocationSubmit);

    // Add event listeners
    document.getElementById("location-submit").addEventListener("submit", handleLocationSubmit);
}