"use strict";

const temp = document.querySelector(".js-temp");
const humidity = document.querySelector(".js-humidity");
const pressure = document.querySelector(".js-pressure");
const temp_max = document.querySelector(".js-tempmax");
const tempmin = document.querySelector(".js-tempmin");

const onLoad = () => {
  navigator.geolocation.getCurrentPosition(fetchData);
};

const apiKey = "4eb207579fca077d92c6c79d760eb4a3";
const fetchData = (position) => {
  const { latitude, longitude } = position.coords;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => setWeatherData(data));
};

const setWeatherData = (data) => {
  console.log(data);
  const weatherData = {
    location: data.name,
    description: data.weather[0].main,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    temperature: data.main.temp,
    tempmax: data.main.temp_max,
    tempmin: data.main.temp_min,
    date: getDate(),
  };

  Object.keys(weatherData).forEach((key) => {
    document.getElementById(key).textContent = weatherData[key];
  });
  temp.innerHTML = `${weatherData.temperature}<sup>ºC</sup>`;
  humidity.innerHTML = `Humidity ${weatherData.humidity}%`;
  pressure.innerHTML = `Pressure ${weatherData.pressure}hPa`;
  tempmax.innerHTML = `Max ${weatherData.tempmax}<sup class="grades">ºC</sup>`;
  tempmin.innerHTML = `Min ${weatherData.tempmin}<sup>ºC</sup>`;
  cleanUp();
};

const cleanUp = () => {
  let container = document.getElementById("container");
  let loader = document.getElementById("loader");
  loader.style.display = "none";
  container.style.display = "flex";
};

const getDate = () => {
  let date = new Date();
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};
