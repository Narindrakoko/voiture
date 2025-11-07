const fournisseurService = require('../services/fournisseurService');

class FournisseurController {
    async getAllFournisseurs(req, res) {
        try {
            const fournisseurs = await fournisseurService.getAllFournisseurs();
            res.json(fournisseurs);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getFournisseurById(req, res) {
        try {
            const fournisseur = await fournisseurService.getFournisseurById(req.params.id);
            if (!fournisseur) {
                return res.status(404).json({ message: 'Fournisseur non trouvé' });
            }
            res.json(fournisseur);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createFournisseur(req, res) {
        try {
            const fournisseur = await fournisseurService.createFournisseur(req.body);
            res.status(201).json(fournisseur);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateFournisseur(req, res) {
        try {
            const fournisseur = await fournisseurService.updateFournisseur(req.params.id, req.body);
            res.json(fournisseur);
        } catch (error) {
            if (error.message === 'Fournisseur non trouvé') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(400).json({ error: error.message });
            }
        }
    }

    async deleteFournisseur(req, res) {
        try {
            const result = await fournisseurService.deleteFournisseur(req.params.id);
            res.json(result);
        } catch (error) {
            if (error.message === 'Fournisseur non trouvé') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

module.exports = new FournisseurController();
