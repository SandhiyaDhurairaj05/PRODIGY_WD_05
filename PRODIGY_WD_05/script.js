const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityEl = document.getElementById("city");
const dateEl = document.getElementById("date");
const tempEl = document.getElementById("temperature");
const weatherEl = document.getElementById("weather");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const iconEl = document.getElementById("icon");

// Fetch weather using wttr.in (no API key needed)
async function fetchWeather(city) {
    try {
        const response = await fetch(`https://wttr.in/${city}?format=j1`);
        const data = await response.json();

        // Extract weather info
        const current = data.current_condition[0];
        const tempC = current.temp_C;
        const weatherDesc = current.weatherDesc[0].value;
        const humidity = current.humidity;
        const wind = current.windspeedKmph;
        const date = new Date();

        cityEl.textContent = city;
        dateEl.textContent = date.toLocaleDateString();
        tempEl.textContent = `${tempC}°C`;
        weatherEl.textContent = weatherDesc;
        humidityEl.textContent = `Humidity: ${humidity}%`;
        windEl.textContent = `Wind: ${wind} km/h`;

        // Set a simple icon based on weatherDesc
        if(weatherDesc.toLowerCase().includes("sun") || weatherDesc.toLowerCase().includes("clear")){
            iconEl.src = "https://cdn-icons-png.flaticon.com/512/869/869869.png";
        } else if(weatherDesc.toLowerCase().includes("cloud")){
            iconEl.src = "https://cdn-icons-png.flaticon.com/512/414/414825.png";
        } else if(weatherDesc.toLowerCase().includes("rain")){
            iconEl.src = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
        } else if(weatherDesc.toLowerCase().includes("snow")){
            iconEl.src = "https://cdn-icons-png.flaticon.com/512/642/642102.png";
        } else {
            iconEl.src = "https://cdn-icons-png.flaticon.com/512/1146/1146869.png"; // default icon
        }

    } catch(err) {
        console.error(err);
        alert("Error fetching weather data. Try a different city.");
    }
}

// Event listener
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if(city) fetchWeather(city);
});

// Optional: Fetch user's location using geolocation
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const {latitude, longitude} = position.coords;
            fetchWeather(`${latitude},${longitude}`);
        },
        (err) => console.warn(err.message)
    );
}
