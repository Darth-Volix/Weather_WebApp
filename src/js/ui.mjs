import { initializeFormHandling } from "./formHandling.mjs";
import { displayRecentSearches } from "./sessionStorage.mjs";

// Function to execute the main JS program for the site
export async function init() {
    displayRecentSearches();
    initializeFormHandling();
}

// Assign a weather description to a CSS background color
export function assignWeatherClass(weatherText) {
    const text = weatherText.toLowerCase();

    if ([
        'sunny', 'mostly sunny', 'partly sunny', 'clear', 'mostly clear',
        'partly cloudy', 'intermittent clouds', 'hazy sunshine', 'hazy moonlight'
    ].includes(text)) {
        return 'clear-skies';
    }

    if ([
        'mostly cloudy', 'cloudy', 'dreary', 'overcast'
    ].includes(text)) {
        return 'cloudy';
    }

    if ([
        'fog', 'mist', 'haze'
    ].includes(text)) {
        return 'foggy';
    }

    if ([
        'showers', 'mostly cloudy w/ showers', 'partly sunny w/ showers',
        'partly cloudy w/ showers', 'rain', 'mostly cloudy with showers'
    ].includes(text)) {
        return 'rainy';
    }

    if ([
        't-storms', 'mostly cloudy w/ t-storms', 'partly sunny w/ t-storms',
        'partly cloudy w/ t-storms', 'mostly cloudy with t-storms'
    ].includes(text)) {
        return 'thunderstorm';
    }

    if ([
        'flurries', 'mostly cloudy w/ flurries', 'partly sunny w/ flurries',
        'mostly cloudy with flurries', 'snow', 'mostly cloudy w/ snow',
        'mostly cloudy with snow', 'ice', 'sleet', 'freezing rain', 'rain and snow'
    ].includes(text)) {
        return 'snowy';
    }

    if (text === 'hot') {
        return 'hot';
    }

    if (text === 'cold') {
        return 'cold';
    }

    if (text === 'windy') {
        return 'windy';
    }

    // Default fallback
    return 'clear-skies';
}