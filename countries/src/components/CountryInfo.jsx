const CountryInfo = ({country}) => {
    return(
      <div>
        <h2>{country.name.common}</h2>
        <p>capital: {country.capital}</p>
        <p>area: {country.area}</p>
        <p>languages:</p>
        <ul>
          {Object.values(country.languages).map(language => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="100" />
      </div>
    )
  }

  export default CountryInfo