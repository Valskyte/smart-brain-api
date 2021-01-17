const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require("./controlers/register");
const signin = require("./controlers/signin");
const profile = require("./controlers/profile");
const image = require("./controlers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "user",
    password: "",
    database: "smart-brain",
  },
});

db.select("*")
  .from("users")
  .then((data) => {
    console.log(data);
  });

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(database.users);
});
app.post("/signin", signin.handleSignin(db, bcrypt));
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
}),
  app.get("/profile/:id", (req, res) => {
    profile.handleProfileGet(req, res, db);
  });

app.put("/image", (req, res) => {
  image.handleImage(req, res, db);
});

app.post("/imageUrl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});

// -->res = this is working
// /signin --POST = success/fail
// /register --> POST = user
// /profile/:userID --> GET = user
// /image --> PUT --> user
