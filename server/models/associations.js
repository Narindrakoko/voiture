const sequelize = require('../database');
const Chauffeur = require('./chauffeur');
const Vehicule = require('./vehicule');
const Affectation = require('./affectation');
const Versement = require('./versement');

// Définir les associations
Chauffeur.hasMany(Affectation, { foreignKey: 'chauffeurId', as: 'affectations' });
Affectation.belongsTo(Chauffeur, { foreignKey: 'chauffeurId', as: 'chauffeur' });

Vehicule.hasMany(Affectation, { foreignKey: 'vehiculeId', as: 'affectations' });
Affectation.belongsTo(Vehicule, { foreignKey: 'vehiculeId', as: 'vehicule' });

// Associations pour Versement
Chauffeur.hasMany(Versement, { foreignKey: 'chauffeurId', as: 'versements' });
Versement.belongsTo(Chauffeur, { foreignKey: 'chauffeurId', as: 'chauffeur' });

Vehicule.hasMany(Versement, { foreignKey: 'vehiculeId', as: 'versements' });
Versement.belongsTo(Vehicule, { foreignKey: 'vehiculeId', as: 'vehicule' });

module.exports = {
  Chauffeur,
  Vehicule,
  Affectation,
  Versement
};
