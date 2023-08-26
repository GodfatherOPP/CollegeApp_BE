const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const sendVerificationEmail = require("../../utils/VerificationEmail");
const jwt = require("jsonwebtoken");
const model = require("../../model");
const User = model.User;
const UserAuth = model.UserAuth;
const UserService = require("../../services/user.service");
const UserServiceInstance = new UserService();
const otpGenerator = require("otp-generator");
const dayjs = require("dayjs");
const { updateSipUser } = require("../../utils/sipUtilsFunction");

const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      statusCode: 400,
      status: "error",
      message: errors.array()[0].msg,
      data: {},
    });
  }

  const { name, phone, email, password, role, user_type } = req.body;
  try {
    let userWithEmail = await User.findOne({
      email,
    });
    let userWithPhoneNumber = await User.findOne({
      phone,
    });
    if (userWithEmail || userWithPhoneNumber) {
      return res.status(409).json({
        statusCode: 409,
        status: "error",
        message: "User Already Exists",
        data: {},
      });
    }
    const roles = await model.Role.find({
      id: role,
    }).exec();

    const userType = await model.UserType.find({
      id: user_type,
    }).exec();

    const confirmationCode = jwt.sign(
      { email: req.body.email },
      process.env.JWT_SECRET
    );
    const user = new User({
      name,
      phone,
      email,
      password,
      roles: roles.map((role) => role._id),
      userType: userType.map((userType) => userType._id),
      confirmationCode,
    });

    await user.save();
    const token = await user.generateAuthToken();
    sendVerificationEmail(user.name, user.email, user.confirmationCode);
    res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Your Account Successfully Created.",
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

const login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      statusCode: 400,
      status: "error",
      message: "Invalid Password or email",
      data: {},
    });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({
      email,
      status: 1,
    })
      .populate({ path: "roles", select: "name id role" })
      .populate({ path: "userType", select: "id name user_type" });
    if (!user)
      return res.status(404).json({
        statusCode: 404,
        status: "error",
        message: "User not exists or not verified.",
        data: {},
      });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({
        statusCode: 400,
        status: "error",
        message: "Incorrect Password !",
        data: {},
      });
    let userAuthExist = await UserAuth.findOne({
      userId: user._id,
    });
    let now = dayjs().toISOString();
    if (!userAuthExist?.loginOtp) {
      var otpLoginTime = dayjs(now).toISOString();
    } else {
      var otpLoginTime = dayjs(userAuthExist.loginOtp).toISOString();
    }
    console.log("otpLoginTime = ", otpLoginTime, now >= otpLoginTime);
    if (now >= otpLoginTime) {
      const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });
      msg = `Your login otp is ${otp}`;
      // await TemlpateMessageServiceInstance.sendEmailForOtp(user, msg);
      let expire = dayjs().add(900, "second").toISOString();
      console.log("userAuthExist = ", userAuthExist);
      if (userAuthExist) {
        await UserAuth.findOneAndUpdate(
          { userId: user._id },
          {
            otp: "123456",
            otpExpiredTime: expire,
            loginResendOTPRetryLimit: 0,
          }
        );
      } else {
        const userAuth = new UserAuth({
          userId: user._id,
          otp: "123456",
          otpExpiredTime: expire,
          loginResendOTPRetryLimit: 0,
        });
        console.log("userAuth = ", userAuth);
        await userAuth.save();
      }
      res.status(200).json({
        status: "success",
        message: `Check your registered email ${user.email} for OTP.`,
        user: user.getPublicProfile(),
      });
    } else {
      const token = await user.generateAuthToken();
      res.status(200).json({
        status: "success",
        accessToken: token,
        user: user.getPublicProfile(),
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({
      statusCode: 400,
      status: "error",
      message: e.message,
      data: {},
    });
  }
};

const loginwithotp = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      statusCode: 400,
      status: "error",
      message: "Invalid Password or phoneNumber",
      data: {},
    });
  }

  const { phone, otp, rememberme } = req.body;
  try {
    let user = await User.findOne({
      phone,
      status: 1,
    })
      .populate({ path: "roles", select: "name id role" })
      .populate({ path: "userType", select: "id name user_type" });
    if (!user)
      return res.status(404).json({
        statusCode: 404,
        status: "error",
        message: "User not exists or not verified.",
        data: {},
      });
    let userAuth = await UserAuth.findOne({
      userId: user._id,
    });
    let now = dayjs().toISOString();
    let otpTime = dayjs(userAuth?.otpExpiredTime).toISOString();
    let loginOtp = dayjs().add(7, "day").toISOString();
    if (otp !== "123456") {
      // if (otp !== userAuth.otp) {
      return res.status(400).json({
        statusCode: 400,
        status: "error",
        message: "Incorrect Otp !",
        data: {},
      });
    }
    if (now >= otpTime && otp == "123456") {
      // if (now >= otpTime && otp == userAuth.otp) {
      return res.status(400).json({
        statusCode: 400,
        status: "error",
        message: "Otp Expired!",
        data: {},
      });
    }
    console.log("userAuthExist = ", otp, userAuth, userAuth?.otp, user._id);
    if (otp == userAuth?.otp) {
      if (rememberme == true) {
        await UserAuth.findOneAndUpdate(
          { userId: user._id },
          { otpExpiredTime: now, loginOtp: loginOtp }
        ).exec();
      } else {
        await UserAuth.findOneAndUpdate(
          { userId: user._id },
          { otpExpiredTime: now, loginOtp: now },
          { otpExpiredTime: now, loginOtp: loginOtp }
        ).exec();
      }
      const token = await user.generateAuthToken();
      return res.status(200).json({
        status: "success",
        accessToken: token,
        user: user.getPublicProfile(),
      });
    } else {
      return res.status(404).json({
        statusCode: 404,
        status: "error",
        message: "Failed try again",
        data: {},
      });
    }
  } catch (e) {
    return res.status(500).json({
      statusCode: 400,
      status: "error",
      message: e.message,
      data: {},
    });
  }
};

const resendOTP = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      statusCode: 400,
      status: "error",
      message: "Invalid phoneNumber",
      data: {},
    });
  }
  try {
    let { phone } = req.body;
    let user = await User.findOne({
      phone,
    }).populate("roles", "name id role");
    if (!user)
      return res.status(404).json({
        statusCode: 404,
        status: "error",
        message: "User not exists or not verified.",
        data: {},
      });
    // const otp = otpGenerator.generate(6, {
    //   upperCaseAlphabets: false,
    //   specialChars: false,
    //   lowerCaseAlphabets: false,
    // });
    // msg = `Your AuxOUT login otp is ${otp}`;
    // await TemlpateMessageServiceInstance.sendEmailForOtp(user, msg);
    // let expire = dayjs().add(900, "second").toISOString();
    // await UserAuth.findOneAndUpdate(
    //   { userId: user._id },
    //   {
    //     otp: otp,
    //     otpExpiredTime: expire,
    //     loginResendOTPRetryLimit: 0,
    //   }
    // );
    res.status(200).json({
      status: "success",
      message: `Check your registered email ${user.email} for OTP.`,
      user: user.getPublicProfile(),
    });
  } catch (error) {
    return res.internalServerError({ message: error.message });
  }
};

const verifyUser = async (req, res) => {
  User.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          statusCode: 404,
          status: "error",
          message: "User not exists",
          data: {},
        });
      }
      user.status = 1;
      user.save((err) => {
        if (err) {
          res.status(500).json({
            statusCode: 400,
            status: "error",
            message: err,
            data: {},
          });
        }
      });
      res.status(200).send("Verified Successfully!!");
    })
    .catch((e) => {
      res.status(500).json({
        statusCode: 400,
        status: "error",
        message: e.message,
        data: {},
      });
    });
};

const logout = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const tokens = user.tokens.filter((token) => {
      return token.token !== req.accessToken;
    });

    await User.findByIdAndUpdate(req.user._id, { tokens: tokens }).exec();
    req.user.accessToken = "";

    res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "Logout successfully!",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      status: "error",
      message: error.message,
      data: {},
    });
  }
};
const myAccount = async (req, res) => {
  try {
    const user = req.user;

    if (user.roles?.id === 3) {
      user.createdBy = await model.User.findById(user?.createdBy)
        .select("_id name email phone companyName address roles timeZone")
        .lean()
        .exec()
        .then((data) => {
          return data;
        });
    }

    if (user) {
      res.status(200).json({
        user,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(403).json({
      statusCode: 500,
      status: "error",
      message: error.message || "Logged in session expired please login again",
      data: {},
    });
  }
};
const logInToAnotherAccount = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      statusCode: 400,
      status: "error",
      message: errors.array()[0].msg,
      data: {},
    });
  }
  const secretToken = process.env.SECRET_TOKEN_LOGIN || "aux^9460*out";
  const { email, token } = req.body;
  const decode = jwt.verify(token, secretToken);

  if (decode && decode.email === email) {
    const user = await User.findById(req.user._id);
    const tokens = user.tokens.filter((token) => {
      return token.token !== req.accessToken;
    });

    await User.findByIdAndUpdate(req.user._id, { tokens: tokens }).exec();
    req.user.accessToken = "";

    try {
      let user = await User.findOne({
        email,
      }).populate("roles", "name id");
      if (!user)
        return res.status(404).json({
          statusCode: 404,
          status: "error",
          message: "User not exists or not verified.",
          data: {},
        });

      const accessToken = await user.generateAuthToken();
      res.status(200).json({
        status: "success",
        accessToken: accessToken,
        user: user.getPublicProfile(),
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        statusCode: 400,
        status: "error",
        message: e.message,
        data: {},
      });
    }
  } else {
    return res.status(401).json({
      statusCode: 401,
      status: "error",
      message: "Auth Error",
      data: {},
    });
  }
};
const updateAccount = async (req, res) => {
  const { name, phone, email, role, companyName, status, address, about } =
    req.body;

  try {
    const id = req.user._id;
    const findUser = await User.findById(id).lean().exec();
    if (findUser) {
      if (
        email &&
        (await UserServiceInstance.checkEmailExistWithOtherUser(email, id)) ===
          false
      ) {
        return res.status(409).json({
          statusCode: 409,
          message: "Email already exists with other account",
          data: [],
        });
      }
      if (
        phone &&
        (await UserServiceInstance.checkPhoneNumberExistWithOtherUser(
          phone,
          id
        )) === false
      ) {
        return res.status(200).json({
          statusCode: 409,
          message: "Phone Number already exists with other account",
          data: [],
        });
      }
      var updateToBe = {
        name,
        email,
        phone,
        email,
        status,
        companyName,
        address,
        about,
      };

      if (role && findUser.roles.id !== role) {
        const roles = await model.Role.find({
          id: role,
        }).exec();
        updateToBe.roles = roles.map((role) => role._id);
      }

      if (status && Number(status) === 0) {
        updateToBe.tokens = [];
      }

      await User.findByIdAndUpdate(id, updateToBe, {
        new: true,
        runValidators: true,
      })
        .select(
          "_id name email phone address about companyName status createdAt"
        )
        .populate("roles", "id name")
        .then(async (response) => {
          //// update sip user
          const updateSipUserData = {
            username: findUser?.phone,
            name: name,
            email: email,
            phone: phone,
          };

          updateSipUser(updateSipUserData);

          res.status(200).json({
            statusCode: 200,
            data: response,
            message: "User updated successfully",
          });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({
            statusCode: 500,
            data: {},
            message: "There is an error",
          });
        });
    } else {
      return res.status(404).json({
        statusCode: 404,
        message: "User Not Exists",
        data: [],
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message:
        error.message ||
        `Some error occurred while updating user with id: ${id}`,
    });
  }
};
module.exports = {
  signup: signup,
  login: login,
  loginwithotp: loginwithotp,
  resendOTP: resendOTP,
  logout: logout,
  verifyUser: verifyUser,
  myAccount: myAccount,
  logInToAnotherAccount: logInToAnotherAccount,
  updateAccount: updateAccount,
};
