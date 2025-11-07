const Versement = require('../models/versement');
const Vehicule = require('../models/vehicule');
const Chauffeur = require('../models/chauffeur');

class VersementService {
    async getAllVersements() {
        return await Versement.findAll({
            include: [
                { model: Vehicule, as: 'vehicule' },
                { model: Chauffeur, as: 'chauffeur' }
            ],
            order: [['dateVersement', 'DESC']]
        });
    }

    async getVersementById(id) {
        return await Versement.findByPk(id, {
            include: [
                { model: Vehicule, as: 'vehicule' },
                { model: Chauffeur, as: 'chauffeur' }
            ]
        });
    }

    async createVersement(versementData) {
        return await Versement.create(versementData);
    }

    async updateVersement(id, versementData) {
        const versement = await Versement.findByPk(id);
        if (!versement) {
            throw new Error('Versement non trouvé');
        }
        return await versement.update(versementData);
    }

    async deleteVersement(id) {
        const versement = await Versement.findByPk(id);
        if (!versement) {
            throw new Error('Versement non trouvé');
        }
        await versement.destroy();
        return { message: 'Versement supprimé avec succès' };
    }

    async getVersementsByVehicule(vehiculeId) {
        return await Versement.findAll({
            where: { vehiculeId },
            include: [
                { model: Vehicule, as: 'vehicule' },
                { model: Chauffeur, as: 'chauffeur' }
            ],
            order: [['dateVersement', 'DESC']]
        });
    }

    async getVersementsByChauffeur(chauffeurId) {
        return await Versement.findAll({
            where: { chauffeurId },
            include: [
                { model: Vehicule, as: 'vehicule' },
                { model: Chauffeur, as: 'chauffeur' }
            ],
            order: [['dateVersement', 'DESC']]
        });
    }

    async getVersementsStats() {
        const versements = await Versement.findAll();

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

        return stats;
    }
}

module.exports = new VersementService();
