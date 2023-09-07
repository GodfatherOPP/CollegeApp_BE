const { validationResult } = require("express-validator");
const model = require("../../model");
const Student = model.Student;
const StudentService = require("../../services/student.service");
const StudentServiceInstance = new StudentService();
const mongoose = model.mongoose;

////
function getPagination(page, size) {
  const limit = size ? +size : 10;
  const offset = page ? (page - 1) * limit : 0;
  return { limit, offset };
}
////

//function to create student
const addstudent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      statusCode: 400,
      status: "error",
      message: errors.array()[0].msg,
      data: {},
    });
  }

  const {
    createdby,
    name,
    email,
    profilepic,
    description,
    dateOfBirth,
    gender,
    contactNumber,
    enrollmentDate,
    studentID,
    parentName,
    parentEmail,
    parentContactNumber,
    emergencyContactName,
    emergencyContactNumber,
    address,
  } = req.body;

  const password = "thisisthesamplepassword";

  try {
    const student = new Student({
      createdby,
      name,
      email,
      profilepic,
      description,
      dateOfBirth,
      gender,
      contactNumber,
      enrollmentDate,
      studentID,
      parentName,
      parentEmail,
      parentContactNumber,
      emergencyContactName,
      emergencyContactNumber,
      address,
      password,
    });

    await student
      .save()
      .then((response) => {
        res.status(200).json({
          statusCode: 200,
          status: "success",
          message: "Student Successfully Created.",
          user: response,
        });
      })
      .catch((err) => {
        res.status(500).json({
          statusCode: 500,
          status: "error",
          message: err.message,
          data: {},
        });
      });
  } catch (err) {
    console.log("addstudent", err.message);
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: err.message,
      data: {},
    });
  }
};

//function to List all student
const fetchallstudent = async (req, res) => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const options = {
      offset,
      limit,
    };
    const data = await Student.paginate({}, options);
    res.status(200).json({
      statusCode: 200,
      totalItems: data.totalDocs,
      data: data.docs,
      totalPages: data.totalPages,
      currentPage: data.page - 1,
    });
  } catch (err) {
    console.log("fetchallstudent error", err.message);
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: err.message || "Some error occurred while retrieving data.",
      data: {},
    });
  }
};

//functjon to update student

const updatestudent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      statusCode: 400,
      status: "error",
      message: errors.array()[0].msg,
      data: {},
    });
  }
  try {
    const {
      createdby,
      name,
      email,
      profilepic,
      description,
      dateOfBirth,
      gender,
      contactNumber,
      enrollmentDate,
      studentID,
      parentName,
      parentEmail,
      parentContactNumber,
      emergencyContactName,
      emergencyContactNumber,
      address,
    } = req.body;
    const id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id)) {
      let student = await Student.findById(id).lean().exec();
      if (!student) {
        return res.status(404).send("Student Not found");
      }
      if (student) {
        if (
          email &&
          (await StudentServiceInstance.checkEmailExistWithOtherStudnet(
            email,
            id
          )) === false
        ) {
          return res.status(409).json({
            statusCode: 409,
            message: "Email already exists with other account",
            data: [],
          });
        }
        if (
          studentID &&
          (await StudentServiceInstance.checkStudentIDExistWithOtherStudent(
            studentID,
            id
          )) === false
        ) {
          return res.status(200).json({
            statusCode: 409,
            message: "student id already exists with other account",
            data: [],
          });
        }
      }
    }
    const newstudent = {
      createdby,
      name,
      email,
      profilepic,
      description,
      dateOfBirth,
      gender,
      contactNumber,
      enrollmentDate,
      studentID,
      parentName,
      parentEmail,
      parentContactNumber,
      emergencyContactName,
      emergencyContactNumber,
      address,
    };

    const student = await Student.findByIdAndUpdate(id, newstudent, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Student Successfully Updated.",
      user: student,
    });
  } catch (err) {
    console.log("Update Student error: ", err.message);
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: err.message,
      data: {},
    });
  }
};

const deletestudent = async (req, res) => {
  const id = req.params.id;
  if (mongoose.Types.ObjectId.isValid(id)) {
    try {
      const student = await Student.findByIdAndDelete(id);

      if (!student) {
        return res.status(404).json({
          statusCode: 404,
          status: "error",
          message: "Student not found",
          data: {},
        });
      }

      res.status(200).json({
        statusCode: 200,
        status: "success",
        message: "Student deleted successfully",
        data: { student },
      });
    } catch (err) {
      console.error("Error deleting student:", err.message);
      res.status(500).json({
        statusCode: 500,
        status: "error",
        message: "An error occurred while deleting the student",
        data: {},
      });
    }
  } else {
    res.status(404).json({
      statusCode: 404,
      status: "error",
      message: "Wrong id",
      data: {},
    });
  }
};

const fetchbyid = async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(id)) {
    try {
      const id = req.params.id;
      const student = await Student.findById(id);
      res.status(200).json({
        statusCode: 200,
        status: "success",
        message: "Student fetched successfully",
        data: { student },
      });
    } catch (err) {
      console.error("Error fetching student:", err.message);
      res.status(500).json({
        statusCode: 500,
        status: "error",
        message: "An error occurred while fetching the student",
        data: {},
      });
    }
  } else {
    res.status(404).json({
      statusCode: 404,
      status: "error",
      message: "Wrong id",
      data: {},
    });
  }
};

module.exports = {
  addstudent: addstudent,
  fetchallstudent: fetchallstudent,
  updatestudent: updatestudent,
  deletestudent: deletestudent,
  fetchbyid: fetchbyid,
};
