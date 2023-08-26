const jwt = require("jsonwebtoken");
const User = require("../model/auth/User");
const AdminSetting = require("../model/auth/AdminSetting");
const AgentSetting = require("../model/auth/AgentSetting");

module.exports = function (resource) {
    return async (req, res, next) => {
        try {
            const token = req.header("Authorization").replace("Bearer ", "");
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findOne({ _id: decoded._id, "tokens.token": token })
                .select(
                    "_id name email phone address companyName status createdBy createdAt"
                )
                .populate({
                    path: "roles",
                    select: "id name",
                })
            if (user.roles.name == "Master Admin") {
                next();
            }
            if (user.roles.name == "Admin") {
                const adminDetails = await AdminSetting.findOne({ adminId: user._id })
                    .select(
                        "sidebarPermission"
                    )
                if (adminDetails?.sidebarPermission[resource] == true) {
                    next();
                } else {
                    return res.status(401).json({
                        error: "You don't have enough permission to perform this action",
                        message: "You don't have enough permission to perform this action",
                    });
                }
            }
            if (user.roles.name == "Agent") {
                const agentDetails = await AgentSetting.findOne({ adminId: user._id })
                    .select(
                        "sidebarPermission"
                    )
                if (agentDetails?.sidebarPermission[resource] == true) {
                    next();
                } else {
                    return res.status(401).json({
                        error: "You don't have enough permission to perform this action",
                        message: "You don't have enough permission to perform this action",
                    });
                }
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
};
