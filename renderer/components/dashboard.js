import { initDashboard } from './dashboardFunctions.js';

export function Dashboard() {
  setTimeout(() => {
    initDashboard();
  }, 0);

  return `
    <main class="dashboard fadeIn">
      <div class="header-actions">
        <h2><i class="fas fa-chart-line"></i> Tableau de bord</h2>
        <div class="header-controls">
          <div class="period-selector">
            <button class="btn-outline active" data-period="day">Jour</button>
            <button class="btn-outline" data-period="week">Semaine</button>
            <button class="btn-outline" data-period="month">Mois</button>
            <button class="btn-outline" data-period="year">Année</button>
          </div>
          <button id="btnRefresh" class="btn-icon" title="Rafraîchir">
            <i class="fas fa-sync-alt"></i>
          </button>
        </div>
      </div>

      <!-- Vue d'ensemble -->
      <div class="quick-stats">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-car"></i>
          </div>
          <div class="stat-info">
            <h4>Véhicules</h4>
            <div class="stat-numbers">
              <p class="stat-value">24</p>
              <span class="stat-trend positive">
                <i class="fas fa-arrow-up"></i>
                +2
              </span>
            </div>
            <p class="stat-label">Total en service</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-user"></i>
          </div>
          <div class="stat-info">
            <h4>Chauffeurs</h4>
            <div class="stat-numbers">
              <p class="stat-value">18</p>
              <span class="stat-trend positive">
                <i class="fas fa-arrow-up"></i>
                +3
              </span>
            </div>
            <p class="stat-label">Actifs ce mois</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-exchange-alt"></i>
          </div>
          <div class="stat-info">
            <h4>Affectations</h4>
            <div class="stat-numbers">
              <p class="stat-value">45</p>
              <span class="stat-trend negative">
                <i class="fas fa-arrow-down"></i>
                -5
              </span>
            </div>
            <p class="stat-label">Ce mois</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-money-bill-wave"></i>
          </div>
          <div class="stat-info">
            <h4>Dépenses</h4>
            <div class="stat-numbers">
              <p class="stat-value">2.5M</p>
              <span class="stat-trend positive">
                <i class="fas fa-arrow-up"></i>
                +12%
              </span>
            </div>
            <p class="stat-label">Ce mois (Ar)</p>
          </div>
        </div>
      </div>

      <!-- Graphiques -->
      <div class="charts-grid">
        <div class="chart-container">
          <div class="chart-header">
            <h3>Utilisation des véhicules</h3>
            <div class="chart-actions">
              <button class="btn-icon" title="Télécharger">
                <i class="fas fa-download"></i>
              </button>
              <button class="btn-icon" title="Plus d'options">
                <i class="fas fa-ellipsis-v"></i>
              </button>
            </div>
          </div>
          <canvas id="vehicleUsageChart"></canvas>
        </div>

        <div class="chart-container">
          <div class="chart-header">
            <h3>Dépenses par catégorie</h3>
            <div class="chart-actions">
              <button class="btn-icon" title="Télécharger">
                <i class="fas fa-download"></i>
              </button>
              <button class="btn-icon" title="Plus d'options">
                <i class="fas fa-ellipsis-v"></i>
              </button>
            </div>
          </div>
          <canvas id="expensesChart"></canvas>
        </div>
      </div>

      <!-- Activités récentes et alertes -->
      <div class="bottom-grid">
        <div class="recent-activities">
          <div class="section-header">
            <h3><i class="fas fa-history"></i> Activités récentes</h3>
            <a href="#" class="btn-link">Voir tout</a>
          </div>
          <div class="activity-list">
            <div class="activity-item">
              <div class="activity-icon">
                <i class="fas fa-car"></i>
              </div>
              <div class="activity-details">
                <div class="activity-header">
                  <h4>Nouvelle affectation</h4>
                  <span class="time">Il y a 2h</span>
                </div>
                <p>Peugeot 208 affecté à Rasoa Jean</p>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon">
                <i class="fas fa-tools"></i>
              </div>
              <div class="activity-details">
                <div class="activity-header">
                  <h4>Maintenance programmée</h4>
                  <span class="time">Il y a 5h</span>
                </div>
                <p>Toyota Hilux - Vidange et révision</p>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-icon">
                <i class="fas fa-money-bill-wave"></i>
              </div>
              <div class="activity-details">
                <div class="activity-header">
                  <h4>Nouveau versement</h4>
                  <span class="time">Il y a 8h</span>
                </div>
                <p>Carburant - 250,000 Ar</p>
              </div>
            </div>
          </div>
        </div>

        <div class="alerts-notifications">
          <div class="section-header">
            <h3><i class="fas fa-bell"></i> Alertes & Notifications</h3>
            <button class="btn-icon" title="Marquer tout comme lu">
              <i class="fas fa-check-double"></i>
            </button>
          </div>
          <div class="alerts-list">
            <div class="alert-item warning">
              <i class="fas fa-exclamation-triangle"></i>
              <div class="alert-content">
                <h4>Maintenance requise</h4>
                <p>3 véhicules nécessitent une maintenance</p>
                <small>Il y a 1 jour</small>
              </div>
            </div>
            <div class="alert-item info">
              <i class="fas fa-info-circle"></i>
              <div class="alert-content">
                <h4>Mise à jour système</h4>
                <p>Nouvelle version disponible</p>
                <small>Il y a 2 jours</small>
              </div>
            </div>
            <div class="alert-item success">
              <i class="fas fa-check-circle"></i>
              <div class="alert-content">
                <h4>Objectifs atteints</h4>
                <p>Réduction des dépenses de 15%</p>
                <small>Il y a 3 jours</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        .dashboard {
          padding: var(--spacing);
          background-color: #f5f7fa;
        }

        .header-controls {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .period-selector {
          display: flex;
          gap: 8px;
          background: white;
          padding: 4px;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
        }

        .btn-outline {
          background: none;
          border: none;
          padding: 6px 12px;
          border-radius: var(--radius);
          color: #666;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-outline:hover,
        .btn-outline.active {
          background: var(--primary-color);
          color: white;
        }

        .quick-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin: 20px 0;
        }

        .stat-card {
          background: white;
          border-radius: var(--radius);
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: var(--shadow);
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
        }

        .stat-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: white;
        }

        .stat-card:nth-child(1) .stat-icon {
          background: linear-gradient(135deg, #2d89ef, #1a6cd1);
        }

        .stat-card:nth-child(2) .stat-icon {
          background: linear-gradient(135deg, #28a745, #1e7e34);
        }

        .stat-card:nth-child(3) .stat-icon {
          background: linear-gradient(135deg, #ffc107, #d39e00);
        }

        .stat-card:nth-child(4) .stat-icon {
          background: linear-gradient(135deg, #17a2b8, #138496);
        }

        .stat-numbers {
          display: flex;
          align-items: baseline;
          gap: 10px;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 5px 0;
          color: #2c3e50;
        }

        .stat-trend {
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .stat-trend.positive {
          color: #28a745;
        }

        .stat-trend.negative {
          color: #dc3545;
        }

        .charts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .chart-container {
          background: white;
          border-radius: var(--radius);
          padding: 20px;
          box-shadow: var(--shadow);
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .chart-header h3 {
          margin: 0;
          color: #2c3e50;
        }

        .chart-actions {
          display: flex;
          gap: 8px;
        }

        .bottom-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 20px;
        }

        .recent-activities,
        .alerts-notifications {
          background: white;
          border-radius: var(--radius);
          padding: 20px;
          box-shadow: var(--shadow);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .section-header h3 {
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #2c3e50;
        }

        .btn-link {
          color: var(--primary-color);
          text-decoration: none;
          font-weight: 500;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .activity-item {
          display: flex;
          gap: 15px;
          padding-bottom: 15px;
          border-bottom: 1px solid var(--border-color);
        }

        .activity-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .activity-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          background: var(--primary-color);
        }

        .activity-details {
          flex: 1;
        }

        .activity-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 5px;
        }

        .activity-header h4 {
          margin: 0;
          color: #2c3e50;
        }

        .time {
          font-size: 0.8rem;
          color: #666;
        }

        .activity-details p {
          margin: 0;
          color: #666;
        }

        .alerts-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .alert-item {
          display: flex;
          gap: 15px;
          padding: 15px;
          border-radius: var(--radius);
          background: var(--light-bg);
        }

        .alert-item.warning {
          background: rgba(255, 193, 7, 0.1);
        }

        .alert-item.warning i {
          color: #ffc107;
        }

        .alert-item.info {
          background: rgba(23, 162, 184, 0.1);
        }

        .alert-item.info i {
          color: #17a2b8;
        }

        .alert-item.success {
          background: rgba(40, 167, 69, 0.1);
        }

        .alert-item.success i {
          color: #28a745;
        }

        .alert-content h4 {
          margin: 0 0 5px;
          color: #2c3e50;
        }

        .alert-content p {
          margin: 0;
          color: #666;
        }

        .alert-content small {
          color: #666;
          font-size: 0.8rem;
        }

        /* Chart error state */
        .chart-error {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: var(--gray-600);
        }

        .chart-error i {
          font-size: 2rem;
          color: var(--danger-color);
          margin-bottom: 0.5rem;
        }

        .chart-error p {
          margin: 0;
        }

        @media (max-width: 1024px) {
          .bottom-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .dashboard {
            padding: 10px;
          }

          .header-actions {
            flex-direction: column;
            gap: 15px;
          }

          .header-controls {
            width: 100%;
            flex-direction: column;
          }

          .period-selector {
            width: 100%;
            justify-content: space-between;
          }

          .charts-grid {
            grid-template-columns: 1fr;
          }

          .stat-card {
            padding: 15px;
          }
        }
      </style>
    </main>
  `;
}
