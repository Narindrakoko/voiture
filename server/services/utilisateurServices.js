// utilisateurServices.js//

const Utilisateur = require('../models/utilisateur');
const bcrypt = require('bcryptjs');

class UtilisateurService {

    async getAllUtilisateurs() {
        return await Utilisateur.findAll();
    }

    async getUtilisateurById(id) {
        return await Utilisateur.findByPk(id);
    }

    async createUtilisateur(utilisateurData) {

        // Hash du mot de passe
        const salt = await bcrypt.genSalt(10);
        utilisateurData.mdp = await bcrypt.hash(utilisateurData.mdp, salt);

        return await Utilisateur.create(utilisateurData);
    }

    async updateUtilisateur(id, utilisateurData) {
        const utilisateur = await Utilisateur.findByPk(id);
        if (!utilisateur) {
            throw new Error('Utilisateur non trouvé');
        }

        // Si le mdp est modifié, on le re-hash
        if (utilisateurData.mdp) {
            const salt = await bcrypt.genSalt(10);
            utilisateurData.mdp = await bcrypt.hash(utilisateurData.mdp, salt);
        }

        return await utilisateur.update(utilisateurData);
    }

    async deleteUtilisateur(id) {
        const utilisateur = await Utilisateur.findByPk(id);
        if (!utilisateur) {
            throw new Error('Utilisateur non trouvé');
        }
        await utilisateur.destroy();
        return { message: 'Utilisateur supprimé avec succès' };
    }

    // ============ LOGIN ============ //
    async login(email, mdp) {
        const utilisateur = await Utilisateur.findOne({ where: { email } });

        if (!utilisateur) {
            throw new Error("Email incorrect");
        }

        const isMatch = await bcrypt.compare(mdp, utilisateur.mdp);

        if (!isMatch) {
            throw new Error("Mot de passe incorrect");
        }

        return utilisateur; // tu peux ajouter un token plus tard
    }

}

module.exports = new UtilisateurService();
