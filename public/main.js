const body = document.querySelector("body");
const homeElement = document.querySelector(".home-element");
const weatherElement = document.querySelector(".weather-element");

const searchInput = document.querySelector(".search-query");
const API_KEY = 'b262969eaeb6ea12d97134e6a7589627';
const API_KEY_GOOGLE = 'AIzaSyCRzPHmUs7xjG8FAa1Z8M6XT_WLmErujHs';

// Handling the local storage and keeping track of the last search.
const localStorage = window.localStorage;
let tempData = JSON.parse(localStorage.getItem('lastSearch'));

// Starting a timer.
let searchTimeOut;

// tempData.addEventListener('keypress', () => {

// });
const checkQuery = (event) => {
  let autoComplete = new google.maps.places.Autocomplete(searchInput);

  if(searchTimeOut !== undefined) {
    clearTimeout(searchTimeOut);
    searchTimeOut = undefined;
  }
  searchTimeOut = setTimeout(() => {
    getWeather();
  }, 5000);


}

// To output it to the screen, we just run the 'createElement' function again.

const fetchAPIData = (searchParam, opt, isMainElement) => {
  // console.log(`latitude: ${searchParam}, longitude: ${opt}`);

  let weatherSection = document.createElement("section");

  let searchQuery = `http://api.openweathermap.org/data/2.5/weather?${ opt ? `lat=${searchParam}&lon=${opt}` : !isNaN(searchParam) ? `zip=${searchParam}` : `q=${searchParam}` }&appid=${API_KEY}&units=imperial`;

  fetch(searchQuery)
  .then((response) => {
    // console.log(response);
    if(response.status !== 200) {
      throw new Error(response.statusText);
    } else {
      return response.json();
    }

  })
  .then((data) => {
    if(isMainElement) {
      console.log("Our home!");
      handleData(data, homeElement);
    } else {
      handleData(data, weatherSection);
      weatherElement.appendChild(weatherSection);
    }
  }).catch( (error) => console.error(error));

}

const getWeather = () => {
  clearTimeout(searchTimeOut);
  let searchParam = searchInput.value;

  fetchAPIData(searchParam);
}

const handleData = (data, element) => {
  createAppendElement(data, element);
  localStorage.setItem("lastSearch", JSON.stringify(data));

}

const createAppendElement = (data, section) => {
  let weatherDisplay = document.createElement("section");

  // The header
  let weatherHeader = document.createElement("h2");
  weatherHeader.textContent = data.name;

  // The sub-header
  let weatherSub = document.createElement("h3");
  weatherSub.textContent = data.weather[0].description;

  // The section that creates the weather information.
  let weatherInfo = document.createElement("section");

  let temperature = document.createElement("p");
  let pressure = document.createElement("p");
  let humidity = document.createElement("p");
  let cloudCover = document.createElement("p");

  temperature.textContent = `${data.main.temp} degrees fahrenheit`;
  pressure.textContent = `${data.main.pressure} hPa`;
  humidity.textContent = `${data.main.humidity} % humidity`;
  cloudCover.textContent = `${data.clouds.all}% cloud cover`

  weatherInfo.appendChild(temperature);
  weatherInfo.appendChild(pressure);
  weatherInfo.appendChild(humidity);
  weatherInfo.appendChild(cloudCover);
  // The text
  let weatherText = document.createElement("p");
  weatherText.textContent = JSON.stringify(data);

  weatherDisplay.appendChild(weatherHeader);
  weatherDisplay.appendChild(weatherSub);
  weatherDisplay.appendChild(weatherInfo);
  // weatherDisplay.appendChild(weatherText);
  section.appendChild(weatherDisplay);
}

const main = () => {
  if(tempData) {
    let weatherSection = document.createElement("section");
    handleData(tempData, weatherSection);
    weatherElement.appendChild(weatherSection);
    console.log("All done!");
  }

  if("geolocation" in navigator) {
    console.log("We can do it!");
    navigator.geolocation.getCurrentPosition((position) => {
      fetchAPIData(position.coords.latitude.toFixed(9), position.coords.longitude.toFixed(9), true);
    });
  } else {
    console.log("We cannot do it!");
  }
}

document.addEventListener('DOMContentLoaded', main);
