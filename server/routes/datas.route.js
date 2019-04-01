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
  res.json(await cronController.getAllVelovNear(req.params.long, req.params.latt, req.params.distance));
}
async function getDistrictNear(req, res){
  res.json(await cronController.getAllDistrictNear(req.params.long, req.params.latt, req.params.distance));
}
async function getTouristicAreaUrlNear(req, res){
  res.json(await cronController.getAllTouristicAreaNear(req.params.long, req.params.latt, req.params.distance));
}
