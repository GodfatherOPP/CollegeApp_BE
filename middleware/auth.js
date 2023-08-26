const jwt = require("jsonwebtoken");
const User = require("../model/auth/User");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded._id, "tokens.token": token })
      .select(
        "_id name email phone address companyName status createdBy createdAt timeZone"
      )
      .populate({
        path: "roles",
        select: "id name",
      })
      .populate({
        path: "userType",
        select: "id name",
      })
      .lean()
      .exec();

    if (!token)
      return res.status(401).json({
        statusCode: 401,
        status: "error",
        message: "Auth Error",
        data: {},
      });
    if (!user)
      return res.status(401).json({
        statusCode: 401,
        status: "error",
        message: "Auth Error",
        data: {},
      });

    req.accessToken = token;
    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    res.status(401).json({
      statusCode: 401,
      status: "error",
      message: "Invalid Token",
      data: {},
    });
  }
};
