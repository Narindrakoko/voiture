//LoginFunction//


export async function initLogin() {

    console.log("✅ initLogin() chargé");

    const tabLogin = document.getElementById("tabLogin");
    const tabRegister = document.getElementById("tabRegister");

    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    // Vérifier le nombre d'utilisateurs
    try {
        const res = await fetch("http://localhost:3000/api/utilisateur");
        const users = await res.json();
        console.log("Nombre d'utilisateurs:", users.length);

        if (users.length === 1) {
            // Masquer l'onglet inscription et le remplacer par "Mot de passe oublié"
            tabRegister.textContent = "Mot de passe oublié";
            tabRegister.onclick = () => alert("Fonctionnalité à venir");
            registerForm.style.display = 'none';
        } else {
            // Onglets normaux
            tabLogin.onclick = () => {
                console.log("➡️ Onglet Connexion");
                tabLogin.classList.add("active");
                tabRegister.classList.remove("active");
                loginForm.classList.add("active");
                registerForm.classList.remove("active");
            };

            tabRegister.onclick = () => {
                console.log("➡️ Onglet Inscription");
                tabRegister.classList.add("active");
                tabLogin.classList.remove("active");
                registerForm.classList.add("active");
                loginForm.classList.remove("active");
            };
        }
    } catch (err) {
        console.error("❌ Erreur fetch utilisateurs:", err);
        // En cas d'erreur, afficher les onglets normaux
        tabLogin.onclick = () => {
            console.log("➡️ Onglet Connexion");
            tabLogin.classList.add("active");
            tabRegister.classList.remove("active");
            loginForm.classList.add("active");
            registerForm.classList.remove("active");
        };

        tabRegister.onclick = () => {
            console.log("➡️ Onglet Inscription");
            tabRegister.classList.add("active");
            tabLogin.classList.remove("active");
            registerForm.classList.add("active");
            loginForm.classList.remove("active");
        };
    }

    // Affichage mot de passe
    document.querySelectorAll(".togglePass").forEach(icon => {
      icon.onclick = () => {
        const input = icon.previousElementSibling;
        input.type = input.type === "password" ? "text" : "password";
        icon.classList.toggle("fa-eye-slash");
      };
    });

    // Connexion
    document.getElementById("btnLogin").onclick = async (e) => {
      e.preventDefault();

      console.log("🔵 Tentative de connexion...");

      const email = document.getElementById("loginEmail").value;
      const mdp = document.getElementById("loginPassword").value;

      try {
        const res = await fetch("http://localhost:3000/api/utilisateur/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, mdp })
        });

        const data = await res.json();
        console.log("Réponse backend login:", data);

        if (!res.ok) {
          alert(data.error);
          return;
        }

        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.hash = "dashboard";
        location.reload();

      } catch (err) {
        console.error("❌ Erreur fetch login:", err);
      }
    };

    // Inscription
    document.getElementById("btnRegister").onclick = async (e) => {
      e.preventDefault();

      console.log("🟢 Tentative d'inscription...");

      const nom = document.getElementById("regNom").value;
      const prenom = document.getElementById("regPrenom").value;
      const email = document.getElementById("regEmail").value;
      const mdp = document.getElementById("regPassword").value;
      const role = "user";

      try {
        const res = await fetch("http://localhost:3000/api/utilisateur", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nom, prenom, email, mdp, role })
        });

        const data = await res.json();
        console.log("Réponse backend inscription:", data);

        if (!res.ok) {
          alert(data.error);
          return;
        }

        alert("Compte créé !");
        if (tabLogin.onclick) {
            tabLogin.onclick();
        } else {
            // Fallback si onclick n'est pas défini
            tabLogin.classList.add("active");
            tabRegister.classList.remove("active");
            loginForm.classList.add("active");
            registerForm.classList.remove("active");
        }

      } catch (err) {
        console.error("❌ Erreur fetch inscription:", err);
      }
    };
  }
