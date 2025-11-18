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
    toggleText.textContent = 'Ajouter un chauffeur';
    resetForm(); // Réinitialiser le formulaire quand on le ferme
  }
}

// Fonction pour charger les chauffeurs
async function loadChauffeurs() {
  try {
    const response = await fetch('http://localhost:3000/api/chauffeurs');
    const chauffeurs = await response.json();
    const tbody = document.getElementById('chauffeurTableBody');

    if (chauffeurs.length === 0) {
      tbody.innerHTML = `
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
      `;
    } else {
      tbody.innerHTML = chauffeurs.map(c => `
        <tr>
          <td>${c.nom}</td>
          <td>${c.prenom}</td>
          <td>${c.email}</td>
          <td>${c.telephone}</td>
          <td>${c.adresse}</td>
          <td>${new Date(c.dateEmbauche).toLocaleDateString()}</td>
          <td>${c.numeroPermis}</td>
          <td>
            <div class="action-buttons">
              <button onclick="editChauffeur(${c.id})" class="action-button edit" title="Modifier">
                <i class="fas fa-edit"></i>
              </button>
              <button onclick="deleteChauffeur(${c.id})" class="action-button delete" title="Supprimer">
                <i class="fas fa-trash"></i>
              </button>
              <button onclick="openNotifierModal(${c.id})" class="action-button" title="Notifier">
                <i class="fas fa-envelope"></i>
              </button>
            </div>
          </td>
        </tr>
      `).join('');
    }
  } catch (error) {
    console.error('Erreur:', error);
    showNotification('Erreur lors du chargement des chauffeurs', 'error');
  }
}

// Fonction pour soumettre le formulaire
function submitChauffeurForm(e) {
  e.preventDefault();
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

  const url = chauffeurId
    ? `http://localhost:3000/api/chauffeurs/${chauffeurId}`
    : 'http://localhost:3000/api/chauffeurs';

  fetch(url, {
    method: chauffeurId ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(chauffeurData)
  })
  .then(response => {
    if (response.ok) {
      showNotification(chauffeurId ? 'Chauffeur modifié avec succès' : 'Chauffeur ajouté avec succès');
      resetForm();
      loadChauffeurs();
    } else {
      throw new Error('Erreur lors de l\'enregistrement');
    }
  })
  .catch(error => {
    console.error('Erreur:', error);
    showNotification('Erreur lors de l\'enregistrement', 'error');
  });
}

// Fonction pour éditer un chauffeur
async function editChauffeur(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/chauffeurs/${id}`);
    const chauffeur = await response.json();

    // Ouvrir le formulaire si fermé
    if (!isFormOpen) {
      toggleForm();
    }

    document.getElementById('chauffeurId').value = chauffeur.id;
    document.getElementById('nom').value = chauffeur.nom;
    document.getElementById('prenom').value = chauffeur.prenom;
    document.getElementById('email').value = chauffeur.email;
    document.getElementById('telephone').value = chauffeur.telephone;
    document.getElementById('adresse').value = chauffeur.adresse;
    document.getElementById('dateEmbauche').value = chauffeur.dateEmbauche.split('T')[0];
    document.getElementById('numeroPermis').value = chauffeur.numeroPermis;

    document.getElementById('submitChauffeur').innerHTML = '<i class="fas fa-save"></i> Modifier';
    document.getElementById('formTitle').textContent = 'Modifier un chauffeur';

    // Scroll to form
    document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
  } catch (error) {
    console.error('Erreur:', error);
    showNotification('Erreur lors du chargement du chauffeur', 'error');
  }
}

// Fonction pour supprimer un chauffeur
async function deleteChauffeur(id) {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce chauffeur ?')) {
    try {
      const response = await fetch(`http://localhost:3000/api/chauffeurs/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        showNotification('Chauffeur supprimé avec succès');
        loadChauffeurs();
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
  document.getElementById('chauffeurForm').reset();
  document.getElementById('chauffeurId').value = '';
  document.getElementById('submitChauffeur').innerHTML = '<i class="fas fa-save"></i> Ajouter';
  document.getElementById('formTitle').textContent = 'Ajouter un chauffeur';
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
function initChauffeur() {
  // Charger les chauffeurs
  loadChauffeurs();

  // Event listeners
  document.getElementById('chauffeurForm').addEventListener('submit', submitChauffeurForm);
  document.getElementById('resetForm').addEventListener('click', resetForm);
  document.getElementById('closeForm').addEventListener('click', () => {
    if (isFormOpen) {
      toggleForm();
    }
  });
  document.getElementById('btnToggleForm').addEventListener('click', toggleForm);

  // Recherche de chauffeurs
  document.getElementById('searchChauffeur').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const tbody = document.getElementById('chauffeurTableBody');
    Array.from(tbody.getElementsByTagName('tr')).forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
  });
}

function openNotifierModal(id) {
  const modal = document.getElementById('modalNotifier');
  const textarea = document.getElementById('modalMessage');
  modal.style.display = 'block';
  textarea.value = ''; // vide par défaut

  const closeModal = document.getElementById('closeModal');
  closeModal.onclick = () => { modal.style.display = 'none'; };

  const sendButton = document.getElementById('sendModalMessage');

  // Supprimer les anciens listeners pour éviter les doublons
  const newButton = sendButton.cloneNode(true);
  sendButton.parentNode.replaceChild(newButton, sendButton);

  newButton.onclick = async () => {
    const message = textarea.value.trim();
    if (!message) {
      showNotification("Veuillez écrire un message avant d'envoyer", "error");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/chauffeurs/${id}/notifier`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }) // on envoie le message au backend
      });

      if (response.ok) {
        showNotification("Email de notification envoyé avec succès");
        modal.style.display = 'none';
      } else {
        const data = await response.json();
        showNotification(data.message || "Erreur lors de l'envoi de l'email", "error");
      }
    } catch (error) {
      console.error(error);
      showNotification("Erreur lors de l'envoi de l'email", "error");
    }
  };
}

// Fermer le modal si clic en dehors
window.onclick = function(event) {
  const modal = document.getElementById('modalNotifier');
  if (event.target === modal) {
    modal.style.display = "none";
  }
};


// Attacher les fonctions globales
window.editChauffeur = editChauffeur;
window.deleteChauffeur = deleteChauffeur;
window.showNotification = showNotification;
window.openNotifierModal = openNotifierModal;

export { initChauffeur };
