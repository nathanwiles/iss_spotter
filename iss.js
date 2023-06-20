// assign request to a variable
const request = require("request");

// function to fetch IP address from ipify API
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
// function to fetch coordinates from ipwhois API
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

// function to fetch flyover times from iss-flyover API
const fetchISSFlyOverTimes = (coords, callback) => {
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

// function to fetch next ISS flyover times for my location
const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    // check for error in fetchMyIP
    if (error) {
      console.log("IP fetch didn't work!", error);
      return;
    } else {
      // if no error, fetch coordinates by IP
      console.log("IP fetch successfull");
      fetchCoordsByIP(ip, (error, data) => {
        // check for error in fetchCoordsByIP
        if (error) {
          console.log("It didn't work!", error);
          return;
        } else {
          // if no error, fetch flyover times
          console.log("Coordinates fetch successfull");
          // destructure latitude and longitude from data object
          const { latitude, longitude } = data;
          // pass latitude and longitude to fetchISSFlyOverTimes
          fetchISSFlyOverTimes({ latitude, longitude }, (error, data) => {
            if (error) {
              console.log("It didn't work!", error);
              return;
            } else {
              if (data) {
                console.log("It worked! Returned flyover times:");

                for (const i in data) {
                  console.log(data[i]);
                }
              }
            }
          });
        }
      });
    }
  });
};
// export functions
module.exports = { nextISSTimesForMyLocation };
