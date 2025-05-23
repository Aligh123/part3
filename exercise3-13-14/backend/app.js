const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const personsRouter = require("./controllers/persons");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/persons", personsRouter);

module.exports = app;
