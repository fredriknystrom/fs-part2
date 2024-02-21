import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(item => item.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearch={handleSearch}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber}/>
      <h2>Numbers</h2>
      {filteredPersons.map(person =>
        <Person key={person.id} name={person.name} number={person.number}/>
      )}
    </div>
  )
}

export default App