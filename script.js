document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "ae76002acec6c2b8f638f5d55be08684";
    const apiUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";
    const searchBox = document.querySelector(".searchh input");
    const searchBtn = document.querySelector(".searchh button");
    
    async function checkWeather(city) {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();
        console.log(data);

        const weatherCondition = data.list[0].weather[0].main.toLowerCase();

        document.querySelector(".tempp").innerHTML = Math.round(data.list[0].main.temp);
        document.querySelector(".city").innerHTML = data.city.name;
        document.querySelector(".humidity").innerHTML = data.list[0].main.humidity;
        document.querySelector(".wind").innerHTML = Math.round(data.list[0].wind.speed);
        document.querySelector(".feel").innerHTML = Math.round(data.list[0].main.feels_like);

        // max and min
        document.querySelector(".min").innerHTML = Math.round(data.list[0].main.temp_min);
        document.querySelector(".max").innerHTML = Math.round(data.list[0].main.temp_max);
        
        setWeatherBackground(weatherCondition);
    }

    //change background function
    function setWeatherBackground(weatherCondition) {
        const page = document.getElementById("page");

        
        page.classList.remove("sunny", "cloudy", "rainy");

        
        if (weatherCondition === "clear") {
            page.classList.add("sunny");
        } else if (weatherCondition === "clouds") {
            page.classList.add("cloudy");
        } else if (weatherCondition === "rain") {
            page.classList.add("rainy");
        }
    
    }

    // search
    searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value);
    });

   
    searchBox.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            checkWeather(searchBox.value);
        }
    });
});