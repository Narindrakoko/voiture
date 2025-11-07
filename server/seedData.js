const Versement = require('./models/versement');
const Vehicule = require('./models/vehicule');
const Chauffeur = require('./models/chauffeur');
const Affectation = require('./models/affectation');

async function seedData() {
  try {
    console.log('Début du seeding des données de test...');

    // 1. Seed véhicules
    console.log('Seeding véhicules...');
    const vehiculesData = [
      {
        marque: 'Toyota',
        modele: 'Hilux',
        immatriculation: 'ABC-123-AB',
        annee: 2020,
        couleur: 'Blanc',
        kilometrage: 50000,
        etat: 'Bon état'
      },
      {
        marque: 'Renault',
        modele: 'Master',
        immatriculation: 'DEF-456-CD',
        annee: 2019,
        couleur: 'Bleu',
        kilometrage: 75000,
        etat: 'Bon état'
      },
      {
        marque: 'Peugeot',
        modele: '208',
        immatriculation: 'GHI-789-EF',
        annee: 2021,
        couleur: 'Rouge',
        kilometrage: 30000,
        etat: 'Excellent'
      }
    ];

    // Supprimer les véhicules existants
    await Vehicule.destroy({ where: {} });

    const vehicules = [];
    for (const vehiculeData of vehiculesData) {
      const vehicule = await Vehicule.create(vehiculeData);
      vehicules.push(vehicule);
    }
    console.log(`${vehicules.length} véhicules créés.`);

    // 2. Seed chauffeurs
    console.log('Seeding chauffeurs...');
    const chauffeursData = [
      {
        nom: 'Rakoto',
        prenom: 'Jean',
        dateNaissance: new Date(1985, 5, 15),
        numeroPermis: 'PERM001',
        dateExpirationPermis: new Date(2025, 11, 31),
        telephone: '+261340000001',
        email: 'jean.rakoto@email.com',
        adresse: 'Antananarivo'
      },
      {
        nom: 'Rabe',
        prenom: 'Marie',
        dateNaissance: new Date(1990, 8, 22),
        numeroPermis: 'PERM002',
        dateExpirationPermis: new Date(2026, 5, 30),
        telephone: '+261340000002',
        email: 'marie.rabe@email.com',
        adresse: 'Antananarivo'
      },
      {
        nom: 'Andria',
        prenom: 'Paul',
        dateNaissance: new Date(1988, 2, 10),
        numeroPermis: 'PERM003',
        dateExpirationPermis: new Date(2024, 9, 15),
        telephone: '+261340000003',
        email: 'paul.andria@email.com',
        adresse: 'Toamasina'
      }
    ];

    // Supprimer les chauffeurs existants
    await Chauffeur.destroy({ where: {} });

    const chauffeurs = [];
    for (const chauffeurData of chauffeursData) {
      const chauffeur = await Chauffeur.create(chauffeurData);
      chauffeurs.push(chauffeur);
    }
    console.log(`${chauffeurs.length} chauffeurs créés.`);

    // 3. Seed affectations
    console.log('Seeding affectations...');
    const affectationsData = [
      {
        vehiculeId: vehicules[0].id,
        chauffeurId: chauffeurs[0].id,
        dateDebut: new Date(2023, 0, 1),
        dateFin: null, // Affectation en cours
        motif: 'Transport de marchandises'
      },
      {
        vehiculeId: vehicules[1].id,
        chauffeurId: chauffeurs[1].id,
        dateDebut: new Date(2023, 0, 1),
        dateFin: null, // Affectation en cours
        motif: 'Livraison urbaine'
      },
      {
        vehiculeId: vehicules[2].id,
        chauffeurId: chauffeurs[2].id,
        dateDebut: new Date(2023, 0, 1),
        dateFin: null, // Affectation en cours
        motif: 'Service clientèle'
      }
    ];

    // Supprimer les affectations existantes
    await Affectation.destroy({ where: {} });

    const affectations = [];
    for (const affectationData of affectationsData) {
      const affectation = await Affectation.create(affectationData);
      affectations.push(affectation);
    }
    console.log(`${affectations.length} affectations créées.`);

    // 4. Seed versements
    console.log('Seeding versements...');
    await seedVersements(vehicules, chauffeurs);

    console.log('Toutes les données de test ont été insérées avec succès !');

  } catch (error) {
    console.error('Erreur lors du seeding des données:', error);
  }
}

async function seedVersements(vehicules, chauffeurs) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Créer des versements pour le mois en cours
  const versementsData = [
    // Carburant
    {
      montant: 150000,
      type: 'carburant',
      vehiculeId: vehicules[0].id,
      chauffeurId: chauffeurs[0].id,
      description: 'Carburant pour livraison',
      dateVersement: new Date(currentYear, currentMonth, 5)
    },
    {
      montant: 200000,
      type: 'carburant',
      vehiculeId: vehicules[1].id,
      chauffeurId: chauffeurs[1].id,
      description: 'Carburant pour transport urbain',
      dateVersement: new Date(currentYear, currentMonth, 12)
    },
    {
      montant: 180000,
      type: 'carburant',
      vehiculeId: vehicules[0].id,
      chauffeurId: chauffeurs[0].id,
      description: 'Carburant pour tournée',
      dateVersement: new Date(currentYear, currentMonth, 18)
    },

    // Maintenance
    {
      montant: 350000,
      type: 'maintenance',
      vehiculeId: vehicules[0].id,
      chauffeurId: chauffeurs[0].id,
      description: 'Changement d\'huile et filtres',
      dateVersement: new Date(currentYear, currentMonth, 8)
    },
    {
      montant: 250000,
      type: 'maintenance',
      vehiculeId: vehicules[1].id,
      chauffeurId: chauffeurs[1].id,
      description: 'Révision générale',
      dateVersement: new Date(currentYear, currentMonth, 15)
    },

    // Réparation
    {
      montant: 450000,
      type: 'reparation',
      vehiculeId: vehicules[0].id,
      chauffeurId: chauffeurs[0].id,
      description: 'Réparation freins',
      dateVersement: new Date(currentYear, currentMonth, 10)
    },
    {
      montant: 300000,
      type: 'reparation',
      vehiculeId: vehicules[1].id,
      chauffeurId: chauffeurs[1].id,
      description: 'Réparation moteur',
      dateVersement: new Date(currentYear, currentMonth, 22)
    }
  ];

  // Supprimer les versements existants pour ce mois
  await Versement.destroy({
    where: {
      dateVersement: {
        [require('sequelize').Op.gte]: new Date(currentYear, currentMonth, 1),
        [require('sequelize').Op.lt]: new Date(currentYear, currentMonth + 1, 1)
      }
    }
  });

  // Insérer les nouvelles données
  for (const versementData of versementsData) {
    await Versement.create(versementData);
  }

  console.log('Versements du mois en cours créés.');
}

module.exports = { seedData };
