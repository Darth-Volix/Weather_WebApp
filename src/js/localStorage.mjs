import { recentSearchesTemplate } from "./templates.mjs";

function addToLocalStorage(cityName, cityState, postalCode) {
    // If recentSearches does not exist, create it 
    if (!localStorage.getItem("recentSearches")) {
        localStorage.setItem("recentSearches", JSON.stringify([]));
    }

    // Create the query subarray
    const searchQuery = [cityName, cityState, postalCode];

    // Add the subarray
    addSubArray(searchQuery);
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

    return;
}

function searchForSubArray(mainArray, searchQuery) {
    return mainArray.some(arr => JSON.stringify(arr) === JSON.stringify(searchQuery));
}

function displayRecentSearches() {

}