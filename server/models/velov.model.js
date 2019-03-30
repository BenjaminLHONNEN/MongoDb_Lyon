const mongoose = require('mongoose');

const VelovSchema = new mongoose.Schema({
  "properties": {
    "number": Number,
    "name": String,
    "address": String,
    "address2": {type: String, required: false, default: null},
    "commune": String,
    "nmarrond": Number,
    "bonus": String,
    "pole": String,
    "lat": Number,
    "lng": Number,
    "bike_stands": Number,
    "status": String,
    "available_bike_stands": Number,
    "available_bikes": Number,
    "availabilitycode": Number,
    "availability": String,
    "banking": Number,
    "gid": Number,
    "last_update": Date,
    "last_update_fme": Date,
    "code_insee": String,
    "langue": {type: String, required: false, default: null},
    "etat": {type: String, required: false, default: null},
    "nature": {type: String, required: false, default: null},
    "titre": {type: String, required: false, default: null},
    "description": {type: String, required: false, default: null}
  },
  "geometry": {
    type: { type: String },
    "coordinates": [{
      type: Number,
    }]
  }
}, {
  versionKey: false
});
VelovSchema.index({ geometry: "2dsphere" });

module.exports = mongoose.model('Velov', VelovSchema);
