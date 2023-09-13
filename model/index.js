const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const model = {};

model.mongoose = mongoose;

//auth model
model.Role = require("./auth/Role");
model.User = require("./auth/User");
model.UserType = require("./auth/UserType");
model.UserAuth = require("./auth/UserAuth");
model.AgentSetting = require("./auth/AgentSetting");
model.AdminSetting = require("./auth/AdminSetting");
model.AgentRoute = require("./auth/Routes");
model.Student = require("./student/Student");
model.Teacher = require("./teacher/Teacher");
model.TeacherSetting = require("./teacher/TeacherSettings");

module.exports = model;
