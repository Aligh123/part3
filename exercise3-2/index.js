const express = require("express");
const app = express();

const phoneNumbers = [
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
        <p>${date}</p>
        
        `
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
