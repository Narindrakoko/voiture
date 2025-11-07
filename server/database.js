const { Sequelize } = require('sequelize');

// Créer une instance partagée de Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false // Désactiver les logs SQL pour plus de clarté
});

module.exports = sequelize;
