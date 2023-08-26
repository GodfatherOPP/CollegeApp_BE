const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoosePaginate = require("mongoose-paginate-v2");
const Role = require("./Role");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true, // Index for unique emails
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    unique: true, // Index for unique phone numbers
  },
  avatar: String, // No specific indexing needed
  companyName: String, // No specific indexing needed
  address: {
    fullAddress: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  about: String, // No specific indexing needed
  password: {
    type: String,
    required: true,
    trim: true,
  },
  roles: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
  userType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserType",
  },
  status: Number, // No specific indexing needed
  timeZone: String, // No specific indexing needed
  confirmationCode: {
    type: String,
    unique: true, // Index for unique confirmation codes
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: function () {
      this.populate("roles").then((role) => {
        return role.roles.id === 3 ? true : false;
      });
    },
  },
  tokens: [
    {
      token: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.plugin(mongoosePaginate);

// Indexes
UserSchema.index({ email: 1 });
UserSchema.index({ phone: 1 });
UserSchema.index({ confirmationCode: 1 });

// Virtual to get the public profile of a user
UserSchema.methods.getPublicProfile = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  console.log("\n userObject ", userObject);
  return userObject;
};

// Method to generate an authentication token
UserSchema.methods.generateAuthToken = async function () {
  const user = this;

  console.log("\n user ", user);
  const token = jwt.sign(
    {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.roles.id,
      user_type: user.userType.name,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 8640000,
    }
  );
  if (user.tokens.length < 11) {
    user.tokens = user.tokens.concat({ token });
  } else {
    user.tokens = [{ token }]; // Reset tokens if the array reaches a certain length
  }
  await user.save();

  return token;
};

// Hash the text password before saving
UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }

  next();
});

// Export the User model with UserSchema
module.exports = mongoose.model("User", UserSchema);
