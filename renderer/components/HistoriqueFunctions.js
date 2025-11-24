// renderer/components/historiqueFunctions.js

// ======================
// Variables globales
// ======================
let allActivities = [];
const { jsPDF } = window.jspdf;

// ======================
// Fonction principale d'initialisation
// ======================
function initHistorique() {
  loadHistorique();
  initHistoriqueEvents();
}

// ======================
// Chargement des données historiques
// ======================
async function loadHistorique() {
  try {
    const [affectationsRes, versementsRes] = await Promise.all([
      fetch("http://localhost:3000/api/affectations"),
      fetch("http://localhost:3000/api/versements"),
    ]);

    if (!affectationsRes.ok || !versementsRes.ok)
      throw new Error("Erreur de chargement des données");

    const affectations = await affectationsRes.json();
    const versements = await versementsRes.json();

    // Combiner et formater
    allActivities = formatHistoriqueData(affectations, versements);

    // Afficher
    renderHistoriqueTable(allActivities);
    renderHistoriqueTimeline(allActivities);
    updateHistoriqueStats(allActivities);
  } catch (error) {
    console.error("Erreur:", error);
    showNotification("Erreur lors du chargement de l'historique", "error");
  }
}

// ======================
// Formatage des données
// ======================
function formatHistoriqueData(affectations, versements) {
  const affectationData = affectations.map((a) => ({
    id: a.id,
    type: "affectation",
    date: a.dateDebut,
    heure: new Date(a.dateDebut).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    vehicule: a.vehicule ? `${a.vehicule.marque} ${a.vehicule.modele}` : "N/A",
    chauffeur: a.chauffeur ? `${a.chauffeur.nom} ${a.chauffeur.prenom}` : "N/A",
    description: `Affectation du ${new Date(a.dateDebut).toLocaleDateString("fr-FR")} au ${new Date(a.dateFin).toLocaleDateString("fr-FR")}`,
    statut:
      a.statut === "en_cours"
        ? "en cours"
        : a.statut === "terminee"
        ? "terminé"
        : "annulé",
  }));

  const versementData = versements.map((v) => ({
    id: v.id,
    type: v.type || "versement",
    date: v.dateVersement,
    heure: new Date(v.dateVersement).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    }),
    vehicule: v.vehicule
    ? typeof v.vehicule === "object"
      ? `${v.vehicule.marque || ""} ${v.vehicule.modele || ""}`.trim()
      : v.vehicule
    : "N/A",
    chauffeur: v.chauffeur
    ? typeof v.chauffeur === "object"
      ? `${v.chauffeur.nom || ""} ${v.chauffeur.prenom || ""}`.trim()
      : v.chauffeur
    : "N/A",
    description: `${capitalize(v.type)} : ${parseFloat(v.montant).toLocaleString(
      "fr-FR"
    )} Ar`,
    statut: "terminé",
  }));

  const activities = [...affectationData, ...versementData];
  return activities.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// ======================
// Rendu du tableau
// ======================
function renderHistoriqueTable(activities) {
  const tbody = document.getElementById("historiqueTableBody");
  if (!tbody) return;

  if (activities.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="empty-state">
          <i class="fas fa-history"></i>
          <p>Aucune activité trouvée</p>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = activities
    .map(
      (a) => `
      <tr>
        <td>
          <div class="date-info">
            <span>${formatDate(a.date)}</span>
            <small>${a.heure || ""}</small>
          </div>
        </td>
        <td><span class="badge badge-${getBadgeColor(a.type)}">${capitalize(
        a.type
      )}</span></td>
        <td><div class="vehicle-info"><i class="fas fa-car"></i> ${a.vehicule}</div></td>
        <td><div class="user-info"><i class="fas fa-user-circle"></i> ${a.chauffeur}</div></td>
        <td>${a.description}</td>
        <td><span class="badge badge-${getStatusColor(
          a.statut
        )}">${capitalize(a.statut)}</span></td>
        <td>
          <div class="action-buttons">
            <button class="action-button view" onclick="viewActivity(${
              a.id
            }, '${a.type}')"><i class="fas fa-eye"></i></button>
            <button class="action-button print" onclick="printActivity(${a.id}, '${a.type}')"><i class="fas fa-print"></i></button>
          </div>
        </td>
      </tr>
    `
    )
    .join("");
}

// ======================
// Rendu de la timeline
// ======================
function renderHistoriqueTimeline(activities) {
  const container = document.querySelector("#timelineView .timeline");
  if (!container) return;

  container.innerHTML = activities
    .map(
      (a) => `
      <div class="timeline-item">
        <div class="timeline-date">
          <i class="fas fa-circle"></i>
          <span>${formatDate(a.date)}</span>
          <small>${a.heure || ""}</small>
        </div>
        <div class="timeline-content">
          <div class="timeline-header">
            <span class="badge badge-${getBadgeColor(a.type)}">${capitalize(
        a.type
      )}</span>
            <div class="action-buttons">
              <button class="action-button view" onclick="viewActivity(${
                a.id
              }, '${a.type}')"><i class="fas fa-eye"></i></button>
              <button class="action-button print"><i class="fas fa-print"></i></button>
            </div>
          </div>
          <div class="timeline-body">
            <div class="vehicle-info"><i class="fas fa-car"></i> ${a.vehicule}</div>
            <div class="user-info"><i class="fas fa-user-circle"></i> ${a.chauffeur}</div>
            <p>${a.description}</p>
            <span class="badge badge-${getStatusColor(
              a.statut
            )}">${capitalize(a.statut)}</span>
          </div>
        </div>
      </div>
    `
    )
    .join("");
}

// ======================
// Statistiques
// ======================
function updateHistoriqueStats(activities) {
  const total = activities.length;
  const affectations = activities.filter((a) => a.type === "affectation").length;
  const maintenances = activities.filter((a) => a.type === "maintenance").length;
  const versements = activities.filter((a) => a.type === "carburant").length;
  const reparations = activities.filter((a) => a.type === "reparation").length;

  document.querySelector(".stat-card:nth-child(1) .stat-value").textContent = total;
  document.querySelector(".stat-card:nth-child(2) .stat-value").textContent = affectations;
  document.querySelector(".stat-card:nth-child(3) .stat-value").textContent = maintenances;
  document.querySelector(".stat-card:nth-child(4) .stat-value").textContent =
    versements + reparations;
}

// ======================
// Filtres et événements
// ======================
function initHistoriqueEvents() {
  const searchInput = document.getElementById("searchHistorique");
  const filterType = document.getElementById("filterType");
  const dateDebut = document.getElementById("dateDebut");
  const dateFin = document.getElementById("dateFin");

  [searchInput, filterType, dateDebut, dateFin].forEach((el) => {
    if (el) el.addEventListener("input", filterActivities);
  });
}

function filterActivities() {
  const searchTerm = document.getElementById("searchHistorique").value.toLowerCase();
  const type = document.getElementById("filterType").value.toLowerCase();
  const start = document.getElementById("dateDebut").value;
  const end = document.getElementById("dateFin").value;

  const filtered = allActivities.filter((a) => {
    const matchText =
      a.description.toLowerCase().includes(searchTerm) ||
      a.chauffeur.toLowerCase().includes(searchTerm);
    const matchType = !type || a.type.toLowerCase() === type;
    const matchDate = isDateInRange(a.date, start, end);
    return matchText && matchType && matchDate;
  });

  renderHistoriqueTable(filtered);
  renderHistoriqueTimeline(filtered);
}

function isDateInRange(dateStr, start, end) {
  if (!start && !end) return true;
  const d = new Date(dateStr);
  if (start && !end) return d >= new Date(start);
  if (!start && end) return d <= new Date(end);
  return d >= new Date(start) && d <= new Date(end);
}

// ======================
// Fonctions utilitaires
// ======================
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("fr-FR");
}

function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
}

function getBadgeColor(type) {
  const colors = {
    affectation: "primary",
    maintenance: "warning",
    carburant: "success",
    reparation: "danger",
  };
  return colors[type] || "secondary";
}

function getStatusColor(statut) {
  const colors = {
    terminé: "success",
    "en cours": "warning",
    annulé: "danger",
  };
  return colors[statut] || "secondary";
}

// ======================
// Détails activité
// ======================
window.viewActivity = function (id, type) {
    const activity = allActivities.find(a => a.id === id && a.type === type);
    if (!activity) return;
    // Remplir les infos dans le modal
    document.getElementById("modalDate").textContent = formatDate(activity.date);
    document.getElementById("modalHeure").textContent = activity.heure || "—";
    document.getElementById("modalType").textContent = capitalize(activity.type);
    document.getElementById("modalVehicule").textContent = activity.vehicule;
    document.getElementById("modalChauffeur").textContent = activity.chauffeur;
    document.getElementById("modalDescription").textContent = activity.description;
    document.getElementById("modalStatut").textContent = capitalize(activity.statut);

    // Afficher le modal
    document.getElementById("activityModal").style.display = "flex";

    // Gestion de la fermeture
    document.querySelectorAll(".close-modal").forEach(btn => {
      btn.onclick = () => {
        document.getElementById("activityModal").style.display = "none";
      };
    });


    // Fermer si on clique en dehors
    document.getElementById("activityModal").onclick = (e) => {
      if (e.target.id === "activityModal") {
        e.target.style.display = "none";
      }
    };
  };

  window.printActivity = async function (id, type) {
    const activity = allActivities.find(a => a.id === id && a.type === type);
    if (!activity) return alert("Activité introuvable !");

    const modal = document.getElementById("pdfChoiceModal");
    modal.style.display = "flex";

    // Bouton impression HTML
    document.getElementById("btnImprimer").onclick = () => {
      modal.style.display = "none";
      const htmlContent = `
        <html>
        <head>
          <title>Détails activité</title>
          <style>
            body { font-family: 'Arial', sans-serif; padding: 40px; background-color: #f5f5f5; color: #333; }
            h2 { color: #1976d2; border-bottom: 2px solid #1976d2; padding-bottom: 5px; }
            p { margin: 8px 0; }
            strong { color: #1976d2; }
            hr { border: none; border-top: 1px solid #ccc; margin: 15px 0; }
            small { color: #777; }
          </style>
        </head>
        <body>
          <h2>Détails de l'activité</h2>
          <p><strong>Date :</strong> ${formatDate(activity.date)}</p>
          <p><strong>Heure :</strong> ${activity.heure || "—"}</p>
          <p><strong>Type :</strong> ${capitalize(activity.type)}</p>
          <p><strong>Véhicule :</strong> ${activity.vehicule}</p>
          <p><strong>Chauffeur :</strong> ${activity.chauffeur}</p>
          <p><strong>Description :</strong> ${activity.description}</p>
          <p><strong>Statut :</strong> ${capitalize(activity.statut)}</p>
          <hr>
          <small>Généré automatiquement — ${new Date().toLocaleString("fr-FR")}</small>
          <script>window.print();</script>
        </body>
        </html>
      `;
      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    };

    // Bouton téléchargement PDF
    document.getElementById("btnTelecharger").onclick = () => {
      modal.style.display = "none";
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      let y = 40;

      // Couleurs et styles
      const primaryColor = "#1976d2";
      const secondaryColor = "#eeeeee";
      const textColor = "#333";

      doc.setFillColor(primaryColor);
      doc.rect(0, 0, 595, 50, "F"); // bande en haut
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text("Détails de l'activité", 40, 35);

      y += 60;
      doc.setFontSize(12);
      doc.setTextColor(...hexToRgb(textColor));
      doc.setFont("helvetica", "normal");

      const addLine = (label, value) => {
        doc.setTextColor(primaryColor);
        doc.text(`${label}:`, 40, y);
        doc.setTextColor(...hexToRgb(textColor));
        doc.text(`${value}`, 120, y);
        y += 20;
      };

      addLine("Date", formatDate(activity.date));
      addLine("Heure", activity.heure || "—");
      addLine("Type", capitalize(activity.type));
      addLine("Véhicule", activity.vehicule);
      addLine("Chauffeur", activity.chauffeur);

      const safeDescription = activity.description.replace(/\u202F/g, ' ');
      const descriptionLines = doc.splitTextToSize(safeDescription, 400);
      doc.setTextColor(primaryColor);
      doc.text("Description:", 40, y);
      doc.setTextColor(...hexToRgb(textColor));
      doc.text(descriptionLines, 120, y);
      y += descriptionLines.length * 15;

      addLine("Statut", capitalize(activity.statut));

      y += 20;
      doc.setDrawColor(200);
      doc.setLineWidth(0.5);
      doc.line(40, y, 555, y);
      y += 15;

      doc.setFontSize(10);
      doc.setTextColor(120);
      doc.text(`Généré le : ${new Date().toLocaleString("fr-FR")}`, 40, y);

      doc.save(`Activité_${activity.id}_${activity.type}.pdf`);
    };

    modal.querySelector(".close-modal").onclick = () => {
      modal.style.display = "none";
    };
    modal.onclick = (e) => {
      if (e.target.id === "pdfChoiceModal") modal.style.display = "none";
    };

    // Helper pour convertir hex en RGB
    function hexToRgb(hex) {
      const bigint = parseInt(hex.replace("#",""), 16);
      return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
    }
  };

// ======================
// Notifications
// ======================
function showNotification(message, type = "success") {
  const notification = document.getElementById("notification");
  if (notification) {
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add("show");

    setTimeout(() => {
      notification.classList.remove("show");
    }, 3000);
  }
}

// ======================
// Export principal
// ======================
export { initHistorique };
