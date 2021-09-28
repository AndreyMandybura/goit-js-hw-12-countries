const BASE_URL = 'https://restcountries.com/v3/name';

  function fetchCountries(searchQuery) {
    return fetch(`${BASE_URL}/${searchQuery}`).then(response => response.json());
}
  
export default { fetchCountries };