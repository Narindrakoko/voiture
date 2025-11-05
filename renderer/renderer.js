// renderer/renderer.js
document.getElementById('btn').addEventListener('click', async () => {
    try {
      const r = await fetch('http://localhost:3000/api/hello');
      const json = await r.json();
      document.getElementById('out').textContent = JSON.stringify(json, null, 2);
    } catch (err) {
      document.getElementById('out').textContent = 'Erreur: ' + err.message;
    }
  });
  