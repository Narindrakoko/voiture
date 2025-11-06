const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const Affectation = sequelize.define('Affectation', {
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
  dateDebut: {
    type: DataTypes.DATE,
    allowNull: false
  },
  dateFin: {
    type: DataTypes.DATE,
    allowNull: false
  },
  statut: {
    type: DataTypes.ENUM('en_cours', 'terminee', 'annulee'),
    defaultValue: 'en_cours'
  }
});

// Synchroniser le modèle avec la base de données
sequelize.sync();

module.exports = Affectation;
