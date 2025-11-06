export function ChauffeurForm() {
  return `
    <main class="chauffeur-form fadeIn">
      <div class="header-actions">
        <h2><i class="fas fa-user-plus"></i> <span id="formTitle">Ajouter un chauffeur</span></h2>
        <button id="btnRetour" class="btn-secondary">
          <i class="fas fa-arrow-left"></i>
          Retour à la liste
        </button>
      </div>

      <!-- Notification -->
      <div id="notification" class="notification"></div>

      <!-- Formulaire -->
      <div class="form-container">
        <form id="chauffeurForm" class="form-chauffeur">
          <input type="hidden" id="chauffeurId">

          <div class="form-grid">
            <div class="form-group">
              <label for="nom">
                <i class="fas fa-user"></i>
                Nom:
              </label>
              <input type="text" id="nom" required
                pattern="[A-Za-z ]{2,50}"
                title="2 à 50 caractères, lettres uniquement"
                class="form-control">
              <small class="form-text">2 à 50 caractères, lettres uniquement</small>
            </div>

            <div class="form-group">
              <label for="prenom">
                <i class="fas fa-user"></i>
                Prénom:
              </label>
              <input type="text" id="prenom" required
                pattern="[A-Za-z ]{2,50}"
                title="2 à 50 caractères, lettres uniquement"
                class="form-control">
              <small class="form-text">2 à 50 caractères, lettres uniquement</small>
            </div>

            <div class="form-group">
              <label for="email">
                <i class="fas fa-envelope"></i>
                Email:
              </label>
              <input type="email" id="email" required
                class="form-control">
              <small class="form-text">Adresse email valide</small>
            </div>

            <div class="form-group">
              <label for="telephone">
                <i class="fas fa-phone"></i>
                Téléphone:
              </label>
              <input type="tel" id="telephone" required
                pattern="[0-9]{10}"
                title="10 chiffres"
                class="form-control">
              <small class="form-text">10 chiffres</small>
            </div>

            <div class="form-group full-width">
              <label for="adresse">
                <i class="fas fa-map-marker-alt"></i>
                Adresse:
              </label>
              <input type="text" id="adresse" required
                minlength="5"
                class="form-control">
              <small class="form-text">Adresse complète</small>
            </div>

            <div class="form-group">
              <label for="dateEmbauche">
                <i class="fas fa-calendar-alt"></i>
                Date d'embauche:
              </label>
              <input type="date" id="dateEmbauche" required
                class="form-control">
            </div>

            <div class="form-group">
              <label for="numeroPermis">
                <i class="fas fa-id-card"></i>
                Numéro de permis:
              </label>
              <input type="text" id="numeroPermis" required
                pattern="[A-Z0-9]{5,15}"
                title="5 à 15 caractères, lettres majuscules et chiffres"
                class="form-control">
              <small class="form-text">5 à 15 caractères, lettres majuscules et chiffres</small>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" id="submitChauffeur" class="btn-primary">
              <i class="fas fa-save"></i>
              <span>Ajouter</span>
            </button>
            <button type="button" id="btnReset" class="btn-secondary">
              <i class="fas fa-undo"></i>
              <span>Réinitialiser</span>
            </button>
          </div>
        </form>
      </div>

      <style>
        .chauffeur-form {
          padding: var(--spacing);
          background-color: #f5f7fa;
        }

        .header-actions {
          margin-bottom: 30px;
        }

        .header-actions h2 {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #2c3e50;
        }

        .form-container {
          background: white;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          overflow: hidden;
          max-width: 1200px;
          margin: 0 auto;
        }

        .form-chauffeur {
          padding: 30px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
        }

        .form-group {
          margin: 0;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          color: #2c3e50;
          font-weight: 500;
        }

        .form-group label i {
          color: var(--primary-color);
          width: 16px;
        }

        .form-control {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid var(--border-color);
          border-radius: var(--radius);
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .form-control:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 2px rgba(45,137,239,0.2);
        }

        .form-control:invalid {
          border-color: var(--danger-color);
        }

        .form-text {
          display: block;
          margin-top: 5px;
          font-size: 12px;
          color: #666;
        }

        .form-actions {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid var(--border-color);
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }

        .form-actions button {
          min-width: 120px;
        }

        @media (max-width: 768px) {
          .chauffeur-form {
            padding: 10px;
          }

          .header-actions {
            flex-direction: column;
            gap: 15px;
          }

          .form-chauffeur {
            padding: 20px;
          }

          .form-grid {
            grid-template-columns: 1fr;
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
        document.addEventListener('DOMContentLoaded', function() {
          initFormEvents();
        });

        function initFormEvents() {
          const btnRetour = document.getElementById('btnRetour');
          if (btnRetour) {
            btnRetour.addEventListener('click', function() {
              const app = document.getElementById('app');
              app.innerHTML = \`
                \${Header()}
                <div style="display: flex; flex-grow: 1;">
                  \${Sidebar()}
                  \${Chauffeur()}
                </div>
              \`;
            });
          }

          const form = document.getElementById('chauffeurForm');
          if (form) {
            form.addEventListener('submit', async function(e) {
              e.preventDefault();
              await submitChauffeurForm();
            });
          }

          const btnReset = document.getElementById('btnReset');
          if (btnReset) {
            btnReset.addEventListener('click', resetForm);
          }

          // Validation en temps réel
          const inputs = form.querySelectorAll('input[pattern]');
          inputs.forEach(input => {
            input.addEventListener('input', function() {
              validateInput(this);
            });
          });
        }

        function validateInput(input) {
          const isValid = input.checkValidity();
          if (isValid) {
            input.classList.remove('invalid');
            input.classList.add('valid');
          } else {
            input.classList.remove('valid');
            input.classList.add('invalid');
          }
        }

        async function submitChauffeurForm() {
          const chauffeurId = document.getElementById('chauffeurId').value;
          const chauffeurData = {
            nom: document.getElementById('nom').value,
            prenom: document.getElementById('prenom').value,
            email: document.getElementById('email').value,
            telephone: document.getElementById('telephone').value,
            adresse: document.getElementById('adresse').value,
            dateEmbauche: document.getElementById('dateEmbauche').value,
            numeroPermis: document.getElementById('numeroPermis').value
          };

          try {
            const url = chauffeurId
              ? \`http://localhost:3000/api/chauffeurs/\${chauffeurId}\`
              : 'http://localhost:3000/api/chauffeurs';

            const response = await fetch(url, {
              method: chauffeurId ? 'PUT' : 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(chauffeurData)
            });

            if (response.ok) {
              showNotification(chauffeurId ? 'Chauffeur modifié avec succès' : 'Chauffeur ajouté avec succès');
              setTimeout(() => {
                const app = document.getElementById('app');
                app.innerHTML = \`
                  \${Header()}
                  <div style="display: flex; flex-grow: 1;">
                    \${Sidebar()}
                    \${Chauffeur()}
                  </div>
                \`;
              }, 1500);
            } else {
              const error = await response.json();
              throw new Error(error.message);
            }
          } catch (error) {
            console.error('Erreur:', error);
            showNotification(error.message || 'Erreur lors de l\'enregistrement', 'error');
          }
        }

        function resetForm() {
          const form = document.getElementById('chauffeurForm');
          form.reset();
          document.getElementById('chauffeurId').value = '';
          document.getElementById('submitChauffeur').innerHTML = '<i class="fas fa-save"></i> <span>Ajouter</span>';
          document.getElementById('formTitle').textContent = 'Ajouter un chauffeur';

          // Réinitialiser les styles de validation
          const inputs = form.querySelectorAll('input');
          inputs.forEach(input => {
            input.classList.remove('valid', 'invalid');
          });
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
