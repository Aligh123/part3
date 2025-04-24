const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json()); // برای پارس کردن JSON

// ✅ تعریف توکن جدید برای لاگ کردن body
morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

// ✅ استفاده از morgan با فرمت سفارشی
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let phoneNumbers = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" },
];

// روت‌ها
app.get("/", (req, res) => res.json(phoneNumbers));

app.get("/api/persons", (req, res) => res.json(phoneNumbers));

app.get("/info", (req, res) => {
  const total = phoneNumbers.length;
  const date = new Date();
  res.send(`
    <p>Phonebook has info for ${total} people</p>
    <p>${date}</p>
  `);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = phoneNumbers.find(p => p.id === id);
  if (person) res.json(person);
  else res.status(404).send({ error: "Person not found" });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  phoneNumbers = phoneNumbers.filter(p => p.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const person = req.body;

  if (!person.name || !person.number) {
    return res.status(400).json({ error: "name or number is missing" });
  }

  const exists = phoneNumbers.find((p) => p.name === person.name);
  if (exists) {
    return res.status(400).json({ error: "name must be unique" });
  }

  const maxId = phoneNumbers.length > 0
    ? Math.max(...phoneNumbers.map((n) => Number(n.id)))
    : 0;

  const newPerson = {
    id: String(maxId + 1),
    name: person.name,
    number: person.number,
  };

  phoneNumbers = phoneNumbers.concat(newPerson);
  res.json(newPerson);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
