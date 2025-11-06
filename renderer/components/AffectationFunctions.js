// Variable pour suivre l'état du formulaire
let isFormOpen = false;

// Fonction pour basculer l'affichage du formulaire
function toggleForm() {
  const formContainer = document.getElementById('formContainer');
  const toggleIcon = document.getElementById('toggleFormIcon');
  const toggleText = document.getElementById('toggleFormText');

  isFormOpen = !isFormOpen;

  if (isFormOpen) {
    formContainer.style.display = 'block';
    toggleIcon.className = 'fas fa-minus';
    toggleText.textContent = 'Fermer le formulaire';
  } else {
    formContainer.style.display = 'none';
    toggleIcon.className = 'fas fa-plus';
    toggleText.textContent = 'Nouvelle affectation';
    resetForm(); // Réinitialiser le formulaire quand on le ferme
  }
}

// Fonction pour charger les affectations
async function loadAffectations() {
  try {
    const response = await fetch('http://localhost:3000/api/affectations');
    const affectations = await response.json();
    const tbody = document.getElementById('affectationTableBody');

    if (affectations.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7">
            <div class="empty-state">
              <i class="fas fa-exchange-alt"></i>
              <p>Aucune affectation trouvée</p>
              <button id="btnAjouterPremier" class="btn-primary">
                <i class="fas fa-plus"></i>
                Créer votre première affectation
              </button>
            </div>
          </td>
        </tr>
      `;
    } else {
      tbody.innerHTML = affectations.map(a => {
        const statutClass = a.statut === 'terminee' ? 'badge-success' :
                           a.statut === 'en_cours' ? 'badge-warning' : 'badge-secondary';
        const statutText = a.statut === 'terminee' ? 'Terminée' :
                          a.statut === 'en_cours' ? 'En cours' : 'Annulée';

        return `
          <tr>
            <td>${a.id}</td>
            <td>
              <div class="vehicle-info">
                <i class="fas fa-car"></i>
                <span>${a.vehicule.marque} ${a.vehicule.modele}</span>
              </div>
            </td>
            <td>
              <div class="driver-info">
                <i class="fas fa-user-circle"></i>
                <span>${a.chauffeur.nom} ${a.chauffeur.prenom}</span>
              </div>
            </td>
            <td>${new Date(a.dateDebut).toLocaleString()}</td>
            <td>${new Date(a.dateFin).toLocaleString()}</td>
            <td><span class="badge ${statutClass}">${statutText}</span></td>
            <td>
              <div class="action-buttons">
                <button onclick="editAffectation(${a.id})" class="action-button edit" title="Modifier">
                  <i class="fas fa-edit"></i>
                </button>
                <button onclick="deleteAffectation(${a.id})" class="action-button delete" title="Supprimer">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    }
  } catch (error) {
    console.error('Erreur:', error);
    showNotification('Erreur lors du chargement des affectations', 'error');
  }
}

// Fonction pour charger les véhicules dans le select
async function loadVehiculesSelect() {
  try {
    const response = await fetch('http://localhost:3000/api/vehicules');
    const vehicules = await response.json();
    const select = document.getElementById('vehicule');
    select.innerHTML = '<option value="">Sélectionner un véhicule</option>';
    vehicules.forEach(v => {
      const option = document.createElement('option');
      option.value = v.id;
      option.textContent = `${v.marque} ${v.modele} (${v.immatriculation})`;
      select.appendChild(option);
    });
  } catch (error) {
    console.error('Erreur:', error);
  }
}

// Fonction pour charger les chauffeurs dans le select
async function loadChauffeursSelect() {
  try {
    const response = await fetch('http://localhost:3000/api/chauffeurs');
    const chauffeurs = await response.json();
    const select = document.getElementById('chauffeur');
    select.innerHTML = '<option value="">Sélectionner un chauffeur</option>';
    chauffeurs.forEach(c => {
      const option = document.createElement('option');
      option.value = c.id;
      option.textContent = `${c.nom} ${c.prenom}`;
      select.appendChild(option);
    });
  } catch (error) {
    console.error('Erreur:', error);
  }
}

// Fonction pour soumettre le formulaire
function submitAffectationForm(e) {
  e.preventDefault();
  const affectationId = document.getElementById('affectationId').value;
  const affectationData = {
    vehiculeId: parseInt(document.getElementById('vehicule').value),
    chauffeurId: parseInt(document.getElementById('chauffeur').value),
    dateDebut: document.getElementById('dateDebut').value,
    dateFin: document.getElementById('dateFin').value
  };

  const url = affectationId
    ? `http://localhost:3000/api/affectations/${affectationId}`
    : 'http://localhost:3000/api/affectations';

  fetch(url, {
    method: affectationId ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(affectationData)
  })
  .then(response => {
    if (response.ok) {
      showNotification(affectationId ? 'Affectation modifiée avec succès' : 'Affectation créée avec succès');
      resetForm();
      loadAffectations();
    } else {
      return response.json().then(err => { throw new Error(err.error || 'Erreur lors de l\'enregistrement'); });
    }
  })
  .catch(error => {
    console.error('Erreur:', error);
    showNotification(error.message, 'error');
  });
}

// Fonction pour éditer une affectation
async function editAffectation(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/affectations/${id}`);
    const affectation = await response.json();

    // Ouvrir le formulaire si fermé
    if (!isFormOpen) {
      toggleForm();
    }

    document.getElementById('affectationId').value = affectation.id;
    document.getElementById('vehicule').value = affectation.vehiculeId;
    document.getElementById('chauffeur').value = affectation.chauffeurId;
    document.getElementById('dateDebut').value = affectation.dateDebut.slice(0, 16);
    document.getElementById('dateFin').value = affectation.dateFin.slice(0, 16);

    document.getElementById('submitAffectation').innerHTML = '<i class="fas fa-save"></i> Modifier';
    document.getElementById('formTitle').textContent = 'Modifier une affectation';

    // Scroll to form
    document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
  } catch (error) {
    console.error('Erreur:', error);
    showNotification('Erreur lors du chargement de l\'affectation', 'error');
  }
}

// Fonction pour supprimer une affectation
async function deleteAffectation(id) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette affectation ?')) {
    try {
      const response = await fetch(`http://localhost:3000/api/affectations/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        showNotification('Affectation supprimée avec succès');
        loadAffectations();
      } else {
        throw new Error('Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Erreur:', error);
      showNotification('Erreur lors de la suppression', 'error');
    }
  }
}

// Fonction pour réinitialiser le formulaire
function resetForm() {
  document.getElementById('affectationForm').reset();
  document.getElementById('affectationId').value = '';
  document.getElementById('submitAffectation').innerHTML = '<i class="fas fa-save"></i> Enregistrer';
  document.getElementById('formTitle').textContent = 'Créer une affectation';
}

// Fonction pour afficher les notifications
function showNotification(message, type = 'success') {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.className = `notification ${type}`;
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// Fonction d'initialisation
function initAffectation() {
  // Charger les données
  loadAffectations();
  loadVehiculesSelect();
  loadChauffeursSelect();

  // Event listeners
  document.getElementById('affectationForm').addEventListener('submit', submitAffectationForm);
  document.getElementById('resetForm').addEventListener('click', resetForm);
  document.getElementById('closeForm').addEventListener('click', () => {
    if (isFormOpen) {
      toggleForm();
    }
  });
  document.getElementById('btnToggleForm').addEventListener('click', toggleForm);

  // Recherche d'affectations
  document.getElementById('searchAffectation').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const tbody = document.getElementById('affectationTableBody');
    Array.from(tbody.getElementsByTagName('tr')).forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
  });
}

// Attacher les fonctions globales
window.editAffectation = editAffectation;
window.deleteAffectation = deleteAffectation;
window.showNotification = showNotification;

export { initAffectation };
