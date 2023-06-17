const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { xss } = require("express-xss-sanitizer");
const home = require("./application/controllers/home");
const users = require("./application/controllers/users");

const app = express();
console.tmperror = console.error.bind(console);
console.log = (...err) => {
  let err2 = "";
  try {
    throw new Error(...err);
  } catch (error) {
    err2 = error;
  }
  var stacks = err2.stack.toString().split("\n");
  stacks = stacks.filter((itm) => {
    return itm.search("    at") === 0;
  });
  //console.tmperror(stacks[1],(stacks[1]||'').indexOf('warning.js'));
  if (
    (stacks[2] || "").indexOf("writeOut") === -1 &&
    (stacks[1] || "").indexOf("warning.js") === -1 &&
    (stacks[2] || "").indexOf("warning.js") === -1
  )
    console.tmperror(
      "\n\n\n",
      new Date().toLocaleString(),
      "LOG:",
      ...err,
      "\n",
      stacks[1] || ""
    );
};

// view engine setup
app.set("views", [
  path.join(__dirname, "application/views/"),
  path.join(__dirname, "application/views/general/"),
  path.join(__dirname, "application/views/users/"),
  path.join(__dirname, "application/views/common/"),
]);
app.set("view engine", "ejs");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Max-Age", "60000");
  next();
});
app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.urlencoded({
    limit: "200mb",
    extended: true,
    parameterLimit: 1000000,
  })
);
app.use(
  express.json({ limit: "200mb", extended: true, parameterLimit: 1000000 })
);
app.use(cookieParser());
//xss filter
app.use(xss());
//redis-session
app.use(require("./application/middlewares/sess_userdata"));
app.use(require("./application/middlewares/load_content"));
app.disable("x-powered-by");

//route
app.use("/", home);
app.use("gate/index", home);
app.use("/user", users);
app.use("/Common", users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error("Page Not Found");
  err.status = 404;
  next(err);
});
app.use(require("./application/middlewares/error_handler"));

module.exports = app;
