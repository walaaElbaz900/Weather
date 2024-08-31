
let locationName = document.querySelector('.location')



async function getWeather(city) {
  try {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=086564926d9b4872bf2212818240407&q=${city}&days=3&aqi=no&alerts=no`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let result = await response.json();
    displayWeather(result);
    return result;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// getWeather('cairo')


async function displayWeather(result) {

 console.log(result)
  locationName.innerHTML = result.location.name
  let forecast = await result.forecast.forecastday
  console.log(forecast)
  let cartoona = ''
  for (let i = 0; i < forecast.length; i++) {
    let date = new Date(forecast[i].date)
    let day = date.toLocaleDateString('en-us', { weekday: 'long' })
    console.log(day)
    cartoona += `      <div class="today  forecast active" data-index=0 >
    <div class="forecast-header" id="today">
    <div class="day">${day}</div>
    <div class=" date">18June</div>
    </div> <!-- .forecast-header -->
    <div class="forecast-content" id="current">
    <div class="location">Cairo</div>
    <div class="degree">
        <div class="num">${forecast[i].hour[date.getHours()].temp_c}<sup>o</sup>C</div>
      
        <div class="forecast-icon">
            <img src="${forecast[i].day.condition.icon}" alt="" width="90">
        </div>	
    
    </div>
    <div class="custom">Clear</div>
    <span><img src="https://routeweather.netlify.app/images/icon-umberella@2x.png" alt="" width="21" height="21">${forecast[i].hour[date.getHours()].humidity}%</span>
								<span><img src="https://routeweather.netlify.app/images/icon-wind@2x.png" alt="" width="23" height="21">${forecast[i].hour[date.getHours()].wind_kph}km/h</span>
								<span><img src="https://routeweather.netlify.app/images/icon-compass@2x.png" alt="" width="21" height="21">East</span>
    </div>
</div>	`;

  }
  document.querySelector('.forecast').innerHTML = cartoona
}

let search = document.getElementById('search')

search.addEventListener('input', function () {
  getWeather(search.value)
})



navigator.geolocation.getCurrentPosition(success,error)

function success(position) {
  console.log(position)
  let lat = position.coords.latitude
  let lon = position.coords.longitude
  let currentPosition = `${lat},${lon}`
  console.log(currentPosition)
  getWeather(currentPosition)
}


function error() {
  getWeather('sudan')
 }
