// Created by: Nathan Wiles
// Part of ISS Spotter With Promises project

const { fetchMyIP, fetchCoordsByIP } = require("./iss_promised");

fetchMyIP()
  .then((body) => fetchCoordsByIP(body))
  .then(
    (data) => {
      console.log(data);
    },
  );
