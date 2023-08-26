const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const DEALER_SOCKET = process.env.DEALER_SOCKET;

class BaseService {
  async regenrateToken(email, institutionId, password) {
    if (email && institutionId && password) {
      return await axios
        .get(`${DEALER_SOCKET}/api/authenticate/GetUserAuthorizationToken`, {
          params: {
            username: email,
            password: password,
            institutionId: institutionId,
          },
        })
        .then((response) => {
          return response.data.Token;
        })
        .catch((error) => {
          return error?.response;
        });
    }
  }

  async idmsResponse(Token) {
    return await axios
    .get(`${DEALER_SOCKET}/api/Account/GetAccountList`, {
      params: {
        Token: Token,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return {
        status: error?.response?.data?.Status,
        message: error.message || `Some error occurred while sending message`,
      };
    });
  }
}

module.exports = BaseService;
