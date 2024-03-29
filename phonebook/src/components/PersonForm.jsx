const PersonForm = (props) => {
    return(
      <form onSubmit={props.addPerson}>
        <div>
          name: 
          <input 
            value={props.newName}
            onChange={props.handleNewName}
          />
          <div>
            number: 
            <input
              value={props.newNumber}
              onChange={props.handleNewNumber}
            />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm