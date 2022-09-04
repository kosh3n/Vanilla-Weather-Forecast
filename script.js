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

// weather api
let cityName = 'Odesa';
let apiKey = 'b39a9b967790500d44fb2b61ad166507';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;

function showWeather(response) {
    console.log(response);
    let temp = document.querySelector('#temp');
    temp.innerHTML = Math.round(response.data.main.temp) + deg;

    let descWeather = document.querySelector('#weather-desc');
    descWeather.innerHTML = response.data.weather[0].description;
    document.querySelector("#city").innerHTML = response.data.name;

    let pressure = document.querySelector('.pressure');
    pressure.innerHTML = response.data.main.pressure;

    let humidity = document.querySelector('.humidity');
    humidity.innerHTML = response.data.main.humidity;

    let wind = document.querySelector('.wind');
    wind.innerHTML = response.data.wind.speed;
}

axios.get(`${apiUrl}&appId=${apiKey}`).then(showWeather);

function searchCity(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);


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
