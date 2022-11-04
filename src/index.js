import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const refs = {
  cardContainer: document.querySelector('.country-info'),
  countriesLisst: document.querySelector('#search-box'),
  countri: document.querySelector('.country-list'),
};
refs.countriesLisst.addEventListener('input', onSearch);
refs.cardContainer.addEventListener('input', onCountries);

function onSearch(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const search = form.value;
console.log(search)
  fetchCountries(search)
    .then((responce = []) => {
      const length = responce.length;
      if (length === 1) {
        refs.cardContainer.innerHTML = `
    <img src="${responce[0].flags.svg}" style="width:25px">
     <h1>${responce[0].name.official}</h1>
      <p>${responce[0].capital}</p>
      <p>${responce[0].population}</p>
       <p>${responce[0].languages}</p>`;
      } else if (length >= 2) {
        Notiflix.Notify.success(
          'Too many matches found. Please enter a more specific name.'
        );
        refs.countri.innerHTML = `
<img src="${responce[0].flags.svg}">
 <h1>${responce[0].name.official}</h1>`;
      } else if (length > 10) {
        Notiflix.Report.warning('Oops, there is no country with that name');
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      return error;
    });
}

