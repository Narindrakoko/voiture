// renderer/components/Acceuil.js
export function Acceuil() {
    return `
      <main class="acceuil fadeIn">
        <div class="welcome-section">
          <div class="welcome-content">
            <h2><i class="fas fa-car-side"></i> Bienvenue sur GestionAuto</h2>
            <p class="welcome-text">
              Gérez efficacement votre flotte de véhicules et vos chauffeurs avec notre plateforme intuitive.
              Accédez rapidement à toutes les informations et fonctionnalités dont vous avez besoin.
            </p>
          </div>
        </div>

        <section class="quick-stats">
          <h3><i class="fas fa-chart-pie"></i> Aperçu général</h3>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-car"></i>
              </div>
              <div class="stat-info">
                <h4>Véhicules</h4>
                <p class="stat-value">25</p>
                <p class="stat-label">Total en service</p>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-users"></i>
              </div>
              <div class="stat-info">
                <h4>Chauffeurs</h4>
                <p class="stat-value">12</p>
                <p class="stat-label">Actifs</p>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-route"></i>
              </div>
              <div class="stat-info">
                <h4>Missions</h4>
                <p class="stat-value">3</p>
                <p class="stat-label">En cours</p>
              </div>
            </div>

            <div class="stat-card">
              <div class="stat-icon">
                <i class="fas fa-money-bill-wave"></i>
              </div>
              <div class="stat-info">
                <h4>Versements</h4>
                <p class="stat-value">18</p>
                <p class="stat-label">Ce mois</p>
              </div>
            </div>
          </div>
        </section>

        <section class="recent-activities">
          <div class="section-header">
            <h3><i class="fas fa-clock"></i> Activités récentes</h3>
            <div class="header-actions">
              <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" placeholder="Rechercher une activité...">
              </div>
              <button class="btn-secondary">
                <i class="fas fa-filter"></i>
                Filtrer
              </button>
            </div>
          </div>

          <div class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Chauffeur</th>
                  <th>Véhicule</th>
                  <th>Type</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>05/11/2025</td>
                  <td>
                    <div class="user-info">
                      <i class="fas fa-user-circle"></i>
                      Rasoa Jean
                    </div>
                  </td>
                  <td>Peugeot 208</td>
                  <td>Affectation</td>
                  <td><span class="badge badge-success">Terminé</span></td>
                  <td>
                    <button class="btn-icon" title="Voir les détails">
                      <i class="fas fa-eye"></i>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>04/11/2025</td>
                  <td>
                    <div class="user-info">
                      <i class="fas fa-user-circle"></i>
                      Rakoto Marie
                    </div>
                  </td>
                  <td>Toyota Corolla</td>
                  <td>Maintenance</td>
                  <td><span class="badge badge-warning">En cours</span></td>
                  <td>
                    <button class="btn-icon" title="Voir les détails">
                      <i class="fas fa-eye"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      <style>
        .acceuil {
          padding: var(--spacing);
          background-color: #f5f7fa;
        }

        .welcome-section {
          background: linear-gradient(135deg, var(--primary-color), #1a6cd1);
          border-radius: var(--radius);
          padding: 40px;
          margin-bottom: 30px;
          color: white;
          box-shadow: var(--shadow);
        }

        .welcome-content {
          max-width: 800px;
        }

        .welcome-content h2 {
          margin: 0;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 2rem;
          margin-bottom: 15px;
        }

        .welcome-text {
          font-size: 1.1rem;
          opacity: 0.9;
          line-height: 1.6;
        }

        .quick-stats {
          margin-bottom: 30px;
        }

        .quick-stats h3 {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
          color: #2c3e50;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
        }

        .stat-card {
          background: white;
          border-radius: var(--radius);
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: var(--shadow);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .stat-icon {
          background: var(--primary-color);
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .stat-info h4 {
          margin: 0;
          font-size: 1rem;
          color: #666;
        }

        .stat-value {
          margin: 5px 0;
          font-size: 1.8rem;
          font-weight: bold;
          color: #2c3e50;
        }

        .stat-label {
          margin: 0;
          font-size: 0.85rem;
          color: #666;
        }

        .recent-activities {
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
          flex-wrap: wrap;
          gap: 15px;
        }

        .section-header h3 {
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #2c3e50;
        }

        .header-actions {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .search-box {
          position: relative;
        }

        .search-box i {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #666;
        }

        .search-box input {
          padding: 8px 12px 8px 35px;
          border: 1px solid var(--border-color);
          border-radius: var(--radius);
          font-size: 14px;
          width: 250px;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .user-info i {
          color: #666;
          font-size: 1.2rem;
        }

        .btn-icon {
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          padding: 5px;
          border-radius: 4px;
          transition: all 0.3s ease;
        }

        .btn-icon:hover {
          background: var(--light-bg);
          color: var(--primary-color);
        }

        @media (max-width: 768px) {
          .acceuil {
            padding: 10px;
          }

          .welcome-section {
            padding: 20px;
          }

          .welcome-content h2 {
            font-size: 1.5rem;
          }

          .welcome-text {
            font-size: 1rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .section-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-actions {
            width: 100%;
            flex-direction: column;
          }

          .search-box,
          .search-box input {
            width: 100%;
          }
        }
      </style>
    </main>
  `;
}
