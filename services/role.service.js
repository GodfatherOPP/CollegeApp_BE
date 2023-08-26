const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function () {
  ac.grant("agent").readOwn("profile").updateOwn("profile");

  ac.grant("admin")
    .extend("agent")
    .createAny("profile")
    .readAny("profile")
    .updateAny("profile")
    .deleteAny("profile")
    .createOwn("template")
    .readOwn("template")
    .updateOwn("template")
    .deleteOwn("template");
  ac.grant("masterAdmin")
    .extend("agent")
    .extend("admin")
    .createAny("profile")
    .updateAny("profile")
    .deleteAny("profile");

  return ac;
})();
