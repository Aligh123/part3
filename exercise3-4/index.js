const express = require("express");
const app = express();

let phoneNumbers = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  res.json(phoneNumbers);
});

app.get("/api/persons", (req, res) => {
  res.json(phoneNumbers);
});

app.get("/info", (req, res) => {
  const total = phoneNumbers.length;
  const date = new Date();
  res.send(
    `<p>PhoneBook has info for ${total} people</p>
     <p>${date}</p>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = phoneNumbers.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).send(`<h1>Person not found</h1>`).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  phoneNumbers = phoneNumbers.filter((phoneNumber) => phoneNumber.id !== id);
  res.status(204).end(); // No Content
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
