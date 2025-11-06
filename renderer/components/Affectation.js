export function Affectation() {
  return `
    <main class="affectations fadeIn">
      <div class="header-actions">
        <h2><i class="fas fa-exchange-alt"></i> Gestion des affectations</h2>
        <div class="header-controls">
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" id="searchAffectation" placeholder="Rechercher une affectation...">
          </div>
          <button id="btnAjouterAffectation" class="btn-primary">
            <i class="fas fa-plus"></i>
            Nouvelle affectation
          </button>
        </div>
      </div>

      <!-- Formulaire d'affectation -->
      <div class="form-container">
        <form id="affectationForm" class="form-affectation">
          <div class="form-header">
            <h3><i class="fas fa-clipboard-list"></i> Créer une affectation</h3>
            <button type="button" class="btn-icon" id="closeForm">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <label for="vehicule">
                <i class="fas fa-car"></i>
                Véhicule:
              </label>
              <select id="vehicule" required class="form-control">
                <option value="">Sélectionner un véhicule</option>
              </select>
            </div>

            <div class="form-group">
              <label for="chauffeur">
                <i class="fas fa-user"></i>
                Chauffeur:
              </label>
              <select id="chauffeur" required class="form-control">
                <option value="">Sélectionner un chauffeur</option>
              </select>
            </div>

            <div class="form-group">
              <label for="dateDebut">
                <i class="fas fa-calendar-alt"></i>
                Date de début:
              </label>
              <input type="datetime-local" id="dateDebut" required class="form-control">
            </div>

            <div class="form-group">
              <label for="dateFin">
                <i class="fas fa-calendar-alt"></i>
                Date de fin:
              </label>
              <input type="datetime-local" id="dateFin" required class="form-control">
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

      <!-- Liste des affectations -->
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th><i class="fas fa-hashtag"></i> ID</th>
              <th><i class="fas fa-car"></i> Véhicule</th>
              <th><i class="fas fa-user"></i> Chauffeur</th>
              <th><i class="fas fa-clock"></i> Date début</th>
              <th><i class="fas fa-clock"></i> Date fin</th>
              <th><i class="fas fa-info-circle"></i> Statut</th>
              <th><i class="fas fa-cog"></i> Actions</th>
            </tr>
          </thead>
          <tbody id="affectationTableBody">
            <tr>
              <td>1</td>
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
              <td>2025-02-10 08:00</td>
              <td>2025-02-20 18:00</td>
              <td><span class="badge badge-success">Terminée</span></td>
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
            <tr>
              <td>2</td>
              <td>
                <div class="vehicle-info">
                  <i class="fas fa-car"></i>
                  <span>Toyota Corolla</span>
                </div>
              </td>
              <td>
                <div class="driver-info">
                  <i class="fas fa-user-circle"></i>
                  <span>Rakoto Marie</span>
                </div>
              </td>
              <td>2025-02-15 09:00</td>
              <td>2025-02-25 17:00</td>
              <td><span class="badge badge-warning">En cours</span></td>
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
        .affectations {
          padding: var(--spacing);
          background-color: #f5f7fa;
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

        .form-header h3 {
          margin: 0;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #2c3e50;
        }

        .form-affectation {
          padding: 20px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .vehicle-info,
        .driver-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .vehicle-info i,
        .driver-info i {
          color: var(--primary-color);
          font-size: 1.1rem;
        }

        .data-table th i {
          margin-right: 8px;
          color: var(--primary-color);
        }

        .action-buttons {
          display: flex;
          gap: 8px;
          justify-content: flex-end;
        }

        .action-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px;
          border-radius: 4px;
          transition: all 0.3s ease;
        }

        .action-button.view {
          color: var(--primary-color);
        }

        .action-button.edit {
          color: #ffc107;
        }

        .action-button.delete {
          color: var(--danger-color);
        }

        .action-button:hover {
          background: var(--light-bg);
          transform: translateY(-2px);
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

        .badge-success {
          background-color: rgba(40, 167, 69, 0.1);
          color: #28a745;
        }

        .badge-warning {
          background-color: rgba(255, 193, 7, 0.1);
          color: #ffc107;
        }

        @media (max-width: 768px) {
          .affectations {
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

          .search-box {
            width: 100%;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .action-buttons {
            flex-wrap: wrap;
          }

          .data-table th i {
            display: none;
          }
        }
      </style>

      <script>
        document.addEventListener('DOMContentLoaded', function() {
          initAffectationEvents();
          loadVehicules();
          loadChauffeurs();
        });

        function initAffectationEvents() {
          const searchInput = document.getElementById('searchAffectation');
          if (searchInput) {
            searchInput.addEventListener('input', function(e) {
              const searchTerm = e.target.value.toLowerCase();
              const tbody = document.getElementById('affectationTableBody');
              Array.from(tbody.getElementsByTagName('tr')).forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
              });
            });
          }

          const form = document.getElementById('affectationForm');
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
