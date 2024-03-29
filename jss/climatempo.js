const access_token = 'dfe0e60c427e0c05719bc698bd644eb9';

async function getCityName(latitude, longitude, accessToken) {
    const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${accessToken}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.length > 0) {
            return `${data[0].name} - ${data[0].state}`;
        }
        return "Localização Desconhecida"; 
    } catch (error) {
        console.error("Erro ao obter o nome da cidade:", error);
        return "Erro ao obter localização";
    }
}

async function getTime() {
    if (!navigator.geolocation) {
      console.log("Geolocalização não é suportada por esse browser.");
      return;
    }
  
    const getPosition = () => new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  
    try {
      const position = await getPosition();
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const cityName = await getCityName(latitude, longitude, access_token);
      document.getElementById('city-name').textContent = cityName; 
      const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&lang=pt_br&units=metric&appid=${access_token}`);
      const tempo = await response.json();
  
      updateWeatherUI(tempo);
      updateLastUpdateTime()
      updateForecastUI(tempo);
    } catch (error) {
      console.error("Erro em conseguir a localização: ", error);
    }
  }

  function updateLastUpdateTime() {
    const now = new Date(); 
    const formattedDate = now.toLocaleDateString('pt-BR'); 
    const formattedTime = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); 
    document.getElementById('atualizacao').textContent = `${formattedDate} - ${formattedTime}`;

  }
  
  function updateWeatherUI(data) {
    const iconCode = data.current.weather[0].icon;
    const temperature = parseInt(data.current.temp);
    const description = data.current.weather[0].description;
    const bodyElement = document.body; 
    const feels_like = parseInt(data.current.feels_like);
    const wind = parseFloat(data.current.wind_speed);
    const humidity = parseInt(data.current.humidity);
    const cloudIntro = document.getElementById("cloud-intro")

    switch(description) {
      case 'nublado': 
        document.getElementById('weather-icon').src = `icons/nublado.png`;
        bodyElement.style = "background-color: #007ced;background: linear-gradient(to bottom, #007ced 1%,#cce7ff 100%);";
        cloudIntro.style = "position: relative;height: 100%;background: url(https://static.radulescu.me/examples/clouds/clouds1000.png);background: url(https://static.radulescu.me/examples/clouds/clouds1000.png) 0 200px,url(https://static.radulescu.me/examples/clouds/clouds1200_1.png) 0 300px,url(https://static.radulescu.me/examples/clouds/clouds1000_blur3.png) 100px 250px;animation: wind 20s linear infinite;"
        break;
      case 'nuvens dispersas': 
        document.getElementById('weather-icon').src = `icons/cloudy.png`;
        bodyElement.style.backgroundImage = "url('https://img.wattpad.com/5aa4182dd59d4b51b4ecf89dc5e225c9fad58bbd/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f79426a694974494d3268647555413d3d2d31342e313636386365333465326437393362623533393934303137333137362e676966')";
        break;
      case 'chuva moderada': 
        document.getElementById('weather-icon').src = `icons/rain.png`;
        cloudIntro.style.background = "url('https://img.wattpad.com/5aa4182dd59d4b51b4ecf89dc5e225c9fad58bbd/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f79426a694974494d3268647555413d3d2d31342e313636386365333465326437393362623533393934303137333137362e676966')";
        cloudIntro.style.backgroundRepeat = 'no-repeat';
        cloudIntro.style.backgroundSize = 'cover';
        break;
      case 'nevoeiro': 
        document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        bodyElement.style.backgroundImage = "url('https://img.wattpad.com/5aa4182dd59d4b51b4ecf89dc5e225c9fad58bbd/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f79426a694974494d3268647555413d3d2d31342e313636386365333465326437393362623533393934303137333137362e676966')";
        break;
      case 'céu limpo': 
        document.getElementById('weather-icon').src = `icons/sunny.png`;
        bodyElement.style.backgroundImage = "url('https://64.media.tumblr.com/20ae86bff21fc9f8ef429b765c976617/tumblr_nll2p92jex1r93041o1_540.gif')";
        break;
      case 'trovoada com chuva fraca': 
        document.getElementById('weather-icon').src = `icons/rain.png`;
        cloudIntro.style.backgroundImage = "url('https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3cxeTZ1c3Uya3libWFybWowNXNzMGQxbjc4aWVsN3h3Y3FuOWlwMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IuVFGSQZTd6TK/giphy.gif')";
        cloudIntro.style.backgroundRepeat = 'no-repeat';
        cloudIntro.style.backgroundSize = 'cover';
        cloudIntro.style.backgroundPosition = 'center'
        break;
      case 'chuva leve': 
        document.getElementById('weather-icon').src = `icons/rain.png`;
        bodyElement.style.backgroundImage = "url('https://img.wattpad.com/5aa4182dd59d4b51b4ecf89dc5e225c9fad58bbd/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f79426a694974494d3268647555413d3d2d31342e313636386365333465326437393362623533393934303137333137362e676966')";
        break;
      case 'garoa de leve intensidade': 
        document.getElementById('weather-icon').src = `icons/rain.png`;
        bodyElement.style.backgroundImage = "url('https://img.wattpad.com/5aa4182dd59d4b51b4ecf89dc5e225c9fad58bbd/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f79426a694974494d3268647555413d3d2d31342e313636386365333465326437393362623533393934303137333137362e676966')";
        break;
      case 'trovoadas': 
        document.getElementById('weather-icon').src = `icons/lightning.webp`;
        document.getElementById("cloud-intro").style.background = "url('https://img.wattpad.com/5aa4182dd59d4b51b4ecf89dc5e225c9fad58bbd/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f79426a694974494d3268647555413d3d2d31342e313636386365333465326437393362623533393934303137333137362e676966')"
        document.getElementById("cloud-intro").style.backgroundRepeat = "no-repeat"
        document.getElementById("cloud-intro").style.backgroundSize = "cover"
        break;
      default: 
        document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        bodyElement.style.backgroundImage = "url('https://img.wattpad.com/5aa4182dd59d4b51b4ecf89dc5e225c9fad58bbd/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f79426a694974494d3268647555413d3d2d31342e313636386365333465326437393362623533393934303137333137362e676966')";
    }
  
    document.getElementById('temperature').textContent = `${temperature}°C`;
    document.getElementById('description').textContent = description.charAt(0).toUpperCase() + description.slice(1);
    document.getElementById('wind').textContent = `${wind} m/s`;
    document.getElementById('feels_like').textContent = `${feels_like}°C`
    document.getElementById('humidity').textContent = `${humidity}%`
  
    updateLastUpdateTime();
  }

// Próximos dias

function updateForecastUI(data) {
  const forecastContainer = document.getElementById('next-weather'); 
  forecastContainer.innerHTML = ''; 


  data.daily.slice(1, 6).forEach(day => {
      const date = new Date(day.dt * 1000); 
      const dayName = date.toLocaleDateString('pt-BR', { weekday: 'long' }); 
      let iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`; 
      switch (day.summary) {
        case 'Expect a day of partly cloudy with rain': 
          day.summary = 'Espere um dia parcialmente nublado e com chuva ☂️'
          break;
        case 'You can expect partly cloudy in the morning, with rain in the afternoon':
          day.summary = 'Espere um dia parcialmente nublado pela manhã, com chuva ao final da tarde ☕'
          break;
        case 'There will be partly cloudy until morning, then rain':
          day.summary = 'Espere um dia parcialmente nublado pela manhã e com chuva após o almoço 🥙'
          break;
        case 'There will be rain today':
            day.summary = 'O dia será chuvoso 🌧️'
            break;
        case 'The day will start with partly cloudy through the late morning hours, transitioning to rain':
          day.summary = 'O dia iniciará parcialmente nublado até o final da manhã, transicionando para a chuva ☕'
          break;
      }

      switch (day.weather[0].main){
        case "Rain":
          iconUrl = `icons/rainB.png`
          break;
        case "Clouds":
          iconUrl = `icons/nublado.png`
          break;
        case "Clear":
          iconUrl = `icons/rain.png`
          break;
        case "Atmosphere":
          iconUrl = `icons/rain.png`
          break;
        case "Snow":
          iconUrl = `icons/rain.png`
          break;
        case "Drizzle":
          iconUrl = `icons/drizzle.png`
          break;
        case "Thunderstorm":
          iconUrl = `icons/rain.png`
          break;
      }
      
      
      const dayForecastHTML = `
          <div class="forecast-day">
              <h3 class="descricao-dias">${dayName}</h3>
              <img src="${iconUrl}" alt="${day.weather[0].description}">
              <p class="descricao-dias">${day.weather[0].description}</p>
              <p>${day.summary}</p>
              <div class="temp-max">
              <p><b>Temp. Máx:</b> ${day.temp.max.toFixed(1)}°C</p>
              <p><b>Temp. Mín:</b> ${day.temp.min.toFixed(1)}°C</p>
              </div>
          </div>
      `;

      forecastContainer.innerHTML += dayForecastHTML;
  });
}

  getTime();

