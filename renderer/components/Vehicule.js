export function Vehicule() {
    return `
      <main class="vehicules acceuil">
        <h2>Liste des véhicules</h2>
        <table class="vehicule-table data-table">
          <thead>
            <tr>
              <th>ID Véhicule</th>
              <th>Immatriculation</th>
              <th>Marque</th>
              <th>Modèle</th>
              <th>Date d'achat</th>
              <th>Kilométrage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>AB-123-CD</td>
              <td>Toyota</td>
              <td>Corolla</td>
              <td>2021-03-10</td>
              <td>45,000 km</td>
            </tr>
            <tr>
              <td>2</td>
              <td>BC-456-DE</td>
              <td>Peugeot</td>
              <td>208</td>
              <td>2022-06-25</td>
              <td>22,000 km</td>
            </tr>
            <tr>
              <td>3</td>
              <td>CD-789-EF</td>
              <td>Renault</td>
              <td>Clio</td>
              <td>2020-01-15</td>
              <td>67,500 km</td>
            </tr>
          </tbody>
        </table>
      </main>
    `;
  }
  