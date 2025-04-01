

export function weatherDisplayTemplate(cityName, cityState, currentWeather, fiveDayForecast) {
    return `
      <div id="current-day" class="forecast-day ${currentWeather.condition.toLowerCase()}">
        <h2 id="current-day-title">Today's Weather - ${cityName}, ${cityState}}</h2>
        <p>Current Temperature: <span id="current-temp">${currentWeather.Temperature}°F</span></p>
        <p>High: <span id="current-high">${currentWeather.high}°F</span></p>
        <p>Low: <span id="current-low">${currentWeather.low}°F</span></p>
        <p>Condition: <span id="current-condition">${currentWeather.condition}</span></p>
        <p>Wind: <span id="wind-speed">${currentWeather.windSpeed} mph</span></p>
        <p>Wind Direction: <span id="wind-direction">${currentWeather.windDirection}</span></p>
      </div>
      <h2 id="five-day-title">5-Day Forecast</h2>
      <div id="forecast">
        ${fiveDayForecast.map(day => `
          <div class="forecast-day ${day.condition.toLowerCase()}">
            <p><span>${day.day}</span></p>
            <div class="day-temp">
              <p>High: <span>${day.high}°F</span></p>
              <p>Low: <span>${day.low}°F</span></p>
            </div>
            <p><span>${day.condition}</span></p>
          </div>
        `).join('')}
      </div>
    `;
}