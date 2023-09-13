const { validationResult } = require("express-validator");
const model = require("../../model");
const Teacher = model.Teacher;
const TeacherService = require("../../services/teacher.service");
const TeacherServiceInstance = new TeacherService();
const mongoose = model.mongoose;

////
function getPagination(page, size) {
  const limit = size ? +size : 10;
  const offset = page ? (page - 1) * limit : 0;
  return { limit, offset };
}
////

//function to create student
const addteacher = async (req, res) => {
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
    address,
    JoiningDate,
    employeeID,
    emergencyContactName,
    emergencyContactNumber,
  } = req.body;

  const password = TeacherServiceInstance.encryptPassword("a1b2c3d4");

  try {
    const teacher = new Teacher({
      createdby,
      name,
      email,
      profilepic,
      description,
      dateOfBirth,
      gender,
      contactNumber,
      address,
      JoiningDate,
      employeeID,
      emergencyContactName,
      emergencyContactNumber,
      password,
    });

    await teacher
      .save()
      .then((response) => {
        res.status(200).json({
          statusCode: 200,
          status: "success",
          message: "Teacher Successfully Created.",
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
    console.log("addteacher", err.message);
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: err.message,
      data: {},
    });
  }
};

//function to List all Teacher
const fetchallteacher = async (req, res) => {
  try {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    const options = {
      offset,
      limit,
    };
    const data = await Teacher.paginate({}, options);
    res.status(200).json({
      statusCode: 200,
      totalItems: data.totalDocs,
      data: data.docs,
      totalPages: data.totalPages,
      currentPage: data.page - 1,
    });
  } catch (err) {
    console.log("fetchallteacher error", err.message);
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: err.message || "Some error occurred while retrieving data.",
      data: {},
    });
  }
};

//functjon to update Teacher

const updateteacher = async (req, res) => {
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
      address,
      JoiningDate,
      employeeID,
      emergencyContactName,
      emergencyContactNumber,
    } = req.body;
    const id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id)) {
      let teacher = await Teacher.findById(id).lean().exec();
      if (!teacher) {
        return res.status(404).send("Student Not found");
      }
      if (teacher) {
        if (
          email &&
          (await TeacherServiceInstance.checkEmailExistWithOtherTeacher(
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
          employeeID &&
          (await TeacherServiceInstance.checkemployeeIDExistWithOtherTeacher(
            employeeID,
            id
          )) === false
        ) {
          return res.status(200).json({
            statusCode: 409,
            message: "Teacher id already exists with other account",
            data: [],
          });
        }
      }
    }
    const newteacher = {
      createdby,
      name,
      email,
      profilepic,
      description,
      dateOfBirth,
      gender,
      contactNumber,
      address,
      JoiningDate,
      employeeID,
      emergencyContactName,
      emergencyContactNumber,
    };

    const teacher = await Teacher.findByIdAndUpdate(id, newteacher, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Teacher Successfully Updated.",
      user: teacher,
    });
  } catch (err) {
    console.log("Update Teacher error: ", err.message);
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: err.message,
      data: {},
    });
  }
};

const deleteteacher = async (req, res) => {
  const id = req.params.id;
  if (mongoose.Types.ObjectId.isValid(id)) {
    try {
      const teacher = await Teacher.findByIdAndDelete(id);

      if (!teacher) {
        return res.status(404).json({
          statusCode: 404,
          status: "error",
          message: "teacher not found",
          data: {},
        });
      }

      res.status(200).json({
        statusCode: 200,
        status: "success",
        message: "teacher deleted successfully",
        data: { teacher },
      });
    } catch (err) {
      console.error("Error deleting teacher:", err.message);
      res.status(500).json({
        statusCode: 500,
        status: "error",
        message: "An error occurred while deleting the teacher",
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
      const teacher = await Teacher.findById(id);
      res.status(200).json({
        statusCode: 200,
        status: "success",
        message: "teacher fetched successfully",
        data: { teacher },
      });
    } catch (err) {
      console.error("Error fetching teacher:", err.message);
      res.status(500).json({
        statusCode: 500,
        status: "error",
        message: "An error occurred while fetching the teacher",
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
  addteacher: addteacher,
  fetchallteacher: fetchallteacher,
  updateteacher: updateteacher,
  deleteteacher: deleteteacher,
  fetchbyid: fetchbyid,
};
