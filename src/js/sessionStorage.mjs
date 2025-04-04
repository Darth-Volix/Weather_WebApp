import { recentSearchesTemplate } from "./templates.mjs";

// Check if recentSearches exists in sessionStorage, create it if not
export function addToSessionStorage(cityName, cityState, postalCode) {
    // If recentSearches does not exist, create it 
    if (!sessionStorage.getItem("recentSearches")) {
        sessionStorage.setItem("recentSearches", JSON.stringify([]));
    }

    // Create the query subarray
    const searchQuery = [cityName, cityState, postalCode];

    // Add the subarray
    addSubArray(searchQuery);

    // Display the recent searches to the user
    displayRecentSearches();
}

// Function to add a sub-array to recent searches
function addSubArray(searchQuery) {
    // Retrieve the main array
    let mainArray = JSON.parse(sessionStorage.getItem("recentSearches"));

    // Check if the subarray is already in recent searches
    let subArrayExists = searchForSubArray(mainArray, searchQuery);

    if (subArrayExists) {
        return;
    }

    // Add the sub-array
    mainArray.push(searchQuery);

    // Save back to sessionStorage
    sessionStorage.setItem("recentSearches", JSON.stringify(mainArray));
}

// Function to check if a sub-array exists in the main array
function searchForSubArray(mainArray, searchQuery) {
    return mainArray.some(arr => JSON.stringify(arr) === JSON.stringify(searchQuery));
}

// Display the recent searches 
export function displayRecentSearches() {
    if (sessionStorage.getItem("recentSearches")) {
        const recentSearches = JSON.parse(sessionStorage.getItem("recentSearches"));
        const recentSearchesContainer = document.getElementById("recent-searches-list");
        recentSearchesContainer.innerHTML = recentSearchesTemplate(recentSearches);
    }
}