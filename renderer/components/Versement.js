export function Versement() {
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
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-money-bill-wave"></i>
          </div>
          <div class="stat-info">
            <h4>Total Versements</h4>
            <p class="stat-value">1,250,000 Ar</p>
            <p class="stat-label">Ce mois</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-gas-pump"></i>
          </div>
          <div class="stat-info">
            <h4>Carburant</h4>
            <p class="stat-value">450,000 Ar</p>
            <p class="stat-label">Ce mois</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-tools"></i>
          </div>
          <div class="stat-info">
            <h4>Maintenance</h4>
            <p class="stat-value">350,000 Ar</p>
            <p class="stat-label">Ce mois</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-wrench"></i>
          </div>
          <div class="stat-info">
            <h4>Réparations</h4>
            <p class="stat-value">450,000 Ar</p>
            <p class="stat-label">Ce mois</p>
          </div>
        </div>
      </div>

      <!-- Formulaire de versement -->
      <div class="form-container">
        <form id="versementForm" class="form-versement">
          <div class="form-header">
            <h3><i class="fas fa-file-invoice-dollar"></i> Nouveau versement</h3>
            <button type="button" class="btn-icon" id="closeForm">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label for="montant">
                <i class="fas fa-money-bill"></i>
                Montant:
              </label>
              <input type="number" id="montant" required class="form-control" min="0">
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
            <tr>
              <td>1</td>
              <td>
                <div class="amount">
                  <span>250,000</span>
                  <small>Ar</small>
                </div>
              </td>
              <td>2025-03-05</td>
              <td><span class="badge badge-primary">Carburant</span></td>
              <td>
                <div class="vehicle-info">
                  <i class="fas fa-car"></i>
                  <span>Peugeot 208</span>
                </div>
              </td>
              <td>
                <div class="driver-info">
                  <i class="fas fa-user-circle"></i>
                  <span>Rasoa Jean</span>
                </div>
              </td>
              <td>
                <div class="action-buttons">
                  <button class="action-button view" title="Voir les détails">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button class="action-button edit" title="Modifier">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="action-button delete" title="Supprimer">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

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

      <script>
        document.addEventListener('DOMContentLoaded', function() {
          initVersementEvents();
          loadVehicules();
          loadChauffeurs();
        });

        function initVersementEvents() {
          const searchInput = document.getElementById('searchVersement');
          if (searchInput) {
            searchInput.addEventListener('input', function(e) {
              filterVersements();
            });
          }

          const filterType = document.getElementById('filterType');
          if (filterType) {
            filterType.addEventListener('change', function() {
              filterVersements();
            });
          }

          const form = document.getElementById('versementForm');
          if (form) {
            form.addEventListener('submit', function(e) {
              e.preventDefault();
              // TODO: Implémenter la logique de soumission
            });
          }

          const resetBtn = document.getElementById('resetForm');
          if (resetBtn) {
            resetBtn.addEventListener('click', function() {
              form.reset();
            });
          }

          const closeBtn = document.getElementById('closeForm');
          if (closeBtn) {
            closeBtn.addEventListener('click', function() {
              form.reset();
            });
          }
        }

        function filterVersements() {
          const searchTerm = document.getElementById('searchVersement').value.toLowerCase();
          const type = document.getElementById('filterType').value.toLowerCase();
          const tbody = document.getElementById('versementTableBody');

          Array.from(tbody.getElementsByTagName('tr')).forEach(row => {
            const text = row.textContent.toLowerCase();
            const typeMatch = type === '' || row.querySelector('.badge').textContent.toLowerCase() === type;
            const searchMatch = text.includes(searchTerm);
            row.style.display = (typeMatch && searchMatch) ? '' : 'none';
          });
        }

        async function loadVehicules() {
          try {
            const response = await fetch('http://localhost:3000/api/vehicules');
            const vehicules = await response.json();
            const select = document.getElementById('vehicule');
            vehicules.forEach(v => {
              const option = document.createElement('option');
              option.value = v.id;
              option.textContent = \`\${v.marque} \${v.modele} (\${v.immatriculation})\`;
              select.appendChild(option);
            });
          } catch (error) {
            console.error('Erreur:', error);
          }
        }

        async function loadChauffeurs() {
          try {
            const response = await fetch('http://localhost:3000/api/chauffeurs');
            const chauffeurs = await response.json();
            const select = document.getElementById('chauffeur');
            chauffeurs.forEach(c => {
              const option = document.createElement('option');
              option.value = c.id;
              option.textContent = \`\${c.nom} \${c.prenom}\`;
              select.appendChild(option);
            });
          } catch (error) {
            console.error('Erreur:', error);
          }
        }
      </script>
    </main>
  `;
}
