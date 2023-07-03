let currCity = "Sweden";
let units = "metric";


let city = document.querySelector(".weather__city");
let weather__today = document.querySelector('.weather__today');
let weather__temperature = document.querySelector(".weather__temperature");
let weather__icon = document.querySelector(".weather__icon");
let weather__minmax = document.querySelector(".weather__minmax")
let weather__realfeel = document.querySelector('.weather__realfeel');
let weather__humidity = document.querySelector('.weather__humidity');
let weather__wind = document.querySelector('.weather__wind');
let weather__pressure = document.querySelector('.weather__pressure');

// search weather
document.querySelector(".weather__search").addEventListener('submit', e => {
    let search = document.querySelector(".weather__searchform");
    // prevent default
    e.preventDefault();
    // change city
    currCity = search.value;
    // get weather  
    getWeather();
    // clear form
    search.value = ""
})

//get current time and date
const hours = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');

const month = document.querySelector('.month');
const day = document.querySelector('.day');
const year = document.querySelector('.year');

function setDate() {
  const now = new Date();
  
  
  const mm = now.getMonth();
  const dd = now.getDate();
  const yyyy = now.getFullYear();
  
  
  const secs = now.getSeconds();
  const mins = now.getMinutes();
  const hrs = now.getHours();
  
  
  const monthName = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August', 'September',
  'October', 'November', 'December'];


  if (hrs < 10) {
    hours.innerHTML = '0' + hrs;
  } else {
    hours.innerHTML = hrs;
  }

  if (secs < 10) {
    seconds.innerHTML = '0' + secs;
  } else {
    seconds.innerHTML = secs;
  }

  if (mins < 10) {
    minutes.innerHTML = '0' + mins;
  } else {
    minutes.innerHTML = mins;
  }

  month.innerHTML = monthName[mm];
  day.innerHTML = dd;
  year.innerHTML = yyyy;
}

setInterval(setDate, 1000);


// convert country code to name
function convertCountryCode(country){
    let regionNames = new Intl.DisplayNames(["en"], {type: "region"});
    return regionNames.of(country)
}

function getWeather(){
    const API_KEY = '93ff73fc61344f0666224ffb86d649eb'

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`)
.then(res => res.json()).then(data => {

    console.log(data)
    city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}` 
    weather__today.innerHTML = `<p>${data.weather[0].main}`
    weather__temperature.innerHTML = `${data.main.temp.toFixed()}&#176`
    weather__icon.innerHTML = `   <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`
    weather__minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`
    weather__realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`
    weather__humidity.innerHTML = `${data.main.humidity}%`
    weather__wind.innerHTML = `${data.wind.speed} ${units === "imperial" ? "mph": "m/s"}` 
    weather__pressure.innerHTML = `${data.main.pressure} hPa`
})
}

document.body.addEventListener('load', getWeather())