const { Sequelize } = require('sequelize');
const Affectation = require('../models/affectation');
const Vehicule = require('../models/vehicule');
const Chauffeur = require('../models/chauffeur');

class AffectationService {
    async getAllAffectations() {
        return await Affectation.findAll({
            include: [
                { model: Vehicule, as: 'vehicule' },
                { model: Chauffeur, as: 'chauffeur' }
            ]
        });
    }

    async getAffectationById(id) {
        return await Affectation.findByPk(id, {
            include: [
                { model: Vehicule, as: 'vehicule' },
                { model: Chauffeur, as: 'chauffeur' }
            ]
        });
    }

    async createAffectation(affectationData) {
        // Vérifier que le véhicule n'est pas déjà affecté pendant cette période
        const existingAffectation = await Affectation.findOne({
            where: {
                vehiculeId: affectationData.vehiculeId,
                statut: 'en_cours',
                [Sequelize.Op.or]: [
                    {
                        dateDebut: {
                            [Sequelize.Op.between]: [affectationData.dateDebut, affectationData.dateFin]
                        }
                    },
                    {
                        dateFin: {
                            [Sequelize.Op.between]: [affectationData.dateDebut, affectationData.dateFin]
                        }
                    },
                    {
                        [Sequelize.Op.and]: [
                            { dateDebut: { [Sequelize.Op.lte]: affectationData.dateDebut } },
                            { dateFin: { [Sequelize.Op.gte]: affectationData.dateFin } }
                        ]
                    }
                ]
            }
        });

        if (existingAffectation) {
            throw new Error('Ce véhicule est déjà affecté pendant cette période');
        }

        // Vérifier que le chauffeur n'est pas déjà affecté pendant cette période
        const existingChauffeurAffectation = await Affectation.findOne({
            where: {
                chauffeurId: affectationData.chauffeurId,
                statut: 'en_cours',
                [Sequelize.Op.or]: [
                    {
                        dateDebut: {
                            [Sequelize.Op.between]: [affectationData.dateDebut, affectationData.dateFin]
                        }
                    },
                    {
                        dateFin: {
                            [Sequelize.Op.between]: [affectationData.dateDebut, affectationData.dateFin]
                        }
                    },
                    {
                        [Sequelize.Op.and]: [
                            { dateDebut: { [Sequelize.Op.lte]: affectationData.dateDebut } },
                            { dateFin: { [Sequelize.Op.gte]: affectationData.dateFin } }
                        ]
                    }
                ]
            }
        });

        if (existingChauffeurAffectation) {
            throw new Error('Ce chauffeur est déjà affecté pendant cette période');
        }

        return await Affectation.create(affectationData);
    }

    async updateAffectation(id, affectationData) {
        const affectation = await Affectation.findByPk(id);
        if (!affectation) {
            throw new Error('Affectation non trouvée');
        }

        // Si on met à jour les dates ou les IDs, vérifier les conflits
        if (affectationData.dateDebut || affectationData.dateFin || affectationData.vehiculeId || affectationData.chauffeurId) {
            const vehiculeId = affectationData.vehiculeId || affectation.vehiculeId;
            const chauffeurId = affectationData.chauffeurId || affectation.chauffeurId;
            const dateDebut = affectationData.dateDebut || affectation.dateDebut;
            const dateFin = affectationData.dateFin || affectation.dateFin;

            // Vérifier conflits véhicule
            const existingVehicule = await Affectation.findOne({
                where: {
                    vehiculeId: vehiculeId,
                    id: { [Sequelize.Op.ne]: id },
                    statut: 'en_cours',
                    [Sequelize.Op.or]: [
                        { dateDebut: { [Sequelize.Op.between]: [dateDebut, dateFin] } },
                        { dateFin: { [Sequelize.Op.between]: [dateDebut, dateFin] } },
                        {
                            [Sequelize.Op.and]: [
                                { dateDebut: { [Sequelize.Op.lte]: dateDebut } },
                                { dateFin: { [Sequelize.Op.gte]: dateFin } }
                            ]
                        }
                    ]
                }
            });

            if (existingVehicule) {
                throw new Error('Ce véhicule est déjà affecté pendant cette période');
            }

            // Vérifier conflits chauffeur
            const existingChauffeur = await Affectation.findOne({
                where: {
                    chauffeurId: chauffeurId,
                    id: { [Sequelize.Op.ne]: id },
                    statut: 'en_cours',
                    [Sequelize.Op.or]: [
                        { dateDebut: { [Sequelize.Op.between]: [dateDebut, dateFin] } },
                        { dateFin: { [Sequelize.Op.between]: [dateDebut, dateFin] } },
                        {
                            [Sequelize.Op.and]: [
                                { dateDebut: { [Sequelize.Op.lte]: dateDebut } },
                                { dateFin: { [Sequelize.Op.gte]: dateFin } }
                            ]
                        }
                    ]
                }
            });

            if (existingChauffeur) {
                throw new Error('Ce chauffeur est déjà affecté pendant cette période');
            }
        }

        return await affectation.update(affectationData);
    }

    async deleteAffectation(id) {
        const affectation = await Affectation.findByPk(id);
        if (!affectation) {
            throw new Error('Affectation non trouvée');
        }
        await affectation.destroy();
        return { message: 'Affectation supprimée avec succès' };
    }

    async getAffectationsByVehicule(vehiculeId) {
        return await Affectation.findAll({
            where: { vehiculeId },
            include: [
                { model: Vehicule, as: 'vehicule' },
                { model: Chauffeur, as: 'chauffeur' }
            ],
            order: [['dateDebut', 'DESC']]
        });
    }

    async getAffectationsByChauffeur(chauffeurId) {
        return await Affectation.findAll({
            where: { chauffeurId },
            include: [
                { model: Vehicule, as: 'vehicule' },
                { model: Chauffeur, as: 'chauffeur' }
            ],
            order: [['dateDebut', 'DESC']]
        });
    }
}

module.exports = new AffectationService();
