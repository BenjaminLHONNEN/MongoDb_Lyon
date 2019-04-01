const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const TouristicSite = sequelize.define('TouristicSite', {
  "id_sitra1": Sequelize.STRING,
  "type": Sequelize.STRING,
  "type_detail": Sequelize.TEXT,
  "nom": Sequelize.STRING,
  "adresse": Sequelize.STRING,
  "codepostal": Sequelize.STRING,
  "commune": Sequelize.STRING,
  "telephone": Sequelize.STRING,
  "fax": Sequelize.STRING,
  "telephonefax": Sequelize.STRING,
  "email": Sequelize.STRING,
  "siteweb": Sequelize.STRING,
  "facebook": Sequelize.STRING,
  "classement": Sequelize.STRING,
  "ouverture": Sequelize.TEXT,
  "tarifsenclair": Sequelize.TEXT,
  "tarifsmin": Sequelize.STRING,
  "tarifsmax": Sequelize.STRING,
  "producteur": Sequelize.STRING,
  "gid": {
    type: Sequelize.INTEGER,
    unique: true
  },
  "date_creation": Sequelize.DATE,
  "last_update": Sequelize.DATE,
  "last_update_fme": Sequelize.DATE
}, {
  // options
});

TouristicSite.sync();

module.exports = TouristicSite;
