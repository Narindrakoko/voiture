import { initFournisseur } from './FournisseurFunctions.js';

export function Fournisseur() {
  setTimeout(() => {
    initFournisseur();
  }, 0);

  return `
    <main class="fournisseurs fadeIn">
      <div class="header-actions">
        <h2><i class="fas fa-truck"></i> Gestion des fournisseurs</h2>
        <div class="header-controls">
          <div class="search-box">
            <i class="fas fa-search"></i>
            <input type="text" id="searchFournisseur" placeholder="Rechercher un fournisseur...">
          </div>
          <button id="btnToggleForm" class="btn-primary">
            <i class="fas fa-plus" id="toggleFormIcon"></i>
            <span id="toggleFormText">Ajouter un fournisseur</span>
          </button>
        </div>
      </div>

      <!-- Formulaire d'ajout/modification -->
      <div class="form-container" id="formContainer" style="display: none;">
        <form id="fournisseurForm" class="form-fournisseur">
          <div class="form-header">
            <h3 id="formTitle">Ajouter un fournisseur</h3>
            <button type="button" id="closeForm" class="btn-icon">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <input type="hidden" id="fournisseurId">

          <div class="form-grid">
            <div class="form-group">
              <label for="nom">
                <i class="fas fa-building"></i>
                Nom de l'entreprise:
              </label>
              <input type="text" id="nom" required>
            </div>

            <div class="form-group">
              <label for="type">
                <i class="fas fa-tag"></i>
                Type:
              </label>
              <select id="type" required>
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
              <input type="tel" id="contact" required>
            </div>

            <div class="form-group">
              <label for="email">
                <i class="fas fa-envelope"></i>
                Email:
              </label>
              <input type="email" id="email" required>
            </div>

            <div class="form-group">
              <label for="adresse">
                <i class="fas fa-map-marker-alt"></i>
                Adresse:
              </label>
              <textarea id="adresse" required rows="2"></textarea>
            </div>

            <div class="form-group">
              <label for="description">
                <i class="fas fa-info-circle"></i>
                Description des services:
              </label>
              <textarea id="description" rows="3"></textarea>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" id="submitFournisseur" class="btn-primary">
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

      <!-- Tableau des fournisseurs -->
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom de l'entreprise</th>
              <th>Type</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Adresse</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="fournisseurTableBody">
          </tbody>
        </table>
      </div>

      <!-- Notification -->
      <div id="notification" class="notification"></div>

      <style>
        .fournisseurs {
          padding: var(--spacing);
          background-color: #f5f7fa;
        }

        .form-container {
          background: white;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          margin-bottom: 30px;
          overflow: hidden;
          transition: all 0.3s ease;
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

        .form-fournisseur {
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
          .fournisseurs {
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
    </main>
  `;
}
