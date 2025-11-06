export function Chauffeur() {
  setTimeout(() => {
    initChauffeurEvents();
  }, 0);

  return `
    <main class="chauffeurs fadeIn">
      <div class="header-actions">
        <h2><i class="fas fa-users"></i> Gestion des chauffeurs</h2>
        <div class="header-controls">
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" id="searchChauffeur" placeholder="Rechercher un chauffeur...">
          </div>
          <button id="btnAjouterChauffeur" class="btn-primary">
            <i class="fas fa-plus"></i>
            Ajouter un chauffeur
          </button>
        </div>
      </div>

      <!-- Notification -->
      <div id="notification" class="notification"></div>

      <!-- Tableau des chauffeurs -->
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th><i class="fas fa-user"></i> Nom</th>
              <th><i class="fas fa-user"></i> Prénom</th>
              <th><i class="fas fa-envelope"></i> Email</th>
              <th><i class="fas fa-phone"></i> Téléphone</th>
              <th><i class="fas fa-map-marker-alt"></i> Adresse</th>
              <th><i class="fas fa-calendar-alt"></i> Date d'embauche</th>
              <th><i class="fas fa-id-card"></i> N° Permis</th>
              <th><i class="fas fa-cog"></i> Actions</th>
            </tr>
          </thead>
          <tbody id="chauffeurTableBody">
          </tbody>
        </table>
      </div>

      <style>
        .chauffeurs {
          padding: var(--spacing);
          background-color: #f5f7fa;
        }

        .header-actions h2 {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #2c3e50;
        }

        .data-table th i {
          margin-right: 8px;
          color: var(--primary-color);
        }

        .table-container {
          background: white;
          border-radius: var(--radius);
          padding: 20px;
          box-shadow: var(--shadow);
          margin-top: 20px;
          overflow-x: auto;
        }

        .data-table tbody td {
          vertical-align: middle;
        }

        .action-buttons {
          display: flex;
          gap: 8px;
          justify-content: flex-end;
        }

        .action-button {
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          padding: 5px;
          border-radius: 4px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .action-button.edit {
          color: var(--primary-color);
        }

        .action-button.delete {
          color: var(--danger-color);
        }

        .action-button:hover {
          background: var(--light-bg);
          transform: translateY(-2px);
        }

        .empty-state {
          text-align: center;
          padding: 40px;
          color: #666;
        }

        .empty-state i {
          font-size: 3rem;
          color: var(--border-color);
          margin-bottom: 15px;
        }

        @media (max-width: 768px) {
          .chauffeurs {
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

          .search-box input {
            width: 100%;
          }

          .table-container {
            margin-top: 15px;
            padding: 10px;
          }

          .data-table th i {
            display: none;
          }
        }
      </style>

      <script>
        function initChauffeurEvents() {
          loadChauffeurs();

          const searchInput = document.getElementById('searchChauffeur');
          if (searchInput) {
            searchInput.addEventListener('input', function(e) {
              const searchTerm = e.target.value.toLowerCase();
              const tbody = document.getElementById('chauffeurTableBody');
              Array.from(tbody.getElementsByTagName('tr')).forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
              });
            });
          }
        }

        async function loadChauffeurs() {
          try {
            const response = await fetch('http://localhost:3000/api/chauffeurs');
            const chauffeurs = await response.json();
            const tbody = document.getElementById('chauffeurTableBody');

            if (chauffeurs.length === 0) {
              tbody.innerHTML = \`
                <tr>
                  <td colspan="8">
                    <div class="empty-state">
                      <i class="fas fa-users"></i>
                      <p>Aucun chauffeur trouvé</p>
                      <button id="btnAjouterPremier" class="btn-primary">
                        <i class="fas fa-plus"></i>
                        Ajouter votre premier chauffeur
                      </button>
                    </div>
                  </td>
                </tr>
              \`;
            } else {
              tbody.innerHTML = chauffeurs.map(c => \`
                <tr>
                  <td>\${c.nom}</td>
                  <td>\${c.prenom}</td>
                  <td>\${c.email}</td>
                  <td>\${c.telephone}</td>
                  <td>\${c.adresse}</td>
                  <td>\${new Date(c.dateEmbauche).toLocaleDateString()}</td>
                  <td>\${c.numeroPermis}</td>
                  <td>
                    <div class="action-buttons">
                      <button onclick="editChauffeur(\${c.id})" class="action-button edit" title="Modifier">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button onclick="deleteChauffeur(\${c.id})" class="action-button delete" title="Supprimer">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              \`).join('');
            }
          } catch (error) {
            console.error('Erreur:', error);
            showNotification('Erreur lors du chargement des chauffeurs', 'error');
          }
        }

        function showNotification(message, type = 'success') {
          const notification = document.getElementById('notification');
          notification.textContent = message;
          notification.className = \`notification \${type}\`;
          notification.classList.add('show');

          setTimeout(() => {
            notification.classList.remove('show');
          }, 3000);
        }
      </script>
    </main>
  `;
}
