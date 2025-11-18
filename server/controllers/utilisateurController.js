//utilisateurController.js//

const utilisateurService = require('../services/utilisateurServices');

class UtilisateurController {

    async getAllUtilisateurs(req, res) {
        try {
            const utilisateurs = await utilisateurService.getAllUtilisateurs();
            res.json(utilisateurs);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getUtilisateurById(req, res) {
        try {
            const utilisateur = await utilisateurService.getUtilisateurById(req.params.id);
            if (!utilisateur) {
                return res.status(404).json({ message: 'Utilisateur non trouvé' });
            }
            res.json(utilisateur);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createUtilisateur(req, res) {
        try {
            const utilisateur = await utilisateurService.createUtilisateur(req.body);
            res.status(201).json(utilisateur);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateUtilisateur(req, res) {
        try {
            const utilisateur = await utilisateurService.updateUtilisateur(req.params.id, req.body);
            res.json(utilisateur);
        } catch (error) {
            if (error.message === 'Utilisateur non trouvé') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(400).json({ error: error.message });
            }
        }
    }

    async deleteUtilisateur(req, res) {
        try {
            const result = await utilisateurService.deleteUtilisateur(req.params.id);
            res.json(result);
        } catch (error) {
            if (error.message === 'Utilisateur non trouvé') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }

    // ============ LOGIN ============ //
    async loginUtilisateur(req, res) {
        try {
            const { email, mdp } = req.body;

            const utilisateur = await utilisateurService.login(email, mdp);

            res.json({
                message: "Connexion réussie",
                utilisateur
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

}

module.exports = new UtilisateurController();
