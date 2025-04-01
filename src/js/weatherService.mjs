// import API key
const apiKey = import.meta.env.VITE_ACCUWEATHER_API_KEY;

// API Base URLs
const baseURLPostalCode = "http://dataservice.accuweather.com/locations/v1/postalcodes/search?";
const baseURLCurrentConditions = "http://dataservice.accuweather.com/currentconditions/v1/";


// Function to fetch data.
async function getData(url) {
    const options = {
      method: "GET", 
      headers: {
        "X-Api-Key": apiKey // Provide the API key for authentication
      }
    };
  
    let data = null; 
  
    const response = await fetch(url, options);
  
    if (response.ok) {
      data = await response.json();
    } else {
      console.log("Response not OK");
    }
  
    return data;
}

// Function to process API data and find the Location Key
function findLocationKey(locationData, cityName, cityState) {
    const result = locationData.find(item => item.LocalizedName === cityName && item.AdministrativeArea.LocalizedName === cityState);

    // If a matching item is found, return the Location Key. Otherwise return null.
    return result ? result.Key : null;
}

// Function to get location key based on postal code
async function getLocationKey(cityName, cityState, postalCode) {
    const url = baseURLPostalCode + "&q=" + postalCode;
    const locationData = await getData(url);

    const result = findLocationKey(locationData, cityName, cityState);

    return result;
}

// Function to get the current weather condition data
async function getCurrentWeather(locationKey) {
    const url = baseURLCurrentConditions + locationKey + "?&details=true";
    const currentWeatherData = await getData(url);

    return currentWeatherData;
}