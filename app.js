/*jshint esversion: 6 */
// required package ----------------------------
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const fs = require("fs");
const path = require("path");
const validator = require("validator");
const crypto = require("crypto");
const cookie = require("cookie");
const session = require("express-session");

// local files ------------------------------------------
const User = require("./backend/models/users");
const Rooms = require("./backend/models/rooms");
const Image = require("./backend/models/photos");
// create uploads folder and create a static path reference to it
// throught the following code.

// global variables ------------------------------------------
const app = express();
const router = express.Router();
app.use("/upload", express.static("uploads"));
// this is our MongoDB database
const dbRoute =
  "mongodb+srv://ryan:ryan1@myinfo-diuqq.mongodb.net/AsianGourmet";
// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });
let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "client/build")));

// memcache --------------------------------------

// security --------------------------------------
function generateSalt() {
  return crypto.randomBytes(16).toString("base64");
}

function generateHash(password, salt) {
  let hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  return hash.digest("base64");
}

const sessionParser = session({
  secret: "please change this secret",
  resave: false,
  saveUninitialized: true,
  cookie: { httpOnly: true, sameSite: true }
});

app.use(sessionParser);
let isAuthenticated = function(req, res, next) {
  if (!req.session.user) return res.status(401).end("access denied");
  next();
};
let checkUsername = function(req, res, next) {
  if (!validator.isAlphanumeric(req.body.username))
    return res.status(400).end("bad input");
  next();
};
let checkId = function(req, res, next) {
  if (!validator.isAlphanumeric(req.params.id))
    return res.status(400).end("bad input");
  next();
};

// https://www.npmjs.com/package/axios  cors header need to fix
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// session user && session room
app.use(function(req, res, next) {
  req.user = "user" in req.session ? req.session.user : null;
  let username = req.user ? req.user._id : "";
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("username", username, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7 // 1 week in number of seconds
    })
  );
  console.log("HTTP request", username, req.method, req.url, req.body);
  next();
});

app.use(function(req, res, next) {
  req.room = "room" in req.session ? req.session.room : null;
  next();
});

let checkUseremail = function(req, res, next) {
  if (!validator.isEmail(req.body.email))
    return res.status(400).end("bad input");
  next();
};
let checkUserInputName = function(req, res, next) {
  if (
    !validator.isAlphanumeric(req.body.username) ||
    !validator.isAlphanumeric(req.body.first_name) ||
    !validator.isAlphanumeric(req.body.last_name)
  )
    return res.status(400).end("bad input");
  next();
};
router.post("/register", checkUserInputName, checkUseremail, function(
  req,
  res,
  next
) {
  if (!("username" in req.body))
    return res.status(400).end("username is missing");
  if (!("password" in req.body))
    return res.status(400).end("password is missing");
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  let first_name = req.body.first_name;
  let last_name = req.body.last_name;
  let salt = generateSalt();
  let hash = generateHash(password, salt);

  // insert new user into the database
  User.findOne({ _id: username }, function(err, user) {
    if (err) return res.status(500).end(err);
    if (user)
      return res
        .status(401)
        .end(username + " exists already, try another name");
    User.insertMany(
      [
        {
          _id: username,
          hash: hash,
          salt: salt,
          email: email,
          first_name: first_name,
          last_name: last_name
        }
      ],
      function(err, result) {
        if (err) {
          return res.status(500).end("insertion error");
        }
        return res.json(user);
      }
    );
  });
});

router.post("/signin/", checkUsername, function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({ _id: username }, function(err, user) {
    if (err)
      return res.status(500).end("server error, please try again later.");
    if (!user) return res.status(401).end("user does not exist");
    if (user.hash !== generateHash(password, user.salt))
      return res.status(401).end("username and password do not match");
    req.session.user = user;

    // initialize cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("username", username, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7
      })
    );
    return res.json(user);
  });
});

router.get("/signout/", isAuthenticated, function(req, res, next) {
  req.session.destroy();

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("username", "", {
      path: "/",
      maxAge: 60 * 60 * 24 * 7
    })
  );
  return res.redirect("/");
});

router.post("/GoogleSignin/", function(req, res, next) {
  let username = req.body.name;
  let user = { _id: username };
  req.session.user = user;
  // initialize cookie
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("username", username, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7
    })
  );
  return res.json(username);
});

router.get("/user", function(req, res, next) {
  if (req.session.user) {
    return res.json(req.session.user);
  } else {
    return res.status(401).end("Not sign in");
  }
});

// append /api for our http requests
app.use("/api", router);
// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, err => {
  if (err) console.log(err);
  else console.log("HTTP server on http://localhost:%s", PORT);
});
