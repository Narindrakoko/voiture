// renderer/components/Acceuil.js
export function Acceuil() {
    return `
      <main class="acceuil">
        <h2>Bienvenue sur la plateforme de gestion des véhicules 🚗</h2>
        <p>
          Cette application permet de gérer facilement vos véhicules, chauffeurs, affectations, fournisseurs,
          versements et historiques d'opérations. Utilisez le menu latéral pour naviguer entre les différentes sections.
        </p>
  
        <section class="stats-section">
          <h3>Statistiques rapides</h3>
          <div class="cards">
            <div class="card">
              <h4>Véhicules</h4>
              <p><strong>25</strong> enregistrés</p>
            </div>
            <div class="card">
              <h4>Chauffeurs</h4>
              <p><strong>12</strong> actifs</p>
            </div>
            <div class="card">
              <h4>Missions</h4>
              <p><strong>3</strong> en cours</p>
            </div>
            <div class="card">
              <h4>Versements</h4>
              <p><strong>18</strong> récents</p>
            </div>
          </div>
        </section>
  
        <section class="recents">
          <h3>Dernières affectations</h3>
          <table class="data-table">
            <thead>
              <tr>
                <th>ID Affectation</th>
                <th>Chauffeur</th>
                <th>Véhicule</th>
                <th>Date début</th>
                <th>Date fin</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Rasoa Jean</td>
                <td>Peugeot 208</td>
                <td>2025-10-01</td>
                <td>2025-10-10</td>
                <td><span class="badge badge-success">Terminée</span></td>
              </tr>
              <tr>
                <td>2</td>
                <td>Rakoto Marie</td>
                <td>Toyota Corolla</td>
                <td>2025-10-15</td>
                <td>2025-10-22</td>
                <td><span class="badge badge-warning">En cours</span></td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    `;
  }
  