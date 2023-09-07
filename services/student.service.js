const model = require("../model");
const Student = model.Student;
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const key = process.env.CRYPTO_SECRET_KEY;

class StudentService {
  async checkEmailExistWithOtherStudnet(email, id) {
    try {
      const user = await Student.findOne({ email }).lean().exec();

      if (user === null || String(user._id) === String(id)) return true;

      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async checkPhoneNumberExistWithOtherStudnet(phone, id) {
    try {
      const user = await Student.findOne({ phone }).lean().exec();
      if (user === null || String(user._id) === String(id)) return true;
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async checkStudentIDExistWithOtherStudent(studentID, id) {
    try {
      const user = await Student.findOne({ studentID }).lean().exec();
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
module.exports = StudentService;
