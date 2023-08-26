const bcrypt = require("bcryptjs");
const model = require("../model");
const User = model.User;
const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const key = process.env.CRYPTO_SECRET_KEY;

class UserService {
  async checkEmailExistWithOtherUser(email, id) {
    try {
      const user = await User.findOne({ email }).lean().exec();

      if (user === null || String(user._id) === String(id)) return true;

      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async checkPhoneNumberExistWithOtherUser(phone, id) {
    try {
      const user = await User.findOne({ phone }).lean().exec();
      if (user === null || String(user._id) === String(id)) return true;
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  async encryptString(string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(string, salt);
  }

  async isUserAgent(roleId) {
    try {
      const role = await model.Role.findOne({ id: roleId }).lean().exec();
      if (role.role === "agent") return true;
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  async isUserAdmin(roleId) {
    try {
      const role = await model.Role.findOne({ id: roleId }).lean().exec();
      if (role.role === "admin") return true;
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async encryptPassword(password) {
    const iv = crypto.randomBytes(16);
    const ConvertedKey = Buffer.from(key, "hex");
    const cipher = crypto.createCipheriv(algorithm, ConvertedKey, iv);
    let encrypted = cipher.update(password, "utf8", "hex");
    encrypted += cipher.final("hex");
    return { iv: iv.toString("hex"), encryptedPassword: encrypted };
  }

  async decryptPassword(encryptedPassword, iv) {
    const ConvertedKey = Buffer.from(key, "hex");
    const decipher = crypto.createDecipheriv(
      algorithm,
      ConvertedKey,
      Buffer.from(iv, "hex")
    );
    let decrypted = decipher.update(encryptedPassword, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }

  async dealer(user) {
    try {
      if (user.roles.name === 'Admin') {
        return user;
      } else {
        const requestedUser = await model.User
          .findById(user.createdBy)
          .select('_id name email phone status createdBy createdAt')
          .lean()
          .exec();
        return requestedUser;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

module.exports = UserService;
