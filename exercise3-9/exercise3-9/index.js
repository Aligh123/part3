const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// Debug middleware
app.use((req, res, next) => {
  console.log('Request URL:', req.originalUrl);
  next();
});

let persons = [
  { id: 1, name: 'Arto Hellas', number: '040-123456' },
  { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
  { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' },
];

// API routes
const apiRouter = express.Router();
apiRouter.get('/persons', (req, res) => {
  res.json(persons);
});
apiRouter.get('/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});
apiRouter.delete('/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((p) => p.id !== id);
  res.status(204).end();
});
apiRouter.post('/persons', (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number missing' });
  }
  const nameExists = persons.find((p) => p.name === body.name);
  if (nameExists) {
    return res.status(400).json({ error: 'name must be unique' });
  }
  const newPerson = {
    id: Math.floor(Math.random() * 100000),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(newPerson);
  res.json(newPerson);
});
app.use('/api', apiRouter);

// Info route
app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`);
});

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// Serve SPA for non-API routes
app.get(/^((?!\/api).)*$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});