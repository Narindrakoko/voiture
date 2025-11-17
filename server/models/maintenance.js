const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Maintenance = sequelize.define('Maintenance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
  fournisseurId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Fournisseurs',
      key: 'id'
    }
  },
  typeMaintenance: {
    type: DataTypes.ENUM('preventive', 'corrective', 'revision', 'reparation'),
    allowNull: false
  },
  montant: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  dateMaintenance: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  statut: {
    type: DataTypes.ENUM('en_cours', 'termine'),
    allowNull: false,
    defaultValue: 'en_cours'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

// Synchroniser le modèle avec la base de données
sequelize.sync();

module.exports = Maintenance;
