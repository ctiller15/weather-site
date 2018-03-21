const body = document.querySelector("body");

const searchInput = document.querySelector(".search-query");
const API_KEY = 'b262969eaeb6ea12d97134e6a7589627'

const fetchAPIData = (searchParam, opt) => {
  console.log(`latitude: ${searchParam}, longitude: ${opt}`);

  let weatherSection = document.createElement("section");

  fetch(`http://api.openweathermap.org/data/2.5/weather?${ opt ? `lat=${searchParam}&lon=${opt}` : !isNaN(searchParam) ? `zip=${searchParam}` : `q=${searchParam}` }&appid=${API_KEY}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    createAppendElement(data, weatherSection);
  });

  body.appendChild(weatherSection);
}

const getWeather = () => {
  let searchParam = searchInput.value;

  fetchAPIData(searchParam);
}

const createAppendElement = (data, section) => {
  let weatherDisplay = document.createElement("section");
  weatherDisplay.textContent = JSON.stringify(data);
  section.appendChild(weatherDisplay);
}

const main = () => {
  if("geolocation" in navigator) {
    console.log("We can do it!");
    navigator.geolocation.getCurrentPosition((position) => {
      // console.log(position.coords.latitude.toFixed(9), position.coords.longitude.toFixed(9));
      fetchAPIData(position.coords.latitude.toFixed(9), position.coords.longitude.toFixed(9));
    });
  } else {
    console.log("We cannot do it!");
  }
}

document.addEventListener('DOMContentLoaded', main);
