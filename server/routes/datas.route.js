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


router.get("/velov", asyncHandler(getAllVelov));
router.get("/district", asyncHandler(getAllDistrict));
router.get("/touristicArea", asyncHandler(getAllTouristicAreaUrl));

async function getAllVelov(req, res) {
  res.json(await cronController.getAllVelov());
}
async function getAllDistrict(req, res){
  res.json(await cronController.getAllDistrict());
}
async function getAllTouristicAreaUrl(req, res){
  res.json(await cronController.getAllTouristicArea());
}


router.get("/velov/:gid", asyncHandler(getVelov));
router.get("/district/:gid", asyncHandler(getDistrict));
router.get("/touristicArea/:gid", asyncHandler(getTouristicAreaUrl));

async function getVelov(req, res) {
  res.json(await VelovSequelize.findOne({
    where: {gid: req.params.gid}
  }));
}
async function getDistrict(req, res){
  res.json(await DistrictSequelize.findOne({
    where: {gid: req.params.gid}
  }));
}
async function getTouristicAreaUrl(req, res){
  res.json(await TouristicAreaSequelize.findOne({
    where: {gid: req.params.gid}
  }));
}


router.get("/velov/:long/:latt", asyncHandler(getVelovNear));
router.get("/district/:long/:latt", asyncHandler(getDistrictNear));
router.get("/touristicArea/:long/:latt", asyncHandler(getTouristicAreaUrlNear));

async function getVelovNear(req, res) {
  res.json(await cronController.getAllVelovNear(req.params.long, req.params.latt, req.query.distance));
}
async function getDistrictNear(req, res){
  res.json(await cronController.getAllDistrictNear(req.params.long, req.params.latt, req.query.distance));
}
async function getTouristicAreaUrlNear(req, res){
  res.json(await cronController.getAllTouristicAreaNear(req.params.long, req.params.latt, req.query.distance));
}

router.get("/velov/:nelong/:nelatt/:swlong/:swlatt", asyncHandler(getVelovBetween));
router.get("/district/:nelong/:nelatt/:swlong/:swlatt", asyncHandler(getDistrictBetween));
router.get("/touristicArea/:nelong/:nelatt/:swlong/:swlatt", asyncHandler(getTouristicAreaUrlBetween));

async function getVelovBetween(req, res) {
  res.json(await cronController.getAllVelovBetween(req.params.nelong, req.params.nelatt,req.params.swlong, req.params.swlatt));
}
async function getDistrictBetween(req, res){
  res.json(await cronController.getAllDistrictBetween(req.params.nelong, req.params.nelatt,req.params.swlong, req.params.swlatt));
}
async function getTouristicAreaUrlBetween(req, res){
  res.json(await cronController.getAllTouristicAreaBetween(req.params.nelong, req.params.nelatt,req.params.swlong, req.params.swlatt));
}

router.get("/adress/:search", asyncHandler(searchAdress));
async function searchAdress(req, res) {
  request({
    uri: "https://api-adresse.data.gouv.fr/search/?q=" + req.params.search + "&type=street&limit=5",
    method: "GET",
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10,
    headers: {
      'Content-Type': 'application/json'
    }}, function (error, response, body) {
    res.json(JSON.parse(body));
  });
}
