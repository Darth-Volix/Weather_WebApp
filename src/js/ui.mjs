import { initializeFormHandling } from "./formHandling.mjs";
import { displayRecentSearches } from "./sessionStorage.mjs";

// Function to execute the main JS program for the site
export async function init() {
    displayRecentSearches();
    initializeFormHandling();
}