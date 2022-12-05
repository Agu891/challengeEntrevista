const express = require("express");
const mongoose = require("mongoose");
const server = express();
const { Team } = require("./models");
const { Telegraf } = require("telegraf");

const bot = new Telegraf("5658227182:AAFLuED7dN7SJUZJil2jKeZj90OX6ADo9JE");

mongoose.connect(
  "mongodb+srv://admin:edmoEC0j4Cm7bOWV@cluster0.39tgnfu.mongodb.net/test"
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});
server.get("/", function (req, res) {
  res.send("hello world");
});

server.get("/findAll", async (req, res) => {
  const findAll = await Team.find({}, { _id: false, name: true });
  return res.status(200).json(findAll);
});

server.get("/findById/:id", async (req, res) => {
  const findById = await Team.findById(req.params.id);

  await bot.telegram.sendMessage("@ejerciciochanell", `${findById.name}`);
  bot.launch();
  return res.status(200).json(findById);
});

server.listen(3333, () => {
  console.log(`Servidor en http://localhost:3333`);
});
