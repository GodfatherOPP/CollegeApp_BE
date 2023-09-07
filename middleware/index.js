const auth = require("./auth"),
  grantAccess = require("./grantAccess"),
  permissionAccess = require("./permissionAccess");

module.exports = {
  Auth: auth,
  GrantAccess: grantAccess,
  permissionAccess: permissionAccess,
};
