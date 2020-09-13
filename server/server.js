//Imports
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const Pusher = require("pusher");
const messageRoute = require("./routes/message");

//APP CONFIG
const app = express();
const port = process.env.PORT || 9000;

//MIDDLWARE
const pusher = new Pusher({
  appId: "1072291",
  key: "835ec4ab25e31535c4a2",
  secret: "c1ce7e478d7c6a3ed336",
  cluster: "us2",
  useTLS: true,
});

app.use(morgan("common"));
app.use(helmet());
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

//DB CONNECT
const db_URI =
  "mongodb+srv://admin:b8Wvym2MMI69fm7b@cluster0.olfy8.mongodb.net/whatsappdb?retryWrites=true&w=majority";

mongoose.connect(db_URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// ????

const db = mongoose.connection;

db.once("open", () => {
  console.log("DB Connected");
  const msgCollection = db.collection("messages");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log("A change occured", change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

//API ROUTES
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.use("/", messageRoute);

//LISTENER
app.listen(port, () => console.log(`Listening on localhost:${port}`));
