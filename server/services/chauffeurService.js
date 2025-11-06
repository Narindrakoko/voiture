const Chauffeur = require('../models/chauffeur');

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
}

module.exports = new ChauffeurService();
