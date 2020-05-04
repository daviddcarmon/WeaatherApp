// localStorage.setItem("usersList", JSON.stringify(searchBox));
var usersList = [];
var searchList = JSON.parse(localStorage.getItem("users"));
$(document).ready(function () {
  if (searchList != null) {
    usersList = searchList;
  }

  // needs searchBoxElement.on("click", function(){ getWeather();}); for ajax request
  usersList.forEach(function (city) {
    var searchBoxElement = $("<li>").text(city);
    searchBoxElement.attr("value", city);
    searchBoxElement.attr({ id: "searchList", class: "list-group-item btn" });
    $("#searchList").after(searchBoxElement);
  });

  $("#searchBtn").on("click", function (event) {
    event.preventDefault();
    $("#searchInput").empty();
    var searchBoxElement = $("#searchInput").val().trim();
    usersList.push(searchBoxElement);
    var userSearch = $("<li>").text(searchBoxElement);
    localStorage.setItem("users", JSON.stringify(usersList));
    userSearch.attr("value", searchBoxElement);
    userSearch.attr({ id: "searchList", class: "list-group-item btn" });
    $("#searchList").after(userSearch);
    getWeatherDay();
    getWeather();
    // uvCall(); not working FIX!
  });

  $(".btn").on("click", function (event) {
    event.preventDefault();
    getWeatherDay();
    getWeather();
    getWeatherList(); // not working FIX!
    // uvCall(); not working FIX!
  });

  // 5 day function
  function getWeather() {
    var searchBoxElement = $("#searchInput").val().trim(); // need to be generic to work with localStorage.list(userList.forEach) - btn
    var apiKey = "22bcc8be8c461f292dcdb3783f0b7dde";
    var queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      searchBoxElement +
      "&appid=" +
      apiKey;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      var locTime = "12:00:00";
      var cityName = response.city.name;

      response.list.forEach((city) => {
        if (city.dt_txt.includes(locTime)) {
          var tempKelvin = city.main.temp;
          var cityTemp = (((tempKelvin - 273.15) * 9) / 5 + 32).toFixed(2);
          var wind = city.wind.speed;
          var humidity = city.main.humidity;
          var weatherMain = city.weather[0].main;
          var weatherDescrip = city.weather[0].description;
          var weatherIcon = city.weather[0].icon;
          var renderCity = $("<div>").attr("class", "city").text(cityName);
          var renderTemp = $("<div>")
            .attr("class", "currentTemp")
            .text("Temp: " + cityTemp);
          var renderHumidity = $("<div>")
            .attr("class", "humidity")
            .text("Humidity: " + humidity);
          var renderWind = $("<div>")
            .attr("class", "wind")
            .text("wind: " + wind);
          var renderWeather = $("<div>")
            .attr("class", "weather")
            .text(weatherMain);
          var renderDescript = $("<div>")
            .attr("class", "description")
            .text(weatherDescrip);
          var imgIcon = $("<img>").attr({
            src: "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png",
            alt: "weatherIcon",
            class: "img",
          });

          $("#fiveDay").append(renderCity);
          $("#fiveDay").append(renderTemp);
          $("#fiveDay").append(renderHumidity);
          $("#fiveDay").append(renderWind);
          $("#fiveDay").append(renderWeather);
          $("#fiveDay").append(renderDescript);
          $("#fiveDay").append(imgIcon);
        }
      });
    });
  }

  function getWeatherDay() {
    var searchBoxElement = $("#searchInput").val().trim(); // need to be generic to work with localStorage.list(userList.forEach) - btn
    var apiKey = "22bcc8be8c461f292dcdb3783f0b7dde";
    var queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      searchBoxElement +
      "&appid=" +
      apiKey;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      var locTime = "12:00:00";
      var cityName = response.city.name;

      response.list.forEach((city) => {
        if (city.dt_txt.includes(locTime)) {
          var tempKelvin = city.main.temp;
          var cityTemp = (((tempKelvin - 273.15) * 9) / 5 + 32).toFixed(2);
          var wind = city.wind.speed;
          var humidity = city.main.humidity;
          var weatherMain = city.weather[0].main;
          var weatherDescrip = city.weather[0].description;
          var weatherIcon = city.weather[0].icon;
          $(".city").text(cityName);
          $(".currentTemp").text("Temp: " + cityTemp);
          $(".humidity").text("Humidity: " + humidity + "%");
          $(".wind").text("Wind: " + wind);
          $(".weather").text(weatherMain);
          $(".description").text(weatherDescrip);
          $(".img").attr(
            "src",
            "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
          );
        }
      });
    });
  }

  function uvCall() {
    var lat = response.city.coord.lat;
    var long = response.city.coord.lon;
    var searchBoxElement = $("#searchInput").val().trim();
    var queryURL =
      "http://api.openweathermap.org/data/2.5/uvi?appid=" +
      searchBoxElement +
      "&lat=" +
      lat +
      "&lon=" +
      long;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      var uvResponse = response.value;
      console.log("uv index: " + uvResponse);
    });
  }

  function clear() {
    $(".card").empty();
  }

  // list button function
  function getWeatherList() {
    var listElement = $(".btn").attr("value"); // need fix not working
    var apiKey = "22bcc8be8c461f292dcdb3783f0b7dde";
    var queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      listElement +
      "&appid=" +
      apiKey;
    console.log(listElement);
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      var locTime = "12:00:00";

      response.list.forEach((city) => {
        if (city.dt_txt.includes(locTime)) {
          var cityName = city.name;
          var tempKelvin = city.main.temp;
          var cityTemp = (((tempKelvin - 273.15) * 9) / 5 + 32).toFixed(2);
          var wind = city.wind.speed;
          var humidity = city.main.humidity;
          var weatherMain = city.weather[0].main;
          var weatherDescrip = city.weather[0].description;
          var weatherIcon = city.weather[0].icon;
          $(".city").text(cityName);
          $(".currentTemp").text("Temp: " + cityTemp);
          $(".humidity").text("Humidity: " + humidity + "%");
          $(".wind").text("Wind: " + wind);
          $(".weather").text(weatherMain);
          $(".description").text(weatherDescrip);
          $(".img").attr(
            "src",
            "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
          );
        }
      });
    });
  }
});
