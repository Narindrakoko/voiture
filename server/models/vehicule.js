const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Vehicule = sequelize.define('Vehicule', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  immatriculation: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  marque: {
    type: DataTypes.STRING,
    allowNull: false
  },
  modele: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateAchat: {
    type: DataTypes.DATE,
    allowNull: false
  },
  kilometrage: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Synchroniser le modèle avec la base de données
sequelize.sync();

module.exports = Vehicule;
