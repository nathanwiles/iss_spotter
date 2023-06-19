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
      // if data.success is false, pass error message to callback
      if (!data.success) {
        callback("Server Message: " + data.message, null);
        return;
      }
      //specify latitude and longitude and combine into object

      const coordinates = {
        latitude: data.latitude,
        longitude: data.longitude,
      };
      // pass coordinates to callback
      callback(null, coordinates);
    }
  });
};


/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  // build query url and assign to variable
  const latLonQString = "lat=" + coords.latitude + "&lon=" + coords.longitude;
  const url = "https://iss-flyover.herokuapp.com/json/?" + latLonQString;
  // use request to fetch flyover times from iss-flyover API
  request(url, (error, response, body) => {
  // on error, pass to callback
  if (error) {
    callback(error, null);
    return;
  // if non-200 status, assume server error and pass error to callback
  } else if (response.statusCode !== 200) {
    const msg = `Status Code ${response.statusCode} when attempting to fetch flyover times.`;
    callback(Error(msg), null);
    return;
    
  // if successful, pass flyover times to callback
  } else if (response.statusCode === 200) {
    const data = JSON.parse(body);
    const flyoverTimes = data.response;
    callback(null, flyoverTimes);
  }
  });
};
// export functions
module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes};
