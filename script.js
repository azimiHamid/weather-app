const api_key = "31dd3c0ee374ec90bc6fb38400c63f9a";
const API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(API_URL + city + `&appid=${api_key}`);
    if (response.status == 404 || searchBox.value == "") {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }

    let result = await response.json();
    console.log(result);

    document.querySelector(".city").innerHTML = result.name;
    document.querySelector(".temp").innerHTML = Math.round(result.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = result.main.humidity + "%";
    document.querySelector(".wind").innerHTML = result.wind.speed + " km/h";

    if (result.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (result.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
    } else if (result.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if (result.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
    } else if (result.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
