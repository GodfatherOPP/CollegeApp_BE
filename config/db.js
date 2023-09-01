require("dotenv").config({ path: "./config.env" });
const mongoose = require("mongoose");
const connectionURL = process.env.MONGO_CONNECTION_STRING;

const InitiateMongoServer = async () => {
  try {
    await mongoose
      .connect(connectionURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to DB !!");
        initial();
      })
      .catch((err) => {
        console.error("Connection Error:", err);
      });
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// Function to insert Roles

const Role = require("../model/auth/Role");
const UserType = require("../model/auth/UserType");
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        id: 1,
        name: "Master Admin",
        role: "masterAdmin",
      }).save((err) => {
        if (err) console.error("Error(role[1]):", err);
        console.log("Master Admin added to roles collection");
      });

      new Role({
        id: 2,
        name: "Admin",
        role: "admin",
      }).save((err) => {
        if (err) console.error("Error(role[2]):", err);
        console.log("Admin added to roles collection");
      });
      new Role({
        id: 3,
        name: "Agent",
        role: "agent",
      }).save((err) => {
        if (err) console.error("Error(role[3]):", err);
        console.log("Agent added to roles collection");
      });
      new Role({
        id: 4,
        name: "Customer",
        role: "customer",
      }).save((err) => {
        if (err) console.error("Error(role[4]):", err);
        console.log("Customer added to roles collection");
      });
    }
  });

  UserType.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new UserType({
        id: 1,
        name: "IDMS",
        user_type: "idms",
      }).save((err) => {
        if (err) console.error("Error( user_type[1]):", err);
        console.log("Idms added to user type collection");
      });
      new UserType({
        id: 2,
        name: "Ams",
        user_type: "ams",
      }).save((err) => {
        if (err) console.error("Error( user_type[2]):", err);
        console.log("Ams added to user type collection");
      });
      new UserType({
        id: 3,
        name: "DialerUser",
        user_type: "dialeruser",
      }).save((err) => {
        if (err) console.error("Error( user_type[2]):", err);
        console.log("Ams added to user type collection");
      });
    }
  });
}
module.exports = InitiateMongoServer;
