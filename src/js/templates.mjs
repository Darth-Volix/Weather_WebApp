// Weather Display added dynamically by JavaScript
export function weatherDisplayTemplate(cityName, cityState, currentWeather, fiveDayForecast) {
    return `
      <div id="current-day" class="forecast-day ${currentWeather.WeatherText.toLowerCase()}">
        <h2 id="current-day-title">Today's Weather - ${cityName}, ${cityState}}</h2>
        <p>Current Temperature: <span id="current-temp">${currentWeather.Temperature.Imperial.Value}°F</span></p>
        <p>High: <span id="current-high">${fiveDayForecast[0].Temperature.Maximum.Value}°F</span></p>
        <p>Low: <span id="current-low">${fiveDayForecast[0].Temperature.Minimum.Value}°F</span></p>
        <p>Condition: <span id="current-condition">${currentWeather.WeatherText}</span></p>
        <p>Wind: <span id="wind-speed">${currentWeather.Wind.Speed.Imperial.Value} mph ${currentWeather.Wind.Direction.English}</span></p>
      </div>
      <h2 id="five-day-title">5-Day Forecast</h2>
      <div id="forecast">
        ${fiveDayForecast.map(day => `
          <div class="forecast-day ${day.Day.IconPhrase.toLowerCase()}">
            <p><span>${convertDate(day.Date)}</span></p>
            <div class="day-temp">
              <p>High: <span>${day.Temperature.Maximum.Value}°F</span></p>
              <p>Low: <span>${day.Temperature.Minimum.Value}°F</span></p>
            </div>
            <p><span>${day.Day.IconPhrase}</span></p>
          </div>
        `).join('')}
      </div>
    `;
}

// Convert Datestring from API to user-friendly text
function convertDate(dateString) {
    const dateString = dateString;

    const date = new Date(dateString);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = daysOfWeek[date.getDay()];

    return dayOfWeek;
}