const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoosePaginate = require("mongoose-paginate-v2");
const Role = require("./Role");

const UserAuthSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
    },
    otpExpiredTime: {
        type: String,
    },
    loginRetryLimit: {
        type: String,
    },
    loginReactiveTime: {
        type: String,
    },
    loginResendOTPRetryLimit: {
        type: String,
    },
    verifyMobileNoResendOTPRetryLimit: {
        type: String,
    },
    verifyMobileNoResendOTPReactiveTime: {
        type: String,
    }, 
    resetPasswordResendOTPReactiveTime: {
        type: String,
    }, 
    twoFAResendOTPRetryLimit: {
        type: String,
    }, 
    twoFAResendOTPReactiveTime: {
        type: String,
    },
    status: {
        type: Number,
        default: 1,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
    loginOtp: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

UserAuthSchema.plugin(mongoosePaginate);

UserAuthSchema.methods.getPublicProfile = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

UserAuthSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign(
        {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.roles.id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: 8640000,
        }
    );
    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

//Hash the text password

UserAuthSchema.pre("save", async function (next) {
    const user = this;

    if (user.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }

    next();
});

// export model user with UserAuthSchema
module.exports = mongoose.model("UserAuth", UserAuthSchema);
