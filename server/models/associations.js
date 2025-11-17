const sequelize = require('../database');
const Chauffeur = require('./chauffeur');
const Vehicule = require('./vehicule');
const Fournisseur = require('./fournisseur');
const Affectation = require('./affectation');
const Versement = require('./versement');
const Maintenance = require('./maintenance');

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

// Associations pour Maintenance
Chauffeur.hasMany(Maintenance, { foreignKey: 'chauffeurId', as: 'maintenances' });
Maintenance.belongsTo(Chauffeur, { foreignKey: 'chauffeurId', as: 'chauffeur' });

Vehicule.hasMany(Maintenance, { foreignKey: 'vehiculeId', as: 'maintenances' });
Maintenance.belongsTo(Vehicule, { foreignKey: 'vehiculeId', as: 'vehicule' });

Fournisseur.hasMany(Maintenance, { foreignKey: 'fournisseurId', as: 'maintenances' });
Maintenance.belongsTo(Fournisseur, { foreignKey: 'fournisseurId', as: 'fournisseur' });

module.exports = {
  Chauffeur,
  Vehicule,
  Fournisseur,
  Affectation,
  Versement,
  Maintenance
};
