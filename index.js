$(() => {
    //When user clicks on the toggle slider
    $(".slider").on("click", () => {
      var degreeSign = $("#temp-val").text();
      var temperature = $("#temp-val").text().slice(0,-3);
      
      //If temperature is in C, convert to F
      if (degreeSign.slice(-1) === "C") {
        temperature = Math.round(temperature * (9/5)) + 32;
        degreeSign = "F"
        $("#temp-val").html(temperature + " °" + degreeSign);
      } else { //If temperature is in F, convert to C
        temperature = Math.round((temperature - 32) *(5/9));
        degreeSign = "C"
        $("#temp-val").html(temperature + " °" + degreeSign);
      }
    }); 
});
  
(() => {
    //If user allows geolocation, retrieve success/errorCall function
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, errorCall);
      $("#weather-icon").html('<h2>Loading... please wait!</h2>');
    } 
    
    //If error, alert user ...unable to obtain temperature
    function errorCall(error) {
      window.alert("Unable to retrieve weather! This might be due to having your location setting turned off on your mobile device " +
       "or from denying location access on desktop. Please note that if you are using FireFox, that there is currently a bug with " +
       "geolocation. Please use a different browser! \n\n" + " {Error message: " + error.message + "}");
      $("#weather-icon").html('<h2>Unable to retrieve weather!</h2>');
    }
    
    //If success, determine the user's location
    function success(position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;
      
      //Build up url to get data from fcc weather api
      const url = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;
      
       //Make GET request to fcc weather api & return Json data
      fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        
        //Obtain required data from json
        let temp = Math.round(data.main.temp);
        let city = data.name;
        let country = data.sys.country;
        let description = data.weather[0].main;
        
        //Insert temp, city & country data into html
        $("#temp-val").html(temp + " °C");
        $("#city-country-val").html(city + ", " + country);
        $(".slider").css("display", "block");
        
        //Object data for image description
        let imageDescription = {
          Clouds: "<div class='icon cloudy mx-auto' id='weather-icon'><div class='cloud'></div><div class='cloud'></div></div>",
          Clear: '<div class="icon sunny mx-auto" id="weather-icon"><div class="sun"><div class="rays"></div></div></div>',
          Thunderstorm: '<div class="icon thunder-storm mx-auto" id="weather-icon"><div class="cloud"></div><div class="lightning"><div class="bolt"></div><div class="bolt"></div></div></div>',
          Snow: '<div class="icon flurries mx-auto" id="weather-icon"><div class="cloud"></div><div class="snow"><div class="flake"></div><div class="flake"></div></div></div>',
          Rain: '<div class="icon rainy mx-auto" id="weather-icon"><div class="cloud"></div><div class="rain"></div></div>',
          Drizzle: '<div class="icon rainy mx-auto" id="weather-icon"><div class="cloud"></div><div class="rain"></div></div>',
          Mist: '<div class="icon rainy mx-auto" id="weather-icon"><div class="cloud"></div><div class="rain"></div></div>'
        };
        
        //Insert correct image for weather
        if (imageDescription[description] !== undefined) {
          $("#insert-html").html(imageDescription[description]);
          console.log(description);
        } else {
          $("#insert-html").html('<div class="mx-auto" id="weather-icon-pic"><img class="text-center" src=' + data.weather[0].icon + ' alt="Image of weather"></div>')
        }

        // Shows a text description of the weather
        if (description === "Clouds") {
            $("#weather-description").html("Cloudy Skies")
        } else if (description === "Clear") {
            $("#weather-description").html("Cloudy Skies")
        } else if (description === "Thunderstorm") {
            $("#weather-description").html("Thunderstorms")
        } else if (description === "Snow") {
            $("#weather-description").html("Snowy")
        } else if (description === "Rain") {
            $("#weather-description").html("Rainy Day")
        } else if (description === "Drizzle") {
            $("#weather-description").html("Slight Drizzle")
        } else {
            $("#weather-description").html("Misty")
        }
        
        // Incase fetch is unable to get the api, the span is defaulted to display: none to not show the "and" in the app unless loaded.
        $("#sub-body span").css("display", "inline-block");

        //Determine colors for temp ranges to nearest 10 degrees and also shows a text description for the type of weather.
        var color = "";
        
        if(temp >= 30) {
          color = "#ff0000";
          $("#temp-description").html("Really Hot");
        } else if(temp >= 20) {
          color = "#ff9801";
          $("#temp-description").html("Hot");
        } else if (temp >= 10) {
          color = "#ffe600";
          $("#temp-description").html("Warm");
        } else if (temp >= 0) {
          color = "#02feb3";
          $("#temp-description").html("Cool");
        } else if (temp >= -10) {
          color = "#00cdff";
          $("#temp-description").html("Cold");
        } else if (temp >= -20) {
          color = "#00f";
          $("#temp-description").html("Really Cold");
        } else {
          color = "#e600e6";
        }
        
        //Modify background color for temperature range       
          $("body").css("background-color", color);
  
      })   
    } 
})();



