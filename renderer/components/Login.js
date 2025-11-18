//Login.js//

import { initLogin } from './LoginFunction.js';

export function Login() {
  setTimeout(() => {
    initLogin();
  }, 0);

  return `
    <main class="login-page fadeIn">

      <div class="login-container">
        <div class="login-header">
          <h2><i class="fas fa-user-circle"></i> Authentification</h2>
          <p>Connectez-vous à votre espace de gestion</p>
        </div>

        <!-- Onglets -->
        <div class="login-tabs">
          <button id="tabLogin" class="tab-btn active">Connexion</button>
          <button id="tabRegister" class="tab-btn">Inscription</button>
        </div>

        <!-- Formulaire connexion -->
        <form id="loginForm" class="form active">
          <div class="form-group">
            <label>Email :</label>
            <input type="email" id="loginEmail" placeholder="Entrez votre email" required />
          </div>

          <div class="form-group">
            <label>Mot de passe :</label>
            <div class="password-wrapper">
              <input type="password" id="loginPassword" placeholder="********" required />
              <i class="fas fa-eye togglePass"></i>
            </div>
          </div>

          <button class="btn-primary" id="btnLogin">
            <i class="fas fa-sign-in-alt"></i> Se connecter
          </button>
        </form>

        <!-- Formulaire inscription -->
        <form id="registerForm" class="form">
          <div class="form-group">
            <label>Nom :</label>
            <input type="text" id="regNom" placeholder="Nom complet" required />
          </div>

          <div class="form-group">
            <label>Prénom :</label>
            <input type="text" id="regPrenom" placeholder="Votre prénom" required />
          </div>

          <div class="form-group">
            <label>Email :</label>
            <input type="email" id="regEmail" placeholder="exemple@gmail.com" required />
          </div>

          <div class="form-group">
            <label>Mot de passe :</label>
            <div class="password-wrapper">
              <input type="password" id="regPassword" placeholder="********" required />
              <i class="fas fa-eye togglePass"></i>
            </div>
          </div>

          <button class="btn-primary" id="btnRegister">
            <i class="fas fa-user-plus"></i> S'inscrire
          </button>
        </form>

      </div>

      <style>

        .login-page {
          display: flex;
          height: 100vh;
          justify-content: center;
          align-items: center;
          background: #f5f7fa;
          margin-left: 8rem;
        }

        .login-container {
          width: 420px;
          background: white;
          padding: 30px;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          animation: fadeIn 0.5s ease;
        }

        .login-header {
          text-align: center;
        }

        .login-header h2 {
          margin: 0;
          color: var(--primary-color);
          font-size: 1.8rem;
        }

        .login-header p {
          margin: 5px 0 20px;
          color: #666;
        }

        /* Onglets */
        .login-tabs {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .tab-btn {
          padding: 8px 20px;
          background: none;
          border: 2px solid var(--primary-color);
          border-radius: var(--radius);
          color: var(--primary-color);
          cursor: pointer;
          transition: 0.3s;
        }

        .tab-btn.active {
          background: var(--primary-color);
          color: white;
          box-shadow: var(--shadow);
        }

        /* Formulaire */
        .form {
          display: none;
          flex-direction: column;
          gap: 15px;
        }

        .form.active {
          display: flex;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        input {
          padding: 10px;
          border: 1px solid var(--border-color);
          border-radius: var(--radius);
          outline: none;
        }

        .password-wrapper {
          position: relative;
        }

        .password-wrapper i {
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
          cursor: pointer;
          color: #666;
        }

        .btn-primary {
          background: var(--primary-color);
          color: white;
          padding: 12px;
          border-radius: var(--radius);
          border: none;
          cursor: pointer;
          font-size: 1rem;
          transition: 0.3s;
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
        }

        .btn-primary:hover {
          opacity: 0.9;
        }
      </style>

    </main>
  `;
}
