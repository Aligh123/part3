import { useState, useEffect } from "react";
import personService from "./services/personService";
import "./App.css";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((data) => setPersons(data));
  }, []);

  const handleAdd = (event) => {
    event.preventDefault();
    const exists = persons.find(
      (p) => p.name.toLowerCase() === newName.toLowerCase()
    );
    if (exists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber,
    };

    personService.create(personObject).then((returned) => {
      setPersons(persons.concat(returned));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Delete this person?");
    if (confirmDelete) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

  const personsToShow = persons.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with:{" "}
        <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>
      <form onSubmit={handleAdd}>
        <div>
          name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          number:{" "}
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((p) => (
          <li key={p.id}>
            {p.name} {p.number}{" "}
            <button onClick={() => handleDelete(p.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
