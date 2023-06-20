// Created by: Nathan Wiles
// Part of ISS Spotter With Promises project

const request = require("request-promise-native");

const ipifyURL = "https://api.ipify.org?format=json";
const ipwhoisURL = "http://ipwho.is/";
const issURL = "https://iss-flyover.herokuapp.com/json/?";

// function to fetch IP address from ipify API
const fetchMyIP = () => {
  return request("https://api.ipify.org?format=json");
};


module.exports = { fetchMyIP };
