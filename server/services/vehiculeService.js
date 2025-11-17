const Vehicule = require('../models/vehicule');
const Maintenance = require('../models/maintenance');

class VehiculeService {
    async getAllVehicules() {
        const vehicules = await Vehicule.findAll();

        // Pour chaque véhicule, vérifier s'il est en maintenance
        const vehiculesWithStatus = await Promise.all(
            vehicules.map(async (vehicule) => {
                const maintenanceEnCours = await Maintenance.findOne({
                    where: {
                        vehiculeId: vehicule.id,
                        statut: 'en_cours'
                    }
                });

                return {
                    ...vehicule.toJSON(),
                    enMaintenance: !!maintenanceEnCours
                };
            })
        );

        return vehiculesWithStatus;
    }

    async getVehiculeById(id) {
        return await Vehicule.findByPk(id);
    }

    async createVehicule(vehiculeData) {
        return await Vehicule.create(vehiculeData);
    }

    async updateVehicule(id, vehiculeData) {
        const vehicule = await Vehicule.findByPk(id);
        if (!vehicule) {
            throw new Error('Véhicule non trouvé');
        }
        return await vehicule.update(vehiculeData);
    }

    async deleteVehicule(id) {
        const vehicule = await Vehicule.findByPk(id);
        if (!vehicule) {
            throw new Error('Véhicule non trouvé');
        }
        await vehicule.destroy();
        return { message: 'Véhicule supprimé avec succès' };
    }
}

module.exports = new VehiculeService();
