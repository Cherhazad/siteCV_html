export default class FetchData { // export permet de compartimentaliser le code en rubriques/modules logiques, export permet de pouvoir importer ce que FetchData comprend dans un autre fichier.
  static url = 'http://localhost:3000/tasks';

  /**
   * Va chercher les tâches sur le serveur json-server en exécutant une requête http avec le verbe GET
   * @returns Promise<Task[]>
   */
  static async loadTasks() { // static permet de limiter la méthode à la classe-même et nons à ses instances. Async, permet d'exécuter la fonction loadTasks() de manière asynchrone.
    return fetch(FetchData.url) // va démarrer le chargement d'une ressource sur le réseau et retourner une promesse résolue une fois que la  réponse est disponible. Ici, va récupérer les tâches ajoutées.
      .then(response => { // étudie le statut de la réponse et permet d'afficher une erreur si le statut est différent de 200 avant de passer au second .then s'il n'y a pas d'erreur.
        if (response.status != 200) {
          throw new Error("Pb dans loadTasks") 
        } else return response.json();
      })
      .then(tasks => { // retourne la tâche qui aura été ajoutée dans la liste via le bouton "ajouter la tâche".
        console.log(`tasks :`, tasks);
        return tasks;
      })
      .catch(error => { // écrit dans la console `Erreur attrapée` et le message d'alerte du throw si une erreur a été détectée.
        console.log(`Erreur attrapée` + error);
      })
  }
  /**
   * Ajoute une tâche sur le serveur json-server en exécutant une requête http avec le verbe POST
   * @returns Promise<Task>
   */
  static async addTask(new_task) {
    return fetch(FetchData.url, // va ajouter une nouvelle tâche sur le serveur
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(new_task)
      })
      .then(response => {
        console.log(`status dans le post`, response.status); 
        if (response.status != 201) { // 201 indique que la requête a fonctionné et qu'une ressource a été créée, si c'est différent alors renvoie un message d'erreur, sinon stocke la nouvelle tâche sur le serveur.
          throw new Error("Pb dans addTask")
        } else return response.json();
      })
      .then(task => {
        console.log(`task retournée après un post :`, task); // permet de créer la ligne de tâche ajoutée 
        return task;
      })
      .catch(error => {
        console.log(`Erreur attrapée dans addTask` + error); //retourne le message d'erreur de du throw de la ligne 40 s'il y a eu une erreur
      })

  }
  static async patchTask(id, updatedTask) { // permet de mettre à jour une tâche, de la modifier partiellement.
    return fetch(`${FetchData.url}/${id}`, { // recherche la tâche correspondante via son id
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PATCH",
      body: JSON.stringify(updatedTask)
    })
      .then(response => { // s'il y a une erreur, retourne une erreur sinon passe au .then suivant 
        if (response.status != 200) {
          throw new Error("Pb dans patchTask")
        } else return response.json();
      })
      .then(task => { // permet de mettre à jour la tâche et de l'a retourner mise à jour
        console.log(`Task updated:`, task);
        return task;
      })
      .catch(error => { // renvoie le message Error caught in patchTask: + l'erreur du throw de la ligne 63 si une erreur est détectée.
        console.log(`Error caught in patchTask: ` + error);
      })
  }
}

