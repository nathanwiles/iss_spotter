// assign request to a variable
const request = require('request');


// function to fetch IP address from API
const fetchMyIP = (callback) => {
  // use request to fetch IP address from ipify API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    // e
    if (error) {
      callback(error.message, null);
      return;
    } else {
      if (response.statusCode === 200) {
        const data = JSON.parse(body);
        const ip = data.ip;
        callback(null, ip)
      }
    };
  });
};

// test code
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log('It worked! Returned IP:', ip);
});

