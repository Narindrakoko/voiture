// showNotification is now globally available via window.showNotification

let currentMaintenanceId = null;

export function initMaintenance() {
  loadMaintenances();
  loadStats();
  setupEventListeners();
  loadSelectOptions();
}

function setupEventListeners() {
  // Bouton ajouter maintenance
  const btnAjouter = document.getElementById('btnAjouterMaintenance');
  if (btnAjouter) {
    btnAjouter.addEventListener('click', () => {
      showForm();
    });
  }

  // Fermer formulaire
  const closeForm = document.getElementById('closeForm');
  if (closeForm) {
    closeForm.addEventListener('click', () => {
      hideForm();
    });
  }

  // Reset formulaire
  const resetForm = document.getElementById('resetForm');
  if (resetForm) {
    resetForm.addEventListener('click', () => {
      resetMaintenanceForm();
    });
  }

  // Soumission formulaire
  const form = document.getElementById('maintenanceForm');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }

  // Recherche
  const searchInput = document.getElementById('searchMaintenance');
  if (searchInput) {
    searchInput.addEventListener('input', filterMaintenances);
  }

  // Filtres
  const filterStatut = document.getElementById('filterStatut');
  const filterType = document.getElementById('filterType');

  if (filterStatut) {
    filterStatut.addEventListener('change', filterMaintenances);
  }

  if (filterType) {
    filterType.addEventListener('change', filterMaintenances);
  }
}

async function loadMaintenances() {
  try {
    const response = await fetch('http://localhost:3000/api/maintenances');
    const maintenances = await response.json();
    displayMaintenances(maintenances);
  } catch (error) {
    console.error('Erreur lors du chargement des maintenances:', error);
    showNotification('Erreur lors du chargement des maintenances', 'error');
  }
}

async function loadStats() {
  try {
    const response = await fetch('http://localhost:3000/api/maintenances/stats');
    const stats = await response.json();
    displayStats(stats);
  } catch (error) {
    console.error('Erreur lors du chargement des statistiques:', error);
  }
}

function displayStats(stats) {
  document.getElementById('stat-total-value').textContent = stats.total;
  document.getElementById('stat-en-cours-value').textContent = stats.en_cours;
  document.getElementById('stat-termine-value').textContent = stats.termine;
  document.getElementById('stat-cout-value').textContent = `${stats.totalMontant.toLocaleString()} Ar`;
}

function displayMaintenances(maintenances) {
  const tbody = document.getElementById('maintenanceTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';

  maintenances.forEach(maintenance => {
    const row = createMaintenanceRow(maintenance);
    tbody.appendChild(row);
  });
}

function createMaintenanceRow(maintenance) {
  const row = document.createElement('tr');

  const statutClass = maintenance.statut === 'termine' ? 'badge-termine' : 'badge-en-cours';
  const statutText = maintenance.statut === 'termine' ? 'Terminé' : 'En cours';

  row.innerHTML = `
    <td>${maintenance.id}</td>
    <td>${maintenance.vehicule ? maintenance.vehicule.immatriculation : 'N/A'}</td>
    <td>${maintenance.chauffeur ? `${maintenance.chauffeur.nom} ${maintenance.chauffeur.prenom}` : 'N/A'}</td>
    <td>${maintenance.fournisseur ? maintenance.fournisseur.nom : 'N/A'}</td>
    <td>${maintenance.typeMaintenance}</td>
    <td>${maintenance.montant.toLocaleString()} Ar</td>
    <td>${new Date(maintenance.dateMaintenance).toLocaleDateString('fr-FR')}</td>
    <td><span class="badge ${statutClass}">${statutText}</span></td>
    <td>
      <div class="action-buttons">
        <button class="action-button edit" onclick="editMaintenance(${maintenance.id})" title="Modifier">
          <i class="fas fa-edit"></i>
        </button>
        <button class="action-button delete" onclick="deleteMaintenance(${maintenance.id})" title="Supprimer">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </td>
  `;

  return row;
}

async function loadSelectOptions() {
  try {
    // Charger véhicules
    const vehiculesResponse = await fetch('http://localhost:3000/api/vehicules');
    const vehicules = await vehiculesResponse.json();
    populateSelect('vehicule', vehicules, 'immatriculation');

    // Charger chauffeurs
    const chauffeursResponse = await fetch('http://localhost:3000/api/chauffeurs');
    const chauffeurs = await chauffeursResponse.json();
    populateSelect('chauffeur', chauffeurs, 'nom', 'prenom');

    // Charger fournisseurs
    const fournisseursResponse = await fetch('http://localhost:3000/api/fournisseurs');
    const fournisseurs = await fournisseursResponse.json();
    populateSelect('fournisseur', fournisseurs, 'nom');
  } catch (error) {
    console.error('Erreur lors du chargement des options:', error);
  }
}

function populateSelect(selectId, data, ...fields) {
  const select = document.getElementById(selectId);
  if (!select) return;

  select.innerHTML = '<option value="">Sélectionner</option>';

  data.forEach(item => {
    const option = document.createElement('option');
    option.value = item.id;

    let text = '';
    fields.forEach((field, index) => {
      text += item[field];
      if (index < fields.length - 1) text += ' ';
    });

    option.textContent = text;
    select.appendChild(option);
  });
}

function showForm(maintenance = null) {
  const formContainer = document.querySelector('.form-container');
  if (formContainer) {
    formContainer.style.display = 'block';
    formContainer.scrollIntoView({ behavior: 'smooth' });

    if (maintenance) {
      populateForm(maintenance);
    }
  }
}

function hideForm() {
  const formContainer = document.querySelector('.form-container');
  if (formContainer) {
    formContainer.style.display = 'none';
  }
}

function populateForm(maintenance) {
  document.getElementById('maintenanceId').value = maintenance.id;
  document.getElementById('vehicule').value = maintenance.vehiculeId;
  document.getElementById('chauffeur').value = maintenance.chauffeurId;
  document.getElementById('fournisseur').value = maintenance.fournisseurId;
  document.getElementById('typeMaintenance').value = maintenance.typeMaintenance;
  document.getElementById('montant').value = maintenance.montant;
  document.getElementById('dateMaintenance').value = maintenance.dateMaintenance.split('T')[0];
  document.getElementById('statut').value = maintenance.statut;
  document.getElementById('description').value = maintenance.description || '';

  const formTitle = document.querySelector('.form-header h3');
  if (formTitle) {
    formTitle.innerHTML = '<i class="fas fa-edit"></i> Modifier la maintenance';
  }
}

function resetMaintenanceForm() {
  const form = document.getElementById('maintenanceForm');
  if (form) {
    form.reset();
    document.getElementById('maintenanceId').value = '';
    document.getElementById('dateMaintenance').value = new Date().toISOString().split('T')[0];
    document.getElementById('statut').value = 'en_cours';

    const formTitle = document.querySelector('.form-header h3');
    if (formTitle) {
      formTitle.innerHTML = '<i class="fas fa-wrench"></i> Nouvelle maintenance';
    }
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const formData = {
    vehiculeId: parseInt(document.getElementById('vehicule').value),
    chauffeurId: parseInt(document.getElementById('chauffeur').value),
    fournisseurId: parseInt(document.getElementById('fournisseur').value),
    typeMaintenance: document.getElementById('typeMaintenance').value,
    montant: parseFloat(document.getElementById('montant').value),
    dateMaintenance: document.getElementById('dateMaintenance').value,
    statut: document.getElementById('statut').value,
    description: document.getElementById('description').value
  };

  const maintenanceId = document.getElementById('maintenanceId').value;

  try {
    let response;
    if (maintenanceId) {
      // Modification
      response = await fetch(`http://localhost:3000/api/maintenances/${maintenanceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
    } else {
      // Création
      response = await fetch('http://localhost:3000/api/maintenances', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
    }

    if (response.ok) {
      const result = await response.json();
      showNotification(
        maintenanceId ? 'Maintenance modifiée avec succès' : 'Maintenance créée avec succès',
        'success'
      );
      hideForm();
      resetMaintenanceForm();
      loadMaintenances();
      loadStats();
    } else {
      const error = await response.json();
      showNotification(error.error || 'Erreur lors de la sauvegarde', 'error');
    }
  } catch (error) {
    console.error('Erreur lors de la soumission:', error);
    showNotification('Erreur lors de la sauvegarde', 'error');
  }
}

function filterMaintenances() {
  const searchTerm = document.getElementById('searchMaintenance').value.toLowerCase();
  const statutFilter = document.getElementById('filterStatut').value;
  const typeFilter = document.getElementById('filterType').value;

  const rows = document.querySelectorAll('#maintenanceTableBody tr');

  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    const vehicule = cells[1].textContent.toLowerCase();
    const chauffeur = cells[2].textContent.toLowerCase();
    const fournisseur = cells[3].textContent.toLowerCase();
    const type = cells[4].textContent.toLowerCase();
    const statut = cells[7].querySelector('.badge').textContent.toLowerCase();

    const matchesSearch = !searchTerm ||
      vehicule.includes(searchTerm) ||
      chauffeur.includes(searchTerm) ||
      fournisseur.includes(searchTerm);

    const matchesStatut = !statutFilter || statut.includes(statutFilter.toLowerCase());
    const matchesType = !typeFilter || type.includes(typeFilter.toLowerCase());

    row.style.display = matchesSearch && matchesStatut && matchesType ? '' : 'none';
  });
}

// Fonctions globales pour les boutons d'action
window.editMaintenance = async function(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/maintenances/${id}`);
    const maintenance = await response.json();
    currentMaintenanceId = id;
    showForm(maintenance);
  } catch (error) {
    console.error('Erreur lors du chargement de la maintenance:', error);
    showNotification('Erreur lors du chargement de la maintenance', 'error');
  }
};

window.deleteMaintenance = async function(id) {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette maintenance ?')) {
    try {
      const response = await fetch(`http://localhost:3000/api/maintenances/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        showNotification('Maintenance supprimée avec succès', 'success');
        loadMaintenances();
        loadStats();
      } else {
        const error = await response.json();
        showNotification(error.error || 'Erreur lors de la suppression', 'error');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      showNotification('Erreur lors de la suppression', 'error');
    }
  }
};
