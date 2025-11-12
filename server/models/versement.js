const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Versement = sequelize.define('Versement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  montant: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('carburant', 'maintenance', 'reparation', 'revenu'),
    allowNull: false
  },
  vehiculeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Vehicules',
      key: 'id'
    }
  },
  chauffeurId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Chauffeurs',
      key: 'id'
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  dateVersement: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
});

// Synchroniser le modèle avec la base de données
sequelize.sync();

module.exports = Versement;
