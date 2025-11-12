// server/server.js
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const vehiculeController = require('./controllers/vehiculeController');
const chauffeurController = require('./controllers/chauffeurController');
const affectationController = require('./controllers/affectationController');
const fournisseurController = require('./controllers/fournisseurController');
const versementController = require('./controllers/versementController');

// Import du seeding

// Importer les associations pour initialiser les relations
require('./models/associations');

// Synchroniser la base de données
const sequelize = require('./database');
sequelize.sync({ force: false }).then(() => {
  console.log('Base de données synchronisée');
}).catch(err => {
  console.error('Erreur lors de la synchronisation de la base de données:', err);
});

// Configuration CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, '../renderer')));

app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Bonjour depuis le backend Express!' });
});

// exemple POST
app.post('/api/echo', (req, res) => {
  res.json({ youSent: req.body });
});

// Routes pour la gestion des véhicules
app.get('/api/vehicules', vehiculeController.getAllVehicules);
app.get('/api/vehicules/:id', vehiculeController.getVehiculeById);
app.post('/api/vehicules', vehiculeController.createVehicule);
app.put('/api/vehicules/:id', vehiculeController.updateVehicule);
app.delete('/api/vehicules/:id', vehiculeController.deleteVehicule);

// Routes pour la gestion des chauffeurs
app.get('/api/chauffeurs', chauffeurController.getAllChauffeurs);
app.get('/api/chauffeurs/:id', chauffeurController.getChauffeurById);
app.post('/api/chauffeurs', chauffeurController.createChauffeur);
app.put('/api/chauffeurs/:id', chauffeurController.updateChauffeur);
app.delete('/api/chauffeurs/:id', chauffeurController.deleteChauffeur);

// Routes pour la gestion des affectations
app.get('/api/affectations', affectationController.getAllAffectations);
app.get('/api/affectations/:id', affectationController.getAffectationById);
app.post('/api/affectations', affectationController.createAffectation);
app.put('/api/affectations/:id', affectationController.updateAffectation);
app.delete('/api/affectations/:id', affectationController.deleteAffectation);
app.get('/api/affectations/vehicule/:vehiculeId', affectationController.getAffectationsByVehicule);
app.get('/api/affectations/chauffeur/:chauffeurId', affectationController.getAffectationsByChauffeur);

// Routes pour la gestion des fournisseurs
app.get('/api/fournisseurs', fournisseurController.getAllFournisseurs);
app.get('/api/fournisseurs/:id', fournisseurController.getFournisseurById);
app.post('/api/fournisseurs', fournisseurController.createFournisseur);
app.put('/api/fournisseurs/:id', fournisseurController.updateFournisseur);
app.delete('/api/fournisseurs/:id', fournisseurController.deleteFournisseur);

// Routes pour la gestion des versements
app.get('/api/versements/stats', versementController.getVersementsStats); // Mettre stats en premier
app.get('/api/versements/revenus/stats', versementController.getRevenusStats);
app.get('/api/versements/vehicule/:vehiculeId', versementController.getVersementsByVehicule);
app.get('/api/versements/chauffeur/:chauffeurId', versementController.getVersementsByChauffeur);
app.get('/api/versements', versementController.getAllVersements);
app.get('/api/versements/:id', versementController.getVersementById);
app.post('/api/versements', versementController.createVersement);
app.put('/api/versements/:id', versementController.updateVersement);
app.delete('/api/versements/:id', versementController.deleteVersement);

app.listen(port, async () => {
  console.log(`API server listening at http://localhost:${port}`);
});
