const body = document.querySelector("body");
const homeElement = document.querySelector(".home-element");

const searchInput = document.querySelector(".search-query");
const API_KEY = 'b262969eaeb6ea12d97134e6a7589627';

// Handling the local storage and keeping track of the last search.
const localStorage = window.localStorage;
let tempData = JSON.parse(localStorage.getItem('lastSearch'));

// To output it to the screen, we just run the 'createElement' function again.

const fetchAPIData = (searchParam, opt, isMainElement) => {
  console.log(`latitude: ${searchParam}, longitude: ${opt}`);

  let weatherSection = document.createElement("section");
  let searchQuery = `http://api.openweathermap.org/data/2.5/weather?${ opt ? `lat=${searchParam}&lon=${opt}` : !isNaN(searchParam) ? `zip=${searchParam}` : `q=${searchParam}` }&appid=${API_KEY}&units=imperial`;

  fetch(searchQuery)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    if(isMainElement) {
      console.log("Our home!");
      handleData(data, homeElement);
    } else {
      handleData(data, weatherSection);
    }
  });

  body.appendChild(weatherSection);
}

const getWeather = () => {
  let searchParam = searchInput.value;

  fetchAPIData(searchParam);
}

const handleData = (data, element) => {
  createAppendElement(data, element);
  localStorage.setItem("lastSearch", JSON.stringify(data));

}

const createAppendElement = (data, section) => {
  let weatherDisplay = document.createElement("section");
  weatherDisplay.textContent = JSON.stringify(data);
  section.appendChild(weatherDisplay);
}

const main = () => {
  if(tempData) {
    let weatherSection = document.createElement("section");
    handleData(tempData, weatherSection);
    body.appendChild(weatherSection);
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