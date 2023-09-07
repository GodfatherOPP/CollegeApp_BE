const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const StudentController = require("../../controllers/student/StudentController");
const middleware = require("../../middleware");

const resourse = "student";

//route 1 : add a new Student login required
router.post(
  "/create",
  [
    check("name", "Please Enter a Valid Name").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("studentID", "Please Enter the valid student id").notEmpty(),
    check("dateOfBirth", "Enter valid dateofbirth").isDate(),
  ],
  middleware.Auth,
  middleware.GrantAccess("createAny", resourse),
  StudentController.addstudent
);

//route 2 : fetch all student login required
router.get(
  "/list",
  middleware.Auth,
  middleware.GrantAccess("readAny", resourse),
  StudentController.fetchallstudent
);

//route 3 : update student details

router.put(
  "/update/:id",
  [
    check("name", "Please Enter a Valid Name").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("studentID", "Please Enter the valid student id").notEmpty(),
  ],
  middleware.Auth,
  middleware.GrantAccess("updateAny", resourse),
  StudentController.updatestudent
);

//route 4 to delete a student
router.delete(
  "/delete/:id",
  middleware.Auth,
  middleware.GrantAccess("deleteAny", resourse),
  StudentController.deletestudent
);

//route 5 to fetch student by id

router.get(
  "/listbyid/:id",
  middleware.Auth,
  middleware.GrantAccess("readAny", resourse),
  StudentController.fetchbyid
);

module.exports = router;
