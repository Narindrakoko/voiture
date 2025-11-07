const Fournisseur = require('../models/fournisseur');

class FournisseurService {
    async getAllFournisseurs() {
        return await Fournisseur.findAll();
    }

    async getFournisseurById(id) {
        return await Fournisseur.findByPk(id);
    }

    async createFournisseur(fournisseurData) {
        return await Fournisseur.create(fournisseurData);
    }

    async updateFournisseur(id, fournisseurData) {
        const fournisseur = await Fournisseur.findByPk(id);
        if (!fournisseur) {
            throw new Error('Fournisseur non trouvé');
        }
        return await fournisseur.update(fournisseurData);
    }

    async deleteFournisseur(id) {
        const fournisseur = await Fournisseur.findByPk(id);
        if (!fournisseur) {
            throw new Error('Fournisseur non trouvé');
        }
        await fournisseur.destroy();
        return { message: 'Fournisseur supprimé avec succès' };
    }
}

module.exports = new FournisseurService();
