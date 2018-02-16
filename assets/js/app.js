geolocate(); 

// Geolocalización
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      postn = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      /*
      Tiempo actual en segundos. Time machine requiere apikey+latitud+longitud+time
      var time = Date.now()
      /* var seconds = new parseInt(Date().getTime() / 1000);
      console.log(seconds)
      console.log(time)*/

//Obtener datos para el día de hoy desde la API      
$.getJSON('https://api.darksky.net/forecast/46de07ca6acb4c91b8431195a832b277/' + postn.lat + ',' + postn.lng + /*',' + time +*/ '?extend=hourly&callback=?&units=auto&lang=es', function(forecast) {
  // console.log(forecast);        
  let cont = $('.weather-container');
  let skiconsCurrent = forecast.currently.icon;

  let iconTemperature = $('<canvas class="' + skiconsCurrent + '"></canvas>');
  let temperature = $('<h2 class="temperature">').text(`${Math.floor(forecast.currently.temperature)}°`);
  let windSpeed = $('<div class="extras">').html(`<p><span class="left-align">Viento</span> <span class="right-align">${forecast.currently.windSpeed}  m/s</span></p>`);
  let humidity = $('<div class="extras">').html(`<p><span class="left-align">Humedad</span> <span class="right-align">${forecast.currently.humidity}  %</span></p>`);
  let uvIndex = $('<div class="extras">').html(`<p><span class="left-align">Índice UV</span> <span class="right-align">${forecast.currently.uvIndex}</span></p>`);
  let pressure = $('<div class="extras">').html(`<p><span class="left-align">Presión</span> <span class="right-align">${forecast.currently.pressure}  hPa</span></p>`);
  let weekForecast = $('<a class="waves-effect waves-light btn">').text('¿Qué se viene para la semana?');
  cont.append(iconTemperature, temperature, windSpeed, humidity, uvIndex, pressure, weekForecast);

  weekForecast.on('click', function() {
    btnWeekFunction();
  });

  let btnDaily = $('<button type="button" class="btn btn-style">').text('Volver');
  btnDaily.on('click', function() {
  btnDailyFunction();
  });


function btnWeekFunction()  {
  cont.empty();
  console.log(forecast.daily.data);
  let counter = -1;
  forecast.daily.data.forEach(function(element) { //Itera sobre cada elemento, día en este caso
    let eachDay = $('<p class="dailyTitle">').text(`${moment().add(counter, 'd').format('DD, MMMM')}`)
    let dailyTempMax = $('<p class="tempDaily">').html(`Min ${Math.floor(element.apparentTemperatureLow)}° - Max ${Math.floor(element.apparentTemperatureHigh)}°`);
    let dailyContainer = $('<div class="dailyContainer">');
    let dailyIcon = '<canvas class="' + element.icon + ' icon-size"></canvas>';

    console.log(element.icon);
    dailyContainer.append(dailyIcon, eachDay, dailyTempMax, btnDaily);
    cont.append(dailyContainer);
            
    btnDaily.on('click', function() {
      btnDailyFunction();
    });

  skycons();
  });
}
        function btnDailyFunction() {
          cont.empty();
          cont.append(todayTitle, iconTemperature, temperature, windSpeed, humidity, uvIndex, pressure, btnWeek);
          
          btnWeek.on('click', function()  {
            btnWeekFunction();
          });
        }
        skycons();
      });

    }, function(error) {
      alert('No pudimos acceder a tu ubicación');
    });
  }
}
var today = moment().add(0, 'd').format('DD, MMMM')
console.log(today);

/* var icons = new Skycons({"color": "orange"});

icons.set("clear-day", Skycons.CLEAR_DAY);
icons.set("clear-night", Skycons.CLEAR_NIGHT);
icons.set("partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
icons.set("partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
icons.set("cloudy", Skycons.CLOUDY);
icons.set("rain", Skycons.RAIN);
icons.set("sleet", Skycons.SLEET);
icons.set("snow", Skycons.SNOW);
icons.set("wind", Skycons.WIND);
icons.set("fog", Skycons.FOG);

icons.play();*/

function skycons() {
        var i,
            icons = new Skycons({
                "color" : "#FFFFFF",
                "resizeClear": true // nasty android hack
            }),
            list  = [ // listing of all possible icons
                "clear-day",
                "clear-night",
                "partly-cloudy-day",
                "partly-cloudy-night",
                "cloudy",
                "rain",
                "sleet",
                "snow",
                "wind",
                "fog"
            ];
 
    // loop thru icon list array
    for(i = list.length; i--;) {
        var weatherType = list[i], // select each icon from list array
                // icons will have the name in the array above attached to the 
                // canvas element as a class so let's hook into them.
                elements    = document.getElementsByClassName( weatherType );
 
        // loop thru the elements now and set them up
        for (e = elements.length; e--;) {
            icons.set(elements[e], weatherType);
        }
    }
     
    // animate the icons
    icons.play();
}

 function GetRandomBackground()
  {
    var app_id = '73d6e01308796e820219d9d25ddce9df4ec2f78c22f54d97e9e4e77324fa7f67'
    var url = 'https://api.unsplash.com/photos/random?client_id=' + app_id;    
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(json) {
        var src = json.urls.regular;
        $('body').css('background-image','url('+src+')').css('background-size','cover');
      }
    });
  }
  GetRandomBackground();