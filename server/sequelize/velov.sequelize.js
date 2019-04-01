const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Velov = sequelize.define('Velov', {
  "number": Sequelize.INTEGER,
  "name": Sequelize.STRING,
  "address": Sequelize.STRING,
  "address2": Sequelize.STRING,
  "commune": Sequelize.STRING,
  "nmarrond": Sequelize.INTEGER,
  "bonus": Sequelize.STRING,
  "pole": Sequelize.STRING,
  "lat": Sequelize.DECIMAL,
  "lng": Sequelize.DECIMAL,
  // "bike_stands": Sequelize.INTEGER,
  // "status": Sequelize.STRING,
  // "available_bike_stands": Sequelize.INTEGER,
  // "availabilitycode": Sequelize.INTEGER,
  // "availability": Sequelize.STRING,
  // "banking": Sequelize.INTEGER,
  "gid": {
    type: Sequelize.INTEGER,
    unique: true
  },
  "last_update": Sequelize.DATE,
  "last_update_fme": Sequelize.DATE,
  "code_insee": Sequelize.STRING,
  "langue": Sequelize.STRING,
  "etat": Sequelize.STRING,
  "nature": Sequelize.STRING,
  "titre": Sequelize.STRING,
  "description": Sequelize.TEXT
}, {
  // options
});

Velov.sync();

module.exports = Velov;
