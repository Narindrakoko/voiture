import { Header } from './components/header.js';
import { Sidebar } from './components/sidebar.js';
import { Dashboard } from './components/dashboard.js';
import { Vehicule } from './components/Vehicule.js';
import { Affectation } from './components/Affectation.js';
import { Chauffeur } from './components/Chauffeur.js';
import { Fournisseur } from './components/Fournisseur.js';
import { Historique } from './components/Historique.js';
import { Versement } from './components/Versement.js';
import { Acceuil } from './components/Acceuil.js';

const app = document.getElementById('app');

function render(content) {
  app.innerHTML = `
    ${Header()}
    <div style="display: flex; flex-grow: 1;">
      ${Sidebar()}
      ${content}
    </div>
  `;
}

// Vue par défaut
render(Dashboard());

// Gestion dynamique
document.addEventListener('click', (e) => {
  switch (e.target.id) {
    case 'btn-dashboard':
      render(Dashboard());
      break;
    case 'menu-home':
      render(Acceuil());
      break;
    case 'menu-vehicules':
      render(Vehicule());
      break;
    case 'menu-affectations':
      render(Affectation());
      break;
    case 'menu-chauffeurs':
      render(Chauffeur());
      break;
    case 'menu-fournisseurs':
      render(Fournisseur());
      break;
    case 'menu-historiques':
      render(Historique());
      break;
    case 'menu-versements':
      render(Versement());
      break;
  }
});
