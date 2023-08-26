const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const auth = require("../../middleware/auth");
const AuthController = require("../../controllers/auth/auth.controller");

/**
 * @param - Object
 * @method - POST
 */

router.post(
  "/signup",
  [
    check("name", "Please Enter a Valid First Name").not().isEmpty(),
    check("phone", "Please Enter a Valid Phone Number").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 8,
    }),
  ],
  AuthController.signup
);

router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 8,
    }),
  ],
  AuthController.login
);

router.post(
  "/login_with_otp",
  [
    check("phone", "Please Enter a Valid Phone Number").not().isEmpty(),
    check("otp", "Please enter a valid otp").isLength({
      min: 6,
    }),
  ],
  AuthController.loginwithotp
);

router.post(
  "/resend_otp",
  [check("phone", "Please Enter a Valid Phone Number").not().isEmpty()],
  AuthController.resendOTP
);

router.get("/confirm/:confirmationCode", AuthController.verifyUser);

router.all("/logout", auth, AuthController.logout);
router.get("/my-account", auth, AuthController.myAccount);
router.put("/update-account", auth, AuthController.updateAccount);
router.post(
  "/master-login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("token", "Please enter a valid password or token").isLength({
      min: 8,
    }),
  ],
  auth,
  AuthController.logInToAnotherAccount
);
module.exports = router;
