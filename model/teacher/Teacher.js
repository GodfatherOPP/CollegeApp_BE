const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const TeacherSchema = mongoose.Schema({
  createdby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "createdby",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  profilepic: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  contactNumber: {
    type: String,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  JoiningDate: {
    type: Date,
  },
  employeeID: {
    type: String,
    unique: true,
  },
  emergencyContactName: {
    type: String,
  },
  emergencyContactNumber: {
    type: String,
  },
  createdat: { type: Date, default: Date.now },
  password: {},
});

// export model Role with RolesSchema
TeacherSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Teacher", TeacherSchema);
