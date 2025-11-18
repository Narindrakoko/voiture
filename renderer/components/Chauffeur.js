import { initChauffeur } from './ChauffeurFunctions.js';

export function Chauffeur() {
  setTimeout(() => {
    initChauffeur();
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
          <button id="btnToggleForm" class="btn-primary">
            <i class="fas fa-plus" id="toggleFormIcon"></i>
            <span id="toggleFormText">Ajouter un chauffeur</span>
          </button>
        </div>
      </div>

      <!-- Formulaire d'ajout/modification -->
      <div class="form-container" id="formContainer" style="display: none;">
        <form id="chauffeurForm" class="form-chauffeur">
          <div class="form-header">
            <h3 id="formTitle">Ajouter un chauffeur</h3>
            <button type="button" id="closeForm" class="btn-icon">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <input type="hidden" id="chauffeurId">

          <div class="form-grid">
            <div class="form-group">
              <label for="nom">
                <i class="fas fa-user"></i>
                Nom:
              </label>
              <input type="text" id="nom" required>
            </div>

            <div class="form-group">
              <label for="prenom">
                <i class="fas fa-user"></i>
                Prénom:
              </label>
              <input type="text" id="prenom" required>
            </div>

            <div class="form-group">
              <label for="email">
                <i class="fas fa-envelope"></i>
                Email:
              </label>
              <input type="email" id="email" required>
            </div>

            <div class="form-group">
              <label for="telephone">
                <i class="fas fa-phone"></i>
                Téléphone:
              </label>
              <input type="tel" id="telephone" required>
            </div>

            <div class="form-group">
              <label for="adresse">
                <i class="fas fa-map-marker-alt"></i>
                Adresse:
              </label>
              <input type="text" id="adresse" required>
            </div>

            <div class="form-group">
              <label for="dateEmbauche">
                <i class="fas fa-calendar-alt"></i>
                Date d'embauche:
              </label>
              <input type="date" id="dateEmbauche" required>
            </div>

            <div class="form-group">
              <label for="numeroPermis">
                <i class="fas fa-id-card"></i>
                N° Permis:
              </label>
              <input type="text" id="numeroPermis" required>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" id="submitChauffeur" class="btn-primary">
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

      <!-- Tableau des chauffeurs -->
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Adresse</th>
              <th>Date d'embauche</th>
              <th>N° Permis</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="chauffeurTableBody">
          </tbody>
        </table>
      </div>

      <!-- Notification -->
      <div id="notification" class="notification"></div>

      <style>
        .chauffeurs {
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

        .form-chauffeur {
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

        .modal {
          display: none;
          position: fixed;
          z-index: 1000;
          padding-top: 100px;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgba(0,0,0,0.5);
        }
        .modal-content {
          background-color: #fefefe;
          margin: auto;
          padding: 20px;
          border-radius: 10px;
          width: 400px;
          position: relative;
        }
        .close {
          color: #aaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
          cursor: pointer;
        }
        .close:hover { color: #000; }
        textarea { width: 100%; margin-top: 10px; padding: 10px; border-radius: 5px; }
        button { margin-top: 10px; }

        @media (max-width: 768px) {
          .chauffeurs {
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

      <!-- Modal pour notifier un chauffeur -->
<div id="modalNotifier" class="modal">
  <div class="modal-content">
    <span id="closeModal" class="close">&times;</span>
    <h2>Envoyer une notification au chauffeur</h2>
    <textarea id="modalMessage" placeholder="Écrivez votre message ici..." rows="6"></textarea>
    <button id="sendModalMessage" class="btn-primary">Envoyer</button>
  </div>
</div>
    </main>
  `;
}
