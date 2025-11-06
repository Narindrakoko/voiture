const vehiculeService = require('../services/vehiculeService');

class VehiculeController {
    async getAllVehicules(req, res) {
        try {
            const vehicules = await vehiculeService.getAllVehicules();
            res.json(vehicules);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getVehiculeById(req, res) {
        try {
            const vehicule = await vehiculeService.getVehiculeById(req.params.id);
            if (!vehicule) {
                return res.status(404).json({ message: 'Véhicule non trouvé' });
            }
            res.json(vehicule);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createVehicule(req, res) {
        try {
            const vehicule = await vehiculeService.createVehicule(req.body);
            res.status(201).json(vehicule);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateVehicule(req, res) {
        try {
            const vehicule = await vehiculeService.updateVehicule(req.params.id, req.body);
            res.json(vehicule);
        } catch (error) {
            if (error.message === 'Véhicule non trouvé') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(400).json({ error: error.message });
            }
        }
    }

    async deleteVehicule(req, res) {
        try {
            const result = await vehiculeService.deleteVehicule(req.params.id);
            res.json(result);
        } catch (error) {
            if (error.message === 'Véhicule non trouvé') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

module.exports = new VehiculeController();
