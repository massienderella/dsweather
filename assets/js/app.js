geolocate();

// buscar la posición
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      $.getJSON('https://api.darksky.net/forecast/dee89d5e9210fc4bb4366e0d5ccc2d0a/' + pos.lat + ',' + pos.lng + '?extend=hourly&callback=?', function(forecast) {
        console.log(forecast);
        console.log(forecast.currently.ozone);
        console.log(forecast.currently.temperature);
        console.log(forecast.daily.summary);

        let celcius = (forecast.currently.temperature - 32) * 5 / 9;
        console.log(celcius)
      });
    }, function(error) {
      alert('Tenemos un problema en encontrar tu ubicación');
    });
  }
}

