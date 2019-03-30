const mongoose = require('mongoose');

const TouristicAreaSchema = new mongoose.Schema({
  "properties": {
    "id": String,
    "id_sitra1": String,
    type: { type: String },
    "type_detail": {type: String, required: false, default: null},
    "nom": String,
    "adresse": String,
    "codepostal": String,
    "commune": String,
    "telephone": String,
    "fax": {type: String, required: false, default: null},
    "telephonefax": {type: String, required: false, default: null},
    "email": String,
    "siteweb": String,
    "facebook": {type: String, required: false, default: null},
    "classement": {type: String, required: false, default: null},
    "ouverture": {type: String, required: false, default: null},
    "tarifsenclair": {type: String, required: false, default: null},
    "tarifsmin": {type: String, required: false, default: null},
    "tarifsmax": {type: String, required: false, default: null},
    "producteur": String,
    "gid": String,
    "date_creation": Date,
    "last_update": Date,
    "last_update_fme": Date
  },
  "geometry": {
    type: { type: String },
    "coordinates": [Number]
  }
}, {
  versionKey: false
});

TouristicAreaSchema.index({ geometry: "2dsphere" });

module.exports = mongoose.model('TouristicArea', TouristicAreaSchema);
