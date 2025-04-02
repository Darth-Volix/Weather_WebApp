import { recentSearchesTemplate } from "./templates.mjs";

export function addToLocalStorage(cityName, cityState, postalCode) {
    // If recentSearches does not exist, create it 
    if (!localStorage.getItem("recentSearches")) {
        localStorage.setItem("recentSearches", JSON.stringify([]));
    }

    // Create the query subarray
    const searchQuery = [cityName, cityState, postalCode];

    // Add the subarray
    addSubArray(searchQuery);

    const recentSearches = JSON.parse(localStorage.getItem("recentSearches"));
    const recentSearchesContainer = document.getElementById("recent-searches");

    recentSearchesContainer.innerHTML = recentSearchesTemplate(recentSearches);
}

function addSubArray(searchQuery) {
    // Retrieve the main array
    let mainArray = JSON.parse(localStorage.getItem("recentSearches"));

    // Check if the subarray is already in recent searches
    let subArrayExists = searchForSubArray(mainArray, searchQuery);

    // If subArray is already in the recent searches, return
    if (!subArrayExists) {
        return;
    }

    // Add the sub-array
    mainArray.push(searchQuery);

    // Save back to localStorage
    localStorage.setItem("recentSearches", JSON.stringify(mainArray));
}

function searchForSubArray(mainArray, searchQuery) {
    return mainArray.some(arr => JSON.stringify(arr) === JSON.stringify(searchQuery));
}