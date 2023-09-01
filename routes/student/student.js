const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const StudentController = require("../../controllers/student/StudentController");

//route 1 : add a new Student login required
router.post(
  "/addstudent",
  [
    check("name", "Please Enter a Valid Name").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
  ],
  StudentController.addstudent
);

//route 2 : fetch all student login required
router.get("/fetchallstudent", StudentController.fetchallstudent);

//route 3 : update student details

router.put(
  "/updatestudent/:id",
  [
    check("name", "Please Enter a Valid Name").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
  ],
  StudentController.updatestudent
);

//route 4 to delete a student
router.delete("/deletestudent/:id", StudentController.deletestudent);

module.exports = router;
