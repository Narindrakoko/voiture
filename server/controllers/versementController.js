const versementService = require('../services/versementService');

class VersementController {
    async getAllVersements(req, res) {
        try {
            const versements = await versementService.getAllVersements();
            res.json(versements);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getVersementById(req, res) {
        try {
            const versement = await versementService.getVersementById(req.params.id);
            if (!versement) {
                return res.status(404).json({ message: 'Versement non trouvé' });
            }
            res.json(versement);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createVersement(req, res) {
        try {
            const versement = await versementService.createVersement(req.body);
            res.status(201).json(versement);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateVersement(req, res) {
        try {
            const versement = await versementService.updateVersement(req.params.id, req.body);
            res.json(versement);
        } catch (error) {
            if (error.message === 'Versement non trouvé') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(400).json({ error: error.message });
            }
        }
    }

    async deleteVersement(req, res) {
        try {
            const result = await versementService.deleteVersement(req.params.id);
            res.json(result);
        } catch (error) {
            if (error.message === 'Versement non trouvé') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async getVersementsByVehicule(req, res) {
        try {
            const versements = await versementService.getVersementsByVehicule(req.params.vehiculeId);
            res.json(versements);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getVersementsByChauffeur(req, res) {
        try {
            const versements = await versementService.getVersementsByChauffeur(req.params.chauffeurId);
            res.json(versements);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getVersementsStats(req, res) {
        try {
            const versements = await versementService.getAllVersements();

            const stats = {
                total: 0,
                carburant: 0,
                maintenance: 0,
                reparation: 0
            };

            versements.forEach(v => {
                const montant = parseFloat(v.montant);
                stats.total += montant;
                if (v.type === 'maintenance') {
                    stats.maintenance += montant;
                } else if (v.type === 'carburant') {
                    stats.carburant += montant;
                } else if (v.type === 'reparation') {
                    stats.reparation += montant;
                }
            });

            res.json(stats);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getRevenusByVehicule(req, res) {
        try {
            const revenus = await versementService.getRevenusByVehicule(req.params.vehiculeId);
            res.json(revenus);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getRevenusStats(req, res) {
        try {
            const stats = await versementService.getRevenusStats();
            res.json(stats);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new VersementController();
