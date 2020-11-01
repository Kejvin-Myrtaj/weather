// riferimento API + url per effettuare richieste
const api = {
  key: "c376fa5b967fcd4ea71c1700843f5d13",
  base: "https://api.openweathermap.org/data/2.5/",
  img: "http://openweathermap.org/img/wn/",
};

// recupero il box di ricerca con una media query
const searchBox = document.querySelector(".search-box");
// aggiungo un eventListener al box di ricerca
// se scrivo qualcosa nel box viene eseguita la funzione test
searchBox.addEventListener("keypress", setQuery);

// funzione di test degli eventi della barra di ricerca
function test(event) {
  if (event.keyCode == 13) {
    alert(searchBox.value);
  }
}

// funzione per far partire la query
function setQuery(event) {
  if (event.keyCode == 13) {
    execQuery(searchBox.value);
  }
}

// funzione per effettuare la query
function execQuery(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      let w = weather.json();
      console.log(w);

      return w;
    })
    .then(visualizeData);
}

function setVisibility() {
  let location = document.querySelector(".location");
  let image = document.querySelector(".image");
  let currentWeather = document.querySelector(".current-weather");

  image.style.visibility = "visible";
  location.style.visibility = "visible";
  currentWeather.style.visibility = "visible";

}

// funzione per inserire i dati nella pagina
function visualizeData(weather) {
  let city = document.querySelector(".location .city");
  city.innerText = `City: ${weather.name}`;

  // testo da convertire in formato testuale attraverso una funzione
  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let weather_field = document.querySelector(".current-weather .weather");
  weather_field.innerText = `Weather: ${capitalize(weather.weather[0].description)}`;

  let temperature = document.querySelector(".current-weather .temperature");
  temperature.innerText = `Temperature: ${weather.main.temp}°C`;

  let high_low = document.querySelector(".current-weather .high-low");
  high_low.innerText = `Temperature: Min ${weather.main.temp_min}°C / Max ${weather.main.temp_max}°C`;

  let feels_like = document.querySelector(".current-weather .feels-like");
  feels_like.innerText = `Perceived temperature: ${weather.main.feels_like}°C`;

  let humidity = document.querySelector(".current-weather .humidity");
  humidity.innerText = `Humidity: ${weather.main.humidity}%`;

  let sunrise = document.querySelector(".current-weather .sunrise");
  let sunrise_time = timeBuilder(weather.sys.sunrise);
  sunrise.innerText = `Sunrise: ${ sunrise_time }`;

  let sunset = document.querySelector(".current-weather .sunset");
  let sunset_time = timeBuilder(weather.sys.sunset)
  sunset.innerText = `Sunset: ${ sunset_time }`;
  //`Weather: ${capitalize(weather.weather[0].description)}`

  let wind = document.querySelector(".current-weather .wind");
  wind.innerText = `Wind speed: ${weather.wind.speed} meter/sec.`;

  // recupero l'immagine associata alle condizioni meteo
  let image = document.querySelector(".image");
  image.src = `${api.img}${weather.weather[0].icon}@2x.png`;

  setVisibility();
}

function capitalize(testo) {
  return testo.charAt(0).toUpperCase() + testo.slice(1);
}

function dateBuilder(data) {
  let months = [
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
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[data.getDay()];
  let date = data.getDate();
  let month = months[data.getMonth()];
  let year = data.getFullYear();

  return `${ day } ${ date } ${ month } ${ year }`;
}
// Conversione in ore e minuti DA CORREGGERE
function timeBuilder(time) {
  // converto da unix time a timestamp
  let date = new Date(time * 1000);
  // divido la string tramite la virgola, prima della virgola ho la data
  // dopo la virgola ho l'ora
  let date_string = date.toLocaleString().split(',');

  return date_string[1];
};

/*
Temp
country
stato
alba/tramonto
main
*/
