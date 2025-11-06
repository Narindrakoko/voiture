const chauffeurService = require('../services/chauffeurService');

class ChauffeurController {
    async getAllChauffeurs(req, res) {
        try {
            const chauffeurs = await chauffeurService.getAllChauffeurs();
            res.json(chauffeurs);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getChauffeurById(req, res) {
        try {
            const chauffeur = await chauffeurService.getChauffeurById(req.params.id);
            if (!chauffeur) {
                return res.status(404).json({ message: 'Chauffeur non trouvé' });
            }
            res.json(chauffeur);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createChauffeur(req, res) {
        try {
            const chauffeur = await chauffeurService.createChauffeur(req.body);
            res.status(201).json(chauffeur);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateChauffeur(req, res) {
        try {
            const chauffeur = await chauffeurService.updateChauffeur(req.params.id, req.body);
            res.json(chauffeur);
        } catch (error) {
            if (error.message === 'Chauffeur non trouvé') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(400).json({ error: error.message });
            }
        }
    }

    async deleteChauffeur(req, res) {
        try {
            const result = await chauffeurService.deleteChauffeur(req.params.id);
            res.json(result);
        } catch (error) {
            if (error.message === 'Chauffeur non trouvé') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

module.exports = new ChauffeurController();
