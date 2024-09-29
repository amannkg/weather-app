document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "enter-your-key";

  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;
    cityInput.value = "";

    try {
      resetWeatherDisplay();

      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      displayError();
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  function displayWeatherData(weatherData) {
    const { name, main, weather } = weatherData;
    const newWeather = weather[0].description.capitalize();

    cityNameDisplay.textContent = name;
    temperatureDisplay.innerHTML = `Teperature : ${main.temp}&deg; C`;
    descriptionDisplay.textContent = `Weather : ${newWeather}`;
  }

  function displayError() {
    errorMessage.classList.remove("hidden");
  }

  function resetWeatherDisplay() {
    errorMessage.classList.add("hidden");
    cityNameDisplay.textContent = "";
    temperatureDisplay.innerHTML = "";
    descriptionDisplay.textContent = "";
  }
});
