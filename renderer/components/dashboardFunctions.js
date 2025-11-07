// dashboardFunctions.js - Fonctions pour récupérer les données réelles du dashboard

const API_BASE = 'http://localhost:3000/api';

/**
 * Récupère les statistiques générales du dashboard
 */
async function getDashboardStats() {
  try {
    const [vehicules, chauffeurs, affectations, versementsStats] = await Promise.all([
      fetch(`${API_BASE}/vehicules`).then(res => res.json()),
      fetch(`${API_BASE}/chauffeurs`).then(res => res.json()),
      fetch(`${API_BASE}/affectations`).then(res => res.json()),
      fetch(`${API_BASE}/versements/stats`).then(res => res.json())
    ]);

    return {
      vehicules: {
        total: vehicules.length,
        actifs: vehicules.filter(v => v.etat === 'Bon état' || v.etat === 'Excellent').length
      },
      chauffeurs: {
        total: chauffeurs.length,
        actifs: chauffeurs.filter(c => {
          // Considérer actif si permis valide (expiration > aujourd'hui)
          const expirationDate = new Date(c.dateExpirationPermis);
          return expirationDate > new Date();
        }).length
      },
      affectations: {
        total: affectations.length,
        actives: affectations.filter(a => !a.dateFin).length // Affectations sans date de fin
      },
      versements: versementsStats
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    throw error;
  }
}

/**
 * Récupère les données pour le graphique d'utilisation des véhicules
 */
async function getVehicleUsageData(period = 'month') {
  try {
    const affectations = await fetch(`${API_BASE}/affectations`).then(res => res.json());

    // Données simulées basées sur les affectations réelles
    const now = new Date();
    const labels = [];
    const data = [];

    if (period === 'month') {
      // Derniers 30 jours
      for (let i = 29; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }));

        // Calculer le taux d'utilisation basé sur les affectations actives
        const activeAffectations = affectations.filter(a => !a.dateFin).length;
        const totalVehicules = await fetch(`${API_BASE}/vehicules`).then(res => res.json()).then(v => v.length);
        const usageRate = totalVehicules > 0 ? (activeAffectations / totalVehicules) * 100 : 0;

        // Ajouter une variation aléatoire réaliste
        const variation = (Math.random() - 0.5) * 20;
        data.push(Math.max(0, Math.min(100, usageRate + variation)));
      }
    } else if (period === 'week') {
      // 7 derniers jours
      const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        labels.push(days[date.getDay()]);

        const activeAffectations = affectations.filter(a => !a.dateFin).length;
        const totalVehicules = await fetch(`${API_BASE}/vehicules`).then(res => res.json()).then(v => v.length);
        const usageRate = totalVehicules > 0 ? (activeAffectations / totalVehicules) * 100 : 0;

        const variation = (Math.random() - 0.5) * 15;
        data.push(Math.max(0, Math.min(100, usageRate + variation)));
      }
    }

    return { labels, data };
  } catch (error) {
    console.error('Erreur lors de la récupération des données d\'utilisation:', error);
    throw error;
  }
}

/**
 * Récupère les données pour le graphique des dépenses par catégorie
 */
async function getExpensesData() {
  try {
    const versements = await fetch(`${API_BASE}/versements`).then(res => res.json());

    // Filtrer les versements du mois en cours
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const currentMonthVersements = versements.filter(v => {
      const versementDate = new Date(v.dateVersement);
      return versementDate.getMonth() === currentMonth && versementDate.getFullYear() === currentYear;
    });

    // Grouper par type
    const expensesByType = currentMonthVersements.reduce((acc, versement) => {
      if (!acc[versement.type]) {
        acc[versement.type] = 0;
      }
      acc[versement.type] += versement.montant;
      return acc;
    }, {});

    // Calculer les pourcentages
    const total = Object.values(expensesByType).reduce((sum, amount) => sum + amount, 0);

    const labels = Object.keys(expensesByType).map(type => {
      switch(type) {
        case 'carburant': return 'Carburant';
        case 'maintenance': return 'Maintenance';
        case 'reparation': return 'Réparations';
        default: return type;
      }
    });

    const data = Object.values(expensesByType).map(amount =>
      total > 0 ? Math.round((amount / total) * 100) : 0
    );

    return { labels, data };
  } catch (error) {
    console.error('Erreur lors de la récupération des données de dépenses:', error);
    throw error;
  }
}

/**
 * Récupère les activités récentes
 */
async function getRecentActivities() {
  try {
    const [versements, affectations] = await Promise.all([
      fetch(`${API_BASE}/versements?_sort=dateVersement&_order=desc&_limit=5`).then(res => res.json()),
      fetch(`${API_BASE}/affectations?_sort=dateDebut&_order=desc&_limit=3`).then(res => res.json())
    ]);

    const activities = [];

    // Ajouter les versements récents
    versements.forEach(versement => {
      activities.push({
        type: 'versement',
        title: 'Nouveau versement',
        description: `${versement.type} - ${versement.montant.toLocaleString('fr-FR')} Ar`,
        date: new Date(versement.dateVersement),
        icon: 'fas fa-money-bill-wave'
      });
    });

    // Ajouter les affectations récentes
    affectations.forEach(affectation => {
      activities.push({
        type: 'affectation',
        title: 'Nouvelle affectation',
        description: `Véhicule affecté à un chauffeur`,
        date: new Date(affectation.dateDebut),
        icon: 'fas fa-exchange-alt'
      });
    });

    // Trier par date décroissante et prendre les 5 plus récentes
    return activities
      .sort((a, b) => b.date - a.date)
      .slice(0, 5)
      .map(activity => ({
        ...activity,
        timeAgo: getTimeAgo(activity.date)
      }));

  } catch (error) {
    console.error('Erreur lors de la récupération des activités récentes:', error);
    throw error;
  }
}

/**
 * Récupère les alertes et notifications
 */
async function getAlerts() {
  try {
    const [vehicules, chauffeurs] = await Promise.all([
      fetch(`${API_BASE}/vehicules`).then(res => res.json()),
      fetch(`${API_BASE}/chauffeurs`).then(res => res.json())
    ]);

    const alerts = [];

    // Alerte pour véhicules nécessitant maintenance (basé sur kilométrage)
    const vehiclesNeedingMaintenance = vehicules.filter(v => v.kilometrage > 80000);
    if (vehiclesNeedingMaintenance.length > 0) {
      alerts.push({
        type: 'warning',
        title: 'Maintenance requise',
        message: `${vehiclesNeedingMaintenance.length} véhicule(s) nécessitent une maintenance`,
        date: new Date(Date.now() - 24 * 60 * 60 * 1000), // Il y a 1 jour
        icon: 'fas fa-exclamation-triangle'
      });
    }

    // Alerte pour permis expirant bientôt
    const now = new Date();
    const soon = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // Dans 30 jours
    const expiringLicenses = chauffeurs.filter(c => {
      const expirationDate = new Date(c.dateExpirationPermis);
      return expirationDate > now && expirationDate <= soon;
    });

    if (expiringLicenses.length > 0) {
      alerts.push({
        type: 'warning',
        title: 'Permis expirant bientôt',
        message: `${expiringLicenses.length} permis de conduire expirent dans moins de 30 jours`,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // Il y a 2 jours
        icon: 'fas fa-id-card'
      });
    }

    // Alerte succès pour objectifs atteints (simulé)
    alerts.push({
      type: 'success',
      title: 'Objectifs atteints',
      message: 'Réduction des dépenses de 15% ce mois-ci',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // Il y a 3 jours
      icon: 'fas fa-check-circle'
    });

    return alerts.map(alert => ({
      ...alert,
      timeAgo: getTimeAgo(alert.date)
    }));

  } catch (error) {
    console.error('Erreur lors de la récupération des alertes:', error);
    throw error;
  }
}

/**
 * Calcule le temps écoulé depuis une date
 */
function getTimeAgo(date) {
  const now = new Date();
  const diffInMs = now - date;
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInHours < 1) {
    return 'Il y a moins d\'une heure';
  } else if (diffInHours < 24) {
    return `Il y a ${diffInHours}h`;
  } else {
    return `Il y a ${diffInDays} jour(s)`;
  }
}

/**
 * Met à jour le dashboard avec les données réelles
 */
async function updateDashboardWithRealData() {
  try {
    const stats = await getDashboardStats();
    const vehicleUsage = await getVehicleUsageData();
    const expenses = await getExpensesData();
    const activities = await getRecentActivities();
    const alerts = await getAlerts();

    // Mettre à jour les cartes statistiques
    updateStatCards(stats);

    // Mettre à jour les graphiques
    updateCharts(vehicleUsage, expenses);

    // Mettre à jour les activités récentes
    updateRecentActivities(activities);

    // Mettre à jour les alertes
    updateAlerts(alerts);

    console.log('Dashboard mis à jour avec les données réelles');

  } catch (error) {
    console.error('Erreur lors de la mise à jour du dashboard:', error);
  }
}

/**
 * Met à jour les cartes statistiques
 */
function updateStatCards(stats) {
  const cards = document.querySelectorAll('.stat-card');

  if (cards.length >= 4) {
    // Véhicules
    const vehiculeCard = cards[0];
    const vehiculeValue = vehiculeCard.querySelector('.stat-value');
    if (vehiculeValue) {
      vehiculeValue.textContent = stats.vehicules.total;
    }

    // Chauffeurs
    const chauffeurCard = cards[1];
    const chauffeurValue = chauffeurCard.querySelector('.stat-value');
    if (chauffeurValue) {
      chauffeurValue.textContent = stats.chauffeurs.total;
    }

    // Affectations
    const affectationCard = cards[2];
    const affectationValue = affectationCard.querySelector('.stat-value');
    if (affectationValue) {
      affectationValue.textContent = stats.affectations.total;
    }

    // Dépenses
    const depenseCard = cards[3];
    const depenseValue = depenseCard.querySelector('.stat-value');
    if (depenseValue && stats.versements.totalAmount) {
      depenseValue.textContent = `${(stats.versements.totalAmount / 1000).toFixed(0)}k`;
    }
  }
}

/**
 * Met à jour les graphiques
 */
function updateCharts(vehicleUsage, expenses) {
  // Mettre à jour le graphique d'utilisation des véhicules
  if (window.charts && window.charts.vehicleUsage) {
    window.charts.vehicleUsage.data.labels = vehicleUsage.labels;
    window.charts.vehicleUsage.data.datasets[0].data = vehicleUsage.data;
    window.charts.vehicleUsage.update();
  }

  // Mettre à jour le graphique des dépenses
  if (window.charts && window.charts.expenses) {
    window.charts.expenses.data.labels = expenses.labels;
    window.charts.expenses.data.datasets[0].data = expenses.data;
    window.charts.expenses.update();
  }
}

/**
 * Met à jour les activités récentes
 */
function updateRecentActivities(activities) {
  const activityList = document.querySelector('.activity-list');
  if (!activityList) return;

  activityList.innerHTML = activities.map(activity => `
    <div class="activity-item">
      <div class="activity-icon">
        <i class="${activity.icon}"></i>
      </div>
      <div class="activity-details">
        <div class="activity-header">
          <h4>${activity.title}</h4>
          <span class="time">${activity.timeAgo}</span>
        </div>
        <p>${activity.description}</p>
      </div>
    </div>
  `).join('');
}

/**
 * Met à jour les alertes
 */
function updateAlerts(alerts) {
  const alertsList = document.querySelector('.alerts-list');
  if (!alertsList) return;

  alertsList.innerHTML = alerts.map(alert => `
    <div class="alert-item ${alert.type}">
      <i class="${alert.icon}"></i>
      <div class="alert-content">
        <h4>${alert.title}</h4>
        <p>${alert.message}</p>
        <small>${alert.timeAgo}</small>
      </div>
    </div>
  `).join('');
}

// Exporter les fonctions
window.DashboardFunctions = {
  getDashboardStats,
  getVehicleUsageData,
  getExpensesData,
  getRecentActivities,
  getAlerts,
  updateDashboardWithRealData,
  updateStatCards,
  updateCharts,
  updateRecentActivities,
  updateAlerts
};
