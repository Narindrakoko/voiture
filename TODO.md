# TODO: Empêcher l'ajout multiple de maintenances pour le même véhicule

## Étapes à suivre

- [x] Modifier `server/services/maintenanceService.js` : Ajouter une validation dans `createMaintenance` pour vérifier si le véhicule a déjà une maintenance en cours ('en_cours').
- [x] Modifier `renderer/components/MaintenanceFunctions.js` : Filtrer les véhicules disponibles (sans maintenance en cours) dans le formulaire d'ajout de maintenance.

## Tests et vérifications

- [x] Tester qu'on ne peut pas créer deux maintenances actives pour le même véhicule.
- [x] Vérifier que les véhicules en maintenance sont filtrés dans le formulaire d'ajout.
