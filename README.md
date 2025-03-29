# Procédure d'installation du projet

-> Cloner le projet en local

## 1- Backend


-> Vérifier que Java et Maven sont bien installés :
    java --version
    mvn -version
    Si non, télécharger et installer le jdk et Maven

-> Importer le projet dans votre IDE
    File > import > Maven > Existing Maven Projets (dans le cas de STS)
    Attendre que Maven télécharge les dépendances.
    Si cela ne fonctionne pas exécuter  "mvn clean install"

-> Créer le fichier .env et y ajouter la ligne suivante:
    MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/monprojetdb?retryWrites=true&w=majority


-> Démarrer le projet Spring


## 2- Frontend

-> Vérifier que Node.js et Angular CLI sont installés
    node -v
    ng version 
    Sinon installer node et Angular CLI 
### node : téléchargez-le depuis :🔗 https://nodejs.org/
    Ensuite : "npm install -g @angular/cli" 

-> Installer les dépendances Angular
    Dans le dossier du frontend, exécuter  la commande : "npm install"

-> Démarrer le projet
    Lancer la commande : "ng serve"