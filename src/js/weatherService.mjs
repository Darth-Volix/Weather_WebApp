// import API key
const apiKey = import.meta.env.VITE_ACCUWEATHER_API_KEY;

// API Base URLs
const baseURLPostalCode = "http://dataservice.accuweather.com/locations/v1/postalcodes/search?";
const baseURLCurrentConditions = "http://dataservice.accuweather.com/currentconditions/v1/";

// Function to fetch data.
async function getJSON(url) {
    // Set up the request options for the fetch call, including the HTTP method and API key in the headers.
    const options = {
      method: "GET", // HTTP method to retrieve data
      headers: {
        "X-Api-Key": apiKey // Provide the API key for authentication
      }
    };
  
    let data = null; // Variable to hold the data
  
    // Fetch data from the APIs.
    const response = await fetch(baseURL + url, options);
  
    if (response.ok) {
      // If the response is successful, parse the JSON data from the response.
      data = await response.json();
    } else {
      // If the response is not successful, log an error message.
      console.log("Response not OK");
    }
  
    // Return the data from the API response.
    return data;
}