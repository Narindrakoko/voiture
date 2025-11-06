const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const Chauffeur = sequelize.define('Chauffeur', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  adresse: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateEmbauche: {
    type: DataTypes.DATE,
    allowNull: false
  },
  numeroPermis: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
});

// Synchroniser le modèle avec la base de données
sequelize.sync();

module.exports = Chauffeur;
