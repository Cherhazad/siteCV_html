var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Dom from "../utils/Dom.js";
import Task from "./Task.js";
import FetchData from "../services/FetchData.js";
export default class TodoList extends Dom {
    constructor() {
        super();
        // Référence à l'élément du DOM existant qui a pour id "root"
        this.rootDom = document.getElementById("root");
        // Création des éléments du DOM
        this.domElts = this.render();
        // Gestion des événements
        this.manageEvents();
        // Import des tâches
        (() => __awaiter(this, void 0, void 0, function* () {
            const tasks = yield FetchData.loadTasks();
            console.log(`taches dans le constructeur de TodoList`, tasks);
            console.log(`this`, this);
            this.renderTasks(tasks);
        }))();
    }
    manageEvents() {
        this.domElts.form.addEventListener("submit", (event) => {
            console.log(`Dans submit addEventListener`);
            // Supprimer l'appel de la requête http via l'action du formulaire avec la méthode GET
            event.preventDefault();
            // Récupération des données envoyées par le formulaire
            const taskName = this.domElts.input.value;
            if (taskName) {
                // Création d'une tâche
                const new_task = {
                    name: taskName,
                    done: false,
                };
                new Task(Math.floor(Math.random() * 1000), new_task.name, new_task.done, this.domElts.sectionListTasks);
                this.domElts.input.value = "";
                // Ajout de la tâche sur le serveur via FechData.addTask(new_task)
                FetchData.addTask(new_task);
            }
        });
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
            };
        }
    }
    renderTasks(tasks) {
        tasks.sort((a, b) => {
            return a.done - b.done;
        }).forEach(task => {
            new Task(task.id, task.name, task.done, this.domElts.sectionListTasks);
        });
    }
}
