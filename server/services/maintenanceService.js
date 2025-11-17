const Maintenance = require('../models/maintenance');
const Chauffeur = require('../models/chauffeur');
const Vehicule = require('../models/vehicule');
const Fournisseur = require('../models/fournisseur');
const versementService = require('./versementService');

// Récupérer toutes les maintenances avec filtres optionnels
const getAllMaintenances = async (filters = {}) => {
  try {
    const whereClause = {};

    if (filters.statut) {
      whereClause.statut = filters.statut;
    }

    if (filters.typeMaintenance) {
      whereClause.typeMaintenance = filters.typeMaintenance;
    }

    if (filters.vehiculeId) {
      whereClause.vehiculeId = filters.vehiculeId;
    }

    if (filters.chauffeurId) {
      whereClause.chauffeurId = filters.chauffeurId;
    }

    if (filters.fournisseurId) {
      whereClause.fournisseurId = filters.fournisseurId;
    }

    const maintenances = await Maintenance.findAll({
      where: whereClause,
      include: [
        { model: Vehicule, as: 'vehicule' },
        { model: Chauffeur, as: 'chauffeur' },
        { model: Fournisseur, as: 'fournisseur' }
      ],
      order: [['dateMaintenance', 'DESC']]
    });

    return maintenances;
  } catch (error) {
    console.error('Erreur dans le service getAllMaintenances:', error);
    throw error;
  }
};

// Créer une nouvelle maintenance
const createMaintenance = async (maintenanceData) => {
  try {
    // Validation des données
    if (!maintenanceData.vehiculeId || !maintenanceData.chauffeurId || !maintenanceData.fournisseurId || !maintenanceData.typeMaintenance || !maintenanceData.montant) {
      throw new Error('Tous les champs requis doivent être remplis');
    }

    const maintenance = await Maintenance.create(maintenanceData);

    // Créer automatiquement un versement pour cette maintenance
    const versementData = {
      montant: maintenance.montant,
      type: 'maintenance',
      vehiculeId: maintenance.vehiculeId,
      chauffeurId: maintenance.chauffeurId,
      description: maintenance.description || `Maintenance ${maintenance.typeMaintenance}`,
      dateVersement: maintenance.dateMaintenance
    };
    await versementService.createVersement(versementData);

    return await Maintenance.findByPk(maintenance.id, {
      include: [
        { model: Vehicule, as: 'vehicule' },
        { model: Chauffeur, as: 'chauffeur' },
        { model: Fournisseur, as: 'fournisseur' }
      ]
    });
  } catch (error) {
    console.error('Erreur dans le service createMaintenance:', error);
    throw error;
  }
};

// Mettre à jour une maintenance
const updateMaintenance = async (id, maintenanceData) => {
  try {
    const maintenance = await Maintenance.findByPk(id);
    if (!maintenance) {
      throw new Error('Maintenance non trouvée');
    }

    // Si le montant change, mettre à jour le versement correspondant
    if (maintenanceData.montant && maintenanceData.montant !== maintenance.montant) {
      // Trouver le versement lié à cette maintenance
      const Versement = require('../models/versement');
      const versement = await Versement.findOne({
        where: {
          vehiculeId: maintenance.vehiculeId,
          chauffeurId: maintenance.chauffeurId,
          type: 'maintenance',
          dateVersement: maintenance.dateMaintenance
        }
      });
      if (versement) {
        await versement.update({ montant: maintenanceData.montant });
      }
    }

    await maintenance.update(maintenanceData);
    return await Maintenance.findByPk(id, {
      include: [
        { model: Vehicule, as: 'vehicule' },
        { model: Chauffeur, as: 'chauffeur' },
        { model: Fournisseur, as: 'fournisseur' }
      ]
    });
  } catch (error) {
    console.error('Erreur dans le service updateMaintenance:', error);
    throw error;
  }
};

// Supprimer une maintenance
const deleteMaintenance = async (id) => {
  try {
    const maintenance = await Maintenance.findByPk(id);
    if (!maintenance) {
      throw new Error('Maintenance non trouvée');
    }

    // Supprimer le versement correspondant
    const Versement = require('../models/versement');
    const versement = await Versement.findOne({
      where: {
        vehiculeId: maintenance.vehiculeId,
        chauffeurId: maintenance.chauffeurId,
        type: 'maintenance',
        dateVersement: maintenance.dateMaintenance
      }
    });
    if (versement) {
      await versement.destroy();
    }

    await maintenance.destroy();
    return { message: 'Maintenance supprimée avec succès' };
  } catch (error) {
    console.error('Erreur dans le service deleteMaintenance:', error);
    throw error;
  }
};

// Récupérer les statistiques des maintenances
const getMaintenanceStats = async () => {
  try {
    const stats = await Maintenance.findAll({
      attributes: [
        'statut',
        [Maintenance.sequelize.fn('COUNT', Maintenance.sequelize.col('id')), 'count'],
        [Maintenance.sequelize.fn('SUM', Maintenance.sequelize.col('montant')), 'totalMontant']
      ],
      group: ['statut']
    });

    const result = {
      total: 0,
      en_cours: 0,
      termine: 0,
      totalMontant: 0,
      montantEnCours: 0,
      montantTermine: 0
    };

    stats.forEach(stat => {
      const count = parseInt(stat.dataValues.count);
      const montant = parseFloat(stat.dataValues.totalMontant) || 0;

      result.total += count;
      result[stat.statut] = count;

      result.totalMontant += montant;
      if (stat.statut === 'en_cours') {
        result.montantEnCours = montant;
      } else if (stat.statut === 'termine') {
        result.montantTermine = montant;
      }
    });

    return result;
  } catch (error) {
    console.error('Erreur dans le service getMaintenanceStats:', error);
    throw error;
  }
};

module.exports = {
  getAllMaintenances,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
  getMaintenanceStats
};
