export function Vehicule() {
  return `
    <main class="vehicules fadeIn">
      <div class="header-actions">
        <h2><i class="fas fa-car"></i> Gestion des véhicules</h2>
        <div class="header-controls">
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" id="searchVehicule" placeholder="Rechercher un véhicule...">
          </div>
          <button id="btnAddVehicule" class="btn-primary">
            <i class="fas fa-plus"></i>
            Ajouter un véhicule
          </button>
        </div>
      </div>

      <!-- Formulaire d'ajout/modification -->
      <div class="form-container">
        <form id="vehiculeForm" class="form-vehicule">
          <div class="form-header">
            <h3 id="formTitle">Ajouter un véhicule</h3>
            <button type="button" id="closeForm" class="btn-icon">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <input type="hidden" id="vehiculeId">

          <div class="form-grid">
            <div class="form-group">
              <label for="immatriculation">
                <i class="fas fa-id-card"></i>
                Immatriculation:
              </label>
              <input type="text" id="immatriculation" required>
            </div>

            <div class="form-group">
              <label for="marque">
                <i class="fas fa-trademark"></i>
                Marque:
              </label>
              <input type="text" id="marque" required>
            </div>

            <div class="form-group">
              <label for="modele">
                <i class="fas fa-car-side"></i>
                Modèle:
              </label>
              <input type="text" id="modele" required>
            </div>

            <div class="form-group">
              <label for="dateAchat">
                <i class="fas fa-calendar-alt"></i>
                Date d'achat:
              </label>
              <input type="date" id="dateAchat" required>
            </div>

            <div class="form-group">
              <label for="kilometrage">
                <i class="fas fa-tachometer-alt"></i>
                Kilométrage:
              </label>
              <input type="number" id="kilometrage" required>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" id="submitVehicule" class="btn-primary">
              <i class="fas fa-save"></i>
              Ajouter
            </button>
            <button type="button" id="resetForm" class="btn-secondary">
              <i class="fas fa-undo"></i>
              Réinitialiser
            </button>
          </div>
        </form>
      </div>

      <!-- Tableau des véhicules -->
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Immatriculation</th>
              <th>Marque</th>
              <th>Modèle</th>
              <th>Date d'achat</th>
              <th>Kilométrage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="vehiculeTableBody">
          </tbody>
        </table>
      </div>

      <!-- Notification -->
      <div id="notification" class="notification"></div>

      <style>
        .vehicules {
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
          color: #2c3e50;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .form-vehicule {
          padding: 20px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
        }

        .form-group {
          margin-bottom: 0;
        }

        .form-group label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          color: #2c3e50;
        }

        .form-group label i {
          color: var(--primary-color);
          width: 16px;
        }

        .form-actions {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid var(--border-color);
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th,
        .data-table td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid var(--border-color);
        }

        .data-table th {
          background-color: var(--light-bg);
          font-weight: 600;
          color: #2c3e50;
        }

        .data-table tbody tr:hover {
          background-color: rgba(45, 137, 239, 0.05);
        }

        .action-buttons {
          display: flex;
          gap: 8px;
        }

        .action-buttons button {
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          padding: 5px;
          border-radius: 4px;
          transition: all 0.3s ease;
        }

        .action-buttons button:hover {
          background: var(--light-bg);
          color: var(--primary-color);
        }

        @media (max-width: 768px) {
          .vehicules {
            padding: 10px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .header-actions {
            flex-direction: column;
            gap: 15px;
          }

          .header-controls {
            width: 100%;
          }

          .search-box {
            width: 100%;
          }

          .search-box input {
            width: 100%;
          }

          .form-actions {
            flex-direction: column;
          }

          .form-actions button {
            width: 100%;
          }
        }
      </style>

      <script>
        // Fonction pour charger les véhicules
        async function loadVehicules() {
          try {
            const response = await fetch('http://localhost:3000/api/vehicules');
            const vehicules = await response.json();
            const tbody = document.getElementById('vehiculeTableBody');
            tbody.innerHTML = vehicules.map(v => \`
              <tr>
                <td>\${v.id}</td>
                <td>\${v.immatriculation}</td>
                <td>\${v.marque}</td>
                <td>\${v.modele}</td>
                <td>\${new Date(v.dateAchat).toLocaleDateString()}</td>
                <td>\${v.kilometrage}</td>
                <td class="action-buttons">
                  <button onclick="editVehicule(\${v.id})" title="Modifier">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button onclick="deleteVehicule(\${v.id})" title="Supprimer">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            \`).join('');
          } catch (error) {
            console.error('Erreur:', error);
            showNotification('Erreur lors du chargement des véhicules', 'error');
          }
        }

        // Fonction pour soumettre le formulaire
        document.getElementById('vehiculeForm').addEventListener('submit', async (e) => {
          e.preventDefault();
          const vehiculeId = document.getElementById('vehiculeId').value;
          const vehiculeData = {
            immatriculation: document.getElementById('immatriculation').value,
            marque: document.getElementById('marque').value,
            modele: document.getElementById('modele').value,
            dateAchat: document.getElementById('dateAchat').value,
            kilometrage: parseInt(document.getElementById('kilometrage').value)
          };

          try {
            const url = vehiculeId
              ? \`http://localhost:3000/api/vehicules/\${vehiculeId}\`
              : 'http://localhost:3000/api/vehicules';

            const response = await fetch(url, {
              method: vehiculeId ? 'PUT' : 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(vehiculeData)
            });

            if (response.ok) {
              showNotification(vehiculeId ? 'Véhicule modifié avec succès' : 'Véhicule ajouté avec succès');
              resetForm();
              loadVehicules();
            }
          } catch (error) {
            console.error('Erreur:', error);
            showNotification('Erreur lors de l\'enregistrement', 'error');
          }
        });

        // Fonction pour éditer un véhicule
        async function editVehicule(id) {
          try {
            const response = await fetch(\`http://localhost:3000/api/vehicules/\${id}\`);
            const vehicule = await response.json();

            document.getElementById('vehiculeId').value = vehicule.id;
            document.getElementById('immatriculation').value = vehicule.immatriculation;
            document.getElementById('marque').value = vehicule.marque;
            document.getElementById('modele').value = vehicule.modele;
            document.getElementById('dateAchat').value = vehicule.dateAchat.split('T')[0];
            document.getElementById('kilometrage').value = vehicule.kilometrage;

            document.getElementById('submitVehicule').innerHTML = '<i class="fas fa-save"></i> Modifier';
            document.getElementById('formTitle').textContent = 'Modifier un véhicule';

            // Scroll to form
            document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
          } catch (error) {
            console.error('Erreur:', error);
            showNotification('Erreur lors du chargement du véhicule', 'error');
          }
        }

        // Fonction pour supprimer un véhicule
        async function deleteVehicule(id) {
          if (confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
            try {
              const response = await fetch(\`http://localhost:3000/api/vehicules/\${id}\`, {
                method: 'DELETE'
              });
              if (response.ok) {
                showNotification('Véhicule supprimé avec succès');
                loadVehicules();
              }
            } catch (error) {
              console.error('Erreur:', error);
              showNotification('Erreur lors de la suppression', 'error');
            }
          }
        }

        // Fonction pour réinitialiser le formulaire
        function resetForm() {
          document.getElementById('vehiculeForm').reset();
          document.getElementById('vehiculeId').value = '';
          document.getElementById('submitVehicule').innerHTML = '<i class="fas fa-save"></i> Ajouter';
          document.getElementById('formTitle').textContent = 'Ajouter un véhicule';
        }

        // Event listeners
        document.getElementById('resetForm').addEventListener('click', resetForm);
        document.getElementById('closeForm').addEventListener('click', () => {
          resetForm();
        });

        // Fonction pour afficher les notifications
        function showNotification(message, type = 'success') {
          const notification = document.getElementById('notification');
          notification.textContent = message;
          notification.className = \`notification \${type}\`;
          notification.classList.add('show');

          setTimeout(() => {
            notification.classList.remove('show');
          }, 3000);
        }

        // Recherche de véhicules
        document.getElementById('searchVehicule').addEventListener('input', function(e) {
          const searchTerm = e.target.value.toLowerCase();
          const tbody = document.getElementById('vehiculeTableBody');
          Array.from(tbody.getElementsByTagName('tr')).forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
          });
        });

        // Charger les véhicules au chargement de la page
        loadVehicules();
      </script>
    </main>
  `;
}
