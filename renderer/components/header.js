//Header.js//

export function Header() {
  // ⚡ Après le rendu, on initialise les événements
  setTimeout(() => {
    // Déconnexion
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        console.log("🔴 Déconnexion...");
        localStorage.removeItem("user");
        if (typeof renderLoginOnly === "function") renderLoginOnly();
      });
    }
  }, 0);

  return `
    <header class="main-header">
      <div class="header-left">
        <button id="toggleSidebar" class="menu-toggle">
          <i class="fas fa-bars"></i>
        </button>
        <h1>GestioFleet</h1>
      </div>

      <div class="header-right">
        <div class="header-actions">

          <button class="btn-icon" id="btnNotifications" title="Notifications">
            <i class="fas fa-bell"></i>
            <span class="notification-badge">3</span>
          </button>

          <button class="btn-icon" id="btnSettings" title="Paramètres">
            <i class="fas fa-cog"></i>
          </button>

          <!-- UTILISATEUR + LOGOUT -->
          <div class="user-menu">
            <span class="user-name">Admin</span>
            <button id="logoutBtn" class="btn-icon" title="Déconnexion">
              <i class="fas fa-sign-out-alt"></i>
            </button>
          </div>

        </div>
      </div>

      <style>
        .user-menu {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .user-name {
          font-weight: bold;
          color: var(--primary-color);
        }

        #logoutBtn {
          background: none;
          border: none;
          cursor: pointer;
          color: red;
          font-size: 1.2rem;
        }

        #logoutBtn:hover {
          opacity: 0.8;
        }
      </style>
    </header>
  `;
}
