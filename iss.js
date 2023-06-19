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

const fetchCoordsByIP = (ip, callback) => {
  const url = `http://ipwho.is/${ip}`;
  //use request to fetch coordinates from ipwhois API
  request(url, (error, response, body) => {
    // on error, pass to callback
    if (error) {
      callback(error, null);
      return;
      // if non-200 status, assume server error and pass error to callback
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when attempting to fetch ip coordinates.`;
      callback(Error(msg), null);
      return;
      // if successful, pass coordinates to callback
    } else if (response.statusCode === 200) {
      const data = JSON.parse(body);
      if (!data.success) {
        callback("IP address not found", null);
        return;
      }
      const latitude = data.latitude;
      const longitude = data.longitude;
      const coordinates = {
        latitude,
        longitude,
      };
      callback(null, coordinates);
    }
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };
