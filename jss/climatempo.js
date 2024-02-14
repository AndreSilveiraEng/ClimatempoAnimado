const access_token = 'dfe0e60c427e0c05719bc698bd644eb9';

async function getCityName(latitude, longitude, accessToken) {
    const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${accessToken}`;
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

    switch(description) {
      case 'nublado': 
        document.getElementById('weather-icon').src = `icons/nublado.png`;
        bodyElement.style.backgroundImage = "url('https://img.wattpad.com/5aa4182dd59d4b51b4ecf89dc5e225c9fad58bbd/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f79426a694974494d3268647555413d3d2d31342e313636386365333465326437393362623533393934303137333137362e676966')";
        break;
      case 'nuvens dispersas': 
        document.getElementById('weather-icon').src = `icons/cloudy.png`;
        bodyElement.style.backgroundImage = "url('https://img.wattpad.com/5aa4182dd59d4b51b4ecf89dc5e225c9fad58bbd/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f79426a694974494d3268647555413d3d2d31342e313636386365333465326437393362623533393934303137333137362e676966')";
        break;
      case 'chuva': 
        document.getElementById('weather-icon').src = `icons/rain.png`;
        bodyElement.style.backgroundImage = "url('https://img.wattpad.com/5aa4182dd59d4b51b4ecf89dc5e225c9fad58bbd/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f79426a694974494d3268647555413d3d2d31342e313636386365333465326437393362623533393934303137333137362e676966')";
        break;
      case 'nevoeiro': 
        document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        bodyElement.style.backgroundImage = "url('https://img.wattpad.com/5aa4182dd59d4b51b4ecf89dc5e225c9fad58bbd/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f79426a694974494d3268647555413d3d2d31342e313636386365333465326437393362623533393934303137333137362e676966')";
        break;
      case 'aberto': 
        document.getElementById('weather-icon').src = `icons/sunny.png`;
        bodyElement.style.backgroundImage = "url('https://64.media.tumblr.com/20ae86bff21fc9f8ef429b765c976617/tumblr_nll2p92jex1r93041o1_540.gif')";
        break;
      case 'trovoada com chuva fraca': 
        document.getElementById('weather-icon').src = `icons/rain.png`;
        bodyElement.style.backgroundImage = "url('https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3cxeTZ1c3Uya3libWFybWowNXNzMGQxbjc4aWVsN3h3Y3FuOWlwMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/IuVFGSQZTd6TK/giphy.gif')";
        break;
      case 'chuva leve': 
        document.getElementById('weather-icon').src = `icons/rain.png`;
        bodyElement.style.backgroundImage = "url('https://img.wattpad.com/5aa4182dd59d4b51b4ecf89dc5e225c9fad58bbd/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f79426a694974494d3268647555413d3d2d31342e313636386365333465326437393362623533393934303137333137362e676966')";
        break;
      default: 
        document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        bodyElement.style.backgroundImage = "url('https://img.wattpad.com/5aa4182dd59d4b51b4ecf89dc5e225c9fad58bbd/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f79426a694974494d3268647555413d3d2d31342e313636386365333465326437393362623533393934303137333137362e676966')";
    }
  
    document.getElementById('temperature').textContent = `${temperature}°C`;
    document.getElementById('description').textContent = description.charAt(0).toUpperCase() + description.slice(1);
    document.getElementById('wind').textContent = `${wind} m/s`;
    document.getElementById('feels_like').textContent = `${feels_like}°C`
  
    updateLastUpdateTime();
  }
  
  getTime();
