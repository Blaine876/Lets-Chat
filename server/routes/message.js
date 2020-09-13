const express = require("express");
const Message = require("../models/Message");
const router = express.Router();

router.post("/messages/new", (req, res) => {
  const newMessage = req.body;

  Message.create(newMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

router.get("/messages/sync", (req, res) => {
  Message.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

module.exports = router;
