// server/server.js
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const vehiculeController = require('./controllers/vehiculeController');
const chauffeurController = require('./controllers/chauffeurController');

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

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
