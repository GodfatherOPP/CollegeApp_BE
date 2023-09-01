const { validationResult } = require("express-validator");
const model = require("../../model");
const Student = model.Student;

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

  const { name, email, image, description } = req.body;
  try {
    const user = new Student({
      name,
      email,
      image,
      description,
    });

    await user.save();
    res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Student Successfully Created.",
      user,
    });
  } catch (err) {
    console.log("catch", err.message);
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: err.message,
      data: {},
    });
  }
};

const fetchallstudent = async (req, res) => {
  const { name, email, image, description } = req.body;
  try {
    const allstudents = await Student.find({});
    res.status(200).json({
      allstudents,
    });
  } catch (err) {
    console.log("catch", err.message);
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: err.message,
      data: {},
    });
  }
};

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
    const { name, email, image, description } = req.body;
    const id = req.params.id;

    let student = await Student.findById(id);
    if (!student) {
      return res.status(404).send("Student Not found");
    }

    const newstudent = {};
    if (name) {
      newstudent.name = name;
    }
    if (email) {
      newstudent.email = email;
    }
    if (image) {
      newstudent.image = image;
    }
    if (description) {
      newstudent.description = description;
    }

    //we have to add a check according to the condition that this user can modify the deatails or not
    // if (student._id !== req.user.id) {
    //   return res.status(401).send("Not allowed");
    // }

    student = await Student.findByIdAndUpdate(
      id,
      { $set: newstudent },
      { new: true }
    );

    res.status(200).json({ student });
  } catch (err) {
    console.log("catch", err.message);
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: err.message,
      data: {},
    });
  }
};

const deletestudent = async (req, res) => {
  try {
    const id = req.params.id;

    //we have to add a check according to the condition that this user can modify the deatails or not

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
};

module.exports = {
  addstudent: addstudent,
  fetchallstudent: fetchallstudent,
  updatestudent: updatestudent,
  deletestudent: deletestudent,
};
