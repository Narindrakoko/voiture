// Variable pour suivre l'état du formulaire
let isFormOpen = false;

// Fonction pour basculer l'affichage du formulaire
function toggleForm() {
  const formContainer = document.querySelector('.form-container');
  const btnAjouter = document.getElementById('btnAjouterVersement');

  isFormOpen = !isFormOpen;

  if (isFormOpen) {
    formContainer.style.display = 'block';
    btnAjouter.innerHTML = '<i class="fas fa-times"></i> Fermer le formulaire';
  } else {
    formContainer.style.display = 'none';
    btnAjouter.innerHTML = '<i class="fas fa-plus"></i> Nouveau versement';
    resetForm();
  }
}

// Fonction pour charger les versements
async function loadVersements() {
  try {
    const response = await fetch('http://localhost:3000/api/versements');
    const versements = await response.json();
    const tbody = document.getElementById('versementTableBody');
    tbody.innerHTML = versements.map(v => `
      <tr>
        <td>${v.id}</td>
        <td>
          <div class="amount">
            <span>${parseFloat(v.montant).toLocaleString('fr-FR')}</span>
            <small>Ar</small>
          </div>
        </td>
        <td>${new Date(v.dateVersement).toLocaleDateString()}</td>
        <td><span class="badge badge-${getTypeColor(v.type)}">${getTypeLabel(v.type)}</span></td>
        <td>
          <div class="vehicle-info">
            <i class="fas fa-car"></i>
            <span>${v.vehicule ? `${v.vehicule.marque} ${v.vehicule.modele}` : 'N/A'}</span>
          </div>
        </td>
        <td>
          <div class="driver-info">
            <i class="fas fa-user-circle"></i>
            <span>${v.chauffeur ? `${v.chauffeur.nom} ${v.chauffeur.prenom}` : 'N/A'}</span>
          </div>
        </td>
        <td>
          <div class="action-buttons">
            <button class="action-button edit" onclick="editVersement(${v.id})" title="Modifier">
              <i class="fas fa-edit"></i>
            </button>
            <button class="action-button delete" onclick="deleteVersement(${v.id})" title="Supprimer">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Erreur:', error);
    showNotification('Erreur lors du chargement des versements', 'error');
  }
}

// Fonction pour charger les statistiques
async function loadStats() {
  try {
    const response = await fetch('http://localhost:3000/api/versements');
    const versements = await response.json();

    // Calculer les statistiques du mois en cours
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const versementsThisMonth = versements.filter(v => {
      const versementDate = new Date(v.dateVersement);
      return versementDate.getMonth() === currentMonth && versementDate.getFullYear() === currentYear;
    });

    const stats = {
      total: 0,
      carburant: 0,
      maintenance: 0,
      reparation: 0
    };

    versementsThisMonth.forEach(v => {
      const montant = parseFloat(v.montant);
      stats.total += montant;
      if (v.type === 'maintenance') {
        stats.maintenance += montant;
      } else if (v.type === 'carburant') {
        stats.carburant += montant;
      } else if (v.type === 'reparation') {
        stats.reparation += montant;
      }
    });

    document.getElementById('stat-total-value').textContent =
      `${parseFloat(stats.total || 0).toLocaleString('fr-FR')} Ar`;
    document.getElementById('stat-carburant-value').textContent =
      `${parseFloat(stats.carburant || 0).toLocaleString('fr-FR')} Ar`;
    document.getElementById('stat-maintenance-value').textContent =
      `${parseFloat(stats.maintenance || 0).toLocaleString('fr-FR')} Ar`;
    document.getElementById('stat-reparation-value').textContent =
      `${parseFloat(stats.reparation || 0).toLocaleString('fr-FR')} Ar`;
  } catch (error) {
    console.error('Erreur lors du chargement des statistiques:', error);
  }
}

// Fonction pour charger les véhicules
async function loadVehicules() {
  try {
    const response = await fetch('http://localhost:3000/api/vehicules');
    const vehicules = await response.json();
    const select = document.getElementById('vehicule');
    select.innerHTML = '<option value="">Sélectionner le véhicule</option>';
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

// Fonction pour charger les chauffeurs
async function loadChauffeurs() {
  try {
    const response = await fetch('http://localhost:3000/api/chauffeurs');
    const chauffeurs = await response.json();
    const select = document.getElementById('chauffeur');
    select.innerHTML = '<option value="">Sélectionner le chauffeur</option>';
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
function submitVersementForm(e) {
  e.preventDefault();
  const versementId = document.getElementById('versementId').value;
  const versementData = {
    montant: parseFloat(document.getElementById('montant').value),
    type: document.getElementById('type').value,
    vehiculeId: parseInt(document.getElementById('vehicule').value),
    chauffeurId: parseInt(document.getElementById('chauffeur').value),
    description: document.getElementById('description').value,
    dateVersement: document.getElementById('dateVersement').value || new Date().toISOString().split('T')[0]
  };

  const url = versementId
    ? `http://localhost:3000/api/versements/${versementId}`
    : 'http://localhost:3000/api/versements';

  fetch(url, {
    method: versementId ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(versementData)
  })
  .then(response => {
    if (response.ok) {
      showNotification(versementId ? 'Versement modifié avec succès' : 'Versement ajouté avec succès');
      resetForm();
      loadVersements();
      loadStats();
    } else {
      throw new Error('Erreur lors de l\'enregistrement');
    }
  })
  .catch(error => {
    console.error('Erreur:', error);
    showNotification('Erreur lors de l\'enregistrement', 'error');
  });
}

// Fonction pour éditer un versement
async function editVersement(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/versements/${id}`);
    const versement = await response.json();

    // Ouvrir le formulaire si fermé
    if (!isFormOpen) {
      toggleForm();
    }

    document.getElementById('versementId').value = versement.id;
    document.getElementById('montant').value = versement.montant;
    document.getElementById('type').value = versement.type;
    document.getElementById('vehicule').value = versement.vehiculeId;
    document.getElementById('chauffeur').value = versement.chauffeurId;
    document.getElementById('description').value = versement.description || '';
    document.getElementById('dateVersement').value = versement.dateVersement.split('T')[0];

    document.querySelector('.form-header h3').textContent = 'Modifier un versement';

    // Scroll to form
    document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
  } catch (error) {
    console.error('Erreur:', error);
    showNotification('Erreur lors du chargement du versement', 'error');
  }
}

// Fonction pour supprimer un versement
async function deleteVersement(id) {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce versement ?')) {
    try {
      const response = await fetch(`http://localhost:3000/api/versements/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        showNotification('Versement supprimé avec succès');
        loadVersements();
        loadStats();
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
  document.getElementById('versementForm').reset();
  document.getElementById('versementId').value = '';
  document.querySelector('.form-header h3').textContent = 'Nouveau versement';
}

// Fonction pour afficher les notifications
function showNotification(message, type = 'success') {
  const notification = document.getElementById('notification');
  if (notification) {
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');

    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }
}

// Fonctions utilitaires pour les types
function getTypeLabel(type) {
  const labels = {
    carburant: 'Carburant',
    maintenance: 'Maintenance',
    reparation: 'Réparation'
  };
  return labels[type] || type;
}

function getTypeColor(type) {
  const colors = {
    carburant: 'primary',
    maintenance: 'warning',
    reparation: 'danger'
  };
  return colors[type] || 'secondary';
}

// Fonction pour filtrer les versements
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

// Fonction d'initialisation
function initVersement() {
  // Charger les données
  loadVersements();
  loadStats();
  loadVehicules();
  loadChauffeurs();

  // Event listeners
  document.getElementById('versementForm').addEventListener('submit', submitVersementForm);
  document.getElementById('btnAjouterVersement').addEventListener('click', toggleForm);
  document.getElementById('resetForm').addEventListener('click', resetForm);
  document.getElementById('closeForm').addEventListener('click', () => {
    if (isFormOpen) {
      toggleForm();
    }
  });

  // Recherche et filtrage
  document.getElementById('searchVersement').addEventListener('input', filterVersements);
  document.getElementById('filterType').addEventListener('change', filterVersements);
}

// Attacher les fonctions globales
window.editVersement = editVersement;
window.deleteVersement = deleteVersement;
window.showNotification = showNotification;

export { initVersement };
