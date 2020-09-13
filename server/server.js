//Imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const messageRoute = require("./routes/message");

//APP CONFIG
const app = express();
const port = process.env.PORT || 9000;

//MIDDLWARE
app.use(express.json());

//DB CONNECT
const db_URI =
  "mongodb+srv://admin:b8Wvym2MMI69fm7b@cluster0.olfy8.mongodb.net/whatsappdb?retryWrites=true&w=majority";

mongoose.connect(db_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// ????

//API ROUTES
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.use("/", messageRoute);

//LISTENER
app.listen(port, () => console.log(`Listening on localhost:${port}`));
