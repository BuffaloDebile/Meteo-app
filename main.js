const CLEFAPI = '42b979ab919db9d989124f4906c77c57'
let resultatsAPI;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {

        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        AppelAPI(long,lat);
    }, 
    () => {
        alert('Damn ! You have rejected the geolocation the app cannot work, Please allow the geolocation')
    }) 
}

function AppelAPI(long,lat) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${CLEFAPI}`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {
        console.log(data);
    })
}