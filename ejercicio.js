const express = require("express");
const mongoose = require("mongoose");
const { Team } = require("./models");
const { Telegraf } = require("telegraf");
require("dotenv").config();
const server = express();

const bot = new Telegraf(process.env.BOT_TOKEN);

mongoose.connect(process.env.DB_URL);

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
  console.log(`Servidor corriendo en http://localhost:3333`);
});
