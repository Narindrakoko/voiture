const API_BASE = 'http://localhost:3000/api';
let charts = {};

// Fonction pour charger les données
async function loadDashboardData(period = 'month') {
  try {
    const [vehicules, chauffeurs, affectations, versements] = await Promise.all([
      fetch(`${API_BASE}/vehicules`).then(res => res.json()),
      fetch(`${API_BASE}/chauffeurs`).then(res => res.json()),
      fetch(`${API_BASE}/affectations`).then(res => res.json()),
      fetch(`${API_BASE}/versements`).then(res => res.json())
    ]);

    const stats = calculateStats(vehicules, chauffeurs, affectations, versements);
    const vehicleUsageData = calculateVehicleUsage(vehicules, affectations, period);
    const expensesData = calculateExpenses(versements);
    const activities = getRecentActivities(affectations, versements);
    const alerts = generateAlerts(vehicules, chauffeurs, versements);

    updateDashboard(stats, vehicleUsageData, expensesData, activities, alerts);
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error);
  }
}

// Calculer les statistiques
function calculateStats(vehicules, chauffeurs, affectations, versements) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Stats véhicules
  const vehiclesStats = {
    total: vehicules.length,
    actifs: vehicules.filter(v => v.etat === 'Bon état' || v.etat === 'Excellent').length,
    trend: {
      value: 2,
      isPositive: true
    }
  };

  // Stats chauffeurs
  const chauffeursStats = {
    total: chauffeurs.length,
    actifs: chauffeurs.filter(c => new Date(c.dateExpirationPermis) > now).length,
    trend: {
      value: 3,
      isPositive: true
    }
  };

  // Stats revenus (versements de type 'revenu')
  const revenusThisMonth = versements.filter(v => {
    const versementDate = new Date(v.dateVersement);
    return versementDate.getMonth() === currentMonth && versementDate.getFullYear() === currentYear && v.type === 'revenu';
  });

  const revenusTotal = revenusThisMonth.reduce((sum, v) => sum + parseFloat(v.montant), 0);

  const revenusStats = {
    total: revenusTotal,
    trend: {
      value: 5,
      isPositive: false
    }
  };

  // Stats dépenses (versements autres que 'revenu')
  const depensesThisMonth = versements.filter(v => {
    const versementDate = new Date(v.dateVersement);
    return versementDate.getMonth() === currentMonth && versementDate.getFullYear() === currentYear && v.type !== 'revenu';
  });

  const depensesTotal = depensesThisMonth.reduce((sum, v) => sum + parseFloat(v.montant), 0);
  const depensesNet = depensesTotal - revenusTotal;

  const depensesStats = {
    total: depensesNet,
    trend: {
      value: 12,
      isPositive: true
    }
  };

  return {
    vehicules: vehiclesStats,
    chauffeurs: chauffeursStats,
    revenus: revenusStats,
    depenses: depensesStats
  };
}

// Calculer l'utilisation des véhicules
function calculateVehicleUsage(vehicules, affectations, period) {
  const now = new Date();
  const totalVehicules = vehicules.length;
  const labels = [];
  const data = [];

  if (period === 'month') {
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      labels.push(date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }));

      const activeAffectations = affectations.filter(a => {
        const debut = new Date(a.dateDebut);
        const fin = a.dateFin ? new Date(a.dateFin) : now;
        return debut <= date && fin >= date;
      }).length;

      const usageRate = totalVehicules > 0 ? (activeAffectations / totalVehicules) * 100 : 0;
      data.push(Math.min(100, usageRate));
    }
  } else if (period === 'week') {
    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      labels.push(days[date.getDay()]);

      const activeAffectations = affectations.filter(a => {
        const debut = new Date(a.dateDebut);
        const fin = a.dateFin ? new Date(a.dateFin) : now;
        return debut <= date && fin >= date;
      }).length;

      const usageRate = totalVehicules > 0 ? (activeAffectations / totalVehicules) * 100 : 0;
      data.push(Math.min(100, usageRate));
    }
  }

  return { labels, data };
}

// Calculer les dépenses
function calculateExpenses(versements) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const currentMonthVersements = versements.filter(v => {
    const versementDate = new Date(v.dateVersement);
    return versementDate.getMonth() === currentMonth && versementDate.getFullYear() === currentYear;
  });

  const expensesByType = currentMonthVersements.reduce((acc, v) => {
    const type = v.type || 'Autres';
    // Exclure les revenus du graphique en doughnut
    if (type !== 'revenu') {
      if (!acc[type]) acc[type] = 0;
      acc[type] += parseFloat(v.montant);
    }
    return acc;
  }, {});

  const total = Object.values(expensesByType).reduce((sum, amount) => sum + amount, 0);

  const labels = Object.keys(expensesByType).map(type => {
    switch(type) {
      case 'carburant': return 'Carburant';
      case 'maintenance': return 'Maintenance';
      case 'reparation': return 'Réparations';
      default: return 'Autres';
    }
  });

  const data = Object.values(expensesByType).map(amount =>
    total > 0 ? Math.round((amount / total) * 100) : 0
  );

  return { labels, data };
}

// Obtenir les activités récentes
function getRecentActivities(affectations, versements) {
  const activities = [];

  // Ajouter les versements récents
  versements.slice(0, 5).forEach(v => {
    activities.push({
      type: 'versement',
      title: 'Nouveau versement',
      description: `${v.type} - ${parseFloat(v.montant).toLocaleString('fr-FR')} Ar`,
      date: new Date(v.dateVersement),
      icon: 'fas fa-money-bill-wave'
    });
  });

  // Ajouter les affectations récentes
  affectations.slice(0, 3).forEach(a => {
    activities.push({
      type: 'affectation',
      title: 'Nouvelle affectation',
      description: `Véhicule affecté`,
      date: new Date(a.dateDebut),
      icon: 'fas fa-exchange-alt'
    });
  });

  return activities
    .sort((a, b) => b.date - a.date)
    .slice(0, 5)
    .map(activity => ({
      ...activity,
      timeAgo: getTimeAgo(activity.date)
    }));
}

// Générer les alertes
function generateAlerts(vehicules, chauffeurs, versements) {
  const alerts = [];
  const now = new Date();

  // Alerte pour véhicules nécessitant maintenance
  const vehiclesNeedingMaintenance = vehicules.filter(v => v.kilometrage > 10000);
  if (vehiclesNeedingMaintenance.length > 0) {
    alerts.push({
      type: 'warning',
      title: 'Maintenance requise',
      message: `${vehiclesNeedingMaintenance.length} véhicule(s) nécessitent une maintenance`,
      date: new Date(now - 24 * 60 * 60 * 1000),
      icon: 'fas fa-exclamation-triangle'
    });
  }

  // Alerte pour permis expirant bientôt
  const soon = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  const expiringLicenses = chauffeurs.filter(c => {
    const expirationDate = new Date(c.dateExpirationPermis);
    return expirationDate > now && expirationDate <= soon;
  });

  if (expiringLicenses.length > 0) {
    alerts.push({
      type: 'warning',
      title: 'Permis expirant bientôt',
      message: `${expiringLicenses.length} permis de conduire expirent dans moins de 30 jours`,
      date: new Date(now - 2 * 24 * 60 * 60 * 1000),
      icon: 'fas fa-id-card'
    });
  }

  // Alerte de succès (exemple avec les dépenses)
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const currentMonthVersements = versements.filter(v => {
    const date = new Date(v.dateVersement);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });

  const lastMonthVersements = versements.filter(v => {
    const date = new Date(v.dateVersement);
    return date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear;
  });

  const currentTotal = currentMonthVersements.reduce((sum, v) => sum + parseFloat(v.montant), 0);
  const lastTotal = lastMonthVersements.reduce((sum, v) => sum + parseFloat(v.montant), 0);

  if (lastTotal > 0 && currentTotal < lastTotal) {
    const reduction = Math.round((1 - currentTotal / lastTotal) * 100);
    alerts.push({
      type: 'success',
      title: 'Objectifs atteints',
      message: `Réduction des dépenses de ${reduction}% ce mois-ci`,
      date: new Date(now - 3 * 24 * 60 * 60 * 1000),
      icon: 'fas fa-check-circle'
    });
  }

  return alerts.map(alert => ({
    ...alert,
    timeAgo: getTimeAgo(alert.date)
  }));
}

// Fonction pour calculer le temps écoulé
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

// Mettre à jour le dashboard
function updateDashboard(stats, vehicleUsageData, expensesData, activities, alerts) {
  // Mettre à jour les stats
  updateStatCards(stats);

  // Mettre à jour les graphiques
  updateCharts(vehicleUsageData, expensesData);

  // Mettre à jour les activités récentes
  updateActivities(activities);

  // Mettre à jour les alertes
  updateAlerts(alerts);
}

// Mettre à jour les cartes statistiques
function updateStatCards(stats) {
  const cards = document.querySelectorAll('.stat-card');
  const statData = [
    { value: stats.vehicules.total, trend: stats.vehicules.trend },
    { value: stats.chauffeurs.total, trend: stats.chauffeurs.trend },
    { value: stats.revenus.total, trend: stats.revenus.trend },
    {
      value: Math.abs(stats.depenses.total).toLocaleString('fr-FR'),
      trend: stats.depenses.trend
    }
  ];

  cards.forEach((card, index) => {
    const data = statData[index];
    if (data) {
      const valueEl = card.querySelector('.stat-value');
      const trendEl = card.querySelector('.stat-trend');

      if (valueEl) valueEl.textContent = data.value;
      if (trendEl) {
        trendEl.className = `stat-trend ${data.trend.isPositive ? 'positive' : 'negative'}`;
        trendEl.innerHTML = `
          <i class="fas fa-arrow-${data.trend.isPositive ? 'up' : 'down'}"></i>
          ${data.trend.isPositive ? '+' : '-'}${data.trend.value}
        `;
      }
    }
  });
}

// Mettre à jour les graphiques
function updateCharts(vehicleUsageData, expensesData) {
  if (!charts.vehicleUsage) {
    initializeCharts(vehicleUsageData, expensesData);
  } else {
    charts.vehicleUsage.data.labels = vehicleUsageData.labels;
    charts.vehicleUsage.data.datasets[0].data = vehicleUsageData.data;
    charts.vehicleUsage.update();

    charts.expenses.data.labels = expensesData.labels;
    charts.expenses.data.datasets[0].data = expensesData.data;
    charts.expenses.update();
  }
}

// Initialiser les graphiques
function initializeCharts(vehicleUsageData, expensesData) {
  const vehicleCanvas = document.getElementById('vehicleUsageChart');
  const expensesCanvas = document.getElementById('expensesChart');

  if (vehicleCanvas && expensesCanvas) {
    charts.vehicleUsage = new Chart(vehicleCanvas, {
      type: 'line',
      data: {
        labels: vehicleUsageData.labels,
        datasets: [{
          label: 'Taux d\'utilisation',
          data: vehicleUsageData.data,
          borderColor: '#2d89ef',
          tension: 0.4,
          fill: true,
          backgroundColor: 'rgba(45, 137, 239, 0.1)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 100
          }
        }
      }
    });

    charts.expenses = new Chart(expensesCanvas, {
      type: 'doughnut',
      data: {
        labels: expensesData.labels,
        datasets: [{
          data: expensesData.data,
          backgroundColor: ['#2d89ef', '#28a745', '#ffc107', '#17a2b8']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}

// Mettre à jour les activités récentes
function updateActivities(activities) {
  const activityList = document.querySelector('.activity-list');
  if (activityList) {
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
}

// Mettre à jour les alertes
function updateAlerts(alerts) {
  const alertsList = document.querySelector('.alerts-list');
  if (alertsList) {
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
}

// Fonction d'initialisation
function initDashboard() {
  // Charger les données initiales
  loadDashboardData('month');

  // Event listeners pour les boutons de période
  const periodButtons = document.querySelectorAll('.period-selector button');
  periodButtons.forEach(button => {
    button.addEventListener('click', () => {
      periodButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      loadDashboardData(button.dataset.period);
    });
  });

  // Event listener pour le bouton de rafraîchissement
  const refreshBtn = document.getElementById('btnRefresh');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      refreshBtn.classList.add('rotating');
      loadDashboardData(document.querySelector('.period-selector button.active').dataset.period);
      setTimeout(() => refreshBtn.classList.remove('rotating'), 1000);
    });
  }

  // Ajouter un gestionnaire de redimensionnement pour les graphiques
  window.addEventListener('resize', () => {
    if (charts.vehicleUsage && charts.expenses) {
      charts.vehicleUsage.resize();
      charts.expenses.resize();
    }
  });
}

export { initDashboard };
