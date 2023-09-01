const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now },
});

// export model Role with RolesSchema
module.exports = mongoose.model("Student", StudentSchema);
