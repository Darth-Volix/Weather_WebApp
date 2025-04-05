import { assignWeatherClass } from "./ui.mjs";

// Weather Display added dynamically by JavaScript
export function weatherDisplayTemplate(cityName, cityState, currentWeather, fiveDayForecast) {
  return `
    <div id="current-day" class="forecast-day ${assignWeatherClass(currentWeather[0].WeatherText)}">
      <h2 id="current-day-title">Today's Weather - ${cityName}, ${cityState}</h2>
      <p>Current Temperature: <span id="current-temp">${currentWeather[0].Temperature.Imperial.Value} °F</span></p>
      <p>High: <span id="current-high">${fiveDayForecast.DailyForecasts[0].Temperature.Maximum.Value} °F</span></p>
      <p>Low: <span id="current-low">${fiveDayForecast.DailyForecasts[0].Temperature.Minimum.Value} °F</span></p>
      <p>Condition: <span id="current-condition">${currentWeather[0].WeatherText}</span></p>
      <p>Wind: <span id="wind-speed">${currentWeather[0].Wind.Speed.Imperial.Value} mph ${currentWeather[0].Wind.Direction.English}</span></p>
    </div>
    <h2 id="five-day-title">5-Day Forecast</h2>
    <div id="forecast">
      ${fiveDayForecast.DailyForecasts.map( day => `
        <div class="forecast-day ${assignWeatherClass(day.Day.IconPhrase)}">
          <p><span>${convertDate(day.Date)}</span></p>
          <div class="day-temp">
            <p>High: <span>${day.Temperature.Maximum.Value} °F</span></p>
            <p>Low: <span>${day.Temperature.Minimum.Value} °F</span></p>
          </div>
          <p><span>${day.Day.IconPhrase}</span></p>
        </div>
      `).join('')}
    </div>
  `;
}

// Function to display weather data for a fictional location
export function weatherDisplayFictionalTemplate(fictionalData) {
  return `
    <div id="current-day" class="forecast-day ${assignWeatherClass(fictionalData.current_day.condition)}">
      <h2 id="current-day-title">Today's Weather - ${fictionalData.current_day.title}</h2>
      <p>Current Temperature: <span id="current-temp">${fictionalData.current_day.temperature} °F</span></p>
      <p>High: <span id="current-high">${fictionalData.current_day.high} °F</span></p>
      <p>Low: <span id="current-low">${fictionalData.current_day.low} °F</span></p>
      <p>Condition: <span id="current-condition">${fictionalData.current_day.condition}</span></p>
      <p>Wind: <span id="wind-speed">${fictionalData.current_day.wind_speed} mph ${fictionalData.current_day.wind_direction}</span></p>
    </div>
    <h2 id="five-day-title">5-Day Forecast</h2>
    <div id="forecast">
      ${fictionalData.five_day_forecast.map( (day, dayNumber) => `
        <div class="forecast-day ${assignWeatherClass(day.condition)}">
          <p><span>${generateDate(dayNumber + 1)}</span></p>
          <div class="day-temp">
            <p>High: <span>${day.high} °F</span></p>
            <p>Low: <span>${day.low} °F</span></p>
          </div>
          <p><span>${day.condition}</span></p>
        </div>
      `).join('')}
    </div>
  `;
}

// Recent Searches to be added and displayed by JavaScript
export function recentSearchesTemplate(recentSearches) {
  return `
    ${recentSearches.map( search => `
      <li>${search[0]}, ${search[1]} ${search[2]}</li>
      `).join('')}`;
}

// Convert Datestring from API to user-friendly text
function convertDate(dateString) {
  const date = new Date(dateString);
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayOfWeek = daysOfWeek[date.getDay()];
  return dayOfWeek;
}

// Generate the days of the week for the five day forecast for fictional locations
function generateDate(dayNumber) {
  const date = new Date(); // Get the current date
  date.setDate(date.getDate() + dayNumber); // Add 'index' days to the current date

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayOfWeekIndex = date.getDay(); 
  const dayOfWeek = daysOfWeek[dayOfWeekIndex]

  return dayOfWeek;
}