export function Fournisseur() {
  return `
    <main class="fournisseurs fadeIn">
      <div class="header-actions">
        <h2><i class="fas fa-truck"></i> Gestion des fournisseurs</h2>
        <div class="header-controls">
          <div class="filters">
            <div class="search-box">
              <i class="fas fa-search"></i>
              <input type="text" id="searchFournisseur" placeholder="Rechercher un fournisseur...">
            </div>
            <select id="filterType" class="form-control">
              <option value="">Tous les types</option>
              <option value="carburant">Carburant</option>
              <option value="pieces">Pièces détachées</option>
              <option value="services">Services</option>
            </select>
          </div>
          <button id="btnAjouterFournisseur" class="btn-primary">
            <i class="fas fa-plus"></i>
            Nouveau fournisseur
          </button>
        </div>
      </div>

      <!-- Statistiques -->
      <div class="stats-overview">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-store"></i>
          </div>
          <div class="stat-info">
            <h4>Total Fournisseurs</h4>
            <p class="stat-value">15</p>
            <p class="stat-label">Actifs</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-gas-pump"></i>
          </div>
          <div class="stat-info">
            <h4>Fournisseurs Carburant</h4>
            <p class="stat-value">5</p>
            <p class="stat-label">Partenaires</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-cogs"></i>
          </div>
          <div class="stat-info">
            <h4>Fournisseurs Pièces</h4>
            <p class="stat-value">7</p>
            <p class="stat-label">Actifs</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-tools"></i>
          </div>
          <div class="stat-info">
            <h4>Services</h4>
            <p class="stat-value">3</p>
            <p class="stat-label">Partenaires</p>
          </div>
        </div>
      </div>

      <!-- Formulaire fournisseur -->
      <div class="form-container">
        <form id="fournisseurForm" class="form-fournisseur">
          <div class="form-header">
            <h3><i class="fas fa-building"></i> Nouveau fournisseur</h3>
            <button type="button" class="btn-icon" id="closeForm">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label for="nom">
                <i class="fas fa-building"></i>
                Nom de l'entreprise:
              </label>
              <input type="text" id="nom" required class="form-control">
            </div>

            <div class="form-group">
              <label for="type">
                <i class="fas fa-tag"></i>
                Type:
              </label>
              <select id="type" required class="form-control">
                <option value="">Sélectionner le type</option>
                <option value="carburant">Carburant</option>
                <option value="pieces">Pièces détachées</option>
                <option value="services">Services</option>
              </select>
            </div>

            <div class="form-group">
              <label for="contact">
                <i class="fas fa-phone"></i>
                Contact:
              </label>
              <input type="tel" id="contact" required class="form-control"
                pattern="[0-9]{10}"
                title="Numéro de téléphone à 10 chiffres">
            </div>

            <div class="form-group">
              <label for="email">
                <i class="fas fa-envelope"></i>
                Email:
              </label>
              <input type="email" id="email" required class="form-control">
            </div>

            <div class="form-group full-width">
              <label for="adresse">
                <i class="fas fa-map-marker-alt"></i>
                Adresse:
              </label>
              <textarea id="adresse" required class="form-control" rows="2"></textarea>
            </div>

            <div class="form-group full-width">
              <label for="description">
                <i class="fas fa-info-circle"></i>
                Description des services:
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

      <!-- Liste des fournisseurs -->
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th><i class="fas fa-building"></i> Entreprise</th>
              <th><i class="fas fa-tag"></i> Type</th>
              <th><i class="fas fa-phone"></i> Contact</th>
              <th><i class="fas fa-envelope"></i> Email</th>
              <th><i class="fas fa-map-marker-alt"></i> Adresse</th>
              <th><i class="fas fa-check-circle"></i> Statut</th>
              <th><i class="fas fa-cog"></i> Actions</th>
            </tr>
          </thead>
          <tbody id="fournisseurTableBody">
            <tr>
              <td>
                <div class="company-info">
                  <i class="fas fa-building"></i>
                  <span>Total Madagascar</span>
                </div>
              </td>
              <td><span class="badge badge-primary">Carburant</span></td>
              <td>020 22 123 45</td>
              <td>contact@total.mg</td>
              <td>Antananarivo</td>
              <td><span class="badge badge-success">Actif</span></td>
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
        .fournisseurs {
          padding: var(--spacing);
          background-color: #f5f7fa;
        }

        .company-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .company-info i {
          color: var(--primary-color);
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

        .badge-success {
          background-color: rgba(40, 167, 69, 0.1);
          color: var(--success-color);
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
          background: linear-gradient(135deg, #17a2b8, #138496);
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

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          padding: 20px;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .table-container {
          background: white;
          border-radius: var(--radius);
          padding: 20px;
          box-shadow: var(--shadow);
        }

        @media (max-width: 768px) {
          .fournisseurs {
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
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .table-container {
            padding: 10px;
          }

          .action-buttons {
            flex-wrap: wrap;
          }
        }
      </style>

      <script>
        document.addEventListener('DOMContentLoaded', function() {
          initFournisseurEvents();
        });

        function initFournisseurEvents() {
          const searchInput = document.getElementById('searchFournisseur');
          if (searchInput) {
            searchInput.addEventListener('input', function(e) {
              filterFournisseurs();
            });
          }

          const filterType = document.getElementById('filterType');
          if (filterType) {
            filterType.addEventListener('change', function() {
              filterFournisseurs();
            });
          }

          const form = document.getElementById('fournisseurForm');
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

        function filterFournisseurs() {
          const searchTerm = document.getElementById('searchFournisseur').value.toLowerCase();
          const type = document.getElementById('filterType').value.toLowerCase();
          const tbody = document.getElementById('fournisseurTableBody');

          Array.from(tbody.getElementsByTagName('tr')).forEach(row => {
            const text = row.textContent.toLowerCase();
            const typeMatch = type === '' || row.querySelector('.badge').textContent.toLowerCase() === type;
            const searchMatch = text.includes(searchTerm);
            row.style.display = (typeMatch && searchMatch) ? '' : 'none';
          });
        }
      </script>
    </main>
  `;
}
