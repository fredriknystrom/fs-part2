const ShowCountry = ({ country, setNewSearch }) => {
    return (
      <div>
        {country.name.common}
        <button onClick={() => setNewSearch(country.name.common)}>Show</button>
      </div>
    );
  };

  export default ShowCountry