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
    toggleText.textContent = 'Ajouter un véhicule';
    resetForm(); // Réinitialiser le formulaire quand on le ferme
  }
}

// Fonction pour charger les véhicules
async function loadVehicules() {
  try {
    const response = await fetch('http://localhost:3000/api/vehicules');
    const vehicules = await response.json();
    const tbody = document.getElementById('vehiculeTableBody');
    tbody.innerHTML = vehicules.map(v => `
      <tr>
        <td>${v.id}</td>
        <td>${v.immatriculation}</td>
        <td>${v.marque}</td>
        <td>${v.modele}</td>
        <td>${new Date(v.dateAchat).toLocaleDateString()}</td>
        <td>${v.kilometrage}</td>
        <td>
          <span class="status-badge ${v.enMaintenance ? 'status-maintenance' : 'status-disponible'}">
            ${v.enMaintenance ? 'En maintenance' : 'Disponible'}
          </span>
        </td>
        <td class="action-buttons">
          <button onclick="editVehicule(${v.id})" title="Modifier">
            <i class="fas fa-edit"></i>
          </button>
          <button onclick="deleteVehicule(${v.id})" title="Supprimer">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Erreur:', error);
    showNotification('Erreur lors du chargement des véhicules', 'error');
  }
}

// Fonction pour soumettre le formulaire
function submitVehiculeForm(e) {
  e.preventDefault();
  const vehiculeId = document.getElementById('vehiculeId').value;
  const vehiculeData = {
    immatriculation: document.getElementById('immatriculation').value,
    marque: document.getElementById('marque').value,
    modele: document.getElementById('modele').value,
    dateAchat: document.getElementById('dateAchat').value,
    kilometrage: parseInt(document.getElementById('kilometrage').value)
  };

  const url = vehiculeId
    ? `http://localhost:3000/api/vehicules/${vehiculeId}`
    : 'http://localhost:3000/api/vehicules';

  fetch(url, {
    method: vehiculeId ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(vehiculeData)
  })
  .then(response => {
    if (response.ok) {
      showNotification(vehiculeId ? 'Véhicule modifié avec succès' : 'Véhicule ajouté avec succès');
      resetForm();
      loadVehicules();
    } else {
      throw new Error('Erreur lors de l\'enregistrement');
    }
  })
  .catch(error => {
    console.error('Erreur:', error);
    showNotification('Erreur lors de l\'enregistrement', 'error');
  });
}

// Fonction pour éditer un véhicule
async function editVehicule(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/vehicules/${id}`);
    const vehicule = await response.json();

    // Ouvrir le formulaire si fermé
    if (!isFormOpen) {
      toggleForm();
    }

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
      const response = await fetch(`http://localhost:3000/api/vehicules/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        showNotification('Véhicule supprimé avec succès');
        loadVehicules();
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
  document.getElementById('vehiculeForm').reset();
  document.getElementById('vehiculeId').value = '';
  document.getElementById('submitVehicule').innerHTML = '<i class="fas fa-save"></i> Ajouter';
  document.getElementById('formTitle').textContent = 'Ajouter un véhicule';
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
function initVehicule() {
  // Charger les véhicules
  loadVehicules();

  // Event listeners
  document.getElementById('vehiculeForm').addEventListener('submit', submitVehiculeForm);
  document.getElementById('resetForm').addEventListener('click', resetForm);
  document.getElementById('closeForm').addEventListener('click', () => {
    if (isFormOpen) {
      toggleForm();
    }
  });
  document.getElementById('btnToggleForm').addEventListener('click', toggleForm);

  // Recherche de véhicules
  document.getElementById('searchVehicule').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const tbody = document.getElementById('vehiculeTableBody');
    Array.from(tbody.getElementsByTagName('tr')).forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
  });
}

// Attacher les fonctions globales
window.editVehicule = editVehicule;
window.deleteVehicule = deleteVehicule;
window.showNotification = showNotification;

export { initVehicule };
