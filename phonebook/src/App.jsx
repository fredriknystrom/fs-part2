import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const updateNumber = () => {
    const person = persons.find(p => p.name === newName)
    const updatedPerson = { ...person, number: newNumber }

    personService
      .update(person.id, updatedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
      })
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      if(confirm(`${newName} is already added to phonebook, do you want to replace the old number with a new one?`)) {
        updateNumber()
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }

      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
      setNewName("")
      setNewNumber("")
    }
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  const filteredPersons = newSearch.length === 0 ? persons : persons.filter(person => person.name.toLowerCase().startsWith(newSearch.toLowerCase()))

  useEffect(() => {
    personService
      .getAll()
      .then(initPersons => {
        console.log(initPersons)
        setPersons(initPersons)
      })
  }, [])

  const deletePerson = (person) => {
    if(confirm(`Do you want to delete ${person.name}?`)){
      console.log(`deleted ${person.name} with id: ${person.id}`)
      personService.del(person.id)
      setPersons(persons.filter(p => p.id !== person.id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearch={handleSearch}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber}/>
      <h2>Numbers</h2>
      {filteredPersons.map(person =>
        <Person key={person.id} name={person.name} number={person.number} deletePerson={() => deletePerson(person)}/>
      )}
    </div>
  )
}

export default App