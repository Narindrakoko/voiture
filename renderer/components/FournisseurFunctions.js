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
    toggleText.textContent = 'Ajouter un fournisseur';
    resetForm(); // Réinitialiser le formulaire quand on le ferme
  }
}

// Fonction pour charger les fournisseurs
async function loadFournisseurs() {
  try {
    const response = await fetch('http://localhost:3000/api/fournisseurs');
    const fournisseurs = await response.json();
    const tbody = document.getElementById('fournisseurTableBody');
    tbody.innerHTML = fournisseurs.map(f => `
      <tr>
        <td>${f.id}</td>
        <td>${f.nom}</td>
        <td>${f.type}</td>
        <td>${f.contact}</td>
        <td>${f.email}</td>
        <td>${f.adresse}</td>
        <td class="action-buttons">
          <button onclick="editFournisseur(${f.id})" title="Modifier">
            <i class="fas fa-edit"></i>
          </button>
          <button onclick="deleteFournisseur(${f.id})" title="Supprimer">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Erreur:', error);
    showNotification('Erreur lors du chargement des fournisseurs', 'error');
  }
}

// Fonction pour soumettre le formulaire
function submitFournisseurForm(e) {
  e.preventDefault();
  const fournisseurId = document.getElementById('fournisseurId').value;
  const fournisseurData = {
    nom: document.getElementById('nom').value,
    type: document.getElementById('type').value,
    contact: document.getElementById('contact').value,
    email: document.getElementById('email').value,
    adresse: document.getElementById('adresse').value,
    description: document.getElementById('description').value
  };

  const url = fournisseurId
    ? `http://localhost:3000/api/fournisseurs/${fournisseurId}`
    : 'http://localhost:3000/api/fournisseurs';

  fetch(url, {
    method: fournisseurId ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fournisseurData)
  })
  .then(response => {
    if (response.ok) {
      showNotification(fournisseurId ? 'Fournisseur modifié avec succès' : 'Fournisseur ajouté avec succès');
      resetForm();
      loadFournisseurs();
    } else {
      throw new Error('Erreur lors de l\'enregistrement');
    }
  })
  .catch(error => {
    console.error('Erreur:', error);
    showNotification('Erreur lors de l\'enregistrement', 'error');
  });
}

// Fonction pour éditer un fournisseur
async function editFournisseur(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/fournisseurs/${id}`);
    const fournisseur = await response.json();

    // Ouvrir le formulaire si fermé
    if (!isFormOpen) {
      toggleForm();
    }

    document.getElementById('fournisseurId').value = fournisseur.id;
    document.getElementById('nom').value = fournisseur.nom;
    document.getElementById('type').value = fournisseur.type;
    document.getElementById('contact').value = fournisseur.contact;
    document.getElementById('email').value = fournisseur.email;
    document.getElementById('adresse').value = fournisseur.adresse;
    document.getElementById('description').value = fournisseur.description;

    document.getElementById('submitFournisseur').innerHTML = '<i class="fas fa-save"></i> Modifier';
    document.getElementById('formTitle').textContent = 'Modifier un fournisseur';

    // Scroll to form
    document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
  } catch (error) {
    console.error('Erreur:', error);
    showNotification('Erreur lors du chargement du fournisseur', 'error');
  }
}

// Fonction pour supprimer un fournisseur
async function deleteFournisseur(id) {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce fournisseur ?')) {
    try {
      const response = await fetch(`http://localhost:3000/api/fournisseurs/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        showNotification('Fournisseur supprimé avec succès');
        loadFournisseurs();
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
  document.getElementById('fournisseurForm').reset();
  document.getElementById('fournisseurId').value = '';
  document.getElementById('submitFournisseur').innerHTML = '<i class="fas fa-save"></i> Ajouter';
  document.getElementById('formTitle').textContent = 'Ajouter un fournisseur';
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
function initFournisseur() {
  // Charger les fournisseurs
  loadFournisseurs();

  // Event listeners
  document.getElementById('fournisseurForm').addEventListener('submit', submitFournisseurForm);
  document.getElementById('resetForm').addEventListener('click', resetForm);
  document.getElementById('closeForm').addEventListener('click', () => {
    if (isFormOpen) {
      toggleForm();
    }
  });
  document.getElementById('btnToggleForm').addEventListener('click', toggleForm);

  // Recherche de fournisseurs
  document.getElementById('searchFournisseur').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const tbody = document.getElementById('fournisseurTableBody');
    Array.from(tbody.getElementsByTagName('tr')).forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
  });
}

// Attacher les fonctions globales
window.editFournisseur = editFournisseur;
window.deleteFournisseur = deleteFournisseur;
window.showNotification = showNotification;

export { initFournisseur };
