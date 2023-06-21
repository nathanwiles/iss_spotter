// Created by: Nathan Wiles
// Part of ISS Spotter With Promises project

const { nextISSTimesForMyLocation } = require("./iss_promised");

const printPassTimes = (passTimes) => {
  for (const pass of passTimes) {
    console.log(pass);
  }
};


nextISSTimesForMyLocation()
.then((passTimes) => {
  printPassTimes(passTimes);
})
.catch((error) => {
  console.log("It didn't work: ", error.message);
});

