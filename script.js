// data
let deg = '\u00B0';
let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
let day = days[now.getDay()];

let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'
];
let month = months[now.getMonth()];

let currentData = document.querySelector('#current-data');
currentData.innerHTML = `${day} ${month}, ${hours}:${minutes}, ${year}`;

function formatDay(timeStamp) {
    let date = new Date(timeStamp * 1000);
    let day = date.getDay();
    return days[day];
}


// forecast
function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastEl = document.querySelector('#forecast');
    let forecastHTML = '';

    forecast.forEach(function(forecastDay, index) {
        if (index < 4) {
            forecastHTML +=
                `<div class="forecast-item">
    <div class="forecast-day">
        <p class="forecast-day__text">${formatDay(forecastDay.dt)}</p>
        <img class="forecast-ico" src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="#">
    </div>
    <span class="forecast-temp">${Math.round(forecastDay.temp.day)+deg}</span> <span class="forecast-temp">${Math.round(forecastDay.temp.night)+deg}</span>
</div>`;
            forecastEl.innerHTML = forecastHTML;
        }
    });
}


// weather api
let cityName = 'Odesa';
let apiKey = 'b39a9b967790500d44fb2b61ad166507';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

function getForecast(coordinates) {
    let apiKey = 'c95d60a1e3adbeb286133f1ebebc2579';
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}


function showWeather(response) {
    console.log(response);

    celsiusTemp = response.data.main.temp;
    let temp = document.querySelector('#temp');
    temp.innerHTML = Math.round(celsiusTemp) + deg;

    let iconElement = document.querySelector('#icon');
    iconElement.setAttribute('src', `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute('alt', response.data.weather[0].description);

    let descWeather = document.querySelector('#weather-desc');
    descWeather.innerHTML = response.data.weather[0].description;
    document.querySelector('#city').innerHTML = response.data.name;

    let pressure = document.querySelector('.pressure');
    pressure.innerHTML = response.data.main.pressure;

    let humidity = document.querySelector('.humidity');
    humidity.innerHTML = response.data.main.humidity;

    let wind = document.querySelector('.wind');
    wind.innerHTML = response.data.wind.speed;

    getForecast(response.data.coord);
}

axios.get(`${apiUrl}&appId=${apiKey}`).then(showWeather);

function searchCity(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector('#city-input').value;
    searchCity(city);
}

let searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', handleSubmit);


// geolocation
function showPosition(position) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
    position.coords.latitude
  }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector('#current-loc');
button.addEventListener('click', getCurrentPosition);


// celsius & fahrenheit
function displayFahrenheitTemp(event) {
    event.preventDefault();
    let tempEl = document.querySelector('#temp');
    celsius.classList.remove('active');
    fahrenheit.classList.add('active');
    let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
    tempEl.innerHTML = Math.round(fahrenheitTemp) + deg;
}

function displayCelsiusTemp(event) {
    event.preventDefault();
    fahrenheit.classList.remove('active');
    celsius.classList.add('active');
    let tempEl = document.querySelector('#temp');
    tempEl.innerHTML = Math.round(celsiusTemp) + deg;
}

let celsiusTemp = null;

let fahrenheit = document.querySelector('#fahrenheit');
fahrenheit.addEventListener('click', displayFahrenheitTemp);

let celsius = document.querySelector('#celsius');
celsius.addEventListener('click', displayCelsiusTemp);
