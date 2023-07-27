let temp, wind, error, description, weather_icon, loc;
let forecast = {};
/* const temp = document.getElementById("temp");
    const wind = document.getElementById("wind");
    const description = document.getElementById("description");
    const error = document.getElementById("error"); */

fetch(
    "https://api.weatherapi.com/v1/forecast.json?key=e73fe8deac6849faa2b104646231707&q=Baku&days=3&aqi=no&alerts=no"
)
    .then((response) => response.json())
    .then((data) => renderWeather(data))
    .catch(() => renderError());

function renderWeather(data) {
    loc = document.getElementById("loc");
    temp = document.getElementById("temp");
    wind = document.getElementById("wind");
    weather_icon = document.getElementById("weather_icon");
    description = document.getElementById("description");
    error = document.getElementById("error");

    /* const day_0 = document.getElementById("day_0");
    const day_1 = document.getElementById("day_1");
    const day_2 = document.getElementById("day_2");

    const day0_icon = document.getElementById("day0_icon");
    const day1_icon = document.getElementById("day1_icon");
    const day2_icon = document.getElementById("day2_icon");

    const max_temp_day0 = document.getElementById("max_temp_day0");
    const max_temp_day1 = document.getElementById("max_temp_day1");
    const max_temp_day2 = document.getElementById("max_temp_day2");

    const min_temp_day0 = document.getElementById("min_temp_day0");
    const min_temp_day1 = document.getElementById("min_temp_day1");
    const min_temp_day2 = document.getElementById("min_temp_day2"); */

    error.textContent = "";
    loc.textContent = data.location.name + ", " + data.location.country;
    temp.textContent = " " + data.current.temp_c + " °C";
    wind.textContent = data.current.wind_kph + " km/h";
    weather_icon.src = "https:" + data.current.condition.icon;
    description.textContent = data.current.condition.text;

    /* let i = 0;
    eval(`day_${i}`).textContent = getWeekDay(
        new Date(data.forecast.forecastday[0].date.split("-").join(","))
    ); */
    for(let i = 0; i < data.forecast.forecastday.length; i++) {
        eval(`day_${i}`).textContent = getWeekDay(
            new Date(data.forecast.forecastday[i].date.split("-").join(","))
        );
        eval(`day${i}_icon`).src = "https:" + data.forecast.forecastday[i].day.condition.icon;
        eval(`max_temp_day${i}`).textContent = data.forecast.forecastday[i].day.maxtemp_c;
        eval(`min_temp_day${i}`).textContent = data.forecast.forecastday[i].day.mintemp_c;
    }
}
function renderError() {
    const error = document.getElementById("error");
    error.innerHTML = "Whoops, something went wrong. Please try again later!";
}

function getWeekDay(date) {
    let days = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
    return days[date.getDay()];
}
