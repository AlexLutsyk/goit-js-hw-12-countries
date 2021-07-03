export default function fetchCountry(searchQuery) {
    return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
        .then(response => {
            if (!response.ok) {
                throw Error(`Sorry, but there is no such country.`);
            }
            return response.json();
        });
}