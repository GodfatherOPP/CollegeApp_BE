const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const TeacherController = require("../../controllers/teacher/TeacherController");
const middleware = require("../../middleware");

const resourse = "teacher";

//route 1 : add a new tacher login required
router.post(
  "/create",
  [
    check("name", "Please Enter a Valid Name").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("dateOfBirth", "Enter valid dateofbirth").isDate(),
  ],
  middleware.Auth,
  middleware.GrantAccess("createAny", resourse),
  TeacherController.addteacher
);

//route 2 : fetch all student login required
router.get(
  "/list",
  middleware.Auth,
  middleware.GrantAccess("readAny", resourse),
  TeacherController.fetchallteacher
);

//route 3 : update teacher details

router.put(
  "/update/:id",
  [
    check("name", "Please Enter a Valid Name").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
  ],
  middleware.Auth,
  middleware.GrantAccess("updateAny", resourse),
  TeacherController.updateteacher
);

//route 4 to delete a teacher
router.delete(
  "/delete/:id",
  middleware.Auth,
  middleware.GrantAccess("deleteAny", resourse),
  TeacherController.deleteteacher
);

//route 5 to fetch teacher by id

router.get(
  "/listbyid/:id",
  middleware.Auth,
  middleware.GrantAccess("readAny", resourse),
  TeacherController.fetchbyid
);

module.exports = router;
