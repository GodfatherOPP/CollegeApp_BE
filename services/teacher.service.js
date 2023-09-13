const model = require("../model");
const Teacher = model.Teacher;
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const key = process.env.CRYPTO_SECRET_KEY;

class TeacherService {
  async checkEmailExistWithOtherTeacher(email, id) {
    try {
      const user = await Teacher.findOne({ email }).lean().exec();

      if (user === null || String(user._id) === String(id)) return true;

      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async checkPhoneNumberExistWithOtherTeacher(phone, id) {
    try {
      const user = await Teacher.findOne({ phone }).lean().exec();
      if (user === null || String(user._id) === String(id)) return true;
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async checkemployeeIDExistWithOtherTeacher(employeeID, id) {
    try {
      const user = await Teacher.findOne({ employeeID }).lean().exec();
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
}
module.exports = TeacherService;
