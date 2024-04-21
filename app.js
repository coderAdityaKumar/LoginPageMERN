const express = require("express");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
const port = 3000;
main().catch((err) => console.log(err));

console.log(process.env.URI);

async function main() {
  const URI = process.env.URI;
  await mongoose.connect(`${URI}`);
  console.log("DB connected.");
}

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const user = mongoose.model("user", userSchema);

app.use(bodyParser.json());
app.post("/demo", async (req, res) => {
  let newUser = new user();
  newUser.username = req.body.username;
  newUser.password = req.body.password;
  await newUser.save();
});
app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "build")));
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  }); 
app.listen(port, () => {
  console.log("Server is listening...");
});
