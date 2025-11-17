const maintenanceService = require('../services/maintenanceService');

// Récupérer toutes les maintenances
const getAllMaintenances = async (req, res) => {
  try {
    const maintenances = await maintenanceService.getAllMaintenances();
    res.json(maintenances);
  } catch (error) {
    console.error('Erreur lors de la récupération des maintenances:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Récupérer une maintenance par ID
const getMaintenanceById = async (req, res) => {
  try {
    const maintenance = await maintenanceService.getMaintenanceById(req.params.id);
    if (!maintenance) {
      return res.status(404).json({ error: 'Maintenance non trouvée' });
    }
    res.json(maintenance);
  } catch (error) {
    console.error('Erreur lors de la récupération de la maintenance:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Créer une nouvelle maintenance
const createMaintenance = async (req, res) => {
  try {
    const maintenance = await maintenanceService.createMaintenance(req.body);
    res.status(201).json(maintenance);
  } catch (error) {
    console.error('Erreur lors de la création de la maintenance:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Mettre à jour une maintenance
const updateMaintenance = async (req, res) => {
  try {
    const maintenance = await maintenanceService.updateMaintenance(req.params.id, req.body);
    res.json(maintenance);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la maintenance:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Supprimer une maintenance
const deleteMaintenance = async (req, res) => {
  try {
    const result = await maintenanceService.deleteMaintenance(req.params.id);
    res.json(result);
  } catch (error) {
    console.error('Erreur lors de la suppression de la maintenance:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Récupérer les maintenances par véhicule
const getMaintenancesByVehicule = async (req, res) => {
  try {
    const maintenances = await maintenanceService.getAllMaintenances({ vehiculeId: req.params.vehiculeId });
    res.json(maintenances);
  } catch (error) {
    console.error('Erreur lors de la récupération des maintenances par véhicule:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Récupérer les maintenances par chauffeur
const getMaintenancesByChauffeur = async (req, res) => {
  try {
    const maintenances = await maintenanceService.getAllMaintenances({ chauffeurId: req.params.chauffeurId });
    res.json(maintenances);
  } catch (error) {
    console.error('Erreur lors de la récupération des maintenances par chauffeur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Récupérer les maintenances par fournisseur
const getMaintenancesByFournisseur = async (req, res) => {
  try {
    const maintenances = await maintenanceService.getAllMaintenances({ fournisseurId: req.params.fournisseurId });
    res.json(maintenances);
  } catch (error) {
    console.error('Erreur lors de la récupération des maintenances par fournisseur:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Récupérer les statistiques des maintenances
const getMaintenanceStats = async (req, res) => {
  try {
    const stats = await maintenanceService.getMaintenanceStats();
    res.json(stats);
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques de maintenance:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

module.exports = {
  getAllMaintenances,
  getMaintenanceById,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
  getMaintenancesByVehicule,
  getMaintenancesByChauffeur,
  getMaintenancesByFournisseur,
  getMaintenanceStats
};
