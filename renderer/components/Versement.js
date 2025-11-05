export function Versement() {
    return `
      <main class="versements">
        <h2>Liste des versements</h2>
        <table class="data-table">
          <thead>
            <tr>
              <th>ID Versement</th>
              <th>Montant</th>
              <th>Date Versement</th>
              <th>Type Versement</th>
              <th>ID Véhicule</th>
              <th>ID Chauffeur</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>250,000 Ar</td>
              <td>2025-03-05</td>
              <td>Carburant</td>
              <td>1</td>
              <td>5</td>
            </tr>
          </tbody>
        </table>
      </main>
    `;
  }
  