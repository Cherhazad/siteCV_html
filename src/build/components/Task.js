import Dom from "../utils/Dom.js";
import FetchData from "../services/FetchData.js";
export default class Task extends Dom {
    constructor(id, name, done, parent) {
        super();
        this.id = id;
        this.name = name;
        this.done = done;
        this.parent = parent;
        // Affichage et récupération des références vers les éléments du DOM constitutifs de la tâches
        this.domElts = this.render();
        // Gestion des événements
        this.manageEvents();
        console.log(`task créée : `, this);
    }
    manageEvents() {
        this.domElts.buttonDeleteElt.addEventListener("click", () => {
            console.log(`bouton delete cliqué`);
            this.domElts.articleElt.remove();
        });
        // Gestion du clic sur le bouton Valider / Invalider
        this.domElts.buttonValidateElt.addEventListener("click", () => {
            console.log(`bouton Valider/Invalider cliqué`);
            // Changement local
            this.done = !this.done;
            this.domElts.h2Elt.classList.toggle("done");
            if (this.domElts.h2Elt.classList.contains("done"))
                this.parent.appendChild(this.domElts.articleElt);
            else {
                this.parent.prepend(this.domElts.articleElt);
            }
            // Gestion du label
            this.domElts.buttonValidateElt.innerText = (this.done) ? "Invalider" : "Valider";
            // Appel du service 
            FetchData.patchTask(this.id, { done: this.done });
        });
    }
    render() {
        // gestion de la class pour savoir si la tâche est faite ou pas
        const attributeClass = (this.done) ? { "class": "done" } : {};
        // création des éléments du DOM constitutifs de la tâche
        const articleElt = this.createMarkup("article", "", this.parent);
        const h2Elt = this.createMarkup("h2", this.name, articleElt, attributeClass);
        const buttonDeleteElt = this.createMarkup("button", "Supprimer", articleElt);
        const buttonValidateElt = this.createMarkup("button", "Valider", articleElt);
        return ({
            articleElt,
            h2Elt,
            buttonDeleteElt,
            buttonValidateElt
        });
    }
}
