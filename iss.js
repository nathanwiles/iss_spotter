// assign request to a variable
const request = require("request");

// function to fetch IP address from API
const fetchMyIP = (callback) => {
  // use request to fetch IP address from ipify API
  request("https://api.ipify.org?format=json", (error, response, body) => {
    // on error, pass error to callback
    if (error) {
      callback(error, null);
      return;
    } else {
      // if non-200 status, assume server error and pass error to callback
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
        callback(Error(msg), null);
        return;
      } else {
        // if successful, pass IP to callback
        const data = JSON.parse(body);
        const ip = data.ip;
        callback(null, ip);
      }
    }
  });
};

const fetchCoordsByIP = (ip, callback) => {};


module.exports = { fetchMyIP, fetchCoordsByIP};
