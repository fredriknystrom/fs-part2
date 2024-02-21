const Filter = (props) => {
    return(
      <form>
        <div>
          filter shown with: 
          <input 
            value={props.newSearch}
            onChange={props.handleSearch}
          />
        </div>
      </form>
    )
}

export default Filter