export function Historique() {
    return `
      <main class="historiques">
        <h2>Historique des actions</h2>
        <table class="data-table">
          <thead>
            <tr>
              <th>ID Historique</th>
              <th>Action</th>
              <th>Date Affectation</th>
              <th>Détails</th>
              <th>ID Utilisateur</th>
              <th>ID Véhicule</th>
              <th>ID Chauffeur</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Affectation ajoutée</td>
              <td>2025-02-10</td>
              <td>Nouvelle mission</td>
              <td>2</td>
              <td>1</td>
              <td>5</td>
            </tr>
          </tbody>
        </table>
      </main>
    `;
  }
  