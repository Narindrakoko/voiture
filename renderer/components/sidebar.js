export function Sidebar() {
  return `
    <div class="sidebar-wrapper">
      <aside class="sidebar">
        <div class="sidebar-header">
          <div class="logo-container">
            <img src="../assets/logo.png" alt="Logo" class="logo">
            <h1>GestioFleet</h1>
          </div>
          <button class="menu-toggle" id="toggleSidebar" title="Réduire">
            <i class="fas fa-bars"></i>
          </button>
        </div>

        <div class="user-profile">
          <img src="https://ui-avatars.com/api/?name=Admin&background=random" alt="User" class="user-avatar">
          <div class="user-info">
            <h3 class="user-name">Admin</h3>
            <span class="user-role">Administrateur</span>
          </div>
        </div>

        <nav class="sidebar-nav">
          <div class="nav-section">
            <span class="nav-section-title">GÉNÉRAL</span>
            <ul class="nav-list">
              <li class="nav-item">
                <a href="#dashboard" class="nav-link" id="btn-dashboard">
                  <i class="fas fa-chart-line"></i>
                  <span>Tableau de bord</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="#vehicules" class="nav-link" id="menu-vehicules">
                  <i class="fas fa-car"></i>
                  <span>Véhicules</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="#chauffeurs" class="nav-link" id="menu-chauffeurs">
                  <i class="fas fa-user"></i>
                  <span>Chauffeurs</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="#affectations" class="nav-link" id="menu-affectations">
                  <i class="fas fa-exchange-alt"></i>
                  <span>Affectations</span>
                </a>
              </li>
            </ul>
          </div>

          <div class="nav-section">
            <span class="nav-section-title">FINANCE</span>
            <ul class="nav-list">
              <li class="nav-item">
                <a href="#versements" class="nav-link" id="menu-versements">
                  <i class="fas fa-money-bill-wave"></i>
                  <span>Versements</span>
                  <span class="nav-badge warning">3</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="#fournisseurs" class="nav-link" id="menu-fournisseurs">
                  <i class="fas fa-truck"></i>
                  <span>Fournisseurs</span>
                </a>
              </li>
            </ul>
          </div>

          <div class="nav-section">
            <span class="nav-section-title">RAPPORTS</span>
            <ul class="nav-list">
              <li class="nav-item">
                <a href="#historique" class="nav-link" id="menu-historiques">
                  <i class="fas fa-history"></i>
                  <span>Historique</span>
                </a>
              </li>
              <li class="nav-item">
                <a href="#statistiques" class="nav-link" id="menu-statistiques">
                  <i class="fas fa-chart-bar"></i>
                  <span>Statistiques</span>
                  <span class="nav-indicator new"></span>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div class="sidebar-footer">
          <div class="app-info">
            <span class="version">v1.0.0</span>
            <div class="status">
              <span class="status-dot online"></span>
              <span class="status-text">En ligne</span>
            </div>
          </div>
        </div>

        <style>
          .sidebar {
            width: 280px;
            height: 100vh;
            background: white;
            border-right: 1px solid var(--border-color);
            display: flex;
            flex-direction: column;
            transition: all 0.3s ease;
            position: fixed;
            left: 0;
            top: 0;
            z-index: 1000;
            box-shadow: var(--shadow);
          }

          .sidebar.collapsed {
            width: 70px;
          }

          .sidebar-header {
            padding: 1.5rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid var(--border-color);
          }

          .logo-container {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .logo {
            width: 32px;
            height: 32px;
            object-fit: contain;
          }

          .sidebar-header h1 {
            margin: 0;
            font-size: 1.2rem;
            font-weight: 600;
            color: #2c3e50;
          }

          .user-profile {
            padding: 1.5rem;
            display: flex;
            align-items: center;
            gap: 12px;
            border-bottom: 1px solid var(--border-color);
          }

          .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
          }

          .user-info {
            overflow: hidden;
          }

          .user-name {
            margin: 0;
            font-size: 1rem;
            font-weight: 600;
            color: #2c3e50;
          }

          .user-role {
            font-size: 0.8rem;
            color: #666;
          }

          .sidebar-nav {
            flex: 1;
            overflow-y: auto;
            padding: 1rem 0;
          }

          .nav-section {
            margin-bottom: 1.5rem;
          }

          .nav-section-title {
            padding: 0 1.5rem;
            font-size: 0.75rem;
            font-weight: 600;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .nav-list {
            list-style: none;
            padding: 0;
            margin: 0.5rem 0 0;
          }

          .nav-item {
            margin: 2px 0;
          }

          .nav-link {
            display: flex;
            align-items: center;
            padding: 0.75rem 1.5rem;
            color: #2c3e50;
            text-decoration: none;
            transition: all 0.3s ease;
            position: relative;
            gap: 12px;
          }

          .nav-link:hover {
            background: var(--light-bg);
            color: var(--primary-color);
          }

          .nav-link i {
            width: 20px;
            text-align: center;
            font-size: 1.1rem;
          }

          .nav-item.active .nav-link {
            background: var(--primary-color);
            color: white;
          }

          .nav-badge {
            position: absolute;
            right: 1.5rem;
            background: var(--primary-color);
            color: white;
            font-size: 0.7rem;
            padding: 2px 6px;
            border-radius: 10px;
            min-width: 20px;
            text-align: center;
          }

          .nav-badge.warning {
            background: var(--warning-color);
          }

          .nav-indicator {
            position: absolute;
            right: 1.5rem;
            width: 6px;
            height: 6px;
            border-radius: 50%;
          }

          .nav-indicator.pulse {
            background: var(--success-color);
            box-shadow: 0 0 0 rgba(40, 167, 69, 0.4);
            animation: pulse 2s infinite;
          }

          .nav-indicator.new {
            background: var(--primary-color);
          }

          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(40, 167, 69, 0.4);
            }
            70% {
              box-shadow: 0 0 0 10px rgba(40, 167, 69, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(40, 167, 69, 0);
            }
          }

          .sidebar-footer {
            padding: 1rem 1.5rem;
            border-top: 1px solid var(--border-color);
          }

          .app-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .version {
            font-size: 0.8rem;
            color: #666;
          }

          .status {
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .status-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
          }

          .status-dot.online {
            background: var(--success-color);
            box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.2);
          }

          .status-text {
            font-size: 0.8rem;
            color: var(--success-color);
          }

          .sidebar.collapsed .logo-container h1,
          .sidebar.collapsed .user-info,
          .sidebar.collapsed .nav-section-title,
          .sidebar.collapsed .nav-link span,
          .sidebar.collapsed .sidebar-footer,
          .sidebar.collapsed .nav-badge {
            display: none;
          }

          .sidebar.collapsed .nav-link {
            padding: 0.75rem;
            justify-content: center;
          }

          .sidebar.collapsed .nav-indicator {
            right: 8px;
          }

          @media (max-width: 768px) {
            .sidebar {
              position: fixed;
              left: -100%;
              top: 0;
              bottom: 0;
              width: 280px;
              z-index: var(--z-modal);
              transition: left 0.3s ease;
              overflow-y: auto;
              padding-bottom: 60px; /* Espace pour la navigation mobile */
            }

            .sidebar.show {
              left: 0;
            }

            .mobile-nav {
              display: grid;
            }

            .sidebar-overlay {
              display: none;
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(0, 0, 0, 0.5);
              z-index: calc(var(--z-modal) - 1);
              backdrop-filter: blur(2px);
            }

            .sidebar-overlay.show {
              display: block;
            }

            body.sidebar-open {
              overflow: hidden;
            }
          }

          /* Mobile Navigation */
          .mobile-nav {
            display: none;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            padding: 10px;
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
            z-index: var(--z-fixed);
          }

          .mobile-nav {
            display: none;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            padding: 8px;
          }

          .mobile-nav .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 8px;
            color: var(--gray-600);
            text-decoration: none;
            font-size: 0.8rem;
            border-radius: var(--radius);
            transition: all 0.3s ease;
          }

          .mobile-nav .nav-item i {
            font-size: 1.2rem;
            margin-bottom: 4px;
          }

          .mobile-nav .nav-item.active {
            color: var(--primary-color);
          }

          .mobile-nav .nav-item:hover {
            background: var(--light-bg);
          }

          .sidebar-wrapper {
            position: relative;
            height: 100%;
          }
        </style>

        <script>
          document.addEventListener('DOMContentLoaded', function() {
            initSidebarEvents();
            updateActiveLink();

            const toggleBtn = document.getElementById('toggleSidebar');
            const sidebar = document.querySelector('.sidebar');
            const overlay = document.querySelector('.sidebar-overlay');
            const mobileNav = document.querySelector('.mobile-nav');

            // Toggle sidebar on mobile
            if (toggleBtn) {
              toggleBtn.addEventListener('click', function() {
                sidebar.classList.toggle('show');
                overlay.classList.toggle('show');
                document.body.classList.toggle('sidebar-open');
              });
            }

            // Close sidebar when clicking overlay
            if (overlay) {
              overlay.addEventListener('click', function() {
                sidebar.classList.remove('show');
                overlay.classList.remove('show');
                document.body.classList.remove('sidebar-open');
              });
            }

            // Mobile navigation
            const navItems = document.querySelectorAll('.mobile-nav .nav-item');
            navItems.forEach(item => {
              item.addEventListener('click', function(e) {
                if (this.id === 'mobileMore') {
                  e.preventDefault();
                  sidebar.classList.add('show');
                  overlay.classList.add('show');
                  document.body.classList.add('sidebar-open');
                } else {
                  navItems.forEach(nav => nav.classList.remove('active'));
                  this.classList.add('active');
                }
              });
            });

            // Update active state based on current route
            function updateActiveState() {
              const path = window.location.hash.slice(1) || 'dashboard';
              navItems.forEach(item => {
                const itemPath = item.getAttribute('href').slice(1);
                item.classList.toggle('active', itemPath === path);
              });
            }

            window.addEventListener('hashchange', updateActiveState);
            updateActiveState();
          });

          function initSidebarEvents() {
            // Toggle sidebar collapse
            const collapseBtn = document.getElementById('collapseSidebar');
            if (collapseBtn) {
              collapseBtn.addEventListener('click', function() {
                document.body.classList.toggle('sidebar-collapsed');
                const sidebar = document.querySelector('.sidebar');
                sidebar.classList.toggle('collapsed');

                // Update icon
                const icon = this.querySelector('i');
                if (sidebar.classList.contains('collapsed')) {
                  icon.classList.remove('fa-angle-left');
                  icon.classList.add('fa-angle-right');
                } else {
                  icon.classList.remove('fa-angle-right');
                  icon.classList.add('fa-angle-left');
                }
              });
            }

            // Handle mobile menu
            const menuBtn = document.getElementById('toggleSidebar');
            if (menuBtn) {
              menuBtn.addEventListener('click', function() {
                const sidebar = document.querySelector('.sidebar');
                const overlay = document.querySelector('.sidebar-overlay');
                sidebar.classList.toggle('show');
                overlay.classList.toggle('show');
              });
            }

            // Close sidebar on overlay click (mobile)
            const overlay = document.querySelector('.sidebar-overlay');
            if (overlay) {
              overlay.addEventListener('click', function() {
                const sidebar = document.querySelector('.sidebar');
                sidebar.classList.remove('show');
                this.classList.remove('show');
              });
            }

            // Handle navigation
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
              link.addEventListener('click', function(e) {
                // Remove active class from all links
                navLinks.forEach(l => l.parentElement.classList.remove('active'));
                // Add active class to clicked link
                this.parentElement.classList.add('active');

                // Close sidebar on mobile after navigation
                if (window.innerWidth <= 768) {
                  const sidebar = document.querySelector('.sidebar');
                  const overlay = document.querySelector('.sidebar-overlay');
                  sidebar.classList.remove('show');
                  overlay.classList.remove('show');
                }
              });
            });
          }

          function updateActiveLink() {
            const path = window.location.hash.slice(1) || 'dashboard';
            const activeLink = document.querySelector(\`a[href="#\${path}"]\`);
            if (activeLink) {
              document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
              });
              activeLink.parentElement.classList.add('active');
            }
          }

          // Update active link on hash change
          window.addEventListener('hashchange', updateActiveLink);
        </script>
      </aside>
      <div class="sidebar-overlay"></div>

      <nav class="mobile-nav">
        <a href="#dashboard" class="nav-item active">
          <i class="fas fa-chart-line"></i>
          <span>Dashboard</span>
        </a>
        <a href="#vehicules" class="nav-item">
          <i class="fas fa-car"></i>
          <span>Véhicules</span>
        </a>
        <a href="#chauffeurs" class="nav-item">
          <i class="fas fa-user"></i>
          <span>Chauffeurs</span>
        </a>
        <a href="#more" class="nav-item" id="mobileMore">
          <i class="fas fa-ellipsis-h"></i>
          <span>Plus</span>
        </a>
      </nav>
    </div>
  `;
}
