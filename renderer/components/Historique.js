//Historique.js//

import { initHistorique } from "./HistoriqueFunctions.js";

export function Historique() {
  setTimeout(() => {
    initHistorique();
  }, 0);

  return `
    <main class="historique fadeIn">
      <div class="header-actions">
        <h2><i class="fas fa-history"></i> Historique des activités</h2>
        <div class="header-controls">
          <div class="filters">
            <div class="search-box">
              <input type="text" id="searchHistorique" placeholder="Rechercher...">
            </div>
            <div class="date-filter">
              <input type="date" id="dateDebut" class="form-control" placeholder="Date début">
              <span>à</span>
              <input type="date" id="dateFin" class="form-control" placeholder="Date fin">
            </div>
            <select id="filterType" class="form-control">
              <option value="">Tous les types</option>
              <option value="affectation">Affectation</option>
              <option value="maintenance">Maintenance</option>
              <option value="versement">Versement</option>
              <option value="reparation">Réparation</option>
            </select>
          </div>
          <button id="btnExport" class="btn-secondary">
            <i class="fas fa-download"></i>
            Exporter
          </button>
        </div>
      </div>

      <!-- Résumé des activités -->
      <div class="stats-overview">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-chart-line"></i>
          </div>
          <div class="stat-info">
            <h4>Total Activités</h4>
            <p class="stat-value">152</p>
            <p class="stat-label">Ce mois</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-exchange-alt"></i>
          </div>
          <div class="stat-info">
            <h4>Affectations</h4>
            <p class="stat-value">45</p>
            <p class="stat-label">Ce mois</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-tools"></i>
          </div>
          <div class="stat-info">
            <h4>Maintenances</h4>
            <p class="stat-value">28</p>
            <p class="stat-label">Ce mois</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-money-bill-wave"></i>
          </div>
          <div class="stat-info">
            <h4>Versements</h4>
            <p class="stat-value">79</p>
            <p class="stat-label">Ce mois</p>
          </div>
        </div>
      </div>

      <!-- Liste des activités -->
      <div class="activities-container">
        <div class="activities-header">
          <h3><i class="fas fa-list"></i> Liste des activités</h3>
          <div class="view-controls">
            <button class="btn-icon active" id="btnListView" title="Vue liste">
              <i class="fas fa-list"></i>
            </button>
            <button class="btn-icon" id="btnTimelineView" title="Vue chronologique">
              <i class="fas fa-stream"></i>
            </button>
          </div>
        </div>

        <!-- Vue liste -->
        <div id="listView" class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th><i class="fas fa-calendar"></i> Date</th>
                <th><i class="fas fa-tag"></i> Type</th>
                <th><i class="fas fa-car"></i> Véhicule</th>
                <th><i class="fas fa-user"></i> Chauffeur</th>
                <th><i class="fas fa-info-circle"></i> Description</th>
                <th><i class="fas fa-chart-bar"></i> Statut</th>
                <th><i class="fas fa-cog"></i> Actions</th>
              </tr>
            </thead>
            <tbody id="historiqueTableBody">

            </tbody>
          </table>
        </div>

        <!-- Vue chronologique -->
        <div id="timelineView" class="timeline-container" style="display: none;">
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-date">
                <i class="fas fa-circle"></i>
                <span>05/11/2025</span>
                <small>14:30</small>
              </div>
              <div class="timeline-content">
                <div class="timeline-header">
                  <span class="badge badge-primary">Affectation</span>
                  <div class="action-buttons">
                    <button class="action-button view" title="Voir les détails">
                      <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-button print" title="Imprimer">
                      <i class="fas fa-print"></i>
                    </button>
                  </div>
                </div>
                <div class="timeline-body">
                  <div class="vehicle-info">
                    <i class="fas fa-car"></i>
                    <span>Peugeot 208</span>
                  </div>
                  <div class="user-info">
                    <i class="fas fa-user-circle"></i>
                    <span>Rasoa Jean</span>
                  </div>
                  <p>Affectation pour mission de livraison</p>
                  <span class="badge badge-success">Terminé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        .historique {
          padding: var(--spacing);
          background-color: #f5f7fa;
        }

        .header-controls .filters {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .date-filter {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .date-filter span {
          color: #666;
        }

        .stats-overview {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin: 20px 0 30px;
        }

        .activities-container {
          background: white;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          overflow: hidden;
        }

        .activities-header {
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
          background: var(--light-bg);
        }

        .activities-header h3 {
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #2c3e50;
        }

        .view-controls {
          display: flex;
          gap: 8px;
        }

        .btn-icon {
          background: none;
          border: none;
          color: #666;
          padding: 8px;
          border-radius: var(--radius);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-icon:hover,
        .btn-icon.active {
          background: var(--primary-color);
          color: white;
        }

        .date-info {
          display: flex;
          flex-direction: column;
        }

        .date-info small {
          color: #666;
          font-size: 0.8rem;
        }

        .timeline-container {
          padding: 20px;
        }

        .timeline {
          position: relative;
          padding-left: 30px;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--border-color);
        }

        .timeline-item {
          position: relative;
          margin-bottom: 30px;
        }

        .timeline-date {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
          color: #666;
        }

        .timeline-date i {
          color: var(--primary-color);
          font-size: 0.8rem;
        }

        .timeline-date small {
          color: #666;
        }

        .timeline-content {
          background: var(--light-bg);
          border-radius: var(--radius);
          padding: 15px;
        }

        .timeline-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .timeline-body {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        /* === Modal === */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          border-radius: 10px;
          width: 400px;
          max-width: 90%;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
          animation: fadeIn 0.3s ease;
        }

        .modal-header, .modal-footer {
          padding: 15px;
          border-bottom: 1px solid #eee;
        }

        .modal-body {
          padding: 15px;
        }

        .modal-header h3 {
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .close-modal {
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #888;
          cursor: pointer;
          float: right;
          margin-top: -2rem;
        }

        .close-modal:hover {
          color: var(--danger-color);
        }

        .action-buttons {
          display: flex;
          gap: 10px;
        }

        .action-button {
          background: none;
          border: none;
          color: #555;
          font-size: 1rem;
          cursor: pointer;
          transition: color 0.2s ease, transform 0.2s ease;
        }

        .action-button:hover {
          color: var(--primary-color);
          transform: scale(1.1);
        }

        .action-button.view:hover {
          color: #007bff;
        }

        .action-button.print:hover {
          color: #28a745;
        }

        .modal {
          display: none;
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.4);
          justify-content: center; align-items: center;
          z-index: 999;
        }
        .modal-content {
          background: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }

        .btn {
          padding: 8px 14px;
          border: none;
          border-radius: 6px;
          margin: 0 5px;
          cursor: pointer;
        }
        .btn.primary { background: #007bff; color: white; }
        .btn.success { background: #28a745; color: white; }
        .close-modal { background: #ffff; }

        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        @media (max-width: 768px) {
          .historique {
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

          .date-filter {
            width: 100%;
            flex-wrap: wrap;
          }

          .date-filter input {
            flex: 1;
            min-width: 120px;
          }

          .stats-overview {
            grid-template-columns: 1fr;
          }

          .activities-header {
            flex-direction: column;
            gap: 10px;
            align-items: flex-start;
          }

          .timeline {
            padding-left: 20px;
          }
        }
      </style>

      <script>
        document.addEventListener('DOMContentLoaded', function() {
          initHistoriqueEvents();
        });

        function initHistoriqueEvents() {
          // Gestionnaire de recherche
          const searchInput = document.getElementById('searchHistorique');
          if (searchInput) {
            searchInput.addEventListener('input', filterActivities);
          }

          // Gestionnaire de filtre par type
          const filterType = document.getElementById('filterType');
          if (filterType) {
            filterType.addEventListener('change', filterActivities);
          }

          // Gestionnaire de filtre par date
          const dateDebut = document.getElementById('dateDebut');
          const dateFin = document.getElementById('dateFin');
          if (dateDebut && dateFin) {
            dateDebut.addEventListener('change', filterActivities);
            dateFin.addEventListener('change', filterActivities);
          }

          // Gestionnaire de vue
          const btnListView = document.getElementById('btnListView');
          const btnTimelineView = document.getElementById('btnTimelineView');
          const listView = document.getElementById('listView');
          const timelineView = document.getElementById('timelineView');

          if (btnListView && btnTimelineView) {
            btnListView.addEventListener('click', function() {
              btnListView.classList.add('active');
              btnTimelineView.classList.remove('active');
              listView.style.display = 'block';
              timelineView.style.display = 'none';
            });

            btnTimelineView.addEventListener('click', function() {
              btnTimelineView.classList.add('active');
              btnListView.classList.remove('active');
              timelineView.style.display = 'block';
              listView.style.display = 'none';
            });
          }

          // Gestionnaire d'export
          const btnExport = document.getElementById('btnExport');
          if (btnExport) {
            btnExport.addEventListener('click', exportHistorique);
          }
        }

        function filterActivities() {
          const searchTerm = document.getElementById('searchHistorique').value.toLowerCase();
          const type = document.getElementById('filterType').value.toLowerCase();
          const dateDebut = document.getElementById('dateDebut').value;
          const dateFin = document.getElementById('dateFin').value;

          const tbody = document.getElementById('historiqueTableBody');
          Array.from(tbody.getElementsByTagName('tr')).forEach(row => {
            const text = row.textContent.toLowerCase();
            const date = row.querySelector('.date-info span').textContent;
            const typeMatch = type === '' || row.querySelector('.badge').textContent.toLowerCase() === type;
            const searchMatch = text.includes(searchTerm);
            const dateMatch = isDateInRange(date, dateDebut, dateFin);

            row.style.display = (typeMatch && searchMatch && dateMatch) ? '' : 'none';
          });
        }

        function isDateInRange(date, start, end) {
          if (!start && !end) return true;
          const current = new Date(date.split('/').reverse().join('-'));
          if (start && !end) return current >= new Date(start);
          if (!start && end) return current <= new Date(end);
          return current >= new Date(start) && current <= new Date(end);
        }

        function exportHistorique() {
          // TODO: Implémenter l'export (CSV, PDF, etc.)
          console.log('Export historique...');
        }
      </script>

      <!-- Modal de détails -->
      <div id="activityModal" class="modal-overlay" style="display:none;">
        <div class="modal-content">
          <div class="modal-header">
            <h3><i class="fas fa-eye"></i> Détails de l'activité</h3>
            <button class="close-modal">&times;</button>
          </div>
          <div class="modal-body">
            <p><strong>Date :</strong> <span id="modalDate"></span></p>
            <p><strong>Heure :</strong> <span id="modalHeure"></span></p>
            <p><strong>Type :</strong> <span id="modalType"></span></p>
            <p><strong>Véhicule :</strong> <span id="modalVehicule"></span></p>
            <p><strong>Chauffeur :</strong> <span id="modalChauffeur"></span></p>
            <p><strong>Description :</strong> <span id="modalDescription"></span></p>
            <p><strong>Statut :</strong> <span id="modalStatut"></span></p>
          </div>
        </div>
      </div>

      <!-- Modal de choix d'impression / téléchargement -->
      <div id="pdfChoiceModal" class="modal">
        <div class="modal-content" style="max-width: 400px; text-align: center; position: relative;">
          <button class="close-modal">&times;</button>
            <h3 style="margin-top: 10px;">Choisir une action</h3>
              <p>Souhaitez-vous imprimer ou télécharger ce document en PDF ?</p>
            <div style="margin-top: 20px;">
              <button id="btnImprimer" class="btn primary">
                <i class="fas fa-print"></i> Imprimer
              </button>
              <button id="btnTelecharger" class="btn success">
                <i class="fas fa-file-pdf"></i> Télécharger
              </button>
            </div>
        </div>
      </div>

    </main>
  `;
}
