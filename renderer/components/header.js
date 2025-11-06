export function Header() {
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

          <div class="user-menu">
            <button class="btn-user" id="btnUserMenu">
              <img src="https://ui-avatars.com/api/?name=Admin&background=random" alt="User" class="user-avatar">
              <span class="user-name">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  `;
}
