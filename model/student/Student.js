const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const StudentSchema = mongoose.Schema({
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
  enrollmentDate: {
    type: Date,
  },
  studentID: {
    type: String,
    unique: true,
  },
  parentName: {
    type: String,
  },
  parentEmail: {
    type: String,
    lowercase: true,
    trim: true,
  },
  parentContactNumber: {
    type: String,
  },
  emergencyContactName: {
    type: String,
  },
  emergencyContactNumber: {
    type: String,
  },
  createdat: { type: Date, default: Date.now },
  password: {
    type: String,
    required: true,
  },
});

// export model Role with RolesSchema
StudentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Student", StudentSchema);
