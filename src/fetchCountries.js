import Notiflix from 'notiflix'
export {fetchCountries}

function fetchCountries(name){

return fetch(`https://restcountries.com/v3.1/name/${name}?name.official,capital,population,flags.svg,languages`)
    .then(responce => {
        if(responce.ok){
    return responce.json();}
    throw new Error(response.statusText);
        })
        
    
}