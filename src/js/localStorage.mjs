import { recentSearchesTemplate } from "./templates.mjs";

// Check if recentSearches exists in localStorage, create it if not
export function addToLocalStorage(cityName, cityState, postalCode) {
    // If recentSearches does not exist, create it 
    if (!localStorage.getItem("recentSearches")) {
        localStorage.setItem("recentSearches", JSON.stringify([]));
    }

    // Create the query subarray
    const searchQuery = [cityName, cityState, postalCode];

    // Add the subarray
    addSubArray(searchQuery);

    // Display the recent searches to the user
    const recentSearches = JSON.parse(localStorage.getItem("recentSearches"));
    const recentSearchesContainer = document.getElementById("recent-searches");
    recentSearchesContainer.insertAdjacentHTML("beforeend", recentSearchesTemplate(recentSearches));
}


// Function to add a sub-array to recent searches
function addSubArray(searchQuery) {
    // Retrieve the main array
    let mainArray = JSON.parse(localStorage.getItem("recentSearches"));

    // Check if the subarray is already in recent searches
    let subArrayExists = searchForSubArray(mainArray, searchQuery);

    if (subArrayExists) {
        return;
    }

    // Add the sub-array
    mainArray.push(searchQuery);

    // Save back to localStorage
    localStorage.setItem("recentSearches", JSON.stringify(mainArray));
}


// Function to check if a sub-array exists in the main array
function searchForSubArray(mainArray, searchQuery) {
    return mainArray.some(arr => JSON.stringify(arr) === JSON.stringify(searchQuery));
}