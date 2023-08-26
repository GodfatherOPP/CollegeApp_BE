const { roles } = require("../services/role.service");
const Roles = require("../model/auth/Role");

module.exports = function (action, resource) {
  return async (req, res, next) => {
    try {
      const assignedRole = await Roles.findById(req.user.roles);
      const permission = roles.can(assignedRole.role)[action](resource);

      if (!permission.granted) {
        return res.status(401).json({
          error: "You don't have enough permission to perform this action",
          message: "You don't have enough permission to perform this action",
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
