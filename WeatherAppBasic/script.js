const apiKey = "436f7d4ccdad2f5c65555e4cb74f812e";
const url = "https://api.openweathermap.org/data/2.5/weather?q=";


window.addEventListener('load', ()=>{
    getData("New Delhi");
})




async function getData(city){
    const errorMsg= document.querySelector('.error-msg');
    const weatherContainer = document.querySelector('.main-container');
    
    try{
        const res = await fetch(`${url}${city}&appid=${apiKey}&units=metric`);
        const data = await res.json();
    
        errorMsg.style.display = "none";
        weatherContainer.style.display = "grid";
        
        presentData(data);
    }catch(error){

        errorMsg.style.display = "block";
        weatherContainer.style.display = "none";

        // console.log(error);
    }
}

function presentData(data){
    const temp = document.getElementById('temperature');
    const location = document.getElementById('location');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById("wind-speed");
    const weatherImg = document.getElementById('weather-image');


    temp.innerHTML = Math.round(data.main.temp);
    location.innerHTML = data.name;
    humidity.innerHTML = data.main.humidity;
    windSpeed.innerHTML = data.wind.speed;

    const weather = data.weather[0].main;
    if(weather == "Clear"){
        weatherImg.src = "/assests/clear.png";
    }
    else if(weather == "Clouds"){
        weatherImg.src = "/assests/clouds.png";
    }
    else if(weather == "Rain"){
        weatherImg.src = "/assests/rain.png";
    }
    else if(weather == "Drizzle"){
        weatherImg.src = "/assests/drizzle.png";
    }
    else if(weather == "Mist"){
        weatherImg.src = "/assests/mist.png";
    }

}

const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click',()=>{
    getData(cityInput.value);
})



