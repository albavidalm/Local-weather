"use strict";

const onLoad = () => {
  navigator.geolocation.getCurrentPosition(fetchData);
};

const apiKey = "4eb207579fca077d92c6c79d760eb4a3";
const fetchData = (position) => {
  const { latitude, longitude } = position.coords;
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${apiKey}`
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
};

const getDate = () => {
  let date = new Date();
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
};
