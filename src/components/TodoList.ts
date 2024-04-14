import Dom from "../utils/Dom.js";
import Task from "./Task.js";
import FetchData from "../services/FetchData.js";

export default class TodoList extends Dom {
  domElts: any;
  rootDom: HTMLElement | null;

  constructor() {
    super();
    // Référence à l'élément du DOM existant qui a pour id "root"
    this.rootDom = document.getElementById("root");

    // Création des éléments du DOM
    this.domElts = this.render();

    // Gestion des événements
    this.manageEvents();


    // Import des tâches
    (async () => {
      const tasks = await FetchData.loadTasks();
      console.log(`taches dans le constructeur de TodoList`, tasks);
      console.log(`this`, this);
      this.renderTasks(tasks);
    })();


  }
  manageEvents() {
    this.domElts.form.addEventListener("submit", (event: any) => {
      console.log(`Dans submit addEventListener`);
      // Supprimer l'appel de la requête http via l'action du formulaire avec la méthode GET
      event.preventDefault();

      // Récupération des données envoyées par le formulaire
      const taskName = this.domElts.input.value;
      if (taskName) {

      const id = Math.floor(Math.random() * 1000);
        // Création d'une tâche

        const new_task = {
          name: taskName,
          done: false,
          id: id
        }
        new Task(id, new_task.name, new_task.done, this.domElts.sectionListTasks);
        this.domElts.input.value = "";
        // Ajout de la tâche sur le serveur via FechData.addTask(new_task)
        FetchData.addTask(new_task);
      }
    })
  }
  render() {
    if (this.rootDom) { //vérifie si la variable existe 

      // Création du formulaire
      const form = this.createMarkup("form", "", this.rootDom);
      const label = this.createMarkup("label", "Tâche : ", form, { "for": "task" });
      const input = this.createMarkup("input", "", form, { "id": "task", type: "text" });
      const buttonSubmit = this.createMarkup("button", "Ajouter la tâche", form, { "id": "task", type: "submit" });
      // Création de l'élément section qui comprend toutes les tâches
      const sectionListTasks = this.createMarkup("section", "", this.rootDom);

      return {
        form,
        input,
        sectionListTasks
      }
    }
  }
  renderTasks(tasks: Task[]) { //tableau d'objet de type Task, chaque nouvel objet sera de type Task

    tasks.sort((a: any, b: any) => {
      return a.done - b.done;
    }).forEach(task => {
      new Task(task.id, task.name, task.done, this.domElts.sectionListTasks);
    });
  }
}