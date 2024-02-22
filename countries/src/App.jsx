import { useState, useEffect } from 'react'
import axios from 'axios'
import ShowCountry from './components/ShowCountry';
import CountryInfo from './components/CountryInfo';

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

  const setNewSearch = (name) => {
    setCountrySearch(name)
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
          <CountryInfo country={countries[0]}/>
        ) : (
          countries.map(country => (
            <ShowCountry key={country.name.common} country={country} setNewSearch={setNewSearch}/>
          ))
        )}
      </div>
    </div>
  );
};



export default App