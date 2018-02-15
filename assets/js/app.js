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
        let summary = forecast.daily.summary;
        console.log(summary)

        let celcius = (forecast.currently.temperature - 32) * 5 / 9;
        console.log(celcius)

        let temp = document.createElement('li');
        temp.className = 'celciusTemp';
        temp.innerText = celcius;
        tempCont.appendChild(temp)

        let summ = document.createElement('li');
        summ.className = 'summary';
        summ.innerText = summary;
        tempCont.appendChild(summ)
      });
    }, function(error) {
      alert('No encontramos tu ubicación');
    });
  }
}

