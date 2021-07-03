import './sass/main.scss';
import forCountriesTemplate from './templates/forCountriesTemplate.hbs';
import forCountryTemplate from './templates/forCountryTemplate.hbs';
import errorMessage from './js/pnotify.js';
import fetch from './js/fetch.js';
const lodashDebounce = require('lodash.debounce');

const refs = {
    input: document.querySelector('.input-search'),
    forRenderTemplate: document.querySelector('.for-render-template'),
};

const onInputDebounce = lodashDebounce(onSearchInput, 500);

refs.input.addEventListener('input', onInputDebounce);

function onSearchInput(event) {
    if (!event.target.value) {
        return;
    };

    const searchCountry = event.target.value;
    fetch(searchCountry)
        .then(forRenderCountry)
    .catch(onError)
};

function forRenderCountry(countries) {
    if (countries.length === 1) {
        countryRender(countries);
    } else if (countries.length >= 2 && countries.length <= 10) {
        countriesRender(countries);
    } else {
        errorMessage();
    };
}

function countriesRender(countries) {
    const countriesArray = countries.map(country => country.name);
    refs.forRenderTemplate.innerHTML = forCountriesTemplate(countriesArray);
};

function countryRender(countries) {
    countries.forEach(country => {
        refs.forRenderTemplate.innerHTML = forCountryTemplate(country);
        refs.input.value = '';
    });
};
 
function onError(error) {
    alert(`${error}`)
};