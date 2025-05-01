require("dotenv").config();
const mongoose = require("mongoose");
const Person = require("./models/person");

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then(() => {
    if (name && number) {
      const person = new Person({ name, number });
      return person.save().then(() => {
        console.log(`Added ${name} number ${number}`);
      });
    } else {
      return Person.find({}).then((persons) => {
        console.log(`Phonebook:`);
        persons.forEach((p) => console.log(`${p.name} ${p.number}`));
      });
    }
  })
  .catch((error) => {
    console.error("Error", error.message);
  })
  .finally(() => {
    mongoose.connection.close();
  });
