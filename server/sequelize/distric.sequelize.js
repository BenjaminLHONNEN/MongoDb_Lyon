const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const District = sequelize.define('District', {
  "nom": Sequelize.STRING,
  "theme": Sequelize.STRING,
  "soustheme": Sequelize.STRING,
  "identifiant": Sequelize.STRING,
  "idexterne": Sequelize.STRING,
  "siret": Sequelize.STRING,
  "datecreation": Sequelize.DATE,
  "gid": {
    type: Sequelize.INTEGER,
    unique: true
  },
}, {
  // options
});

District.sync();

module.exports = District;
