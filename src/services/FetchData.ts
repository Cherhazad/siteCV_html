import Task from "../components/Task";

export default class FetchData {
  static url = 'http://localhost:3000/tasks';

  /**
   * Va chercher les tâches sur le serveur json-server en exécutant une requête http avec le verbe GET
   * @returns Promise<Task[]>
   */
  static async loadTasks() {
    return fetch(FetchData.url)
      .then(response => {
        if (response.status != 200) {
          throw new Error("Pb dans loadTasks")
        } else return response.json();
      })
      .then(tasks => {
        console.log(`tasks :`, tasks);
        return tasks;
      })
      .catch(error => {
        console.log(`Erreur attrapée` + error);
      })
  }
  /**
   * Ajoute une tâche sur le serveur json-server en exécutant une requête http avec le verbe POST
   * @returns Promise<Task>
   */
  static async addTask(new_task:Partial<Task>) {
    
    return fetch(FetchData.url,
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
        if (response.status != 201) {
          throw new Error("Pb dans addTask")
        } else return response.json();
      })
      .then(task => {
        console.log(`task retournée après un post :`, task);
        return task;
      })
      .catch(error => {
        console.log(`Erreur attrapée dans addTask` + error);
      })

  }
  static async patchTask(id:number, updatedTask:Partial<Task>) {
    return fetch(`${FetchData.url}/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "PATCH",
      body: JSON.stringify(updatedTask)
    })
      .then(response => {
        if (response.status != 200) {
          throw new Error("Pb dans patchTask")
        } else return response.json();
      })
      .then(task => {
        console.log(`Task updated:`, task);
        return task;
      })
      .catch(error => {
        console.log(`Error caught in patchTask: ` + error);
      })
  }
}