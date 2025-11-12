import { initVersement } from './VersementFunctions.js';

export function Versement() {
  setTimeout(() => {
    initVersement();
  }, 0);

  return `
    <main class="versements fadeIn">
      <div class="header-actions">
        <h2><i class="fas fa-money-bill-wave"></i> Gestion des versements</h2>
        <div class="header-controls">
          <div class="filters">
            <div class="search-box">
              <i class="fas fa-search"></i>
              <input type="text" id="searchVersement" placeholder="Rechercher un versement...">
            </div>
            <select id="filterType" class="form-control">
              <option value="">Tous les types</option>
              <option value="carburant">Carburant</option>
              <option value="maintenance">Maintenance</option>
              <option value="reparation">Réparation</option>
              <option value="revenu">Revenu</option>
            </select>
          </div>
          <button id="btnAjouterVersement" class="btn-primary">
            <i class="fas fa-plus"></i>
            Nouveau versement
          </button>
        </div>
      </div>

      <!-- Statistiques rapides -->
      <div class="stats-overview">
        <div class="stat-card" id="stat-total">
          <div class="stat-icon">
            <i class="fas fa-money-bill-wave"></i>
          </div>
          <div class="stat-info">
            <h4>Total Versements</h4>
            <p class="stat-value" id="stat-total-value">0 Ar</p>
            <p class="stat-label">Ce mois</p>
          </div>
        </div>

        <div class="stat-card" id="stat-carburant">
          <div class="stat-icon">
            <i class="fas fa-gas-pump"></i>
          </div>
          <div class="stat-info">
            <h4>Carburant</h4>
            <p class="stat-value" id="stat-carburant-value">0 Ar</p>
            <p class="stat-label">Ce mois</p>
          </div>
        </div>

        <div class="stat-card" id="stat-maintenance">
          <div class="stat-icon">
            <i class="fas fa-tools"></i>
          </div>
          <div class="stat-info">
            <h4>Maintenance</h4>
            <p class="stat-value" id="stat-maintenance-value">0 Ar</p>
            <p class="stat-label">Ce mois</p>
          </div>
        </div>

        <div class="stat-card" id="stat-reparation">
          <div class="stat-icon">
            <i class="fas fa-wrench"></i>
          </div>
          <div class="stat-info">
            <h4>Réparations</h4>
            <p class="stat-value" id="stat-reparation-value">0 Ar</p>
            <p class="stat-label">Ce mois</p>
          </div>
        </div>

        <div class="stat-card" id="stat-revenu">
          <div class="stat-icon">
            <i class="fas fa-coins"></i>
          </div>
          <div class="stat-info">
            <h4>Revenus</h4>
            <p class="stat-value" id="stat-revenu-value">0 Ar</p>
            <p class="stat-label">Ce mois</p>
          </div>
        </div>
      </div>

      <!-- Formulaire de versement -->
      <div class="form-container" style="display: none;">
        <form id="versementForm" class="form-versement">
          <div class="form-header">
            <h3><i class="fas fa-file-invoice-dollar"></i> Nouveau versement</h3>
            <button type="button" class="btn-icon" id="closeForm">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <input type="hidden" id="versementId">

          <div class="form-grid">
            <div class="form-group">
              <label for="montant">
                <i class="fas fa-money-bill"></i>
                Montant:
              </label>
              <input type="number" id="montant" required class="form-control" min="0" step="0.01">
            </div>

            <div class="form-group">
              <label for="type">
                <i class="fas fa-tag"></i>
                Type:
              </label>
              <select id="type" required class="form-control">
                <option value="">Sélectionner le type</option>
                <option value="carburant">Carburant</option>
                <option value="maintenance">Maintenance</option>
                <option value="reparation">Réparation</option>
                <option value="revenu">Revenu</option>
              </select>
            </div>

            <div class="form-group">
              <label for="vehicule">
                <i class="fas fa-car"></i>
                Véhicule:
              </label>
              <select id="vehicule" required class="form-control">
                <option value="">Sélectionner le véhicule</option>
              </select>
            </div>

            <div class="form-group">
              <label for="chauffeur">
                <i class="fas fa-user"></i>
                Chauffeur:
              </label>
              <select id="chauffeur" required class="form-control">
                <option value="">Sélectionner le chauffeur</option>
              </select>
            </div>

            <div class="form-group">
              <label for="dateVersement">
                <i class="fas fa-calendar-alt"></i>
                Date:
              </label>
              <input type="date" id="dateVersement" class="form-control" value="${new Date().toISOString().split('T')[0]}">
            </div>

            <div class="form-group full-width">
              <label for="description">
                <i class="fas fa-comment"></i>
                Description:
              </label>
              <textarea id="description" class="form-control" rows="3"></textarea>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn-primary">
              <i class="fas fa-save"></i>
              Enregistrer
            </button>
            <button type="button" class="btn-secondary" id="resetForm">
              <i class="fas fa-undo"></i>
              Réinitialiser
            </button>
          </div>
        </form>
      </div>

      <!-- Liste des versements -->
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th><i class="fas fa-hashtag"></i> ID</th>
              <th><i class="fas fa-money-bill"></i> Montant</th>
              <th><i class="fas fa-calendar-alt"></i> Date</th>
              <th><i class="fas fa-tag"></i> Type</th>
              <th><i class="fas fa-car"></i> Véhicule</th>
              <th><i class="fas fa-user"></i> Chauffeur</th>
              <th><i class="fas fa-cog"></i> Actions</th>
            </tr>
          </thead>
          <tbody id="versementTableBody">
          </tbody>
        </table>
      </div>

      <!-- Notification -->
      <div id="notification" class="notification"></div>

      <style>
        .versements {
          padding: var(--spacing);
          background-color: #f5f7fa;
        }

        .filters {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .stats-overview {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
          margin-top: 20px;
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
          background: linear-gradient(135deg, #dc3545, #bd2130);
        }

        .stat-card:nth-child(5) .stat-icon {
          background: linear-gradient(135deg, #6f42c1, #5a32a3);
        }

        .stat-info h4 {
          margin: 0;
          font-size: 0.9rem;
          color: #666;
        }

        .stat-value {
          margin: 5px 0;
          font-size: 1.5rem;
          font-weight: bold;
          color: #2c3e50;
        }

        .stat-label {
          margin: 0;
          font-size: 0.8rem;
          color: #666;
        }

        .amount {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .amount span {
          font-weight: 600;
          color: #2c3e50;
        }

        .amount small {
          color: #666;
          font-size: 0.8rem;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        .badge-primary {
          background-color: rgba(45, 137, 239, 0.1);
          color: var(--primary-color);
        }

        .badge-warning {
          background-color: rgba(255, 193, 7, 0.1);
          color: #856404;
        }

        .badge-danger {
          background-color: rgba(220, 53, 69, 0.1);
          color: #721c24;
        }

        .form-container {
          background: white;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          margin-bottom: 30px;
          overflow: hidden;
        }

        .form-header {
          background: var(--light-bg);
          padding: 15px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
        }

        .form-versement {
          padding: 20px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        textarea.form-control {
          resize: vertical;
          min-height: 100px;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
        }

        .action-button {
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          padding: 5px;
          border-radius: 4px;
          transition: all 0.3s ease;
        }

        .action-button:hover {
          background: var(--light-bg);
          color: var(--primary-color);
        }

        .action-button.edit:hover {
          color: #ffc107;
        }

        .action-button.delete:hover {
          color: #dc3545;
        }

        @media (max-width: 768px) {
          .versements {
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

          .filters {
            width: 100%;
            flex-direction: column;
          }

          .search-box,
          .filters select {
            width: 100%;
          }

          .stats-overview {
            grid-template-columns: 1fr;
            margin-top: 15px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-versement {
            padding: 15px;
          }

          .action-buttons {
            flex-wrap: wrap;
          }
        }
      </style>
    </main>
  `;
}
