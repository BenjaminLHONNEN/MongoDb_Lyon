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

async function getVelov(req, res) {
  res.json(await cronController.getAllVelov());
}
async function getDistrict(req, res){
  res.json(await cronController.getAllDistrict());
}
async function getTouristicAreaUrl(req, res){
  res.json(await cronController.getAllTouristicArea());
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
