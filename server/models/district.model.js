const mongoose = require('mongoose');

const DistrictSchema = new mongoose.Schema({
  "properties": {
    "nom": String,
    "theme": String,
    "soustheme": String,
    "identifiant": String,
    "idexterne": String,
    "siret": String,
    "datecreation": Date,
    "gid": String
  },
  "geometry": {
    type: { type: String },
    "coordinates": [[[Number]]]
  }
}, {
  versionKey: false
});

DistrictSchema.index({ geometry: "2dsphere" });

module.exports = mongoose.model('District', DistrictSchema);
