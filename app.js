const express = require("express");
const bodyParser = require("body-parser");
const InitiateMongoServer = require("./config/db");
// Initiate Mongo Server
InitiateMongoServer();

const Routes = require("./routes"); /// why not index js is added in the route

const app = express();

app.use(express.json({ limit: "20mb" }));
function rawBodySaver(req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || "utf8");
  }
}
app.use(
  express.urlencoded({ limit: "20mb", extended: true, verify: rawBodySaver })
);

// app.use(
//   bodyParser.json({
//     verify: function (req, res, buf) {
//       req.rawBody = buf;
//     },
//   })
// );

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

//Routes for Auth
app.use("/api/v1/auth", Routes.Authentication);

//Routes for Student
app.use("/api/student", Routes.Student);

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end("\n");
  console.log(err);
});

module.exports = app;
