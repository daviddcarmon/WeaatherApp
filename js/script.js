// localStorage.setItem("usersList", JSON.stringify(searchBox));
var usersList = [];
var searchList = JSON.parse(localStorage.getItem("users"));
$(document).ready(function () {
  if (searchList != null) {
    usersList = searchList;
  }

  // needs check to localStorage filter duplicates on submit button usersList.filter(function(item) {return item.id === id})
  usersList.forEach(function (city) {
    var searchBoxElement = $("<li>").text(city);
    searchBoxElement.attr("value", city);
    searchBoxElement.attr({
      id: "searchList",
      class: "list-group-item btn cityBtn",
    });
    $("#searchList").after(searchBoxElement);
  });

  $("#searchBtn").on("click", function (event) {
    // console.log("search pressed");
    event.preventDefault();
    if ($("#searchInput").val().trim() === "") {
      return;
    }
    var searchBoxElement = $("#searchInput").val().trim();
    if (!usersList.includes(searchBoxElement)) {
      usersList.push(searchBoxElement);
      var userSearch = $("<button>").text(searchBoxElement);
      localStorage.setItem("users", JSON.stringify(usersList));
      userSearch.attr("id", searchBoxElement);
      userSearch.attr({
        class: "list-group-item btn cityBtn",
      });
      $("#searchList").after(userSearch);
    }
    $("#searchInput").val("");
    getWeather(searchBoxElement);
    $("#fiveDayRow").empty();
  });

  $(".cityBtn").on("click", function (event) {
    event.preventDefault();
    var city = $(this).text();
    getWeather(city);
    // console.log(city);
    $("#fiveDayRow").empty();
  });

  // 5 day function
  function getWeather(city) {
    if (city) {
      searchBoxElement = city;
    } else {
      var searchBoxElement = $("#searchInput").val().trim();
    }
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
      var i = 0;
      console.log(response);
      response.list.forEach((city) => {
        // console.log(city.dt_txt);
        if (city.dt_txt.includes(locTime)) {
          var tempKelvin = city.main.temp;
          var cityTemp = (((tempKelvin - 273.15) * 9) / 5 + 32).toFixed(2);
          var wind = city.wind.speed;
          var humidity = city.main.humidity;
          var weatherMain = city.weather[0].main;
          var weatherDescrip = city.weather[0].description;
          var weatherIcon = city.weather[0].icon;
          var cityDate = city.dt_txt + "pm";
          var renderDate = $("<div>").attr("class", "date").text(cityDate);
          var renderCity = $("<div>").attr("class", "city").text(cityName);
          var renderTemp = $("<div>")
            .attr("class", "currentTemp")
            .text("Temp: " + cityTemp);
          var renderHumidity = $("<div>")
            .attr("class", "humidity")
            .text("Humidity: " + humidity);
          var renderWind = $("<div>")
            .attr("class", "wind")
            .text("Wind: " + wind);
          var renderWeather = $("<div>")
            .attr("class", "weather")
            .text(weatherMain);
          var renderDescript = $("<div>")
            .attr("class", "description")
            .text(weatherDescrip);
          var imgIcon = $("<img>").attr({
            src: "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png",
            alt: "weatherIcon",
            class: "img",
          });
          var lat = response.city.coord.lat;
          var long = response.city.coord.lon;

          var card = $("<div>").attr({
            class: "card col-3",
            id: "fiveDayCard",
          });

          card.append(
            renderDate,
            renderCity,
            renderTemp,
            renderHumidity,
            renderWind,
            renderWeather,
            renderDescript,
            imgIcon
          );
          $("#fiveDay").after(card);
          $("#fiveDayRow").append(card);

          if (i === 0) {
            uvCall(lat, long).then(function (response) {
              var uvResponse = "UV Index: " + response.value;
              console.log("uv index: " + uvResponse);
              var dayDiv = $("<div>").attr({
                class: "card-body",
                id: "currentForecast",
              });
              // <div class="row" id="dayForecast">
              // <div class="card-body">
              //   <div class="currentDay"></div>
              //   <div class="cityDay"></div>

              //   <div class="currentTempDay"></div>
              //   <div class="humidityDay"></div>
              //   <div class="wind"></div>
              //   <div class="UV"></div>

              //   <div class="weatherDay"></div>
              //   <div class="descriptionDay"></div>
              //   <img src="" alt="weatherIcon" class="imgDay" />
              // </div>
              // </div>

              $(".UV").text(uvResponse);
              $(".currentDay").text(cityDate);
              $(".cityDay").text(cityName);
              $(".currentTempDay").text("Temp: " + cityTemp);
              $(".humidityDay").text("Humidity: " + humidity + "%");
              $(".windDay").text("Wind: " + wind);
              $(".weatherDay").text(weatherMain);
              $(".descriptionDay").text(weatherDescrip);
              $(".imgDay").attr(
                "src",
                "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"
              );
            });
            i++;
          }
        }
      });
    });
  }

  function uvCall(lat, long) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/uvi?appid=22bcc8be8c461f292dcdb3783f0b7dde&lat=" +
      lat +
      "&lon=" +
      long;

    return $.ajax({
      url: queryURL,
      method: "GET",
    });
  }

  function clear() {
    $("#fiveDayCard").empty();
    $("#fiveDayCard").empty();
  }
});
