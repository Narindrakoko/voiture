import { Acceuil } from './components/Acceuil.js';
import { Affectation } from './components/Affectation.js';
import { Chauffeur } from './components/Chauffeur.js';
import { ChauffeurForm } from './components/ChauffeurForm.js';
import { Dashboard } from './components/dashboard.js';
import { Fournisseur } from './components/Fournisseur.js';
import { Header } from './components/header.js';
import { Historique } from './components/Historique.js';
import { Sidebar } from './components/sidebar.js';
import { Vehicule } from './components/Vehicule.js';
import { Versement } from './components/Versement.js';

// Rendre les composants disponibles globalement
window.Header = Header;
window.Sidebar = Sidebar;
window.Dashboard = Dashboard;
window.Vehicule = Vehicule;
window.Affectation = Affectation;
window.Chauffeur = Chauffeur;
window.ChauffeurForm = ChauffeurForm;
window.Fournisseur = Fournisseur;
window.Historique = Historique;
window.Versement = Versement;
window.Acceuil = Acceuil;

// App initialization wrapper
const initApp = async () => {
  const app = document.getElementById('app');
  if (!app) {
    console.error('Could not find app container');
    return;
  }

  // Wait for Chart.js to load
  try {
    await window.chartJsLoaded;
  } catch (error) {
    console.error('Chart.js failed to load:', error);
  }

  // Wrap the render function to handle errors
  window.render = function(content) {
    try {
      app.innerHTML = `
        <div class="main-container">
          ${Header()}
          <div class="content-wrapper">
            ${Sidebar()}
            ${content}
          </div>
        </div>
      `;

      // Add loaded class to hide loading screen
      document.body.classList.add('app-loaded');

      // Initialize components
      initMobileNavigation();
      
      // Initialize charts if they exist
      if (typeof Chart !== 'undefined' && content.includes('chart')) {
        requestAnimationFrame(() => {
          try {
            const dashboardCharts = document.querySelectorAll('canvas');
            if (dashboardCharts.length) {
              initCharts();
            }
          } catch (error) {
            console.error('Error initializing charts:', error);
          }
        });
      }
    } catch (error) {
      console.error('Error rendering content:', error);
      app.innerHTML = `
        <div class="error-state">
          <i class="fas fa-exclamation-circle"></i>
          <h2>Erreur de chargement</h2>
          <p>Une erreur est survenue lors du chargement de l'application.</p>
          <button onclick="window.location.reload()" class="btn-primary">
            <i class="fas fa-sync"></i> Rafraîchir
          </button>
        </div>
      `;
      document.body.classList.add('app-loaded');
    }
  };

  // Initial render
  try {
    render(Dashboard());
  } catch (error) {
    console.error('Error during initial render:', error);
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);

// Gestion dynamique
document.addEventListener('click', (e) => {
  // Trouver le bouton le plus proche, que ce soit le clic sur le bouton lui-même ou sur l'icône
  const button = e.target.closest('#btnAjouterChauffeur');
  if (button) {
    console.log('Bouton Ajouter Chauffeur cliqué (via délégation)');
    render(ChauffeurForm());
    return;
  }

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
    case 'menu-statistiques':
      render(Dashboard());
      break;
  }
});

// Gestion de la navigation mobile
function initMobileNavigation() {
  if (window._mobileNavInitialized) return; // Prevent multiple initializations

  const body = document.body;
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  const mobileNav = document.querySelector('.mobile-nav');
  const toggleBtn = document.getElementById('toggleSidebar');

  // Gérer le scroll sur mobile
  function handleScroll() {
    if (window.scrollY > 20) {
      mobileNav?.classList.add('nav-scrolled');
    } else {
      mobileNav?.classList.remove('nav-scrolled');
    }
  }

  // Fermer le menu quand on clique sur un lien
  function closeMenu() {
    sidebar?.classList.remove('show');
    overlay?.classList.remove('show');
    body.classList.remove('sidebar-open');
  }

  // Gestionnaire d'événements pour la navigation
  document.addEventListener('click', (e) => {
    const target = e.target;

    // Fermer le menu si on clique en dehors
    if (sidebar?.classList.contains('show') &&
        !sidebar.contains(target) &&
        !toggleBtn?.contains(target)) {
      closeMenu();
    }
  });

  // Gérer les changements de route
  window.addEventListener('hashchange', () => {
    closeMenu();
    updateActiveNavigation();
  });

  // Mettre à jour la navigation active
  function updateActiveNavigation() {
    const currentPath = window.location.hash.slice(1) || 'dashboard';
    const mobileLinks = document.querySelectorAll('.mobile-nav .nav-item');
    const sidebarLinks = document.querySelectorAll('.sidebar .nav-link');

    mobileLinks.forEach(link => {
      const href = link.getAttribute('href')?.slice(1);
      link.classList.toggle('active', href === currentPath);
    });

    sidebarLinks.forEach(link => {
      const href = link.getAttribute('href')?.slice(1);
      link.parentElement?.classList.toggle('active', href === currentPath);
    });
  }

  // Initialiser les gestionnaires d'événements
  window.addEventListener('scroll', handleScroll, { passive: true });
  updateActiveNavigation();

  // Gérer le redimensionnement de la fenêtre
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    }, 250);
  });

  window._mobileNavInitialized = true;
}

// Ensure all resources are loaded before rendering
window.addEventListener('load', () => {
  // Initialize the app only after all resources are loaded
  try {
    render(Dashboard());
  } catch (error) {
    console.error('Error initializing app:', error);
  }
});

// Handle hash changes for navigation
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.slice(1) || 'dashboard';
  const targetId = `menu-${hash}`;
  const element = document.getElementById(targetId);

  if (element) {
    element.click();
  }
});
