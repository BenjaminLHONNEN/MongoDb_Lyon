const Velov = require('../models/velov.model');
const District = require('../models/district.model');
const TouristicArea = require('../models/touristic-site.model');
const mongoose = require('mongoose');

module.exports = {
  insertVelov,
  insertDistrict,
  insertTouristicArea,
  dropVelov,
  dropDistrict,
  dropTouristicArea,
  getAllVelov,
  getAllDistrict,
  getAllTouristicArea,
  getAllVelovNear,
  getAllDistrictNear,
  getAllTouristicAreaNear,
  makeIndexVelov,
  makeIndexDistrict,
  makeIndexTouristicArea,
  getAllVelovBetween,
  getAllDistrictBetween,
  getAllTouristicAreaBetween,
  getNearestVelovNear,
  getNearestTouristicAreaNear
};

async function getAllVelov() {
  return await Velov.find();
}

async function getAllDistrict() {
  return await District.find();
}

async function getAllTouristicArea() {
  return await TouristicArea.find();
}

async function getNearestVelovNear(long, latt, limit = 5) {
  console.log("limit : ", limit);
  return await Velov.find({
    geometry: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [long, latt]
        }
      }
    }
  }).limit(limit);
}

async function getNearestTouristicAreaNear(long, latt, limit = 5) {
  console.log("limit : ", limit);
  return await TouristicArea.find({
    geometry: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [long, latt],
          "distanceField": "distance"
        }
      }
    }
  }).limit(limit);
}

async function getAllVelovNear(long, latt, distance = 1000) {
  console.log(distance);
  return await Velov.find({
    geometry: {
      $near: {
        $maxDistance: distance,
        $geometry: {
          type: "Point",
          coordinates: [long, latt]
        }
      }
    }
  });
}

async function getAllDistrictNear(long, latt, distance = 1000) {
  return await District.find({
    geometry: {
      $near: {
        $maxDistance: distance,
        $geometry: {
          type: "Polygon",
          coordinates: [long, latt]
        }
      }
    }
  });
}

async function getAllTouristicAreaNear(long, latt, distance = 1000) {
  return await TouristicArea.find({
    geometry: {
      $near: {
        $maxDistance: distance,
        $geometry: {
          type: "Point",
          coordinates: [long, latt]
        }
      }
    }
  });
}

async function getAllVelovBetween(nelong, nelatt, swlong, swlatt) {
  return await Velov.find({
    geometry: {
      $geoWithin: {
        $box: [
          [swlong, swlatt],
          [nelong, nelatt]
        ]
      }
    }
  });
}

async function getAllDistrictBetween(nelong, nelatt, swlong, swlatt) {
  return await District.find({
    geometry: {
      $geoIntersects: {
        $geometry: {
          type: "Polygon",
          coordinates: [
            [
              [nelong, nelatt],
              [swlong, nelatt],
              [swlong, swlatt],
              [nelong, swlatt],
              [nelong, nelatt],
            ]
          ]
        }
      }
    }
  });
}

async function getAllTouristicAreaBetween(nelong, nelatt, swlong, swlatt) {
  return await TouristicArea.find({
    geometry: {
      $geoWithin: {
        $box: [
          [swlong, swlatt],
          [nelong, nelatt]
        ]
      }
    }
  });
}

async function insertVelov(velov) {
  return await new Velov(velov).save();
}

async function insertDistrict(district) {
  return await new District(district).save();
}

async function insertTouristicArea(touristicArea) {
  return await new TouristicArea(touristicArea).save();
}

async function makeIndexVelov() {
}

async function makeIndexDistrict() {
}

async function makeIndexTouristicArea() {
}

async function dropVelov() {
  await mongoose.connection.collections['velovs'].drop(function (err) {
    console.log('velovs collection dropped');
  });
}

async function dropDistrict() {
  await mongoose.connection.collections['districts'].drop(function (err) {
    console.log('districts collection dropped');
  });
}

async function dropTouristicArea() {
  await mongoose.connection.collections['touristicareas'].drop(function (err) {
    console.log('touristicareas collection dropped');
  });
}
