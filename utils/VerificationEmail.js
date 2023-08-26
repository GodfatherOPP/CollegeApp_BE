require("dotenv").config({ path: "./config.env" });
const nodemailer = require("../config/nodemailer.config");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const template = "./template/Verification.hbs";
const Agenttemplate = "./template/VerificationAgent.hbs";
const Repotemplate = "./template/RepoCompany.hbs";

const sendVerificationEmail = (userName, email, code) => {
  try {
    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);

    const options = () => {
      return {
        from: process.env.FROM_EMAIL || "harshsinghrathorr@gmail.com",
        to: email,
        subject: "Welcome to AuxDRIVE - Your Dealership Automation System",
        html: compiledTemplate({
          name: userName,
          confirmationCode: code,
          hostname: process.env.SELFURL,
        }),
      };
    };

    nodemailer.transport.sendMail(options(), (error, info) => {
      if (error) {
        console.log(error);
        return error;
      } else {
        console.log(info);

        return info;
      }
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const sendVerificationEmailForAgent = (userName, email, code, companyName) => {
  try {
    const source = fs.readFileSync(path.join(__dirname, Agenttemplate), "utf8");
    const compiledTemplate = handlebars.compile(source);

    const options = () => {
      return {
        from: process.env.FROM_EMAIL || "rahuls@auxpay.net",
        to: email,
        subject: `Welcome to ${companyName} - Your Dealership Automation System`,
        html: compiledTemplate({
          name: userName,
          confirmationCode: code,
          hostname: process.env.SELFURL,
          company: companyName,
        }),
      };
    };

    nodemailer.transport.sendMail(options(), (error, info) => {
      if (error) {
        console.log(error);
        return error;
      } else {
        console.log(info);

        return info;
      }
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

const sendEmailToCompany = (
  companyName,
  email,
  make,
  useremail,
  username,
  LocationOne,
  LocationTwo
) => {
  try {
    const source = fs.readFileSync(path.join(__dirname, Repotemplate), "utf8");
    const compiledTemplate = handlebars.compile(source);

    const options = () => {
      return {
        from: useremail || process.env.FROM_EMAIL,
        to: email,
        subject: `Urgent Repossession Order for ${make} Vehicle `,
        html: compiledTemplate({
          company: companyName,
          name: username,
          pdfone: LocationOne,
          pdftwo: LocationTwo,
        }),
      };
    };

    nodemailer.transport.sendMail(options(), (error, info) => {
      if (error) {
        console.log(error);
        return error;
      } else {
        console.log(info);

        return info;
      }
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
  sendVerificationEmail,
  sendVerificationEmailForAgent,
  sendEmailToCompany,
};
