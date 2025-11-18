const Chauffeur = require('../models/chauffeur');
const emailService = require('../emailService');

class ChauffeurService {
    async getAllChauffeurs() {
        return await Chauffeur.findAll();
    }

    async getChauffeurById(id) {
        return await Chauffeur.findByPk(id);
    }

    async createChauffeur(chauffeurData) {
        return await Chauffeur.create(chauffeurData);
    }

    async updateChauffeur(id, chauffeurData) {
        const chauffeur = await Chauffeur.findByPk(id);
        if (!chauffeur) {
            throw new Error('Chauffeur non trouvé');
        }
        return await chauffeur.update(chauffeurData);
    }

    async deleteChauffeur(id) {
        const chauffeur = await Chauffeur.findByPk(id);
        if (!chauffeur) {
            throw new Error('Chauffeur non trouvé');
        }
        await chauffeur.destroy();
        return { message: 'Chauffeur supprimé avec succès' };
    }

    async notifierChauffeur(id, message) {
        const chauffeur = await Chauffeur.findByPk(id);
        if (!chauffeur) {
            throw new Error('Chauffeur non trouvé');
        }

        const finalMessage = message || "Ceci est une notification automatique.";

        const htmlContent = `
            <h2>Notification du service transport</h2>
            <p>Bonjour ${chauffeur.prenom} ${chauffeur.nom},</p>
            <p>${finalMessage}</p>
            <p>Cordialement,<br>L'équipe Transport</p>
        `;

        await emailService.sendMail(chauffeur.email, "Notification Service Transport", htmlContent);
        return { message: 'Email envoyé avec succès' };
      }


}

module.exports = new ChauffeurService();
