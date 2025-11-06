const Chauffeur = require('./chauffeur');
const Vehicule = require('./vehicule');
const Affectation = require('./affectation');

// Définir les associations
Chauffeur.hasMany(Affectation, { foreignKey: 'chauffeurId', as: 'affectations' });
Affectation.belongsTo(Chauffeur, { foreignKey: 'chauffeurId', as: 'chauffeur' });

Vehicule.hasMany(Affectation, { foreignKey: 'vehiculeId', as: 'affectations' });
Affectation.belongsTo(Vehicule, { foreignKey: 'vehiculeId', as: 'vehicule' });



module.exports = {
  Chauffeur,
  Vehicule,
  Affectation,
  
};
