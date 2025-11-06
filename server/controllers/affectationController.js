const affectationService = require('../services/affectationService');

class AffectationController {
    async getAllAffectations(req, res) {
        try {
            const affectations = await affectationService.getAllAffectations();
            res.json(affectations);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAffectationById(req, res) {
        try {
            const affectation = await affectationService.getAffectationById(req.params.id);
            if (!affectation) {
                return res.status(404).json({ message: 'Affectation non trouvée' });
            }
            res.json(affectation);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createAffectation(req, res) {
        try {
            const affectation = await affectationService.createAffectation(req.body);
            res.status(201).json(affectation);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateAffectation(req, res) {
        try {
            const affectation = await affectationService.updateAffectation(req.params.id, req.body);
            res.json(affectation);
        } catch (error) {
            if (error.message === 'Affectation non trouvée') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(400).json({ error: error.message });
            }
        }
    }

    async deleteAffectation(req, res) {
        try {
            const result = await affectationService.deleteAffectation(req.params.id);
            res.json(result);
        } catch (error) {
            if (error.message === 'Affectation non trouvée') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async getAffectationsByVehicule(req, res) {
        try {
            const affectations = await affectationService.getAffectationsByVehicule(req.params.vehiculeId);
            res.json(affectations);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getAffectationsByChauffeur(req, res) {
        try {
            const affectations = await affectationService.getAffectationsByChauffeur(req.params.chauffeurId);
            res.json(affectations);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new AffectationController();
