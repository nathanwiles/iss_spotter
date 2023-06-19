const { fetchMyIP, fetchCoordsByIP} = require("./iss");

/* test code
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log("It worked! Returned IP:", ip);


});
*/

fetchCoordsByIP("9", (error, data) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  } else {
    console.log("It worked! Returned coordinates:", data);
  }
});