const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes} = require("./iss");

/* test code
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log("It worked! Returned IP:", ip);


});


fetchCoordsByIP("9", (error, data) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  } else {
    console.log("It worked! Returned coordinates:", data);
  }
});

*/

fetchISSFlyOverTimes({ latitude: "49.27670", longitude: "-123.13000" }, (error, data) => {
if (error) {
  console.log("It didn't work!", error);
  return;
} else {
  console.log("It worked! Returned flyover times:", () => {
    for (const i in data) {
      return data[i];
    }
  });
}

});