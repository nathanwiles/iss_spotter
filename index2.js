// Created by: Nathan Wiles
// Part of ISS Spotter With Promises project

const { fetchMyIP } = require("./iss_promised");

fetchMyIP()
.then((data) => {console.log(data)}, (error) => {console.log(error)});
