require("dotenv").config();
const nodemailer = require("nodemailer");
const user = "";
const pass = "";
const host = "";
const port = "";

module.exports.transport = nodemailer.createTransport({
  host: host,
  port: port,
  //secure: false,
  auth: {
    user: user,
    pass: pass, // naturally, replace both with your real credentials or an application-specific password
  },
});
