/* Global Variables */
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");
let current = document.getElementById("current");
let forecast = document.getElementsByClassName("forecast");
//Personal API key for Weather API
const apiKey = "f01c4409940f4700894211523212409";
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
// Create a new date instance dynamically with JS
let date = new Date();

/* Function Declarations */

/* Function to request weather Data for the search value*/
function searchCity(searchValue) {
  let url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchValue}&days=3`;

  /* add spinner untill data is fetched */
  current.innerHTML = '';
  forecast[0].innerHTML = `<div class="d-flex justify-content-center align-items-center" style="height: 350px;"><i class="fas fa-atom fa-3x fa-spin"></i>
  </div>`;
  forecast[1].innerHTML= '';
  
  fetchData(url)
    .then((data) => {
      displayCurrentWeather(data.location, data.current);
      displayNextTowDaysWeather(data.forecast.forecastday);
    })
    .catch((error) => console.log(error.message));
}

/* Function to GET Web API Data*/
async function fetchData(url) {
  let response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

/* Function to update the inner html of the DOM elements that will display the current day weather data*/
function displayCurrentWeather(location, currentWeatherData) {
  current.innerHTML = `
  <div class="header d-flex justify-content-between px-3">
    <span>${weekDays[date.getDay()]}</span>
    <span>${date.getDate()}${months[date.getMonth()]}</span>
  </div>
  <div class="body px-4 py-4 mb-2">
    <div id="location">
      ${location.name}
    </div>
    <div class="d-flex align-items-center mb-2">
      <span class="degree">${currentWeatherData.temp_c}<sup>o</sup>C</span>
      <div class="icon"><img src="https:${
        currentWeatherData.condition.icon
      }" alt="" width="90"></div>
    </div>
    <div class="condition mb-3">
      ${currentWeatherData.condition.text}
    </div>
    <span class="me-3"><img class="me-2" src="images/icon-umberella.png" alt="">20%</span>
    <span class="me-3"><img class="me-2" src="images/icon-wind.png" alt="">18km/h</span>
    <span class="me-3"><img class="me-2" src="images/icon-compass.png" alt="">East</span>
  </div>`;
  $("#current").css('opacity','0');
  $("#current").animate({ opacity: "1" }, 500);
}

/* Function to update the inner html of the DOM elements that will display the next two days forecast data*/
function displayNextTowDaysWeather(forecastData) {
  let str = "";
  for (let i = 1; i < forecastData.length; i++) {
    let index = (date.getDay() + i) % 7;
    str = `
  <div class="header d-flex justify-content-center">
    <span>${weekDays[index]}</span>
  </div>
  <div class="body px-3 py-5 mb-2 text-center">
    <div class="icon"><img src="https:${forecastData[i].day.condition.icon}" alt="" width="48"></div>
    <div class="degree">${forecastData[i].day.maxtemp_c}<sup>o</sup>C</div>
    <small>${forecastData[i].day.mintemp_c}<sup>o</sup>C</small>
    <div class="condition my-3">
      ${forecastData[i].day.condition.text}
    </div>
    </div>`;
    forecast[i - 1].innerHTML = str;
  }
  $(".forecast").css('opacity','0');
  $(".forecast").animate({ opacity: "1" }, 500);
}

/* Event Listeners */

searchInput.addEventListener("keyup", (e) => {
  searchCity(e.target.value);
});
searchBtn.addEventListener("click", () => {
  searchCity(searchInput.value);
});

/* Function Calls */
searchCity("cairo");
