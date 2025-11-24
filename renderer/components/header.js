//Header.js//

export function Header() {
  // ⚡ Après le rendu, on initialise les événements
  setTimeout(() => {
    // Déconnexion
    const logoutBtn = document.getElementById("logoutBtn");
    const modal = document.getElementById("logoutConfirmModal");
    const btnYes = document.getElementById("logoutConfirmYes");
    const btnNo = document.getElementById("logoutConfirmNo");

    if (logoutBtn && modal && btnYes && btnNo) {
      logoutBtn.addEventListener("click", () => {
        modal.style.display = "block";
      });

      btnYes.addEventListener("click", () => {
        console.log("🔴 Déconnexion confirmée...");
        modal.style.display = "none";
        localStorage.removeItem("user");
        if (typeof renderLoginOnly === "function") renderLoginOnly();
      });

      btnNo.addEventListener("click", () => {
        modal.style.display = "none";
      });
    }
  }, 0);

  return ''
    + '<header class="main-header">'
    + '  <div class="header-left">'
    + '    <button id="toggleSidebar" class="menu-toggle">'
    + '      <i class="fas fa-bars"></i>'
    + '    </button>'
    + '    <h1>GestioFleet</h1>'
    + '  </div>'
    + ''
    + '  <div class="header-right">'
    + '    <div class="header-actions">'
    + ''
    + '      <button class="btn-icon" id="btnNotifications" title="Notifications">'
    + '        <i class="fas fa-bell"></i>'
    + '        <span class="notification-badge">3</span>'
    + '      </button>'
    + ''
    + '      <button class="btn-icon" id="btnSettings" title="Paramètres">'
    + '        <i class="fas fa-cog"></i>'
    + '      </button>'
    + ''
    + '      <!-- UTILISATEUR + LOGOUT -->'
    + '      <div class="user-menu">'
    + '        <span class="user-name">Admin</span>'
    + '        <button id="logoutBtn" class="btn-icon" title="Déconnexion">'
    + '          <i class="fas fa-sign-out-alt"></i>'
    + '        </button>'
    + '      </div>'
    + ''
    + '    </div>'
    + '  </div>'
    + ''
    + '  <!-- Logout Confirmation Modal -->'
    + '  <div id="logoutConfirmModal" class="modal">'
    + '    <div class="modal-content">'
    + '      <p>Confirmez-vous la déconnexion ?</p>'
    + '      <div class="modal-buttons">'
    + '        <button id="logoutConfirmYes" class="btn-confirm">Oui</button>'
    + '        <button id="logoutConfirmNo" class="btn-cancel">Non</button>'
    + '      </div>'
    + '    </div>'
    + '  </div>'
    + ''
    + '  <style>'
    + '    .user-menu {'
    + '      display: flex;'
    + '      align-items: center;'
    + '      gap: 10px;'
    + '    }'
    + ''
    + '    .user-name {'
    + '      font-weight: bold;'
    + '      color: var(--primary-color);'
    + '    }'
    + ''
    + '    #logoutBtn {'
    + '      background: none;'
    + '      border: none;'
    + '      cursor: pointer;'
    + '      color: red;'
    + '      font-size: 1.2rem;'
    + '    }'
    + ''
    + '    #logoutBtn:hover {'
    + '      opacity: 0.8;'
    + '    }'
    + ''
    + '    /* Modal Styles */'
    + '    .modal {'
    + '      display: none; /* Hidden by default */'
    + '      position: fixed;'
    + '      z-index: 1000;'
    + '      left: 0;'
    + '      top: 0;'
    + '      width: 100%;'
    + '      height: 100%;'
    + '      overflow: auto;'
    + '      background-color: rgba(0,0,0,0.4);'
    + '      backdrop-filter: blur(2px);'
    + '    }'
    + ''
    + '    .modal-content {'
    + '      background-color: #fff;'
    + '      margin: 15% auto;'
    + '      padding: 20px;'
    + '      border-radius: 8px;'
    + '      width: 300px;'
    + '      text-align: center;'
    + '      box-shadow: 0 2px 10px rgba(0,0,0,0.2);'
    + '    }'
    + ''
    + '    .modal-buttons {'
    + '      margin-top: 15px;'
    + '      display: flex;'
    + '      justify-content: space-around;'
    + '    }'
    + ''
    + '    .btn-confirm {'
    + '      background-color: var(--primary-color);'
    + '      border: none;'
    + '      color: white;'
    + '      padding: 8px 16px;'
    + '      border-radius: 4px;'
    + '      cursor: pointer;'
    + '      font-weight: bold;'
    + '    }'
    + ''
    + '    .btn-confirm:hover {'
    + '      background-color: darkblue;'
    + '    }'
    + ''
    + '    .btn-cancel {'
    + '      background-color: #ccc;'
    + '      border: none;'
    + '      padding: 8px 16px;'
    + '      border-radius: 4px;'
    + '      cursor: pointer;'
    + '      font-weight: bold;'
    + '      color: #333;'
    + '    }'
    + ''
    + '    .btn-cancel:hover {'
    + '      background-color: #aaa;'
    + '      color: white;'
    + '    }'
    + '  </style>'
    + '</header>';
}
