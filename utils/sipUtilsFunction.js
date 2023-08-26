const { default: axios } = require("axios");

/* 
Data Perameter 
{
    "username": "",
    "name": "",
    "email": "",
    "phone": ""
}
*/
const updateSipUser = async (data) => {
  const sip_url_api = process.env.SIP_API_URL;
  let config = {
    headers: {
      Authorization: "Basic YXV4b3V0OlBhc3N3b3JkQEF1eG91dA==",
    },
  };
  try {
    let res = await axios.post(sip_url_api + "update_users", data, config);
    return true;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  updateSipUser,
};
