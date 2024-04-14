# Etapes pour transpiler

- Pour convertir en ts 
- changer les extensions 
- Tout typer :string…
- Déclarer les variables
- Préciser la valeur des variables dans les paramètres d’une fonction
- npm init -y
- npm i -D typescript en n°1 => crée le fichier package-lock.json
- tsc : faire la transpilation dans le dossier "Build"
- npx json-server ./src/jsonserver/db.json 

# organisation des fichiers 

Le dossier devoir contient les dossiers initiaux :
- components 
- css
- node_modules
- services => dont le FetchData.js commenté
- fichiers .json
- le README
- Le tsconfig.json où module et outDir ont été spécifiés
- dossier src comprenant 
  - les mêmes dossiers components, css, services et utils en Typescript
  - le dossier build contenant les fichiers transpilé en Javascript
