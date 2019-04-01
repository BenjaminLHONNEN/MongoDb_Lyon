const request = require("request");
const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const cronController = require('../controllers/cron.controller');

const VelovSequelize = require('../sequelize/velov.sequelize');
const DistrictSequelize = require('../sequelize/distric.sequelize');
const TouristicAreaSequelize = require('../sequelize/touristic-site.sequelize');

const router = express.Router();
module.exports = router;


router.get("/velov", asyncHandler(getVelov));
router.get("/district", asyncHandler(getDistrict));
router.get("/touristicArea", asyncHandler(getTouristicAreaUrl));

const urlConstants = {
  VelovUrl: "https://download.data.grandlyon.com/wfs/rdata?SERVICE=WFS&VERSION=2.0.0&outputformat=GEOJSON&request=GetFeature&typename=jcd_jcdecaux.jcdvelov&SRSNAME=urn:ogc:def:crs:EPSG::4171",
  DistrictUrl: "https://download.data.grandlyon.com/wfs/grandlyon?SERVICE=WFS&VERSION=2.0.0&outputformat=GEOJSON&request=GetFeature&typename=adr_voie_lieu.adrquartier&SRSNAME=urn:ogc:def:crs:EPSG::4171",
  TouristicAreaUrl: "https://download.data.grandlyon.com/wfs/rdata?SERVICE=WFS&VERSION=2.0.0&outputformat=GEOJSON&request=GetFeature&typename=sit_sitra.sittourisme&SRSNAME=urn:ogc:def:crs:EPSG::4171",
};

async function getDistrict(req, res) {
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
      await DistrictSequelize.findOne({
        where: {gid: o.properties.gid}
      }).then(async district => {
        if (district) {
          for (let k in o.properties) {
            if (district[k] && district[k] !== o.properties[k]) {
              district[k] = o.properties[k];
            }
          }
          await DistrictSequelize.update(district);
        } else {
          await DistrictSequelize.create(o.properties);
        }
      });
    }
    res.send(200);
  })
}

async function getTouristicAreaUrl(req, res) {
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
      delete o.properties.id;
      await cronController.insertTouristicArea(o);
      console.log(o.properties.ouverture);
      await TouristicAreaSequelize.findOne({
        where: {gid: o.properties.gid}
      }).then(async touristicArea => {
        if (touristicArea) {
          for (let k in o.properties) {
            if (touristicArea[k] && touristicArea[k] !== o.properties[k]) {
              touristicArea[k] = o.properties[k];
            }
          }
          await TouristicAreaSequelize.update(touristicArea);
        } else {
          await TouristicAreaSequelize.create(o.properties);
        }
      });
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
      await VelovSequelize.findOne({
        where: {gid: o.properties.gid}
      }).then(async velov => {
        if (velov) {
          for (let k in o.properties) {
            if (velov[k] && velov[k] !== o.properties[k]) {
              velov[k] = o.properties[k];
            }
          }
          await VelovSequelize.update(velov);
        } else {
          await VelovSequelize.create(o.properties);
        }
      });
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
