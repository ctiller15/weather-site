const body = document.querySelector("body");

const searchInput = document.querySelector(".search-query");
const API_KEY = 'b262969eaeb6ea12d97134e6a7589627'

const getWeather = () => {

  let weatherSection = document.createElement("section");

  console.log(searchInput.value);
  let searchParam = searchInput.value;

  fetch(`http://api.openweathermap.org/data/2.5/weather?${!isNaN(searchParam) ? 'zip=' : 'q=' }${searchParam}&appid=${API_KEY}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    let weatherDisplay = document.createElement("section");
    weatherDisplay.textContent = JSON.stringify(data);
    weatherSection.appendChild(weatherDisplay);
  });

  body.appendChild(weatherSection);
}

const main = () => {
  // document.querySelector('h1').textContent += '?'
}

document.addEventListener('DOMContentLoaded', main);
