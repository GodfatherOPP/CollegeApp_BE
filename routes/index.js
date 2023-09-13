const Authentication = require("./auth/Authentication");
const student = require("./student/student");
const teacher = require("./teacher/teacher");
module.exports = {
  Authentication: Authentication,
  Student: student,
  Teacher: teacher,
};
