const API_KEY = 'e6117cfc9bb6a77972e9883cd69fa02e';
const LAT = -23.5505;
const LON = -46.6333;
const BASE = 'https://api.openweathermap.org/data/2.5';

const currentTemp = document.querySelector('#current-temp');
const currentDesc = document.querySelector('#current-desc');
const forecastList = document.querySelector('#forecast');

async function getJson(endpoint) {
  const url = `${BASE}/${endpoint}?lat=${LAT}&lon=${LON}&units=metric&lang=en&appid=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
}

function showCurrent(data) {
  currentTemp.textContent = `${Math.round(data.main.temp)}°C`;
  currentDesc.textContent = data.weather[0].description;

  const icon = document.querySelector('#weather-icon');
  icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  icon.alt = data.weather[0].description;
  icon.hidden = false;
}

function showForecast(data) {
  const today = new Date().toISOString().slice(0, 10);
  const days = data.list
    .filter((item) => item.dt_txt.endsWith('12:00:00') && !item.dt_txt.startsWith(today))
    .slice(0, 3);

  days.forEach((item) => {
    const date = new Date(`${item.dt_txt.slice(0, 10)}T12:00:00`);
    const li = document.createElement('li');
    const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
    li.textContent = `${weekday}: ${Math.round(item.main.temp)}°C`;
    forecastList.append(li);
  });
}

async function loadWeather() {
  try {
    const [current, forecast] = await Promise.all([getJson('weather'), getJson('forecast')]);
    showCurrent(current);
    showForecast(forecast);
  } catch (error) {
    currentTemp.textContent = 'Weather is not available right now.';
    console.error(error);
  }
}

loadWeather();
