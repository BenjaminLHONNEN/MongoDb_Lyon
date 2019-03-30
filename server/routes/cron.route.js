const request = require("request");
const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const cronController = require('../controllers/cron.controller');

const router = express.Router();
module.exports = router;


router.get("/velov", asyncHandler(getVelov));
router.get("/district", asyncHandler(getDistrict));
router.get("/touristicArea", asyncHandler(getTouristicAreaUrl));

const urlConstants = {
  VelovUrl: "https://download.data.grandlyon.com/wfs/rdata?SERVICE=WFS&VERSION=2.0.0&outputformat=GEOJSON&request=GetFeature&typename=jcd_jcdecaux.jcdvelov&SRSNAME=urn:ogc:def:crs:EPSG::4171",
  DistrictUrl:"https://download.data.grandlyon.com/wfs/grandlyon?SERVICE=WFS&VERSION=2.0.0&outputformat=GEOJSON&request=GetFeature&typename=adr_voie_lieu.adrquartier&SRSNAME=urn:ogc:def:crs:EPSG::4171",
  TouristicAreaUrl:"https://download.data.grandlyon.com/wfs/rdata?SERVICE=WFS&VERSION=2.0.0&outputformat=GEOJSON&request=GetFeature&typename=sit_sitra.sittourisme&SRSNAME=urn:ogc:def:crs:EPSG::4171",
};

async function getDistrict(req, res){
  await cronController.dropDistrict();
  await cronController.makeIndexDistrict();
  getJSON({
    uri: urlConstants.DistrictUrl,
    method: "GET",
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10,
    headers: {
      'Content-Type': 'application/json'
    }
  }, async function (error, response, body) {
    let data = JSON.parse(body);
    for (let o of data.features) {
      delete o.type;
      await cronController.insertDistrict(o);
    }
    res.send(200);
  })
}
async function getTouristicAreaUrl(req, res){
  await cronController.dropTouristicArea();
  await cronController.makeIndexTouristicArea();
  getJSON({
    uri: urlConstants.TouristicAreaUrl,
    method: "GET",
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10,
    headers: {
      'Content-Type': 'application/json'
    }
  }, async function (error, response, body) {
    let data = JSON.parse(body);
    for (let o of data.features) {
      delete o.type;
      await cronController.insertTouristicArea(o);
    }
    res.send(200);
  })

}

async function getVelov(req, res) {
  await cronController.dropVelov();
  await cronController.makeIndexVelov();
  getJSON({
    uri: urlConstants.VelovUrl,
    method: "GET",
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10,
    headers: {
      'Content-Type': 'application/json'
    }
  }, async function (error, response, body) {
    let data = JSON.parse(body);
    for (let o of data.features) {
      delete o.type;
      await cronController.insertVelov(o);
    }
    res.send(200);
  })
}

/**
 * getJSON:  RESTful GET request returning JSON object(s)
 * @param options: http options object
 * @param onResult: callback to pass the results JSON object(s) back
 */
function getJSON(options, onResult) {
  request(options, onResult);
}
