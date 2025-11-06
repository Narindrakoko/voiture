const Vehicule = require('../models/vehicule');

class VehiculeService {
    async getAllVehicules() {
        return await Vehicule.findAll();
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
