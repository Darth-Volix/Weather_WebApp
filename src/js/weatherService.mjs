// import API key
const apiKey = import.meta.env.VITE_ACCUWEATHER_API_KEY;

// API Base URLs with `apikey` as a query parameter
const baseURLPostalCode = `https://dataservice.accuweather.com/locations/v1/postalcodes/search?apikey=${apiKey}&`;
const baseURLCurrentConditions = "https://dataservice.accuweather.com/currentconditions/v1/";
const baseURLFiveDayForecast = "https://dataservice.accuweather.com/forecasts/v1/daily/5day/";

// Function to fetch data
async function getData(url) {
    const response = await fetch(url);
    
    if (response.ok) {
        return await response.json();
    } else {
        console.log("Response not OK");
        return null;
    }
}

// Function to process API data and find the Location Key
export function getLocationKey(locationData, cityName, cityState) {
    const result = locationData.find(item => item.LocalizedName === cityName && item.AdministrativeArea.LocalizedName === cityState);
    return result ? result.Key : null;
}

// Function to get location key based on postal code
export async function getLocationData(postalCode) {
    const url = `${baseURLPostalCode}q=${postalCode}`;
    const locationData = await getData(url);

    return locationData;
}

// Function to get the current weather condition data
export async function getCurrentWeather(locationKey) {
    const url = `${baseURLCurrentConditions}${locationKey}?apikey=${apiKey}&details=true`;
    return await getData(url);
}

// Function to get the 5-Day weather forecast for the location
export async function getFiveDayForecast(locationKey) {
    const url = `${baseURLFiveDayForecast}${locationKey}?apikey=${apiKey}`;
    return await getData(url);
}

// Function to get Fictional Location data
export async function getFictionalData(location) {
    let fictionalURL = `src/json/${location.toLowerCase()}.json`; 
    const fictionalData = await getData(fictionalURL)
  
    return fictionalData;
}