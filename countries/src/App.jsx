import { useState, useEffect } from 'react'
import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


const App = () => {
  const [countrySearch, setCountrySearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (countrySearch) {
      const url = "https://restcountries.com/v3.1/all";
      axios.get(url)
        .then(response => {
          const filteredCountries = response.data.filter(country => 
            country.name.common.toLowerCase().startsWith(countrySearch.toLowerCase()));

          if (filteredCountries.length > 10) {
            setMessage('Too many matches, specify another filter');
            setCountries([]);
          } else {
            setMessage('');
            setCountries(filteredCountries);
          }
        })
        .catch(error => console.log(error));
    }
  }, [countrySearch]);

  const handleNewSearch = (event) => {
    setCountrySearch(event.target.value)
  }

  return (
    <div>
      <form>
        <div>
          find countries:
          <input onChange={handleNewSearch} />
        </div>
      </form>
      <div>
        {message && <p>{message}</p>}
        {countries.length === 1 ? (
          <div>
            <h2>{countries[0].name.common}</h2>
            <p>capital: {countries[0].capital}</p>
            <p>area: {countries[0].area}</p>
            <p>languages:</p>
            <ul>
              {Object.values(countries[0].languages).map(language => (
                <li key={language}>{language}</li> // Assuming language names are unique
              ))}
            </ul>
            <img src={countries[0].flags.svg} alt={`Flag of ${countries[0].name.common}`} width="100" />
          </div>
        ) : (
          countries.map(country => (
            <div key={country.name.common}>{country.name.common}</div>
          ))
        )}
      </div>
    </div>
  );
};



export default App