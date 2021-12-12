const weatherApi = {
    key : "804945feed062e709da13bc055c753a5",
    base : "https://api.openweathermap.org/data/2.5/"
};


const WeatherService = {
    getWeatherBySearch(arrayData) {
        
            var weather = '';
            var weatherData = [];  
            Object.values(arrayData).forEach((value,i) =>{
                if(value == ''){
                    return;
                }
                if((Object.values(arrayData).length - 1) != i){
                    weather += `${value},` 
                }else{
                    weather += `${value}`
                }
            });

            return fetch(`${weatherApi.base}weather?q=${weather}&&units=metric&appid=${weatherApi.key}`)
            .then(res => res.json())
            .then(result => {return result})
            .catch((error) => console.log(error));
    }
};

export default WeatherService;