geolocate();

// buscar la posición
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      postn = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      $.getJSON('https://api.darksky.net/forecast/46de07ca6acb4c91b8431195a832b277/' + postn.lat + ',' + postn.lng + '?extend=hourly&callback=?', function(forecast) {
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

