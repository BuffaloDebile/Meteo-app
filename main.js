
import tabJoursEnOrdre from './utilitaire/gestionTemps.js';


const CLEFAPI = '42b979ab919db9d989124f4906c77c57'
let resultatsAPI;
const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const tempPourH = document.querySelectorAll('.heure-prevision-valeur');
const joursDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJoursDiv = document.querySelectorAll('.jour-prevision-temp');
const imgIcone = document.querySelector('.logo-meteo');
const chargementContainer = document.querySelector('.overlay-icone-chargement');

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
       
        resultatsAPI = data;
        temps.innerText = resultatsAPI.current.weather[0].description;
        temperature.innerText = `${Math.trunc(resultatsAPI.current.temp)}°`
        localisation.innerText = resultatsAPI.timezone;
        
        // Les heures par tranches de 3 avec leurs temperature

        let heureActuelle = new Date().getHours();

        for (let i = 0; i < heure.length; i++) {
            
            let heureInc = heureActuelle + i * 3;

            if (heureInc > 24) {
                heure[i].innerText = `${heureInc - 24} h`      
            } else if (heureInc === 24 ) {
                heure[i].innerText = "00 h"
            } else {
                heure[i].innerText = `${heureInc} h`;
            }
        }

        // temp pour 3h

        for (let j = 0; j < tempPourH.length; j++) {
            tempPourH[j].innerText = `${Math.trunc(resultatsAPI.hourly[j * 3].temp)}°`
        }

        // trois premieres lettres des jours

        for (let k = 0; k < tabJoursEnOrdre.length; k++) {
            joursDiv[k].innerText = tabJoursEnOrdre[k].slice(0,3)
        }

        // temperature par jour

        for (let m = 0; m < 7 ; m++) {
           tempJoursDiv[m].innerText = `${Math.trunc(resultatsAPI.daily[m +1].temp.day)}°`          
        }

        // icon dynamique

        if (heureActuelle >= 6 && heureActuelle < 21) {
            imgIcone.src = `ressources/jour/${resultatsAPI.current.weather[0].icon}.svg`
        } else {
            imgIcone.src = `ressources/nuit/${resultatsAPI.current.weather[0].icon}.svg` 
        };

        chargementContainer.classList.add('disparition');
    })
}