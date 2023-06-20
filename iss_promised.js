// Created by: Nathan Wiles
// Part of ISS Spotter With Promises project

const request = require("request-promise-native");

const ipifyURL = "https://api.ipify.org?format=json";
const ipwhoisURL = "http://ipwho.is/";
const issURL = "https://iss-flyover.herokuapp.com/json/?";

// function to fetch IP address from ipify API
const fetchMyIP = () => {
  return request(ipifyURL);
};

// function to fetch coordinates from ipwhois API
const fetchCoordsByIP = (body) => {
  const data = JSON.parse(body);
  const ip = data.ip;
  return request(ipwhoisURL + ip);
}

const fetchISSFlyOverTimes = (body) => {
  const data = JSON.parse(body);
  const latitude = data.latitude;
  const longitude = data.longitude;
  return request(issURL + "lat=" + latitude + "&lon=" + longitude);
}


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes};
