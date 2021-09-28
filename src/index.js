import './css/styles.css';
import refs from './js/refs';
import API from './js/fetchCountries';

import allCountriesMarkup from './tamplates/allCountriesMarkup.hbs';
import countryCardMarkup from './tamplates/countryCardMarkup.hbs';

import { debounce } from 'lodash';
import { Notify, Loading } from 'notiflix';

const { success, warning, failure, info } = Notify;

refs.searchInput.addEventListener('input', debounce(onCountriesSearch, 500));


function onCountriesSearch(e) {
  API.fetchCountries(e.target.value).then(inputValidation)
}

function inputValidation(country) {
  if (country.status === 404) {
    refs.country.innerHTML = '';
    serverResponse(failure, 'There is no such country!');
    return
  } else if (country.length > 10) {
    refs.country.innerHTML = '';
    serverResponse(warning, 'Too many matches found. Please enter a more specific qery!');
    return
  } else if (country.length > 1) {
    refs.country.innerHTML = allCountriesMarkup(country);
    serverResponse(info, 'Enter full name');
    return
    } else if (country.length === 1) {
    refs.country.innerHTML = countryCardMarkup(country);
    serverResponse(success, 'You found your country!');
    refs.searchInput.value = '';
  }
}

function serverResponse(r, message) {
  r(message);
  Loading.remove();
}
