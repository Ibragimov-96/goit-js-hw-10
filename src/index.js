import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const refs = {
  cardContainer: document.querySelector('.country-info'),
  countriesList: document.querySelector('#search-box'),
  country: document.querySelector('.country-list'),
};
refs.countriesList.addEventListener(
  'input',
  debounce(onSearch, DEBOUNCE_DELAY)
);

function onSearch(e) {
  const search = e.target.value.trim();

  if (!search) return;
  addMarkup();
  fetchCountries(search)
    .then(response => {
      const length = response.length;

      if (length === 1) {
        const markup = createMarkupCountry(response);
        addMarkup(markup);
      } else if (length > 1 && length <= 10) {
        const markup = createMarkupListCountry(response);
        addMarkup('', markup);
      } else {
        Notiflix.Report.warning('Oops, there is no country with that name');
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      return error;
    });
}

function addMarkup(cm = '', clm = '') {
  refs.cardContainer.innerHTML = cm;
  refs.country.innerHTML = clm;
}

function createMarkupCountry(data = []) {
  return data
    .map(({ flags, name, capital, population, languages }) => {
      return `<div><img src="${flags.svg}" style="width:50px">
    <h1>name ${name.official}</h1>
     <p>${capital}</p>
     <p>${population}</p>
      <p>${Object.values(languages)[0]}</p></div>`;
    })
    .join('');
}

function createMarkupListCountry(data = []) {
  return data
    .map(({ flags, name }) => {
      return `<div><img src="${flags.svg}" style="width:50px">
      <h1>${name.official}</h1></div>`;
    })
    .join('');
}
