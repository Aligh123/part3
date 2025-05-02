const mongoose = require("mongoose");
const app = require("./app");
const config = require("./utils/config");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("Connected to mongoDB");
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log("Server running on port ", PORT);
    });
  })
  .catch((error) => {
    console.error(`error connecting to Mongodb :`, error.message);
  });
