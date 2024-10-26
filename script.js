const searchBtn =document.getElementById('searchBtn')
const cityInput = document.getElementById('cityInput');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const weather = document.getElementById('weather');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const errorDiv = document.getElementById('errorMessage');
const spinner = document.getElementById('spinner');
const icon = document.getElementById('weatherIcon');

searchBtn.addEventListener('click',()=>{
    const city = document.getElementById('cityInput').value.trim()

    if (!city) {
        errorDiv.style.display = 'block';
        errorDiv.textContent = 'Please enter a city name.';
        return; // Stop further execution
    }
    
    //show the spinner
    spinner.style.display = 'block';
    errorDiv.style.display = 'none';

    weatherResult.style.display = 'none';

    //fetch details from api
    fetchWeather(city)
    .then(data=>{

        console.log(data)
        // console.log(data)
        //populate weather result
        cityName.textContent = data.name;
        const tempCelsius = data.main.temp - 273.15
        temperature.textContent = `${tempCelsius.toFixed(2)} °C`; // Convert Kelvin to Celsius
        weather.textContent = data.weather[0].description;
        humidity.textContent = `${data.main.humidity}%`;
        wind.textContent = `${data.wind.speed} m/s`;

        weatherResult.style.display = 'block'


        //function to upadate card background
        changeBackgroundColor(tempCelsius);
        switch (data.weather[0].main) {
            case 'Clear':
                icon.className = 'fas fa-sun'; // Sunny
                break;
            case 'Clouds':
                icon.className = 'fas fa-cloud'; // Cloudy
                break;
            case 'Rain':
                icon.className = 'fas fa-cloud-rain'; // Rainy
                break;
            case 'Snow':
                icon.className = 'fas fa-snowflake'; // Snowy
                break;
            case 'Thunderstorm':
                icon.className = 'fas fa-bolt'; // Thunderstorm
                break;
            default:
                icon.className = 'fas fa-smog'; // Default weather icon
        }

    })
    

    .catch(err=>{
        console.error(err);
        if (err.message === 'city not found') {
            showError('City not found. Please try a different name.');
        } else {
            showError('Unable to fetch weather data. Please try again.');
        }
        //handle display of error message
    })
    .finally(()=>{
        //stop spinner
        spinner.style.display = 'none'
    })

})

function fetchWeather(city){
    const apiKey = 'befd984de4d3c050671d4eb935e6c660'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`; 

    return fetch(url)
    .then(response=>{
        if(!response.ok){
            throw new Error('city not found')
        }
        return response.json()
    })
}


function showError(message) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    errorDiv.style.color= 'red'
}

function changeBackgroundColor(temp) {
    const container = document.querySelector('.container'); // Correctly select the container
    if (temp < 0) {
        container.style.backgroundColor = 'blue'; // Cold
    } else if (temp >= 0 && temp < 20) {
        container.style.backgroundColor = 'lightblue'; // Mild
    } else if (temp >= 20 && temp < 30) {
        container.style.backgroundColor = 'orange'; // Warm
    } else {
        container.style.backgroundColor = 'red'; // Hot
    }
}