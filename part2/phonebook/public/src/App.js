import { useState, useEffect } from 'react'
import axios from 'axios'
import create from './persons'
import Notification from './Notification'

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addName}>
    <div>
      name: <input 
              value={props.newName}
              onChange={props.handleNameChange} 
            />
    </div>
    <div>number: <input
                      value={props.newNumber}
                      onChange={props.handleNumberChange}  
                />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}
const Person = ({person,onDelete}) => {
  return (
     <li>
      {person.name} {person.number}
      <button onClick={onDelete}>delete</button>
     </li>
  )
}
const Persons = ({persons ,setPersons}) => {
  console.log(persons)
  const onDelete = (id) => {
    const url = `http://localhost:3001/persons/${id}`
    const person = persons.find(n => n.id === id)
    if (window.confirm(`Delete ${person.name} ?`)) {
      axios.delete(url)
      .then(x => setPersons(persons.filter(p => p.id !== id)))
      .catch(error => {
        alert(
          `the person '${person.name}' was already deleted from server`
        )
    })
  }
}
  return (
    <ul>
    {persons.map(person => 
     <Person key={person.name} person={person} onDelete={()=>onDelete(person.id)} />
    )}
    </ul>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [addedMessage, setAddedMessage] = useState(null)


  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const addName = (event) => {
    const PersonObject = {name: newName}
    const exist = persons.find((person) => 
                  person.name === newName)
    if(exist != null)
      window.alert(`${newName} is already added to phonebook`)
    else{
      PersonObject.number = newNumber
      event.preventDefault()
      create(PersonObject).
      then(returnedPerson =>{
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setAddedMessage(
          `Added ${returnedPerson.name}`
        )
        setTimeout(() => {
          setAddedMessage(null)
        }, 5000)
      })         
    }
  }


  return (
    <div>
    <h2>Phonebook</h2>
    <Notification message={addedMessage} />
    <PersonForm addName={addName} newName={newName} 
                handleNameChange={handleNameChange} newNumber={newNumber}
                handleNumberChange={handleNumberChange}
    />
    <h2>Numbers</h2>
    <Persons persons={persons} setPersons={setPersons} />
  </div>
  )
}

export default App